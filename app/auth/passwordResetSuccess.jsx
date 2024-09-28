import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PasswordResetSuccess = () => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("dashboard/home");
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.contentContainer}
      >
        <Animated.View entering={FadeInUp.duration(1000).delay(300)}>
          <Image
            source={require("../../assets/images/confirmPass.png")}
            style={styles.image}
          />
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.duration(1000).delay(500)}
          style={styles.title}
        >
          Password Reset Successful!
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.duration(1000).delay(700)}
          style={styles.message}
        >
          Your password has been successfully updated. You can now log in with your new password.
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.duration(1000).delay(900)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleGoToDashboard}
          >
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={theme.colors.white}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Go to Dashboard</Text>
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
    width: 120,
    height: 120,
    marginBottom: hp(4),
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: hp(2),
    textAlign: "center",
  },
  message: {
    fontSize: 16,
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
    paddingVertical: hp(2),
    borderRadius: theme.radius.md,
  },
  buttonIcon: {
    marginRight: wp(2),
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PasswordResetSuccess;