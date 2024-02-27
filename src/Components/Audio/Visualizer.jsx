import { Box } from "@chakra-ui/react";
import * as React from "react";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export default function App() {
  const [blob, setBlob] = React.useState();
  const recorder = useAudioRecorder();
  const [AudioArray, setAudioArray] = React.useState([]);

  const handleRecordingComplete = (audio) => {
    setBlob(audio);
    let url = URL.createObjectURL(audio);
    setAudioArray([...AudioArray, url]);
  };

  console.log(AudioArray);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"20px"}
      padding={"10px"}
    >
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        recorderControls={recorder}
        // downloadOnSavePress
        style={{ backgroundColor: "#000" }}
      />

      {recorder.mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={recorder.mediaRecorder}
          width={500}
          height={120}
          barColor="#000"
        />
      )}

      {blob && (
        <AudioVisualizer
          blob={blob}
          width={700}
          height={75}
          barWidth={1}
          gap={0}
          barColor={"#000"}
        />
      )}

      <Box display={"flex"} gap={"20px"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} mt={20}>
        {AudioArray &&
          AudioArray.map((src, index) => <audio key={index} controls={true} src={src}></audio>)}
      </Box>
    </Box>
  );
}
