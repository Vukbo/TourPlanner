import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  ScrollArea,
  Separator,
  Spinner,
  Stack,
  Stat,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { LatLngExpression } from "leaflet";
import {
  LuAlignEndHorizontal,
  LuBike,
  LuCircleArrowLeft,
  LuClock,
  LuDollarSign,
  LuDot,
  LuEllipsisVertical,
  LuFootprints,
  LuMountain,
  LuMoveRight,
  LuRoute,
  LuShieldQuestion,
} from "react-icons/lu";
import TourLogTable from "~/components/ui/tour-log-table";
import type { Tour } from "~/models/tour";

export default function TourDetails({distance}:{distance:number}) {

    console.log(distance)
    return <Stack> </Stack>
//   return (
//     <Stack direction="column" gap={9} width={"xl"}>
//       <Stack
//         direction={"row"}
//         justifyContent={"space-between"}
//         alignItems="center"
//       >
//         <Link href="/tours">
//           <IconButton variant="ghost">
//             <LuCircleArrowLeft />
//           </IconButton>
//         </Link>
//         <Icon m="2">{tour.transportType ? <LuMountain /> : <LuBike />}</Icon>
//       </Stack>

//       <Stack direction="column">
//         <Stack direction="row">
//           <Stat.Root borderWidth="1px" p="4" rounded="md">
//             <HStack justify="space-between">
//               <Stat.Label>Distance</Stat.Label>
//               <Icon color="fg.muted">
//                 <LuRoute />
//               </Icon>
//             </HStack>
//             <Stat.ValueText alignItems="baseline">
//               {tour.distance} <Stat.ValueUnit>km</Stat.ValueUnit>
//             </Stat.ValueText>
//           </Stat.Root>

//           <Stat.Root borderWidth="1px" p="4" rounded="md">
//             <HStack justify="space-between">
//               <Stat.Label>Duration</Stat.Label>
//               <Icon color="fg.muted">
//                 <LuClock />
//               </Icon>
//             </HStack>
//             <Stat.ValueText alignItems="baseline">
//               {tour.duration} <Stat.ValueUnit>h</Stat.ValueUnit>
//             </Stat.ValueText>
//           </Stat.Root>
//         </Stack>
//         <Stack direction="row">
//           <Stat.Root borderWidth="1px" p="4" rounded="md">
//             <HStack justify="space-between">
//               <Stat.Label>From</Stat.Label>
//               <Icon color="fg.muted" size="md">
//                 <svg
//                   transform="scale(-1 1)"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="M 3 12 L 15 12" />
//                   <circle cx="18" cy="12" r="3" />
//                 </svg>
//               </Icon>
//             </HStack>
//             <Stat.ValueText textStyle="md" alignItems="baseline">
//               {tour.from}
//             </Stat.ValueText>
//           </Stat.Root>

//           <Stat.Root borderWidth="1px" p="4" rounded="md">
//             <HStack justify="space-between">
//               <Stat.Label>To</Stat.Label>
//               <Icon color="fg.muted" size="md">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="M 3 12 L 15 12" />
//                   <circle cx="18" cy="12" r="3" />
//                 </svg>
//               </Icon>
//             </HStack>
//             <Stat.ValueText textStyle="md" alignItems="baseline">
//               {tour.to}
//             </Stat.ValueText>
//           </Stat.Root>
//         </Stack>
//         {/* <Stack
//           direction="row"
//           justifyContent={"flex-start"}
//           alignItems="center"
//         >
//           <Text color="fg.muted" textStyle="xs">
//             {vm.from}
//           </Text>
//           <Icon mx="5" color="fg.muted">
//             <LuMoveRight />
//           </Icon>
//           <Text color="fg.muted" textStyle="xs">
//             {vm.to}
//           </Text>
//         </Stack> */}
//       </Stack>

// <Container px="3" >

//         <Text  textStyle="sm">{tour.description}</Text>
// </Container>
      

//       <TourLogTable></TourLogTable>
//     </Stack>
//   );
}
