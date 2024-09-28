import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    console.log("Email for password reset:", email);
    // Here you would typically call an API to send the OTP
    router.push("auth/resetPassword");
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
            Forgot Password
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(1000)}
            style={styles.subHeader}
          >
            Enter your email address to receive a password reset code
          </Animated.Text>
          <View style={styles.inputGroup}>
            <Animated.View
              entering={FadeInLeft.duration(1100)}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email..."
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </Animated.View>
          </View>
          <Animated.View
            style={{ width: "100%" }}
            entering={FadeInUp.duration(1200)}
          >
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Send Reset Code</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(3),
  },
  title: {
    width: wp(30),
    height: wp(30),
    resizeMode: "contain",
    marginBottom: hp(4),
  },
  formCon: {
    width: wp(80),
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: theme.colors.white,
    marginBottom: hp(2),
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    color: theme.colors.grey_clean,
    marginBottom: hp(4),
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: hp(4),
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
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: wp(4),
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2),
    borderRadius: theme.radius.md,
    width: "100%",
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForgotPassword;