import mongoose from 'mongoose'

export const connectDatabase = async () => {
    try {
        return await mongoose.connect('mongodb://localhost:27017/test-pipeline-db')
    } catch (error) {
        console.log('Error', error)
    }
}
