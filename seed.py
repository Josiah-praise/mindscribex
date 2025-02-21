import psycopg2
from faker import Faker
from datetime import datetime, timedelta
import uuid
import random
import bcrypt
from typing import List
import os
from dotenv import load_dotenv
import string

# Load environment variables
load_dotenv()

# Initialize Faker
fake = Faker()

# Configuration
DEFAULT_PASSWORD = "MySecurePassword123"  # This will be the password for all users
HASHED_PASSWORD = bcrypt.hashpw(DEFAULT_PASSWORD.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Number of records to generate
COUNTS = {
    'users': 50,
    'series': 20,
    'posts_per_user': (1, 5),  # Random number between 1 and 5 posts per user
    'comments_per_post': (0, 3),  # Random number between 0 and 3 comments per post
    'likes_percentage': 0.3,  # 30% chance of a user liking a post
    'bookmarks_percentage': 0.2,  # 20% chance of a user bookmarking a post
    'followers_percentage': 0.1,  # 10% chance of a user following another user
}

class DatabaseSeeder:
    def __init__(self):
        self.conn = psycopg2.connect(os.getenv('DATABASE_URL'))
        self.cur = self.conn.cursor()
        self.users: List[str] = []  # Store user IDs
        self.posts: List[str] = []  # Store post IDs
        self.comments: List[str] = []  # Store comment IDs
        self.series: List[str] = []  # Store series IDs
        self.used_usernames = set()
        self.used_emails = set()

    def generate_unique_username(self, base_username):
        """Generate a unique username by adding random suffix if needed"""
        if base_username not in self.used_usernames:
            self.used_usernames.add(base_username)
            return base_username
        
        while True:
            # Add random numbers and letters to make username unique
            suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
            new_username = f"{base_username}_{suffix}"
            
            if new_username not in self.used_usernames:
                self.used_usernames.add(new_username)
                return new_username

    def generate_unique_email(self, base_name):
        """Generate a unique email address"""
        while True:
            domain = random.choice(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'])
            suffix = ''.join(random.choices(string.digits, k=3))
            email = f"{base_name}{suffix}@{domain}"
            
            if email not in self.used_emails:
                self.used_emails.add(email)
                return email

    def clean_database(self):
        """Clean all existing data from the database"""
        tables = [
            'Bookmark', 'PostLike', 'CommentLike', 'Comment',
            'Post', 'Follower', 'Series', 'User'
        ]
        
        for table in reversed(tables):
            try:
                self.cur.execute(f'TRUNCATE TABLE "{table}" CASCADE;')
                self.conn.commit()
            except psycopg2.Error as e:
                print(f"Warning: Could not truncate {table}: {e}")
                self.conn.rollback()

    def generate_users(self):
        """Generate random users"""
        for _ in range(COUNTS['users']):
            user_id = str(uuid.uuid4())
            self.users.append(user_id)
            
            # Generate base username and email
            firstname = fake.first_name().lower()
            lastname = fake.last_name().lower()
            base_username = f"{firstname}{lastname}"
            
            # Ensure uniqueness
            username = self.generate_unique_username(base_username)
            email = self.generate_unique_email(f"{firstname}.{lastname}")
            
            # Random social media links
            social_links = {
                'facebookLink': fake.boolean(chance_of_getting_true=30),
                'instagramLink': fake.boolean(chance_of_getting_true=40),
                'xLink': fake.boolean(chance_of_getting_true=20),
                'twitchLink': fake.boolean(chance_of_getting_true=15),
                'youtubeLink': fake.boolean(chance_of_getting_true=25),
            }

            try:
                self.cur.execute("""
                    INSERT INTO "User" (
                        id, email, firstname, lastname, username, password,
                        "facebookLink", "instagramLink", "xLink", "twitchLink", "youtubeLink",
                        "isValid", "isStaff", "isSuperUser", "createdAt", "updatedAt"
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    user_id,
                    email,
                    firstname.capitalize(),
                    lastname.capitalize(),
                    username,
                    HASHED_PASSWORD,
                    f"https://facebook.com/{username}" if social_links['facebookLink'] else None,
                    f"https://instagram.com/{username}" if social_links['instagramLink'] else None,
                    f"https://x.com/{username}" if social_links['xLink'] else None,
                    f"https://twitch.tv/{username}" if social_links['twitchLink'] else None,
                    f"https://youtube.com/{username}" if social_links['youtubeLink'] else None,
                    True,
                    random.random() < 0.1,  # 10% chance of being staff
                    random.random() < 0.02,  # 2% chance of being superuser
                    fake.date_time_between(start_date='-1y'),
                    fake.date_time_between(start_date='-6m'),
                ))
                self.conn.commit()
            except psycopg2.Error as e:
                print(f"Warning: Could not create user {username}: {e}")
                self.conn.rollback()
                continue

    # ... [rest of the methods remain the same] ...
    def generate_series(self):
        """Generate random series"""
        for _ in range(COUNTS['series']):
            series_id = str(uuid.uuid4())
            self.series.append(series_id)
            self.cur.execute("""
                INSERT INTO "Series" (id, title, "ownerId", "createdAt", "updatedAt")
                VALUES (%s, %s, %s, %s, %s)
            """, (
                series_id,
                fake.catch_phrase(),
                random.choice(self.users),
                fake.date_time_between(start_date='-1y'),
                fake.date_time_between(start_date='-6m'),
            ))

    def generate_posts(self):
        """Generate random posts"""
        for user_id in self.users:
            post_count = random.randint(*COUNTS['posts_per_user'])
            for _ in range(post_count):
                post_id = str(uuid.uuid4())
                self.posts.append(post_id)
                self.cur.execute("""
                    INSERT INTO "Post" (
                        id, "authorId", title, content, published,
                        "createdAt", "updatedAt", "readTime", "seriesId"
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    post_id,
                    user_id,
                    fake.sentence(),
                    fake.text(max_nb_chars=2000),
                    True,
                    fake.date_time_between(start_date='-1y'),
                    fake.date_time_between(start_date='-6m'),
                    random.randint(2, 15),
                    random.choice(self.series) if random.random() < 0.3 else None,  # 30% chance of being in a series
                ))

        """Generate likes, bookmarks, and followers"""
        # Generate post likes
        for post_id in self.posts:
            for user_id in random.sample(
                self.users,
                k=int(len(self.users) * COUNTS['likes_percentage'])
            ):
                if random.random() < COUNTS['likes_percentage']:
                    try:
                        self.cur.execute("""
                            INSERT INTO "PostLike" (
                                id, "userId", "postId", "createdAt", "updatedAt"
                            )
                            VALUES (%s, %s, %s, %s, %s)
                        """, (
                            str(uuid.uuid4()),
                            user_id,
                            post_id,
                            fake.date_time_between(start_date='-1y'),
                            fake.date_time_between(start_date='-6m'),
                        ))
                    except psycopg2.Error:
                        continue

        # Generate bookmarks
        for post_id in self.posts:
            for user_id in random.sample(
                self.users,
                k=int(len(self.users) * COUNTS['bookmarks_percentage'])
            ):
                try:
                    self.cur.execute("""
                        INSERT INTO "Bookmark" (
                            id, "userId", "postId", "createdAt", "updatedAt"
                        )
                        VALUES (%s, %s, %s, %s, %s)
                    """, (
                        str(uuid.uuid4()),
                        user_id,
                        post_id,
                        fake.date_time_between(start_date='-1y'),
                        fake.date_time_between(start_date='-6m'),
                    ))
                except psycopg2.Error:
                    continue

        # Generate followers
        for user_id in self.users:
            for potential_follower in random.sample(
                [u for u in self.users if u != user_id],
                k=int(len(self.users) * COUNTS['followers_percentage'])
            ):
                try:
                    self.cur.execute("""
                        INSERT INTO "Follower" (
                            id, "userId", "followingId", "createdAt", "updatedAt"
                        )
                        VALUES (%s, %s, %s, %s, %s)
                    """, (
                        str(uuid.uuid4()),
                        potential_follower,
                        user_id,
                        fake.date_time_between(start_date='-1y'),
                        fake.date_time_between(start_date='-6m'),
                    ))
                except psycopg2.Error:
                    continue

    def seed(self):
        """Run the complete seeding process"""
        try:
            print("Cleaning database...")
            self.clean_database()
            
            print("Generating users...")
            self.generate_users()
            
            print("Generating series...")
            self.generate_series()
            
            print("Generating posts...")
            self.generate_posts()
            
            print("Generating comments...")
            self.generate_comments()
            
            print("Generating interactions...")
            self.generate_interactions()
            
            self.conn.commit()
            print("Database seeded successfully!")
            
        except Exception as e:
            self.conn.rollback()
            print(f"Error seeding database: {e}")
            raise
        finally:
            self.cur.close()
            self.conn.close()

if __name__ == "__main__":
    seeder = DatabaseSeeder()
    seeder.seed()