import { Welcome } from "../welcome/welcome";
import {Button, HStack} from "@chakra-ui/react"
import type { Route } from "../+types/root";
import Map from "~/views/map";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Map/>
  );
}
