import { Box, Tooltip } from "@chakra-ui/react";
import * as React from "react";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export default function App() {
  const [blob, setBlob] = React.useState();
  const recorder = useAudioRecorder();
  const [AudioArray, setAudioArray] = React.useState([]);
  const [pitchVal, setPitchVal] = React.useState(0);
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const playAudioWithPitch = async (blob) => {
    const audioContext = new AudioContext();
    const source = audioContext.createBufferSource();
    // console.log(source, blob, await blob.arrayBuffer());
    let Arrbuffer = await blob.arrayBuffer();

    if (Arrbuffer) {
      audioContext.decodeAudioData(Arrbuffer, (buffer) => {
        source.buffer = buffer;
        source.playbackRate.value = playbackRate; // Use the state to control playback rate
        source.connect(audioContext.destination);
        // console.log("buffer", source.buffer);
        source.start(0);
      });
    }
  };

  // Example usage: playAudioWithPitch(blob);

  const handleRecordingComplete = (audio) => {
    setBlob(audio);
    let url = URL.createObjectURL(audio);
    let object = { url: url, blob: audio };
    setAudioArray([...AudioArray, object]);
  };

  const handleSlideChange = (e) => {
    setPitchVal(e.target.value);
    setPlaybackRate(e.target.value);
  };

  // console.log(AudioArray, blob);

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

      <input
        className="slider"
        type="range"
        id="vol"
        name="vol"
        min="0"
        max="3"
        step={0.1}
        value={pitchVal}
        width={"200px !important"}
        onChange={(e) => handleSlideChange(e)}
      />

      {recorder.mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={recorder.mediaRecorder}
          width={300}
          height={60}
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
              {/* <audio
                onPlay={() => playAudioWithPitch(item?.blob)}
                controls={true}
                src={item?.url}
              ></audio> */}
              <Tooltip variant={"secondary"} label="Play">
                <Box
                  cursor={"pointer"}
                  mt={"10px"}
                  onClick={() => playAudioWithPitch(item?.blob)}
                  height={"20px"}
                  width={"20px"}
                  bgColor={"red"}
                  borderRadius={"50%"}
                />
              </Tooltip>
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
