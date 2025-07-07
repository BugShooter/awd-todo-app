import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
