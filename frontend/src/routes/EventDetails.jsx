import { ArrowBackIcon } from "@chakra-ui/icons";
import {
   Box,
   Button,
   Heading,
   HStack,
   Tag,
   Text,
   useToast,
   VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useDateTime from "../hooks/useDateTime";
import {
   getByIdEventAction,
   joinEventAction,
} from "../store/event/event.actions";

function EventDetails() {
   const { event } = useSelector((store) => store.event);
   const { user } = useSelector((store) => store.auth);
   const dispatch = useDispatch();
   const { id } = useParams();
   const navigate = useNavigate();
   const toast = useToast();
   const { time } = useDateTime();

   const handleIsPresent = () => {
      let data = event.accepted.filter((item) => item._id === user._id);
      if (data.length) return true;
      return false;
   };

   const handleIsPending = () => {
      let data = event.pending.filter((item) => item._id === user._id);
      if (data.length) return true;
      return false;
   };

   const handleJoin = () => {
      dispatch(joinEventAction({ eventId: event._id, userId: user._id })).then(
         (res) => {
            if (res) {
               toast({
                  title: "Joining request sent",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: "top",
               });
               dispatch(getByIdEventAction(id));
            } else {
               toast({
                  title: "Something went wrong, please try again",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "top",
               });
            }
         }
      );
   };

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
            <Text w={"70%"} align={"center"}>
               {event.description}
            </Text>
            {(handleIsPresent() || event.organizer._id === user._id) && (
               <>
                  <Heading
                     pb={4}
                     size={"sm"}
                     align={"center"}
                     color={"blue.500"}
                     fontFamily={"Helvetica"}
                     fontWeight={800}
                     letterSpacing={0.5}
                     borderBottom={"1px solid"}
                     borderColor={"blackAlpha.100"}
                  >
                     All Participants
                  </Heading>
                  <HStack w={"50%"} align={"center"} justify={"center"}>
                     {event.accepted.map((item, index) => (
                        <Tag
                           size={"md"}
                           bg={index % 2 === 0 ? "blue.50" : "orange.50"}
                           color={index % 2 === 0 ? "blue.500" : "orange.500"}
                        >
                           @{item.username}
                        </Tag>
                     ))}
                  </HStack>
               </>
            )}
            <HStack>
               <Button size={"md"} colorScheme={"blue"} borderRadius={"3xl"}>
                  {event.accepted.length < 10
                     ? "0" + event.accepted.length
                     : event.accepted.length}{" "}
                  / {event.playerLimit}
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
               <Button
                  w={110}
                  colorScheme={"blue"}
                  borderRadius={"3xl"}
                  disabled={
                     event.organizer._id === user._id ||
                     handleIsPresent() ||
                     event.accepted.length === event.playerLimit ||
                     handleIsPending() ||
                     time >= event.startAt
                  }
                  onClick={handleJoin}
               >
                  {time >= event.startAt
                     ? "Started"
                     : handleIsPending()
                     ? "Pending"
                     : handleIsPresent()
                     ? "Joined"
                     : event.organizer._id === user._id
                     ? "Organizer"
                     : event.accepted.length === event.playerLimit
                     ? "Event full"
                     : "Join event"}
               </Button>
            </HStack>
         </VStack>
      )
   );
}

export default EventDetails;
