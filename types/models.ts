export interface topicType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    topicHeight: number
}

export interface subTopicType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    userId: string,
    topicId: string,
}