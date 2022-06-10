export interface Message {

    id?: number;
    conversationID: number;
    sender: number | undefined;
    content: string;

}
