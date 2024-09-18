import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signIn/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signUp/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verifyOtp/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="congratsScreen/index.js"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
