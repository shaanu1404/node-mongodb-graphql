import express, { Application, Request, Response } from 'express'
import { connectDatabase } from './config/database'
import bookRoutes from './routes/book.routes'
import authorRoutes from './routes/author.routes'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' })
})

app.use('/api/v1/books', bookRoutes)
app.use('/api/v1/authors', authorRoutes)

const main = async () => {
    await connectDatabase()

    app.listen(4000, () => {
        console.log('Server running in http://localhost:4000')
    })
}

main()
