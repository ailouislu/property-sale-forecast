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
import formatNumberWithCommas from "../../utils/formatNumber";

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
          Last sold: {property.last_sold_date} ($
          {formatNumberWithCommas(property.last_sold_price)})
        </Text>
        <Text fontSize="sm">Built: {property.year_built}</Text>
        <Text fontSize="sm">
          Floor: {property.floor_size}, Land Area: {property.land_area}
        </Text>
        <Text fontSize="sm">
          Capital Value: ${formatNumberWithCommas(property.capital_value)}
        </Text>
        <Text fontSize="sm">
          Has Rental History: {property.has_rental_history ? "Yes" : "No"}, Is
          Rented: {property.is_currently_rented ? "Yes" : "No"}
        </Text>
        <Text fontSize="sm">
          Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}, Car
          Spaces: {property.car_spaces}
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
