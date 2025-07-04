"use client";
import Layout from "@/components/Layout/Layout";
import MainContainer from "@/components/Navigation/MainContainer";
import TaskList from "@/components/TaskList/TaskList";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";
import { useTaskStore } from "@/store";
import AddTaskInput from "@/components/Task/AddTaskInput";

const UpcomingPage = () => {
  const setActiveList = useTaskStore((state) => state.setActiveList);
  setActiveList("TaskTango - Upcoming");

  const {
    data: upcomingTasks,
    isLoading,
    error,
  } = useSWR("/api/tasks", async () =>
    (await fetch("/api/status/upcoming")).json()
  );
  if (!upcomingTasks) {
    return;
  }

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
        <Spinner size="xl" />
      </>
    );
  }

  if (error) {
    console.error(error);
    return <div>failed to load</div>;
  }

  return (
    <Layout title="TaskTango - Upcoming">
      <MainContainer mainTitle="Upcoming">
        <AddTaskInput />
        <TaskList tasks={upcomingTasks} />
      </MainContainer>
    </Layout>
  );
};

export default UpcomingPage;
