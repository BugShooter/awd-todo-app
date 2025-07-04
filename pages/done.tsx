"use client";
import React from "react";
import Layout from "@/components/Layout/Layout";
import MainContainer from "@/components/Navigation/MainContainer";
import TaskList from "@/components/TaskList/TaskList";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";
import { useTaskStore } from "@/store";

const DonePage = () => {
  const setActiveList = useTaskStore((state) => state.setActiveList);
  setActiveList("TaskTango - Done");

  const {
    data: doneTasks,
    isLoading,
    error,
  } = useSWR("/api/tasks", async () =>
    (await fetch("/api/status/done")).json()
  );

  if (!doneTasks) {
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
    <Layout title="TaskTango - Done">
      <MainContainer mainTitle="Done">
        <TaskList tasks={doneTasks} />
      </MainContainer>
    </Layout>
  );
};

export default DonePage;
