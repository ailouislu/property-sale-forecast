import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Link, Image, Container, Spacer, Button } from "@chakra-ui/react";

const NavBar: React.FC = () => {
  const handleLink = () => {
    const windowLink = window.open("about:blank");
    if (windowLink) {
      windowLink.location.href = "https://nzlouis.com";
    }
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="teal.600"
      boxShadow="sm"
    >
      <Container maxW="1250px" display="flex" alignItems="center" py={3}>
        <Link onClick={handleLink} cursor="pointer" mr={8}>
          <Image
            src={require("../images/nzlouis.jpg")}
            alt="NZLouis.com"
            width="100px"
            height="30px"
          />
        </Link>
        <Button
          as={NavLink}
          to="/property"
          variant="ghost"
          color="white"
          fontSize="lg"
          _activeLink={{ bg: "teal.700" }}
          end
        >
          Properties
        </Button>
        <Spacer />
      </Container>
    </Box>
  );
};

export default NavBar;
