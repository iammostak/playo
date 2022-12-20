import { Container } from "@chakra-ui/react";
import AllRoutes from "./routes/AllRoutes";

function App() {
   return (
      <Container m={0} p={0} maxW={"container"} minH={"100vh"} centerContent>
         <AllRoutes />
      </Container>
   );
}

export default App;
