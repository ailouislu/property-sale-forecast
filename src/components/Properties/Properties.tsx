import React from "react";
import { Container, Heading, Spinner, Center } from "@chakra-ui/react";
import PropertyList from "./PropertyList";
import { usePropertiesData } from "../../hooks/usePropertiesData";

const Properties: React.FC = () => {
  const { properties, loading, error } = usePropertiesData("Wellington");

  return (
    <Container maxW="1200px" py={6}>
      <Heading mb={4}>Predicted Properties</Heading>
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
