import mongoose from "mongoose"
import { Chat } from "../entities/chat.js"
import { schemaChats } from "./models/schemaChats.js"

class ChatsManager {
    #chatsDb
    constructor() {
        this.#chatsDb = mongoose.model('chats', schemaChats)
    }

    async getChats() {
        try {
            const allChats = await this.#chatsDb.find().lean()
            return allChats
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addChat(datos) {
        try {
            const newChat = new Chat(datos)
            const result = this.#chatsDb.create(newChat)
            return result
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
}

export const chatsManager = new ChatsManager()