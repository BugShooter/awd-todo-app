import {
  Checkbox,
  ListItem,
  UnorderedList,
  IconButton,
  Spacer,
  HStack,
  Input,
  Divider,
  Flex,
  useToast,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTask } from "../Task/Functions/deleteTask";
import { editTask } from "../Task/Functions/editTask";
import { completedTask } from "../Task/Functions/completedTask";
import { useSWRConfig } from "swr";
import { useTaskStore } from "@/store";
import JSConfetti from "js-confetti";

export default function TaskList({ tasks }) {
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const funMode = useTaskStore((state) => state.funMode);
  const confetti = new JSConfetti();
  const searchTerm = useTaskStore((state) => state.searchTerm);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      mutate("/api/tasks");

      toast({
        title: "Task deleted",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      mutate("/api/tasks");
      toast({
        title: "Error deleting task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleEditTask = async (taskId, nextValue) => {
    try {
      mutate(
        "/api/tasks",
        (data) => {
          return data.map((task) => {
            if (task._id === taskId) {
              return { ...task, title: nextValue };
            }
            return task;
          });
        },
        true
      );
      await editTask(taskId, nextValue);

      mutate("/api/tasks");
    } catch (error) {
      mutate("/api/tasks");
    }
  };

  const handleCompletedTask = async (taskId) => {
    try {
      const task = await completedTask(taskId);
      if (task.completed) {
        if (funMode) {
          confetti.addConfetti({
            emojis: ["🌈", "🐻", "✏️", "✅", "🥳", "🎉", "🦄", "🐻", "🐼"],
            emojiSize: 150,
            confettiRadius: 100,
          });
        } else {
          toast({
            title: "Task Done",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error completing task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      mutate("/api/tasks");
    }
  };

  return (
    <UnorderedList styleType="none" spacing={2} marginTop={5}>
      {filteredTasks.map((task) => (
        <ListItem key={task._id}>
          <Flex alignItems="center">
            <HStack spacing="12px">
              <Checkbox
                colorScheme="teal"
                key={task._id}
                isChecked={task.completed}
                onChange={() => handleCompletedTask(task._id)}
              ></Checkbox>

              <Editable
                
                defaultValue={task.title}
                onSubmit={(nextValue) => handleEditTask(task._id, nextValue)}
              >
                <EditablePreview as={task.completed ? "del" : ""} />
                <Input
                  as={EditableInput}
                  focusBorderColor="teal.400"
                  size="sm"
                />
              </Editable>
            </HStack>
            <Spacer />
            <IconButton
              aria-label="Delete a task"
              size="xs"
              color="red.300"
              margin="10px"
              icon={<DeleteIcon />}
              onClick={() => handleDeleteTask(task._id)}
            />
          </Flex>
          <Divider />
        </ListItem>
      ))}
    </UnorderedList>
  );
}
