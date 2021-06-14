export class Page<T> {
    content: T[]
    size: number
    totalElements: number
    totalPages: number
    number: number
    pageMetadata?: PageData
}

export class PageData {
    size: number
    totalElements: number
    totalPages: number
    number: number
}