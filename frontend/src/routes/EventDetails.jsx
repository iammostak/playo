import { ArrowBackIcon } from "@chakra-ui/icons";
import {
   Box,
   Button,
   Heading,
   HStack,
   Tag,
   Text,
   VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getByIdEventAction } from "../store/event/event.actions";

function EventDetails() {
   const { event } = useSelector((store) => store.event);
   const dispatch = useDispatch();
   const { id } = useParams();
   const navigate = useNavigate();

   console.log(event);

   useEffect(() => {
      dispatch(getByIdEventAction(id));
   }, []);

   return (
      event._id && (
         <VStack my={7} justify={"stretch"} spacing={5}>
            <Heading
               pb={4}
               align={"center"}
               color={"blue.500"}
               fontFamily={"Helvetica"}
               fontWeight={800}
               letterSpacing={0.5}
               borderBottom={"1px solid"}
               borderColor={"blackAlpha.100"}
            >
               {event.title}
            </Heading>
            <HStack>
               <Tag size={"md"} bg={"blue.50"} color={"blue.500"}>
                  Organizer - @{event.username}
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
            <Text w={"70%"} align={"center"}>
               {event.description}
            </Text>
            <HStack>
               <Button size={"md"} colorScheme={"blue"} borderRadius={"3xl"}>
                  00 / {event.playerLimit}
               </Button>
               <Button
                  size={"md"}
                  colorScheme={"blue"}
                  borderRadius={"3xl"}
                  onClick={() => {
                     navigate(-1);
                  }}
               >
                  <ArrowBackIcon />
               </Button>
               <Button size="md" colorScheme={"blue"} borderRadius={"3xl"}>
                  Join event
               </Button>
            </HStack>
         </VStack>
      )
   );
}

export default EventDetails;
