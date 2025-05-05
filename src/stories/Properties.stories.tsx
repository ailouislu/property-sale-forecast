import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { Spinner, Center, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { usePropertiesData } from "../hooks/usePropertiesData";
import PropertyList from "../components/Properties/PropertyList";

const meta: Meta<typeof PropertyList> = {
  title: "Property/PropertyList",
  component: PropertyList,
};

export default meta;
type Story = StoryObj<typeof PropertyList>;

export const Default: Story = {
  args: {
    properties: [
      {
        id: "1",
        address: "123 Main St",
        suburb: "Te Aro",
        city: "Wellington",
        predicted_status: "likely",
        confidence_score: 0.92,
        last_sold_price: 980000,
        last_sold_date: "2021-06-01",
        property_history: "Sold 2021; Rented 2022",
        year_built: 2005,
        bedrooms: 3,
        bathrooms: 2,
        car_spaces: 1,
        floor_size: 120,
        land_area: 200,
        capital_value: 1100000,
        land_value: 600000,
        improvement_value: 500000,
        has_rental_history: true,
        is_currently_rented: true,
        predicted_at: "2025-05-01",
      },
    ],
  },
};

export const WithRealData: Story = {
  render: () => {
    const queryClient = new QueryClient();
    return (
      <MemoryRouter initialEntries={["/properties"]}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <RealDataWrapper />
          </ChakraProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  },
};

const RealDataWrapper = () => {
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
