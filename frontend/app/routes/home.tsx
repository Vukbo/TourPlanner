import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import {Button, HStack} from "@chakra-ui/react"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  <HStack>
    <Button>Click me</Button>
    <Button>Click me</Button>
  </HStack>
  );
}
