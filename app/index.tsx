/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Redirect } from 'expo-router';
import GetStarted from "./(auth)/get-started";

const Page = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  if (isSignedIn) {
    return <Redirect href="/(dash)/(tabs)/home" />;
  }

  return <GetStarted />;
};

export default Page;