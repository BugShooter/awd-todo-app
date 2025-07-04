import { useTaskStore } from "@/store";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

export default function FunMode() {
  const [funMode, toggleFunMode] = useTaskStore((state) => [
    state.funMode,
    state.toggleFunMode,
  ]);

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor="fun-mode" mb="0">
        Fun Mode
      </FormLabel>
      <Switch colorScheme='teal' id="fun-mode" isChecked={funMode} onChange={toggleFunMode} />
    </FormControl>
  );
}
