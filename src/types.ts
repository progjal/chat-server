export type Chat = {
    id: number
    userId: number
    userName: string
    message: string
    date: Date
    replyChatId?: number
}