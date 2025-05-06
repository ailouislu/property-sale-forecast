import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Properties from "../components/Properties/Properties";

const meta: Meta<typeof Properties> = {
  title: "Property/Properties",
  component: Properties,
};

export default meta;
export const Default: StoryObj<typeof Properties> = {
  render: () => <Properties />,
};
type Story = StoryObj<typeof Properties>;

export const WithRealData: Story = {
  render: () => {
    const queryClient = new QueryClient();
    return (
      <MemoryRouter initialEntries={["/properties"]}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Properties />
          </ChakraProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  },
};
