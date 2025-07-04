import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Container,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useTaskStore } from "@/store";
import AddTaskInput from "../Task/AddTaskInput";

const SetupModal = () => {
  const setupMode = useTaskStore((state) => state.setupMode);
  const finishSetup = useTaskStore((state) => state.finishSetup);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: setupMode });
  const closeWelcomeScreenAndFinishSetup = () => {
    onClose();
    finishSetup();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeWelcomeScreenAndFinishSetup}>
      <ModalOverlay />
      <ModalContent>
        <Container centerContent>
          <ModalHeader textAlign="center">
            Hello there, TaskTango Explorer! 🚀{" "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Stack>
              <Text>Ready to boost your productivity? </Text>
              <Text>
                Type in your first task below and let the Tango of Tasks begin!
                🎉💃🏽🕺🏼
              </Text>
              <AddTaskInput
                afterSubmit={() => closeWelcomeScreenAndFinishSetup()}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={closeWelcomeScreenAndFinishSetup}
            >
              Close
            </Button>
          </ModalFooter>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default SetupModal;
