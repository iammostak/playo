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
   playerLimit: "",
   gameType: "",
};

function CreateEvent() {
   const { user } = useSelector((store) => store.auth);
   const { loading } = useSelector((store) => store.event);
   const [formData, setFormData] = useState({
      ...initData,
      organizer: user._id,
   });
   const dispatch = useDispatch();
   const toast = useToast();

   const handleFromData = (event) => {
      const { name, value } = event.target;
      setFormData(
         name === "playerLimit"
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
            setFormData({
               ...initData,
               organizer: user._id,
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
                  value={formData.title}
                  onChange={handleFromData}
                  placeholder="Give a title to your event"
               />
            </Box>
            <Box w={"full"}>
               <FormLabel>Starting time</FormLabel>
               <Input
                  mb={3}
                  name={"startAt"}
                  value={formData.startAt}
                  onChange={handleFromData}
                  type="datetime-local"
                  placeholder="Select Date and Time"
               />
            </Box>
         </HStack>
         <HStack mb={3}>
            <Box w={"full"}>
               <FormLabel>Player limit</FormLabel>
               <Select
                  name={"playerLimit"}
                  value={formData.playerLimit}
                  onChange={handleFromData}
               >
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
               <Select
                  name={"gameType"}
                  value={formData.gameType}
                  onChange={handleFromData}
               >
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
            value={formData.description}
            onChange={handleFromData}
            placeholder="Add event description"
         />
         <Button
            mt={3}
            w={"full"}
            type="submit"
            isLoading={loading}
            colorScheme={"blue"}
            fontFamily={"Helvetica"}
            letterSpacing={0.5}
            onClick={handleSubmit}
            disabled={
               !formData.title ||
               !formData.description ||
               !formData.startAt ||
               !formData.playerLimit ||
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
