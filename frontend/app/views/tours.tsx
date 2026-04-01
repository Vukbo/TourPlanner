import { Box, Button, Center, Flex, Group, Heading, Icon, IconButton, Menu, ScrollArea, Separator, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { LatLngExpression } from "leaflet";
import { LuBike, LuEllipsisVertical, LuFootprints, LuMountain, LuShieldQuestion } from "react-icons/lu";
import { TransportTypes, type Tour } from "~/models/tour";
import { RouteService, TourService } from "~/queries/rest";



export function TourListEntry({tour}:{tour:Tour}) {
    
    let icon = <LuShieldQuestion />
    // if (tour.transportType == TransportTypes.Walking) icon = <LuFootprints />
    if (tour.transportType == TransportTypes.Hiking) icon = <LuMountain />
    if (tour.transportType == TransportTypes.Biking) icon = <LuBike /> 


    return (
        <Box borderWidth="1px" borderColor="border.disabled" borderRadius="sm" color="fg.disabled" >
            <Flex alignItems={"center"} minHeight={"100px"} >
                <Center width="75px">
                    <Icon size={"2xl"}>
                        {icon}
                    </Icon>
                </Center>
                <Separator  height="100px" orientation="vertical" />
                <Flex margin="5" flexGrow="1" direction={"column"}>
                    <Heading size="sm" >{tour.title}</Heading>
                    <Text  fontWeight="light" textStyle="xs">{tour.from} - {tour.to}</Text>
                    <Text fontWeight="light" textStyle="xs">{tour.distance!.toPrecision(3)} km | {tour.duration!.toPrecision(3)} h</Text>
                </Flex>

                <IconButton height="100px" variant={"ghost"} aria-label="Change Tour">
                    <LuEllipsisVertical></LuEllipsisVertical>
                </IconButton>
            </Flex>
        </Box>
    )
}

export default function Tours() {
    const {isPending, error, data} = useQuery({
        queryKey: ['tours'],
        queryFn: () =>
            TourService.get<Tour[]>("/tours").then(res => res.data)
    })

    if (isPending ) return "loading..."
    if (error) return "Error occured: " + error.message


    return (
        <Flex p="5" height="100vh" alignItems="center">
            <Box maxWidth={"md"} borderWidth="1px" borderColor="border.disabled" borderRadius="sm" color="fg.disabled">
                <Flex direction={"column"} gap={"2.5"}>
                    <Flex direction={"column"} p="2.5">
                    <Heading textAlign={"center"}>Tours</Heading>

                    <ScrollArea.Root size="xs" minHeight={"md"} maxHeight={"md"}>
                        <ScrollArea.Viewport css={{
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
                        }}>
                            <ScrollArea.Content  py="5">
                                <Flex direction="column" gap="2">
                                    {
                                        data.map((tour) => { return <TourListEntry  tour={tour}></TourListEntry>})
                                    }
                                </Flex>
    
                            </ScrollArea.Content>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar >
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner />
                    </ScrollArea.Root>
                    </Flex>
                    <Button> Create New Tour</Button>
                </Flex>
            </Box>
        </Flex>
        );
}