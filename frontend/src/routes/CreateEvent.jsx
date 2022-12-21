import {
   Button,
   FormControl,
   FormLabel,
   Heading,
   Input,
   InputGroup,
   InputRightElement,
   Select,
   Textarea,
   useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const initData = {
   title: "",
   description: "",
   startAt: "",
   playersCount: 0,
};

function CreateEvent() {
   const [formData, setFormData] = useState(initData);

   const handleFromData = (event) => {
      const { name, value } = event.target;
      setFormData(
         name === "playersCount"
            ? { ...formData, [name]: Number(value) }
            : { ...formData, [name]: value }
      );
   };

   const handleSubmit = () => {};

   return (
      <FormControl
         p={7}
         my={14}
         w={360}
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
         <FormLabel>Event Title</FormLabel>
         <Input
            mb={3}
            type="text"
            name={"title"}
            onChange={handleFromData}
            placeholder="Give a title to your event"
         />
         <FormLabel>Description</FormLabel>
         <Textarea
            mb={3}
            type="text"
            name={"title"}
            onChange={handleFromData}
            placeholder="Add event description"
         />
         <FormLabel>Starting time</FormLabel>
         <Input
            mb={3}
            name={"startAt"}
            onChange={handleFromData}
            type="datetime-local"
            placeholder="Select Date and Time"
         />
         <FormLabel>Players limit</FormLabel>
         <Select mb={3} name={"playersCount"} onChange={handleFromData}>
            <option value="">Select limit</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
         </Select>
         <Button
            type="submit"
            w={"full"}
            mt={3}
            colorScheme={"blue"}
            fontFamily={"Helvetica"}
            letterSpacing={0.5}
            onClick={handleSubmit}
            // disabled={!formData.username || !formData.password}
         >
            SUBMIT
         </Button>
      </FormControl>
   );
}

export default CreateEvent;
