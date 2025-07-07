export async function editTask(taskId: string, taskTitle: string): Promise<void> {
  // FIXME: should we check response for errors?
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskTitle }),
  });
}
