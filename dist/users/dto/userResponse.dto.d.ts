declare const UserResponseDto_base: Type<Omit<T, K>>;
export declare class UserResponseDto extends UserResponseDto_base {
}
export declare class PaginationMetaDataDto {
    total: number;
    page: number;
    currPageTotal: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class PaginatedUsersDto {
    data: UserResponseDto[];
    meta: PaginationMetaDataDto;
}
export {};
