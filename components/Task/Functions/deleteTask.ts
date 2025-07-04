export async function deleteTask(taskId) {
  const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });

  if (!response.ok) {
    console.error(response.status);
    return;
  }
}
