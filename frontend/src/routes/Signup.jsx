import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
   Button,
   FormControl,
   FormLabel,
   Heading,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

function Signup() {
   const [show, setShow] = useState(false);

   return (
      <FormControl
         p={7}
         mt={14}
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
            Signup form
         </Heading>
         <FormLabel>username</FormLabel>
         <Input mb={3} type="text" placeholder="Give a unique username" />
         <FormLabel>E-mail</FormLabel>
         <Input mb={3} type="email" placeholder="Enter your email address" />
         <FormLabel>Password</FormLabel>
         <InputGroup>
            <Input
               mb={3}
               type={show ? "text" : "password"}
               placeholder="Set your password"
            />
            <InputRightElement>
               {show ? (
                  <ViewOffIcon
                     onClick={() => setShow(!show)}
                     cursor={"pointer"}
                  />
               ) : (
                  <ViewIcon onClick={() => setShow(!show)} cursor={"pointer"} />
               )}
            </InputRightElement>
         </InputGroup>
         <Button
            type="submit"
            w={"full"}
            mt={3}
            colorScheme={"blue"}
            fontFamily={"Helvetica"}
            letterSpacing={0.5}
         >
            SUBMIT
         </Button>
      </FormControl>
   );
}

export default Signup;
