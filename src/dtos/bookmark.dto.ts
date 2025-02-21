import { ApiProperty } from '@nestjs/swagger';

export class BookmarkResponseDto {
  @ApiProperty({
    description: 'The UUID of the bookmark',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The UUID of the user who bookmarked the post',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'The UUID of the bookmarked post',
    example: '660e8400-e29b-41d4-a716-446655440111',
  })
  postId: string;

  @ApiProperty({
    description: 'The timestamp when the bookmark was created',
    example: '2024-02-21T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the bookmark was last updated',
    example: '2024-02-21T13:00:00.123Z',
  })
  updatedAt: Date;
}

export class GetBookmarkResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates if the post is bookmarked by the user',
  })
  isBookmarked: boolean;

  @ApiProperty({
    example: '2024-02-21T12:00:00Z',
    nullable: true,
    description:
      'Timestamp when the post was bookmarked (null if not bookmarked)',
  })
  bookmarkedAt: Date | null;
}