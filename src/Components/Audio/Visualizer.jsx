import { Box } from "@chakra-ui/react";
import * as React from "react";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import * as Tone from "tone";

export default function App() {
  const [blob, setBlob] = React.useState();
  const recorder = useAudioRecorder();
  const [AudioArray, setAudioArray] = React.useState([]);

  const handleRecordingComplete = (audio) => {
    setBlob(audio);
    let url = URL.createObjectURL(audio);
    let object = { url: url, blob: audio };
    setAudioArray([...AudioArray, object]);
  };

  console.log(AudioArray, blob);

  React.useEffect(() => {
    const startAudio = async () => {

      await Tone.start();
      console.log("Audio is ready");

      const mic = new Tone.UserMedia().toDestination();

      const pitchShift = new Tone.PitchShift({
        pitch: 1,
      }).toDestination();

      mic.connect(pitchShift);

      try {
        await mic.open();
        console.log("Microphone is open");
      } catch (e) {
        console.error("Microphone not available: ", e);
      }
    };

    startAudio();
  }, []);

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
          width={300}
          height={60}
          barColor="#000"
        />
      )}

      {/* {blob && (
        <AudioVisualizer
          blob={blob}
          width={700}
          height={75}
          barWidth={1}
          gap={0}
          barColor={"#000"}
        />
      )} */}

      <Box
        display={"flex"}
        gap={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        mt={20}
      >
        {AudioArray &&
          AudioArray.map((item, index) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              border={"1px solid #d5d5d5"}
              key={index}
              borderRadius={"30px"}
              gap={"20px"}
            >
              <audio controls={true} src={item?.url}></audio>
              <AudioVisualizer
                blob={item?.blob}
                width={300}
                height={75}
                barWidth={1}
                gap={0}
                barColor={"#000"}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
