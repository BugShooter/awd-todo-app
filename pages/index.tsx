"use client";
import MainContainer from "@/components/Navigation/MainContainer";
import { Spinner, Box, Heading } from "@chakra-ui/react";
import { React, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import TaskList from "@/components/TaskList/TaskList";
import useSWR from "swr";
import { useTaskStore } from "@/store";
import AddTaskInput from "@/components/Task/AddTaskInput";
import SetupModal from "@/components/Modal/Modal";

const IndexPage = () => {
  const { data: tasks, isLoading, error } = useSWR("/api/tasks");

  const setActiveList = useTaskStore((state) => state.setActiveList);
  const setCountingTasks = useTaskStore((state) => state.setCountingTasks);

  useEffect(() => {
    setActiveList("TaskTango - Home Page");
    tasks && setCountingTasks(tasks);
  });

  if (!tasks) {
    return;
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
      >
        <Heading size="xl">Loading...</Heading>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.400"
          size="xl"
        />
      </Box>
    );
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <Layout title="TaskTango - Home Page">
      <MainContainer mainTitle="All Tasks">
        <SetupModal />
        <AddTaskInput />
        <TaskList tasks={tasks} />
      </MainContainer>
    </Layout>
  );
};

export default IndexPage;
