import React, { useState } from "react";
import { Container, Input, Heading, Spinner, Center } from "@chakra-ui/react";
import PropertyList from "./PropertyList";
import { usePropertiesData } from "../../hooks/usePropertiesData";

const Properties: React.FC = () => {
  const [city, setCity] = useState("Wellington");
  const { properties, loading, error } = usePropertiesData(city);

  return (
    <Container maxW="1200px" py={6}>
      <Heading mb={4}>Predicted Properties in {city}</Heading>
      <Input
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        mb={6}
      />
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : error ? (
        <Center color="red.500">{error}</Center>
      ) : (
        <PropertyList properties={properties} />
      )}
    </Container>
  );
};

export default Properties;
