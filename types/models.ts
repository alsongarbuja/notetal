export interface levelType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    levelHeight: number
}

export interface subLevelType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    userId: string,
    levelId: string,
}