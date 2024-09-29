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
  ActivityIndicator,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    console.log("OTP:", otp);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      router.push("auth/passwordResetSuccess");
    }, 2000);
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
            Reset Password
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(1000)}
            style={styles.subHeader}
          >
            Enter the OTP sent to your email and your new password
          </Animated.Text>
          <View style={styles.inputGroup}>
            <Animated.View
              entering={FadeInLeft.duration(1100)}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                placeholder="Enter OTP"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="numeric"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </Animated.View>
          </View>
          <View style={styles.inputGroup}>
            <Animated.View
              entering={FadeInLeft.duration(1200)}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
                placeholder="New Password"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={theme.colors.grey_deep_2}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.icon}
              />
            </Animated.View>
          </View>
          <View style={styles.inputGroup}>
            <Animated.View
              entering={FadeInLeft.duration(1300)}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm New Password"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color={theme.colors.grey_deep_2}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.icon}
              />
            </Animated.View>
          </View>
          <Animated.View
            style={{ width: "100%" }}
            entering={FadeInUp.duration(1400)}
          >
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                <Text style={styles.submitText}>Reset Password</Text>
              )}
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
    marginBottom: hp(3),
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

export default ResetPassword;
