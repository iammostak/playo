import { Button, Flex, Heading, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Navbar() {
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
            🅿🅻🅰🆈🅾
         </Heading>
         <HStack spacing={4}>
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
         </HStack>
      </Flex>
   );
}

export default Navbar;
