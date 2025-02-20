import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class Post {
    id: string;
    author: UserResponseDto;
    authorId: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    readTime: number;
}
