import { Heading, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import RequestCard from "../components/RequestCard";

function Requests() {
   const { events } = useSelector((store) => store.event);
   const { user } = useSelector((store) => store.auth);

   return (
      <VStack my={7} justify={"stretch"} spacing={5}>
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
            All Requests
         </Heading>
         {events.map(
            (event) =>
               event.organizer._id == user._id &&
               event.pending.map((player) => (
                  <RequestCard key={player._id} eventId={event._id} userId={player._id} {...event} {...player} />
               ))
         )}
      </VStack>
   );
}

export default Requests;
