import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import Task from "../../../db/models/Task";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find({ completed: true }).sort('-created_at');
    return response.status(200).json(tasks);
  }
}
