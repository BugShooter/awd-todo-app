export async function editTask(taskId, taskTitle) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: taskTitle}),
  });
}
