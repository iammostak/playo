import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
   Button,
   Flex,
   Heading,
   HStack,
   Tag,
   useToast,
   VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
   acceptEventAction,
   rejectEventAction,
} from "../store/event/event.actions";

function RequestCard(props) {
   const dispatch = useDispatch();
   const toast = useToast();

   const handleAccept = () => {
      dispatch(
         acceptEventAction({ eventId: props.eventId, userId: props.userId })
      ).then((res) => {
         if (res) {
            toast({
               title: "Joining request accepted!",
               status: "success",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
         } else {
            toast({
               title: "Something went wrong, please try again",
               status: "error",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
         }
      });
   };

   const handleReject = () => {
      dispatch(
         rejectEventAction({ eventId: props.eventId, userId: props.userId })
      ).then((res) => {
         if (res) {
            toast({
               title: "Joining request rejected!",
               status: "warning",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
         } else {
            toast({
               title: "Something went wrong, please try again",
               status: "error",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
         }
      });
   };

   return (
      <HStack
         px={7}
         h={100}
         w={760}
         boxShadow={"md"}
         borderRadius={"md"}
         bg={"white"}
         justify={"space-between"}
         cursor={"pointer"}
      >
         <HStack spacing={4}>
            <Flex
               h={50}
               w={50}
               align={"center"}
               justify={"center"}
               fontSize={"4xl"}
               borderRadius={"50%"}
               bg={"whitesmoke"}
            >
               🧑🏽‍💻
            </Flex>
            <VStack w={500} align={"left"} spacing={3}>
               <VStack w={"full"} align={"left"} spacing={1}>
                  <Heading
                     size={"md"}
                     fontFamily={"Helvetica"}
                     fontWeight={800}
                     color={"blackAlpha.800"}
                  >
                     @{props.username}
                  </Heading>
                  <HStack>
                     <Tag size={"md"} bg={"blue.50"} color={"blue.500"}>
                        {props.title}
                     </Tag>
                     <Tag size={"md"} bg={"green.50"} color={"green.500"}>
                        {props.startAt.split("T")[0]}
                     </Tag>
                     <Tag size={"md"} bg={"pink.50"} color={"pink.500"}>
                        {props.startAt.split("T")[1]}
                     </Tag>
                     <Tag size={"md"} bg={"orange.50"} color={"orange.500"}>
                        {props.gameType}
                     </Tag>
                  </HStack>
               </VStack>
            </VStack>
         </HStack>
         <HStack align={"left"} spacing={4}>
            <Button
               h={50}
               w={50}
               variant={"outline"}
               colorScheme={"red"}
               borderRadius={"50%"}
               onClick={handleReject}
            >
               <CloseIcon />
            </Button>
            <Button
               h={50}
               w={50}
               variant={"outline"}
               colorScheme={"green"}
               borderRadius={"50%"}
               disabled={props.accepted.length === props.playerLimit}
               onClick={handleAccept}
            >
               <CheckIcon />
            </Button>
         </HStack>
      </HStack>
   );
}

export default RequestCard;
