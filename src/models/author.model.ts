import { Schema, model } from 'mongoose'

export type AuthorType = {
    name: string;
}

const authorSchema = new Schema<AuthorType>({
    name: { type: String, required: true },
}, {
    timestamps: true
})

const Author = model<AuthorType>('Author', authorSchema)
export default Author


