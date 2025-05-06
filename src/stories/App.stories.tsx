import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Center, Spinner, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { usePropertiesData } from "../hooks/usePropertiesData";
import Properties from "../components/Properties/Properties";
import App from "../App";

const queryClient = new QueryClient();

export default {
  title: "Project/FullApp",
  component: App,
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
  const { isLoading, error } = usePropertiesData("Wellington");

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="lg" />
      </Center>
    );
  }
  if (error) {
    return (
      <Center color="red.500">
        <Text>Error: {error?.message}</Text>
      </Center>
    );
  }
  return <Properties />;
};
