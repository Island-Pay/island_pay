import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Congrats = () => {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the next screen (e.g., home screen or dashboard)
    // Replace 'home' with the appropriate route name for your app
    router.push("auth/setupPin");
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.contentContainer}
      >
        <Image
          source={require("../../assets/images/check.png")} // Replace with your actual success image
          style={styles.image}
        />
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(500)}
          style={styles.title}
        >
          Congratulations!
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(700)}
          style={styles.message}
        >
          Your account is ready to use
        </Animated.Text>
        <Animated.View
          entering={FadeInUp.duration(1000).delay(900)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={24}
              color={theme.colors.white}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    width: wp(90),
    backgroundColor: theme.colors.grey_deep,
    padding: wp(10),
    borderRadius: 30,
  },
  image: {
    width: wp(60),
    height: wp(60),
    resizeMode: "contain",
    marginBottom: hp(4),
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: hp(2),
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: theme.colors.grey_clean,
    marginBottom: hp(4),
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.purple,
    paddingVertical: Platform.OS === "web" ? "1.5rem" : hp(2),
    borderRadius: theme.radius.md,
  },
  buttonIcon: {
    marginRight: wp(2),
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: Platform.OS === "web" ? "1.25rem" : 18,
    fontWeight: "bold",
  },
});

export default Congrats;
