import React from "react";
import { Box, Text, Badge, Stack, SimpleGrid, Link } from "@chakra-ui/react";
import { Property } from "../properties.type";

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Stack spacing={2}>
        <Link
          href={`https://www.propertyvalue.co.nz/${property.address.replace(/\s+/g, "-")}`}
          isExternal
          fontWeight="bold"
        >
          {property.address}
        </Link>
        <Text fontSize="sm">
          {property.suburb}, {property.city}
        </Text>
        <Badge
          colorScheme={
            property.predicted_status === "likely" ? "green" : "gray"
          }
        >
          {property.predicted_status} ({property.confidence_score})
        </Badge>
        <Text fontSize="xs">
          Last sold: {property.last_sold_date} (${property.last_sold_price})
        </Text>
        <Text fontSize="xs">
          Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}
        </Text>
      </Stack>
    </Box>
  );
};

const PropertyList: React.FC<{ properties: Property[] }> = ({ properties }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
    {properties.map((p) => (
      <PropertyCard key={p.id} property={p} />
    ))}
  </SimpleGrid>
);

export default PropertyList;
