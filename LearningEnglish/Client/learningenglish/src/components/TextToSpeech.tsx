import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const TextToSpeech = ({ text }: any) => {
  const [isPaused, setIsPaused] = useState<any>(false);
  const [utterance, setUtterance] = useState<any>(null);
  // useImperativeHandle(ref, () => {
  //   return {
  //     handlePlay
  //   }
  // })
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  // const handlePause = () => {
  //   const synth = window.speechSynthesis;

  //   synth.pause();

  //   setIsPaused(true);
  // };

  // const handleStop = () => {
  //   const synth = window.speechSynthesis;

  //   synth.cancel();

  //   setIsPaused(false);
  // };
  if(!text) return  null
  return (
    <div>
      {/* <Button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button> */}
      <Button colorScheme='green' onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
      <br />
      <br />
      {/* <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button> */}
    </div>
  );
};

export default TextToSpeech;