import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { router } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleForgotPassword = () => {
    router.push("auth/forgotPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animated.Image
          entering={FadeInLeft.duration(700)}
          source={require("../../assets/images/!slandPay.png")}
          style={styles.title}
        />
        <View style={styles.formCon}>
          <Animated.Text
            entering={FadeInLeft.duration(900)}
            style={styles.header}
          >
            Sign in
          </Animated.Text>
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
                placeholder="Email..."
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="email-variant"
                size={24}
                color={theme.colors.grey_deep_2}
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
                size={24}
                color={theme.colors.grey_deep_2}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.icon}
              />
            </Animated.View>
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
          </View>
          <Animated.View
            style={{ width: "100%" }}
            entering={FadeInUp.duration(1200)}
          >
            <TouchableOpacity style={styles.signInBtn} onPress={handleSubmit}>
              {/* <MaterialCommunityIcons
                name="email-variant"
                size={24}
                color={theme.colors.white}
                style={styles.signInIcon}
              /> */}
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.duration(1300)}
            style={styles.signInOptions}
          >
            <Text style={styles.optionText}>Or sign in with</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.duration(1400)}
            style={styles.iconContainer}
          >
            <TouchableOpacity style={styles.socialSignInIcon}>
              <FontAwesome5
                name="google"
                size={20}
                color={theme.colors.grey_deep_2}
              />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    ...Platform.select({
      web: {
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "web" ? "3rem" : hp(2),
    paddingBottom: hp(3),
  },
  title: {
    width: wp(30),
    height: wp(30),
    resizeMode: "contain",
    marginTop: hp(2),
  },
  formCon: {
    width: wp(80),
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: theme.colors.white,
    marginBottom: hp(3),
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  inputGroup: {
    width: "100%",
    marginBottom: hp(2),
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: hp(1.5),
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.sm,
    color: theme.colors.white,
    borderColor: "#454545",
    borderWidth: 1,
    paddingRight: wp(12),
    fontSize: Platform.OS === "web" ? "1rem" : 16,
  },
  icon: {
    position: "absolute",
    right: wp(4),
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: hp(1),
  },
  forgotPasswordText: {
    color: theme.colors.grey_clean,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  signInBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.purple,
    paddingVertical: Platform.OS === "web" ? "1.5rem" : hp(2),
    borderRadius: theme.radius.md,
    marginTop: hp(2),
    width: "100%",
  },
  signInIcon: {
    marginRight: wp(2),
  },
  signInText: {
    color: theme.colors.white,
    fontSize: Platform.OS === "web" ? "1.25rem" : 18,
    fontWeight: "bold",
  },
  signInOptions: {
    marginTop: hp(3),
    alignItems: "center",
  },
  optionText: {
    color: theme.colors.grey_clean,
    fontSize: Platform.OS === "web" ? "1rem" : 16,
    marginBottom: hp(2),
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: hp(3),
  },
  socialSignInIcon: {
    backgroundColor: theme.colors.grey_deep,
    padding: hp(1.5),
    borderRadius: 10,
    width: wp(12),
    height: wp(12),
    justifyContent: "center",
    alignItems: "center",
  },
  alreadyHaveAccount: {
    alignItems: "center",
  },
  alreadyHaveAccountText: {
    color: theme.colors.grey_clean,
    fontSize: 14,
  },
  signUpLink: {
    color: theme.colors.purple,
    textDecorationLine: "underline",
  },
});

export default SignIn;