import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable, // Add this import
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useLogin, useUserData } from "../apiCall/apiCall";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loginMutation = useLogin();
  const queryClient = useQueryClient();

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            if (data.Access) {
              handleLoginSteps(data.Data.LoginSteps);
            } else {
              Alert.alert("Error", data.Error || "Login failed. Please try again.");
            }
          },
        }
      );
    }
  };

  const handleLoginSteps = (steps) => {
    if (!steps.emailVerify) {
      router.push("auth/verifyOtp", { type: 'email' });
    } else if (!steps.phoneNoVerify) {
      router.push("auth/verifyOtp", { type: 'phone' });
    } else if (!steps.UserDetails) {
      router.push("auth/userDetails");
    } else {
      router.push("dashboard");
    }
  };

  const handleForgotPassword = () => {
    router.push("auth/forgotPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={[theme.colors.black, theme.colors.purple_dark]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentWrapper}>
            <Animated.Image
              entering={FadeInLeft.duration(700)}
              source={require("../../assets/images/!slandPay.png")}
              style={styles.logo}
            />
            <View style={styles.formCon}>
              <View style={styles.inputGroup}>
                <Animated.View
                  entering={FadeInLeft.duration(1000)}
                  style={styles.inputWrapper}
                >
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    required
                    placeholder="Email"
                    placeholderTextColor={theme.colors.grey_deep_2}
                  />
                  <MaterialCommunityIcons
                    name="email-variant"
                    size={28}
                    color={theme.colors.purple_light}
                    style={styles.icon}
                  />
                </Animated.View>
              </View>
              <View style={styles.inputGroup}>
                <Animated.View
                  entering={FadeInLeft.duration(1100)}
                  style={styles.inputWrapper}
                >
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    required
                    placeholder="Password"
                    placeholderTextColor={theme.colors.grey_deep_2}
                    secureTextEntry={!showPassword}
                  />
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={28}
                    color={theme.colors.purple_light}
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.icon}
                  />
                </Animated.View>
              </View>
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPassword}
              >
                <Animated.Text
                  entering={FadeInRight.duration(1100)}
                  style={styles.forgotPasswordText}
                >
                  Forgot Password?
                </Animated.Text>
              </TouchableOpacity>
              <Animated.View
                style={styles.buttonWrapper}
                entering={FadeInUp.duration(1200)}
              >
                <TouchableOpacity style={styles.signInBtn} onPress={handleSubmit}>
                  <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
              </Animated.View>
              <Pressable onPress={() => router.push("auth/signUp")}>
                <Animated.View
                  entering={FadeInUp.duration(1500)}
                  style={styles.alreadyHaveAccount}
                >
                  <Text style={styles.alreadyHaveAccountText}>
                    Don't have an account?{" "}
                    <Text style={styles.signUpLink}>Sign up</Text>
                  </Text>
                </Animated.View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(6),
  },
  logo: {
    width: wp(30),
    height: wp(30),
    resizeMode: "contain",
    marginBottom: hp(6),
  },
  formCon: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: theme.colors.white,
    marginBottom: hp(4),
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  inputGroup: {
    width: "100%",
    marginBottom: hp(3),
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: hp(2),
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Slightly increased opacity
    borderRadius: theme.radius.md,
    color: theme.colors.white,
    fontSize: 16,
    paddingRight: wp(14), // Increased to accommodate larger icon
  },
  icon: {
    position: "absolute",
    right: wp(4),
    top: "50%",
    transform: [{ translateY: -14 }], // Adjusted for larger icon size
  },
  forgotPassword: {
    alignSelf: "center", // Change from "flex-end" to "center"
    marginBottom: hp(2), // Reduced from hp(4)
    marginTop: hp(1), // Add some top margin
  },
  forgotPasswordText: {
    color: theme.colors.white, // Change to white for better visibility
    fontSize: 14, // Reduced from 16
    textDecorationLine: 'underline',
    fontWeight: '500', // Reduced from '600'
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: hp(4),
  },
  signInBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2),
    borderRadius: theme.radius.md,
    width: "100%",
  },
  signInText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  alreadyHaveAccount: {
    alignItems: "center",
  },
  alreadyHaveAccountText: {
    color: theme.colors.grey_clean,
    fontSize: 14,
  },
  signUpLink: {
    color: theme.colors.purple_light,
  },
});

export default SignIn;