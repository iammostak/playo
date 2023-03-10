import { AddIcon, AtSignIcon, EmailIcon } from "@chakra-ui/icons";
import {
   border,
   Button,
   Flex,
   Heading,
   HStack,
   useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../store/auth/auth.actions";

function Navbar() {
   const { isAuth } = useSelector((store) => store.auth);
   const dispatch = useDispatch();
   const toast = useToast();

   const handleLogout = () => {
      dispatch(logoutAction());
      toast({
         title: "You logged out from your account",
         status: "warning",
         duration: 3000,
         isClosable: true,
         position: "top",
      });
   };

   return (
      <Flex
         py={4}
         px={10}
         w={"full"}
         bg={"white"}
         boxShadow={"md"}
         align={"center"}
         justify={"space-between"}
         pos={"sticky"}
         top={0}
         zIndex={24}
      >
         <Heading size={"lg"} as={NavLink} to="/">
            πΏπ»π°ππΎ
         </Heading>
         <HStack spacing={4}>
            {!isAuth ? (
               <>
                  <Button as={NavLink} to="/login" px={7} borderRadius={"3xl"}>
                     Login
                  </Button>
                  <Button
                     as={NavLink}
                     to="/signup"
                     px={7}
                     colorScheme={"blue"}
                     borderRadius={"3xl"}
                  >
                     Signup
                  </Button>
               </>
            ) : (
               <>
                  <Button
                     as={NavLink}
                     to="/mylist"
                     variant={"outline"}
                     borderRadius={"3xl"}
                     leftIcon={<AtSignIcon />}
                  >
                     My List
                  </Button>
                  <Button
                     as={NavLink}
                     to="/requests"
                     variant={"outline"}
                     borderRadius={"3xl"}
                     leftIcon={<EmailIcon size={9} />}
                  >
                     Requests
                  </Button>
                  <Button onClick={handleLogout} px={7} borderRadius={"3xl"}>
                     Logout
                  </Button>
                  <Button
                     as={NavLink}
                     to="/create"
                     px={7}
                     colorScheme={"blue"}
                     borderRadius={"3xl"}
                  >
                     Create Event
                  </Button>
               </>
            )}
         </HStack>
      </Flex>
   );
}

export default Navbar;
