export class Page<T> {
    content: T[]
    pageMetadata: PageData
}

export class PageData {
    size: number
    totalElements: number
    totalPages: number
    number: number
}