// import React from 'react'

import { Box } from "@chakra-ui/react";

function Home() {
  return (
    <Box mt={50} borderRadius={"50%"} width={"180px"} height={"180px"} overflow={"hidden"}>
      <img
        width={"100%"}
        height={"100%"}
        src={
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </Box>
  );
}

export default Home;
