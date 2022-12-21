import {
   Box,
   Button,
   FormControl,
   FormLabel,
   Heading,
   HStack,
   Input,
   Select,
   Textarea,
   useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEventAction } from "../store/event/event.actions";

const initData = {
   title: "",
   description: "",
   startAt: "",
   playersCount: "",
   gameType: "",
};

function CreateEvent() {
   const { user } = useSelector((store) => store.auth);
   const [formData, setFormData] = useState({
      ...initData,
      organizer: user._id,
   });
   const dispatch = useDispatch();
   const toast = useToast();

   const handleFromData = (event) => {
      const { name, value } = event.target;
      setFormData(
         name === "playersCount"
            ? { ...formData, [name]: Number(value) }
            : { ...formData, [name]: value }
      );
   };

   const handleSubmit = () => {
      dispatch(postEventAction(formData)).then((res) => {
         if (res) {
            toast({
               title: res,
               status: "success",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
         } else {
            toast({
               title: "Event posting unsuccessful!",
               status: "error",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
         }
      });
   };

   return (
      <FormControl
         p={7}
         my={14}
         w={600}
         bg={"white"}
         boxShadow={"md"}
         borderRadius={"lg"}
      >
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
            Create Event
         </Heading>
         <HStack>
            <Box w={"full"}>
               <FormLabel>Event Title</FormLabel>
               <Input
                  mb={3}
                  type="text"
                  name={"title"}
                  onChange={handleFromData}
                  placeholder="Give a title to your event"
               />
            </Box>
            <Box w={"full"}>
               <FormLabel>Starting time</FormLabel>
               <Input
                  mb={3}
                  name={"startAt"}
                  onChange={handleFromData}
                  type="datetime-local"
                  placeholder="Select Date and Time"
               />
            </Box>
         </HStack>
         <HStack mb={3}>
            <Box w={"full"}>
               <FormLabel>Players limit</FormLabel>
               <Select name={"playersCount"} onChange={handleFromData}>
                  <option value="">Select limit</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
               </Select>
            </Box>
            <Box w={"full"}>
               <FormLabel>Games</FormLabel>
               <Select name={"gameType"} onChange={handleFromData}>
                  <option value="">Select game</option>
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Badminton">Badminton</option>
               </Select>
            </Box>
         </HStack>
         <FormLabel>Description</FormLabel>
         <Textarea
            mb={3}
            type="text"
            name={"description"}
            onChange={handleFromData}
            placeholder="Add event description"
         />
         <Button
            type="submit"
            w={"full"}
            mt={3}
            colorScheme={"blue"}
            fontFamily={"Helvetica"}
            letterSpacing={0.5}
            onClick={handleSubmit}
            disabled={
               !formData.title ||
               !formData.description ||
               !formData.startAt ||
               !formData.playersCount ||
               !formData.organizer ||
               !formData.gameType
            }
         >
            SUBMIT
         </Button>
      </FormControl>
   );
}

export default CreateEvent;
