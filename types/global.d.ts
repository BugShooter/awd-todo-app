import { Mongoose } from "mongoose"

declare global {
    interface ITask {
        _id: string,
        title: string,
        completed: boolean
    }
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: Mongoose | null,
        promise: Promise<Mongoose> | null
    }
}