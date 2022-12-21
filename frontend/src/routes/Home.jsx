import {
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   Input,
   Select,
   Tag,
   Text,
   VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { getEventsAction } from "../store/event/event.actions";

function Home() {
   const { events } = useSelector((store) => store.event);
   const dispatch = useDispatch();

   const handleFilter = (event) => {
      dispatch(getEventsAction(event.target.value));
   };

   useEffect(() => {
      dispatch(getEventsAction());
   }, []);

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
            All Events
         </Heading>
         <HStack pb={4} w={690}>
            <Input bg={"white"} placeholder="🔍 Search for an event..." />
            <Button w={40} colorScheme={"blue"}>
               Search
            </Button>
            <Select bg={"white"} onChange={handleFilter}>
               <option value="">Filter by Game</option>
               <option value="Football">Football</option>
               <option value="Cricket">Cricket</option>
               <option value="Badminton">Badminton</option>
            </Select>
         </HStack>
         {events.map((event) => (
            <EventCard key={event._id} {...event} />
         ))}
      </VStack>
   );
}

export default Home;
