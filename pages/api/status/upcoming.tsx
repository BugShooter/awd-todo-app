import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find({ completed: false }).sort('-created_at');
    return response.status(200).json(tasks);
  }
}
