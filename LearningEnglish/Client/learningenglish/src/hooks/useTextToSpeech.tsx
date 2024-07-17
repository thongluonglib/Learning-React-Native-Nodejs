import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { BsVolumeUp } from "react-icons/bs";

const useTextToSpeech = () => {
  const [isPaused, setIsPaused] = useState<any>(false);
  const [voice, setVoice] = useState<any>(null);

  const handlePlay = useCallback((text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    if (isPaused) {
      synth.resume();
    }
    utterance.lang = 'en-US';
    if (voice) {
      utterance.voice = voice;
    }
    synth.speak(utterance);

    setIsPaused(false);
  }, [voice]);

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange = (event: any) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };
  
  const VoiceSelect = useCallback(() => {
    return (
      <label>
        Voice:
        <select value={voice?.name} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>
    )
  }, [voice])

  const VoicePlay = useCallback(({ text, style }: any) => {
    if (!text) return null
    return (
      <div>
        <Button style={style} onClick={() => handlePlay(text)}>
          <BsVolumeUp size={36} />
        </Button>
        <br /><br />
      </div>
    )
  }, [voice])

  return {
    handlePlay,
    handlePause,
    handleStop,
    VoiceSelect,
    VoicePlay
  };
};

export default useTextToSpeech;