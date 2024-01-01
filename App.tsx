import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Button, Pressable } from 'react-native';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';

export default function App() {
  const[borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">("lightgray")
  const { state, startRecognizing,stopRecognizing,destoryRecognizer} = useVoiceRecognition()
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-black font-bold text-3xl mb-5">Talk GPT</Text>
      <Text className="text-black font-regular text-sm mb-5">press and hold to record your voice.</Text>
      <Text className="font-bold mb-5">{JSON.stringify(state, null, 2)}</Text>
      <Text className="font-bold mb-5">Your message:</Text>
      <Button title=" Reply last message" onPress={() => {}}/>
      <Pressable className="border-4 rounded-xl p-12 mt-4" style={{borderColor : borderColor}} 
      onPressIn={()=>{
        setBorderColor("lightgreen")
        startRecognizing()
      }}
      onPressOut={()=>{
        setBorderColor("lightgray") 
        stopRecognizing()}}
      >
        <Text>Hold to Speak</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}


