export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });

  if (!response.ok) {
    console.error(response.status);
    return;
  }
}
