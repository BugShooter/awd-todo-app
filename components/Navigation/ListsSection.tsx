import {
  CheckCircleIcon,
  CopyIcon,
  RepeatClockIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  List,
  ListItem,
  ListIcon,
  Box,
  Badge,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useTaskStore } from "@/store";

export default function ListsSection() {
  const activeList = useTaskStore((state) => state.activeList);
  let countingTasks = useTaskStore((state) => state.countingTasks);

  const numberOfDoneTasks = countingTasks.filter(
    (task) => task.completed
  ).length;
  const numberOfUpcomingTasks = countingTasks.length - numberOfDoneTasks;

  return (
    <>
      <Heading display={["none", "unset"]} paddingTop="3" size="sm" mb={3}>
        Lists
      </Heading>
      <Box fontSize="sm" width={["250px", "100%"]}
      alignSelf="center">
        <nav>
          <List
            width={["100%", "inherit"]}
            display={["flex", "unset"]}
            justifyContent="space-evenly"
            alignItems={["center", "unset"]}
            gap={["25px", "0px"]}
            spacing={["0px", "10px"]}
          >
            <ListItem
              p="1"
              borderRadius="full"
              bg={activeList === "TaskTango - Home Page" ? "teal.400" : ""}
            >
              <Box as="a" href="/" display="flex" alignItems="center">
                <ListIcon
                  as={HamburgerIcon}
                  marginRight={["0px", "8px"]}
                  boxSize={["2em", "1em"]}
                />
                <Text display={["none", "unset"]}>All Tasks</Text>
                <Spacer />
                <Badge
                  display={["none", "unset"]}
                  ml="2"
                  borderRadius="full"
                  px="2"
                  colorScheme="gray"
                >
                  {countingTasks.length}
                </Badge>
              </Box>
            </ListItem>
            <ListItem
              p="1"
              borderRadius="full"
              bg={activeList === "TaskTango - Upcoming" ? "teal.400" : ""}
            >
              <Box as="a" href="/upcoming" alignItems="center" display="flex">
                <ListIcon
                  as={RepeatClockIcon}
                  marginRight={["0px", "8px"]}
                  boxSize={["2em", "1em"]}
                />
                <Text display={["none", "unset"]}>Upcoming</Text>
                <Spacer />
                <Badge
                  display={["none", "unset"]}
                  ml="2"
                  borderRadius="full"
                  px="2"
                  colorScheme="gray"
                >
                  {numberOfUpcomingTasks}
                </Badge>
              </Box>
            </ListItem>
            <ListItem
              p="1"
              borderRadius="full"
              bg={activeList === "TaskTango - Done" ? "teal.400" : ""}
            >
              <Box as="a" href="/done" alignItems="center" display="flex">
                <ListIcon
                  as={CheckCircleIcon}
                  marginRight={["0px", "8px"]}
                  boxSize={["2em", "1em"]}
                />
                <Text display={["none", "unset"]}>Done</Text>
                <Spacer />
                <Badge
                  display={["none", "unset"]}
                  ml="2"
                  borderRadius="full"
                  px="2"
                  colorScheme="gray"
                >
                  {numberOfDoneTasks}
                </Badge>
              </Box>
            </ListItem>
            {/* <ListItem display={["none", "unset"]} p="1">
              <Box as="a" href="/stickywall" alignItems="center" display="flex">
                <ListIcon as={CopyIcon} />
                Sticky Wall
              </Box>
            </ListItem> */}
          </List>
        </nav>
      </Box>
    </>
  );
}
