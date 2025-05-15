import { useState, useEffect, useRef } from "react";
import {
  Container,
  Heading,
  Spinner,
  Center,
  Skeleton,
  SimpleGrid,
  VStack,
  Select,
  HStack,
} from "@chakra-ui/react";
import PropertyList from "./PropertyList";
import { usePropertiesData } from "../../hooks/usePropertiesData";
const Properties: React.FC = () => {
  const lastPropertyElementRef = useRef<HTMLDivElement | null>(null);
  const [selectedCity, setSelectedCity] = useState("Wellington");
  const [selectedSuburb, setSelectedSuburb] = useState<string>("");
  const {
    data,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = usePropertiesData(selectedCity, [selectedSuburb]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    const currentElement = lastPropertyElementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, selectedSuburb]);

  const properties = data?.pages.flatMap((page) => page) || [];
  const wellingtonSuburbs: string[] = [
    "Khandallah",
    "Ngaio",
    "Tawa",
    "Newlands",
    "Woodridge",
    "Johnsonville",
    "Churton Park",
    "Kaiwharawhara",
    "Karori",
  ];
  return (
    <Container maxW="1200px" py={6}>
      {" "}
      <Heading mb={4}>Predicted Properties</Heading>{" "}
      <HStack spacing={4} mb={4}>
        <Select
          placeholder="Select City"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedSuburb("");
          }}
        >
          <option value="Wellington">Wellington</option>
          <option value="Auckland">Auckland</option>
        </Select>
        {selectedCity === "Wellington" && (
          <Select
            placeholder="Select Suburb"
            value={selectedSuburb}
            onChange={(e) => setSelectedSuburb(e.target.value)}
          >
            {wellingtonSuburbs.map((suburb) => (
              <option key={suburb} value={suburb}>
                {suburb}
              </option>
            ))}
          </Select>
        )}
      </HStack>{" "}
      {isLoading && !isFetchingNextPage ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height="200px" />
          ))}
        </SimpleGrid>
      ) : isError ? (
        <Center color="red.500">{(error as Error)?.message}</Center>
      ) : (
        <VStack spacing={4}>
          {" "}
          <PropertyList
            properties={properties}
            lastPropertyElementRef={lastPropertyElementRef}
          />
          {isFetchingNextPage && (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
        </VStack>
      )}
    </Container>
  );
};
export default Properties;
