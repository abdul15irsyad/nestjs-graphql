export interface FindAllInputOptions {
    page?: number,
    limit?: number,
    search?: string,
    orderBy?: string,
    orderDir?: "ASC" | "DESC" | "asc" | "desc",
}