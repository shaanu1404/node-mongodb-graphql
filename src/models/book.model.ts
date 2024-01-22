import { Schema, model } from 'mongoose'

export type BookType = {
    name: string;
    isbn: string;
    authorId: Schema.Types.ObjectId;
}

const bookSchema = new Schema<BookType>({
    name: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
}, {
    timestamps: true
});

const Book = model<BookType>('Book', bookSchema);
export default Book;