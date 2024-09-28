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
  Pressable,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import ProgressBar from "./components/ProgressBar";
import CountrySelector from "./components/CountrySelector";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const router = useRouter();

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log({
      firstName,
      lastName,
      middleName,
      username,
      email,
      phoneNumber,
      country: selectedCountry.name,
      password,
    });
    router.push("auth/verifyOtp");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <InputField
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              icon="account-outline"
            />
            <InputField
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              icon="account-outline"
            />
            <InputField
              value={middleName}
              onChangeText={setMiddleName}
              placeholder="Middle Name (Optional)"
              icon="account-outline"
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Account Details</Text>
            <InputField
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              icon="account-circle-outline"
            />
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              icon="email-outline"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Contact Information</Text>
            <CountrySelector
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
            />
            <InputField
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              icon="phone-outline"
              keyboardType="phone-pad"
              editable={!!selectedCountry}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.stepTitle}>Set Password</Text>
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              icon="lock-outline"
              secureTextEntry={!showPassword}
              toggleSecure={() => setShowPassword(!showPassword)}
            />
            <InputField
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              icon="lock-outline"
              secureTextEntry={!showConfirmPassword}
              toggleSecure={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animated.Image
          source={require("../../assets/images/!slandPay.png")}
          style={styles.title}
        />
        <View style={styles.formCon}>
          <Text style={styles.header}>Sign up</Text>
          <ProgressBar currentStep={step} totalSteps={totalSteps} />

          <Animated.View style={styles.stepContainer}>
            {renderStep()}
          </Animated.View>

          <View style={styles.buttonContainer}>
            {step > 1 && (
              <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextBtn, step === 1 && styles.fullWidthBtn]}
              onPress={handleNext}
            >
              <Text style={styles.nextBtnText}>
                {step === totalSteps ? "Sign Up" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>

          <Pressable onPress={() => router.push("auth/signIn")}>
            <View style={styles.alreadyHaveAccount}>
              <Text style={styles.alreadyHaveAccountText}>
                Already have an account?{" "}
                <Text style={styles.signInLink}>Sign in</Text>
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField = ({ value, onChangeText, placeholder, icon, secureTextEntry, toggleSecure, ...props }) => (
  <View style={styles.inputGroup}>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grey_deep_2}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={theme.colors.grey_deep_2}
        style={styles.icon}
      />
      {toggleSecure && (
        <Feather
          name={secureTextEntry ? "eye" : "eye-off"}
          size={24}
          color={theme.colors.grey_deep_2}
          onPress={toggleSecure}
          style={styles.icon}
        />
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  scrollView: {
    paddingHorizontal: wp(8),
    paddingTop: hp(5),
    paddingBottom: hp(10),
  },
  title: {
    alignSelf: "center",
    marginTop: hp(5),
    marginBottom: hp(4),
  },
  formCon: {
    marginTop: hp(2),
  },
  header: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: hp(4),
  },
  stepContainer: {
    minHeight: hp(40),
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: hp(3),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: 12,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  input: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: wp(3),
  },
  icon: {
    marginLeft: wp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5),
  },
  backBtn: {
    backgroundColor: theme.colors.grey_deep,
    paddingVertical: hp(2.5),
    borderRadius: theme.radius.lg,
    flex: 1,
    marginRight: wp(2),
  },
  backBtnText: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  nextBtn: {
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2.5),
    borderRadius: theme.radius.lg,
    flex: 1,
    marginLeft: wp(2),
  },
  nextBtnText: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  fullWidthBtn: {
    marginLeft: 0,
    flex: 2,
  },
  alreadyHaveAccount: {
    marginTop: hp(5),
  },
  alreadyHaveAccountText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 16,
  },
  signInLink: {
    color: theme.colors.purple,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  stepTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: hp(4),
  },
});

export default SignUp;