import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";
import { useCallback, useEffect, useState } from "react";

interface IState {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
  isRecording: boolean;
}

export const useVoiceRecognition = () => {
  const [state, setState] = useState<IState>({
    recognized: "",
    pitch: "",
    error: "",
    started: "",
    end: "",
    results: [],
    partialResults: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      end: "",
      results: [],
      partialResults: [],
      isRecording: false,
    });
  }, [setState]);

  const startRecognizing = useCallback(async() => {
   resetState();
   try{
    await Voice.start("en-US");
   } catch(e) {
    console.log(e)
   }
  }, [resetState]);

  const stopRecognizing = useCallback(async() => {
    try{
     await Voice.stop();
    } catch(e) {
     console.log(e)
    }
   }, []);

   const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
   },[])

   const destoryRecognizer = useCallback(async ()=>{
    try{
      await Voice.destroy();
    } catch (e) {
      console.log(e);
    }
    resetState();
   }, [resetState])

   useEffect(()=>{
    Voice.onSpeechStart = (e:any)=>{
      setState((prevState)=>({
        ...prevState,
        started:"✅",
        isRecording:true,
      }))
    }

    Voice.onSpeechRecognized = () => {
      setState((prevState)=> ({ ...prevState, recognized:"✅"}))
    }
    Voice.onSpeechEnd = (e:any) => {
      setState((prevState) => ({
        ...prevState,
        end:"✅",
        isRecording:false,
      }))
    }
    Voice.onSpeechResults = (e:SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({...prevState, results:e.value! }))
      }
    }
    Voice.onSpeechError = (e:SpeechErrorEvent) =>{
      setState((prevState)=>({
        ...prevState,
        error:JSON.stringify(e.error),
        isRecording:false,
      }))
    }
    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, partialResults: e.value!}));
      }
    }
    Voice.onSpeechVolumeChanged = (e: any) => {
      setState((prevState) => ({...prevState, pitch:e.value}))
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
   },[])

   return{
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destoryRecognizer,
   }
};
