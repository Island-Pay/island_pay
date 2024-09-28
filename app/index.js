import React, { useEffect, useRef } from "react";
import {
  Animated, // Import Animated for animations
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { wp, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

SplashScreen.preventAutoHideAsync();

const WelcomeScreen = () => {
  const router = useRouter();

  // Use refs to store the animated values for fading in
  const fadeAnimLogo = useRef(new Animated.Value(0)).current; // Initial opacity of 0
  const fadeAnimButtons = useRef(new Animated.Value(0)).current; // Initial opacity of 0
  const fadeAnimText = useRef(new Animated.Value(0)).current; // Initial opacity of 0

  const [loaded, error] = useFonts({
    SpaceGrotext: require("../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();

      // Start fade-in animations once fonts are loaded
      Animated.sequence([
        Animated.timing(fadeAnimLogo, {
          toValue: 1, // Final opacity
          duration: 1000, // 1 second fade-in
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(fadeAnimButtons, {
          toValue: 1,
          duration: 1000,
          delay: 200, // Slight delay for button appearance
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimText, {
          toValue: 1,
          duration: 1000,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start(); // Start the sequence
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {Platform.OS !== "web" && (
        <StatusBar style="light" backgroundColor={theme.colors.purple} />
      )}
      <View style={styles.MainCon}>
        {/* Animated logo */}
        <Animated.View style={[styles.ImageCon, { opacity: fadeAnimLogo }]}>
          <Image
            style={styles.Logo}
            source={require("../assets/images/LogoC.png")}
          />
        </Animated.View>

        {/* Animated buttons */}
        <Animated.View style={[styles.bottonCon, { opacity: fadeAnimButtons }]}>
          <Pressable
            style={({ pressed }) => [
              styles.signUpBtn,
              pressed && styles.signUpBtnPressed,
            ]}
            onPress={() => router.push("auth/signUp")}
          >
            <MaterialCommunityIcons
              name="email-variant"
              size={24}
              color="black"
              style={styles.signUpicon}
            />
            <Text style={styles.signUpText}>Sign Up with Email</Text>
          </Pressable>
          {/* <Pressable
            style={({ pressed }) => [
              styles.signUpBtn2,
              pressed && styles.signUpBtnPressed,
            ]}
          >
            <FontAwesome6 name="google" size={24} style={styles.signUpicon} />
            <Text style={styles.signUpText2}>Sign Up with Google</Text>
          </Pressable> */}

          {/* Animated sign-in text */}
          <Animated.View style={[styles.signInCon, { opacity: fadeAnimText }]}>
            <Text style={styles.signInOut}>Already have an account?</Text>
            <Pressable onPress={() => router.push("dashboard/home")}>
              <Text style={styles.signIntext}>Sign in</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    color: theme.colors.white,
    height: Platform.OS === "web" ? "100vh" : hp(100), // Use vh for web and hp for mobile
  },
  MainCon: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ImageCon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.select({ web: "10vh", default: hp(10) }), // Adjust padding for web
  },
  Logo: {
    width: Platform.select({ web: "30vw", default: wp(80) }),
    height: Platform.select({ web: "4vh", default: hp(55) }), // Adjust height for web responsiveness
  },
  bottonCon: {
    width: "100%",
    paddingHorizontal: Platform.select({ web: "20%", default: 20 }), // Use percentage for web
  },
  signUpBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.purple,
    paddingVertical: Platform.select({ web: "1.5rem", default: 15 }),
    paddingHorizontal: Platform.select({ web: "2rem", default: 20 }),
    borderRadius: theme.radius.md,
    marginTop: hp(2),
    cursor: "pointer", // Add pointer cursor for web
  },
  signUpBtn2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.grey_deep_2,
    paddingVertical: Platform.select({ web: "1.5rem", default: 15 }),
    paddingHorizontal: Platform.select({ web: "2rem", default: 20 }),
    borderRadius: theme.radius.md,
    marginTop: hp(2),
    cursor: "pointer",
  },
  signUpicon: {
    marginRight: 2,
    color: theme.colors.white,
  },
  signUpText: {
    color: theme.colors.white,
    fontSize: Platform.select({ web: "1rem", default: 18 }),
    textAlign: "center",
    paddingLeft: 10,
    fontFamily: "SpaceGrotext",
    fontWeight: theme.fontWeights.bold,
  },
  signUpText2: {
    color: theme.colors.white,
    fontSize: Platform.select({ web: "1rem", default: 18 }),
    textAlign: "center",
    paddingLeft: 10,
    fontFamily: "SpaceGrotext",
    fontWeight: theme.fontWeights.bold,
  },
  signUpBtnPressed: {
    opacity: 0.8, // Add pressed style for better feedback on web
  },
  signInCon: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(2),
    marginBottom: hp(2),
    alignItems: "center",
  },
  signInOut: {
    color: theme.colors.grey_deep_2,
    textAlign: "center",
    fontFamily: "SpaceGrotext",
    fontSize: Platform.select({ web: "0.9rem", default: hp(1.7) }), // Adjust font size for web
  },
  signIntext: {
    color: theme.colors.grey_clean,
    textDecorationLine: "underline",
    marginLeft: 5,
    fontSize: Platform.select({ web: "1rem", default: hp(2) }), // Adjust font size for web
    cursor: "pointer", // Pointer for clickable text on web
  },
});
