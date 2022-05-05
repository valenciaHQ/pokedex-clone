import { Container } from "@chakra-ui/react";
import React, { FC } from "react";

const CenteredWrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container
    maxW="container.md"
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    backgroundColor="red.100"
    flexFlow="column"
  >
    {children}
  </Container>
);

export default CenteredWrapper;
