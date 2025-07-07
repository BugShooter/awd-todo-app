import { Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddTask from "./Functions/addTask";
import { useSWRConfig } from "swr";
import React from "react";

interface AddTaskInputProps {
  afterSubmit?: (() => void)
}

interface TaskFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement
}
interface TaskFormElement extends HTMLFormElement {
  readonly elements: TaskFormElements
}

export default function AddTaskInput({ afterSubmit }: AddTaskInputProps) {
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event: React.FormEvent<TaskFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // FIXME: currentTarget better than target?
    const taskTitle = String(Object.fromEntries(formData));

    try {
      await AddTask(taskTitle);
      mutate("/api/tasks");

      const inputElement = event.currentTarget.elements.title;
      inputElement && inputElement.focus();

      event.currentTarget.reset();

      // with this, we can let the caller know that submit has been successfully handled
      if (afterSubmit && typeof afterSubmit === "function") {
        afterSubmit();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      mutate("/api/tasks");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AddIcon color="gray.300" />
        </InputLeftElement>
        <Input
          aria-label="add New Task"
          focusBorderColor="teal.400"
          autoFocus
          id="title"
          name="title"
          type="text"
          placeholder="Add new task"
        />
      </InputGroup>
    </form>
  );
}
