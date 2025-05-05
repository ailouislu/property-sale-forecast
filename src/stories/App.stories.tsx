import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Center, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import PropertyList from "../components/Properties/PropertyList";
import { usePropertiesData } from "../hooks/usePropertiesData";

const queryClient = new QueryClient();

export default {
  title: "Project/FullApp",
  component: PropertyList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/properties"]}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Routes>
              <Route path="/properties" element={<Story />} />
            </Routes>
          </ChakraProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

export const WithRealData: StoryFn = () => {
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
