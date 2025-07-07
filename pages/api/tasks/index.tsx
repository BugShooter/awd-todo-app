import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find().sort("-created_at");
    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const taskTitle = request.body;
      const task = new Task(taskTitle);
      const record = await task.save();
      return response.status(201).json(record);
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = "Unknown error";
        console.error(new Error("Unknown error type", { cause: error }));
      }
      console.error(errorMessage);
      return response.status(400).json({ error: errorMessage });
    }
  }
}
