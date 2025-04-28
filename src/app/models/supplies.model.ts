
export interface Account {
    id: number,
    address: string,
    nis: number,
    alias: string,
    tags: string[],
    supplies: Supply[]
}
export interface Supply {
    id: number,
    address: string,
    nis: string,
    location: string,
    alias: string,
}
