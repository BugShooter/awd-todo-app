export default async function AddTask(taskTitle: { title: string }): Promise<void> {
  console.log(taskTitle);
  try {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskTitle),
    });
  } catch (error) {
    console.log("ERROR !!");
  }
}
