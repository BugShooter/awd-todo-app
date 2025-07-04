import Task from "@/db/models/Task";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }
  await dbConnect();

  if (request.method === "DELETE") {
    await Task.findByIdAndDelete(id);

    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "PUT") {
    const task = await Task.findById(id);

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    await Task.findByIdAndUpdate(id, {
      $set: { title: request.body.title },
    });

    response.status(200).json({
      status: `Task ${id} was successfully edited!`,
    });
  }

  if (request.method === "PATCH") {
    let task = await Task.findById(id);

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    task = await Task.findByIdAndUpdate(
      id,
      {
        $set: { completed: !task.completed },
      },
      { new: true }
    );

    response.status(200).json(task);
  }
}
