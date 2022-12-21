import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
   Button,
   FormControl,
   FormLabel,
   Heading,
   Input,
   InputGroup,
   InputRightElement,
   useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupAction } from "../store/auth/auth.actions";

const initData = { username: "", email: "", password: "" };

function Signup() {
   const [show, setShow] = useState(false);
   const [formData, setFormData] = useState(initData);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const toast = useToast();
   const { loading } = useSelector((store) => store.auth);

   const handleFromData = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = () => {
      dispatch(signupAction(formData)).then((res) => {
         if (res) {
            toast({
               title: res,
               status: "success",
               duration: 3000,
               isClosable: true,
               position: "top",
            });
            navigate("/login");
         } else {
            toast({
               title: "Registration failed, please try again",
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
         <Input
            mb={3}
            type="text"
            name={"username"}
            onChange={handleFromData}
            placeholder="Give a unique username"
         />
         <FormLabel>E-mail</FormLabel>
         <Input
            mb={3}
            type="email"
            name={"email"}
            onChange={handleFromData}
            placeholder="Enter your email address"
         />
         <FormLabel>Password</FormLabel>
         <InputGroup>
            <Input
               mb={3}
               type={show ? "text" : "password"}
               name={"password"}
               onChange={handleFromData}
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
            mt={3}
            w={"full"}
            type="submit"
            isLoading={loading}
            colorScheme={"blue"}
            fontFamily={"Helvetica"}
            letterSpacing={0.5}
            onClick={handleSubmit}
            disabled={
               !formData.username || !formData.email || !formData.password
            }
         >
            SUBMIT
         </Button>
      </FormControl>
   );
}

export default Signup;
