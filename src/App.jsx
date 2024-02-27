import { useState } from "react";
import "./App.css";
import { Box, Text } from "@chakra-ui/react";
import Home from "./Components/Home/Home";
import Visualizer from "./Components/Audio/Visualizer";

function App() {
  return (
    <>
      {/* App */}
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        width={"100vw"}
        minHeight={"100vh"}
      >
        {/* Navbar */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgColor={"#265073"}
          width={"100%"}
        >
          <Box
            maxWidth={"1400px"}
            width={"100%"}
            bgColor={"primary"}
            padding={"10px 80px"}
            height={"50px"}
          >
            <Text fontSize={"18px"} color={"#fff"}>
              Audio 🔊
            </Text>
          </Box>
        </Box>
        <Home />
        <Visualizer/>
      </Box>
    </>
  );
}

export default App;
