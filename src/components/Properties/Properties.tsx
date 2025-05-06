import { useState } from "react";
import {
  Container,
  Heading,
  Spinner,
  Center,
  VStack,
  Select,
  HStack,
  Button,
} from "@chakra-ui/react";
import PropertyList from "./PropertyList";
import { usePropertiesData } from "../../hooks/usePropertiesData";
const Properties: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("Wellington");
  const [selectedSuburb, setSelectedSuburb] = useState<string[]>([]);
  const {
    data,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePropertiesData(selectedCity, selectedSuburb);
  const properties = data?.pages.flatMap((page) => page) || [];
  const wellingtonSuburbs: string[] = [
    "Brooklyn",
    "Kelburn",
    "Highbury",
    "Island Bay",
    "Karori",
    "Kilbirnie",
    "Miramar",
  ];
  return (<Container maxW="1200px" py={6}> <Heading mb={4}>Predicted Properties</Heading> <HStack spacing={4} mb={4}>
        <Select placeholder="Select City" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="Wellington">Wellington</option>
          <option value="Auckland">Auckland</option>
        </Select>
        {selectedCity === "Wellington" && (
          <Select
            placeholder="Select Suburb(s)"
            value={selectedSuburb}
            onChange={(e) => setSelectedSuburb(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {wellingtonSuburbs.map((suburb) => (
              <option key={suburb} value={suburb}>{suburb}</option>
            ))}

          </Select>
        )}

        <Button onClick={() => refetch()} disabled={!selectedCity} colorScheme="blue">
          Query
        </Button>
      </HStack>

      {isLoading ? ( <Center> <Spinner /> </Center> ) : isError ? (
        <Center color="red.500">{(error as Error)?.message}</Center>
      ) : (
 <VStack spacing={4}> <PropertyList properties={properties} /> {isFetchingNextPage && ( <Center><Spinner size="xl"/></Center> )} </VStack> )}
    </Container>
 );
};
export default Properties;