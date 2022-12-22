import { Heading, StackDivider, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";

function MyList() {
   const { events } = useSelector((store) => store.event);
   const { user } = useSelector((store) => store.auth);

   return (
      <VStack
         my={7}
         divider={<StackDivider borderColor="blackAlpha.100" />}
         justify={"stretch"}
         spacing={5}
      >
         <VStack justify={"stretch"} spacing={5}>
            <Heading
               mb={3}
               pb={4}
               align={"center"}
               color={"blue.500"}
               fontFamily={"Helvetica"}
               fontWeight={800}
               letterSpacing={0.5}
               borderBottom={"1px solid"}
               borderColor={"blackAlpha.100"}
            >
               Accepted
            </Heading>
            {events.map((event) =>
               event.accepted.map(
                  (player) =>
                     player._id == user._id && (
                        <EventCard key={event._id} {...event} />
                     )
               )
            )}
         </VStack>
         <VStack justify={"stretch"} spacing={5}>
            <Heading
               mb={3}
               pb={4}
               align={"center"}
               color={"blue.500"}
               fontFamily={"Helvetica"}
               fontWeight={800}
               letterSpacing={0.5}
               borderBottom={"1px solid"}
               borderColor={"blackAlpha.100"}
            >
               Requested for
            </Heading>
            {events.map((event) =>
               event.pending.map(
                  (player) =>
                     player._id == user._id && (
                        <EventCard key={event._id} {...event} />
                     )
               )
            )}
         </VStack>
      </VStack>
   );
}

export default MyList;
