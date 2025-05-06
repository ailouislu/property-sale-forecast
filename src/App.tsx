import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFound from "./components/NotFound";
import Properties from "./components/Properties/Properties";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <NavBar />
        <Box as="main" flex="1" py={6}>
          <Container maxW="1250px">
            <Routes>
              <Route path="/property" element={<Properties />} />
              <Route path="/" element={<Navigate replace to="/property" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
