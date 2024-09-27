// import { View, Text } from "react-native";
// import React from "react";
// import { Stack } from "expo-router";

// const Layout = () => {
//   return (
//     <Stack>
//       <Stack.Screen
//         name="index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="home/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="signIn/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="signUp/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="verifyOtp/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="congrats/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="setupPin/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="PinCreated/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Dashboard/index"
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack>
//   );
// };

// export default Layout;
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
