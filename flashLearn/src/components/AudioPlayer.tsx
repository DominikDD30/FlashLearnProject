import axios from 'axios';
import { useState, useEffect, useRef } from 'react';


interface Props {
  run: boolean;
  newConcept: string;
}

const AudioPlayer = ({ run,newConcept }: Props) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [concept, setConcept] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (newConcept) {
      setConcept(newConcept);
     setAudioUrl(null);
    }
  }, [newConcept]);

  
  useEffect(() => {
    if (run && !audioUrl) {
      fetchAudio();
    }
    else if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play(); 
    }
  }, [run, audioUrl]);

  const fetchAudio = () => {
    axios.get('http://localhost:8190/flash-learn/flashcards/sound/'+concept)
      .then(response => {
        console.log('audio fetched:', response);
        const audioData = response.data;
        const audioUrl = `data:audio/mpeg;base64,${audioData}`;
        setAudioUrl(audioUrl);
      })
      .catch(error => {
        console.error('error while fetching audio:', error);
      });
  };

  return (
    <div>
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
};


export default AudioPlayer;

