import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from "react-native";
import GetStarted from "./(auth)/get-started";

const Page = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // Small timeout ensures the router is fully mounted on Android
      const timeout = setTimeout(() => {
        router.replace("/(dash)/(tabs)/home");
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isSignedIn]);

  if (isSignedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#5547BA" />
      </View>
    );
  }

  return <GetStarted />;
};

export default Page;