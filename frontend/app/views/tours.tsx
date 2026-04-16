import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Heading,
  HoverCard,
  Icon,
  IconButton,
  Link,
  Menu,
  ScrollArea,
  Separator,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { LatLngExpression } from "leaflet";
import {
  LuBike,
  LuEllipsisVertical,
  LuFootprints,
  LuMountain,
  LuShieldQuestion,
} from "react-icons/lu";
import { RouteService, TourService } from "~/queries/rest";
import Map from "./map";
import { useState } from "react";
import { TransportTypes, type Tour } from "~/models/tour";
import TourDetails from "./tour-details";

export function TourLE({ tour }: { tour: Tour }) {
  let icon = <LuShieldQuestion />;
  // if (tour.transportType == TransportTypes.Walking) icon = <LuFootprints />
  if (tour.transportType == TransportTypes.Hiking) icon = <LuMountain />;
  if (tour.transportType == TransportTypes.Biking) icon = <LuBike />;

  return (
    <Box
      borderWidth="1px"
      borderColor="border.disabled"
      borderRadius="sm"
      color="fg.disabled"
    >
      <Flex alignItems={"center"} minHeight={"100px"}>
        <Center width="75px">
          <Icon size={"2xl"}>{icon}</Icon>
        </Center>
        <Separator height="100px" orientation="vertical" />
        <Flex margin="5" flexGrow="1" direction={"column"}>
          <Link>
            <Heading size="sm">{tour.title}</Heading>
          </Link>
          <Text fontWeight="light" textStyle="xs">
            {tour.from} - {tour.to}
          </Text>
          <Text fontWeight="light" textStyle="xs">
            {tour.distance!.toPrecision(3)} km | {tour.duration!.toPrecision(3)}{" "}
            h
          </Text>
        </Flex>

        <IconButton height="100px" variant={"ghost"} aria-label="Change Tour">
          <LuEllipsisVertical></LuEllipsisVertical>
        </IconButton>
      </Flex>
    </Box>
  );
}

export default function Tours() {
    const [distance, setDistance] = useState(10)
  const [tour, setTour] = useState<Tour>({
          author: "vukbo",
          from: "Troststraße 10",
          to: "Hütteldorferstraße 56",
          title: "Rundumadum Weg 1A",
          transportType: TransportTypes.Hiking,
          description: "Wunderbar kurze Runde durch Favoriten.",
          distance: 10,
          duration: 2.45,
        });

  const { isPending, data, error } = useQuery({
    queryKey: ["tours"],
    queryFn: () => TourService.get<Tour[]>("/tours").then((res) => res.data),
  });


  // if (query.error) return "Error occured: " + error.message
  if (isPending) return;

  return (
    <Stack direction="row" flexGrow={1} gap={5}>
      <Stack gap="5" minW="md">
        <Heading textAlign={"center"}>Tours</Heading>
        <Separator />
        <ScrollArea.Root size="xs" minHeight={"10lh"}>
          <ScrollArea.Viewport
            css={{
              "--scroll-shadow-size": "4rem",
              maskImage: "linear-gradient(#000, #000)",
              "&[data-overflow-y]": {
                maskImage:
                  "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                "&[data-at-top]": {
                  maskImage:
                    "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                },
                "&[data-at-bottom]": {
                  maskImage:
                    "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                },
              },
            }}
          >
            <ScrollArea.Content pr="3">
              <Stack>
                {/* {data.map((tour) => {
                  return <TourLE tour={tour}></TourLE>;
                })} */}
              </Stack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
        <Button
          onClick={() => {
            navigation.navigate("/tour-management");
          }}
        >
          Create Tour
        </Button>
      </Stack>
      {/* <TourDetails distance={10}
         
      /> */}

      {/* <Map></Map> */}
    </Stack>
  );
}
