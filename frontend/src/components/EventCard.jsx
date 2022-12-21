import {
   Button,
   Flex,
   Heading,
   HStack,
   Tag,
   Text,
   VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EventCard(event) {
   return (
      <HStack
         px={7}
         h={134}
         w={760}
         boxShadow={"md"}
         borderRadius={"md"}
         bg={"white"}
         justify={"space-between"}
         cursor={"pointer"}
         as={Link}
         to={`/event/${event._id}`}
      >
         <HStack spacing={4}>
            <Flex
               h={70}
               w={70}
               align={"center"}
               justify={"center"}
               fontSize={"4xl"}
               borderRadius={"50%"}
               bg={"whitesmoke"}
            >
               🤾🏽‍♂️
            </Flex>
            <VStack w={440} align={"left"} spacing={3}>
               <VStack w={"full"} align={"left"} spacing={1}>
                  <Heading
                     size={"md"}
                     fontFamily={"Helvetica"}
                     fontWeight={800}
                     color={"blackAlpha.800"}
                  >
                     {event.title}
                  </Heading>
                  <Text
                     fontFamily={"Helvetica"}
                     fontSize={"sm"}
                     noOfLines={2}
                     color={"blackAlpha.600"}
                     textTransform={"capitalize"}
                  >
                     {event.description}
                  </Text>
               </VStack>
               <HStack>
                  <Tag size={"md"} bg={"blue.50"} color={"blue.500"}>
                     Organizer - @{event.organizer.username}
                  </Tag>
                  <Tag size={"md"} bg={"green.50"} color={"green.500"}>
                     {event.startAt.split("T")[0]}
                  </Tag>
                  <Tag size={"md"} bg={"pink.50"} color={"pink.500"}>
                     {event.startAt.split("T")[1]}
                  </Tag>
                  <Tag size={"md"} bg={"orange.50"} color={"orange.500"}>
                     {event.gameType}
                  </Tag>
               </HStack>
            </VStack>
         </HStack>
         <VStack>
            <Tag size={"md"} bg={"green.50"} color={"green.500"}>
               00 / {event.playerLimit}
            </Tag>
            <Button size="md" colorScheme={"blue"} borderRadius={"3xl"}>
               Join event
            </Button>
         </VStack>
      </HStack>
   );
}

export default EventCard;
