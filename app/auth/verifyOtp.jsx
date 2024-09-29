import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import useUserStore from '../../store/userStore';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs.current[0].focus();
  }, []);

  const handleOtpChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Only keep the last digit if multiple are pasted
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value !== "" && index < 4) {
        inputRefs.current[index + 1].focus();
      } else if (index === 4 && value !== "") {
        inputRefs.current[index].blur();
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1].focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length === 5) {
      console.log("Submitted OTP:", otpString);
      // Initialize user data in the store
      setUser({ otp: otpString });
      router.push("auth/finalSignUp");
      // Add your OTP verification logic here
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP");
    // Add your OTP resend logic here
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
            Verify OTP
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(1000)}
            style={styles.subHeader}
          >
            Enter the 5-digit code sent to your phone
          </Animated.Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <Animated.View
                key={index}
                entering={FadeInLeft.duration(1100 + index * 100)}
                style={styles.inputWrapper}
              >
                <TextInput
                  style={[styles.input, digit ? styles.inputFilled : null]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  caretHidden={true}
                  selectTextOnFocus
                />
              </Animated.View>
            ))}
          </View>
          <Animated.View
            style={{ width: "100%" }}
            entering={FadeInUp.duration(1600)}
          >
            <TouchableOpacity
              style={[
                styles.verifyBtn,
                !otp.every((digit) => digit !== "") && styles.verifyBtnDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!otp.every((digit) => digit !== "")}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color={theme.colors.white}
                style={styles.verifyIcon}
              />
              <Text style={styles.verifyText}>Verify OTP</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.duration(1700)}
            style={styles.resendContainer}
          >
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendLink}>Resend OTP</Text>
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: hp(4),
  },
  inputWrapper: {
    width: wp(12),
  },
  input: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.sm,
    color: theme.colors.white,
    borderColor: "#454545",
    borderWidth: 2,
    fontSize: 24,
    textAlign: "center",
  },
  inputFilled: {
    borderColor: theme.colors.purple,
    backgroundColor: theme.colors.grey_deep,
  },
  verifyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2),
    borderRadius: theme.radius.md,
    marginTop: hp(2),
    width: "100%",
  },
  verifyBtnDisabled: {
    backgroundColor: theme.colors.grey_clean,
  },
  verifyIcon: {
    marginRight: wp(2),
  },
  verifyText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: hp(3),
  },
  resendText: {
    color: theme.colors.grey_clean,
    fontSize: 14,
  },
  resendLink: {
    color: theme.colors.purple,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default VerifyOtp;
