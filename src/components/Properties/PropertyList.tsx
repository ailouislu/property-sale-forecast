import React, { RefObject } from "react";
import {
  Box,
  Text,
  Badge,
  Stack,
  SimpleGrid,
  Link,
  forwardRef,
} from "@chakra-ui/react";
import { Property } from "../properties.type";

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Stack spacing={2}>
        <Link
          href={`https://www.propertyvalue.co.nz/${property.address.replace(/\s+/g, "-")}`}
          isExternal
          fontWeight="bold"
          fontSize="md"
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
        <Text fontSize="sm">
          Last sold: {property.last_sold_date} (${property.last_sold_price})
        </Text>
        <Text fontSize="sm">Price: ${property.price}</Text>
        <Text fontSize="sm">Predicted Price: ${property.predicted_price}</Text>
        <Text fontSize="sm">Category: {property.category}</Text>
        <Text fontSize="sm">
          Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}
        </Text>
      </Stack>
    </Box>
  );
};

const PropertyList = forwardRef<
  { properties: Property[]; lastPropertyElementRef: RefObject<HTMLDivElement> },
  "div"
>(({ properties, lastPropertyElementRef }, ref) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} ref={ref}>
      {properties.map((p, index) => {
        if (index === properties.length - 1) {
          return (
            <Box key={p.id} ref={lastPropertyElementRef}>
              <PropertyCard property={p} />
            </Box>
          );
        }
        return <PropertyCard key={p.id} property={p} />;
      })}
    </SimpleGrid>
  );
});
PropertyList.displayName = "PropertyList";

export default PropertyList;
