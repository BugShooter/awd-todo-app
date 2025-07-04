export async function completedTask(taskId: number) {
  return await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((res) => res.json());
}
