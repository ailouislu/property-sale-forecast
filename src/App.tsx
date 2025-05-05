import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Spacer,
  Button,
  Container,
  Link,
  Image,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFound from "./components/NotFound";
import PropertyList from "./components/Properties/PropertyList";
import { usePropertiesData } from "./hooks/usePropertiesData";

const queryClient = new QueryClient();

const CustomNavBar: React.FC = () => {
  const handleLink = () => {
    const windowLink = window.open("about:blank");
    if (windowLink) {
      windowLink.location.href = "https://nzlouis.com";
    }
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="teal.600"
      boxShadow="sm"
    >
      <Container maxW="1250px" display="flex" alignItems="center" py={3}>
        <Link onClick={handleLink} cursor="pointer" mr={8}>
          <Image
            src={require("./images/nzlouis.jpg")}
            alt="NZLouis.com"
            width="100px"
            height="30px"
          />
        </Link>
        <Button
          as={NavLink}
          to="/property"
          variant="ghost"
          color="white"
          fontSize="lg"
          _activeLink={{ bg: "teal.700" }}
          end
        >
          Properties
        </Button>
        <Spacer />
      </Container>
    </Box>
  );
};

const PropertyPageWithRealData: React.FC = () => {
  const { properties, loading, error } = usePropertiesData("Wellington");

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (error) {
    return <Center color="red.500">Error: {error}</Center>;
  }

  return <PropertyList properties={properties} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <CustomNavBar />
        <Box as="main" flex="1" py={6}>
          <Container maxW="1250px">
            <Routes>
              <Route path="/property" element={<PropertyPageWithRealData />} />
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
