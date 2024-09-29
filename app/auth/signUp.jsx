import React, { useState, useEffect } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import ProgressBar from "./components/ProgressBar";
import CountrySelector from "./components/CountrySelector";
import { useSignUpMutation, useUserData } from "../apiCall/apiCall";
import { validateInput } from "../../helpers/inputValidation";
import { useQueryClient } from "@tanstack/react-query";

const SignUp = () => {
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const signUpMutation = useSignUpMutation();

  const handleNext = () => {
    const currentStepErrors = validateCurrentStep();
    if (Object.keys(currentStepErrors).length === 0) {
      if (step < totalSteps) {
        setStep(step + 1);
        saveStepDataToCache();
      } else {
        handleSubmit();
      }
    } else {
      setErrors(currentStepErrors);
    }
  };

  const saveStepDataToCache = () => {
    const stepData = {
      firstName,
      lastName,
      middleName,
      username,
      email,
      phone_number,
      country: selectedCountry?.name,
    };
    queryClient.setQueryData(["user"], (oldData) => ({
      ...oldData,
      ...stepData,
    }));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const validateCurrentStep = () => {
    const stepErrors = {};
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    switch (step) {
      case 1:
        if (!validateInput("firstName", firstName))
          stepErrors.firstName = "First name is required";
        if (!validateInput("lastName", lastName))
          stepErrors.lastName = "Last name is required";
        break;
      case 2:
        if (!validateInput("username", username))
          stepErrors.username = "Username is required";
        if (!validateInput("email", email))
          stepErrors.email = "Valid email is required";
        break;
      case 3:
        if (!selectedCountry) stepErrors.country = "Country is required";
        if (!validateInput("phoneNumber", phone_number))
          stepErrors.phone_number = "Valid phone number is required";
        break;
      case 4:
        if (!validateInput("password", password))
          stepErrors.password = "Password must be at least 8 characters long";
        if (!passwordRegex.test(password))
          stepErrors.password = "Password must include a number and a symbol";
        if (password !== confirmPassword)
          stepErrors.confirmPassword = "Passwords do not match";
        break;
    }
    return stepErrors;
  };

  const handleSubmit = () => {
    const currentStepErrors = validateCurrentStep();
    if (Object.keys(currentStepErrors).length === 0) {
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const userData = {
        firstName,
        lastName,
        middleName,
        username,
        email,
        phone_number,
        country: selectedCountry?.name,
        password,
      };

      setLoading(true);
      signUpMutation.mutate(userData, {
        onSuccess: (data) => {
          setLoading(false);
          console.log("Sign up successful:", data);
          router.push("auth/verifyOtp");
        },
        onError: (error) => {
          setLoading(false);
          console.error("Sign up error:", error);
          Alert.alert("Error", "Failed to sign up. Please try again.");
        },
      });
    } else {
      setErrors(currentStepErrors);
      Alert.alert("Error", "Please fill in all required fields correctly.");
    }
  };

  // const validateCurrentStep = () => {
  //   const stepErrors = {};
  //   switch (step) {
  //     case 1:
  //       if (!validateInput("firstName", firstName))
  //         stepErrors.firstName = "First name is required";
  //       if (!validateInput("lastName", lastName))
  //         stepErrors.lastName = "Last name is required";
  //       break;
  //     case 2:
  //       if (!validateInput("username", username))
  //         stepErrors.username = "Username is required";
  //       if (!validateInput("email", email))
  //         stepErrors.email = "Valid email is required";
  //       break;
  //     case 3:
  //       if (!selectedCountry) stepErrors.country = "Country is required";
  //       if (!validateInput("phoneNumber", phone_number))
  //         stepErrors.phone_number = "Valid phone number is required";
  //       break;
  //     case 4:
  //       if (!validateInput("password", password))
  //         stepErrors.password = "Password must be at least 8 characters long";
  //       if (password !== confirmPassword)
  //         stepErrors.confirmPassword = "Passwords do not match";
  //       break;
  //   }
  //   return stepErrors;
  // };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    if (country && country.callingCode) {
      setPhoneNumber(`+${country.callingCode}`);
    } else {
      setPhoneNumber("");
    }
  };

  const handlePhoneNumberChange = (text) => {
    if (selectedCountry && selectedCountry.callingCode) {
      const countryCode = `${selectedCountry.callingCode}`;
      if (!text.startsWith(countryCode)) {
        text = countryCode + text.replace(/[^\d]/g, "");
      }
    }
    setPhoneNumber(text);
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
              error={errors.firstName}
            />
            <InputField
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              icon="account-outline"
              error={errors.lastName}
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
              error={errors.username}
            />
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              icon="email-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Contact Information</Text>
            <CountrySelector
              selectedCountry={selectedCountry}
              onSelect={handleCountrySelect}
              error={errors.country}
            />
            <InputField
              value={phone_number}
              onChangeText={handlePhoneNumberChange}
              placeholder="Phone Number"
              icon="phone-outline"
              keyboardType="phone-pad"
              editable={!!selectedCountry}
              error={errors.phone_number}
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
              error={errors.password}
            />
            <InputField
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              icon="lock-outline"
              secureTextEntry={!showConfirmPassword}
              toggleSecure={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderButton = () => {
    if (loading) {
      return (
        <View style={[styles.nextBtn, styles.loadingBtn]}>
          <ActivityIndicator color={theme.colors.white} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.nextBtn, step === 1 && styles.fullWidthBtn]}
        onPress={step === totalSteps ? handleSubmit : handleNext}
      >
        <Text style={styles.nextBtnText}>
          {step === totalSteps ? "Sign Up" : "Next"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formCon}>
          <Text style={styles.header}>Sign up</Text>
          <ProgressBar currentStep={step} totalSteps={totalSteps} />

          <Animated.View style={styles.stepContainer}>
            {renderStep()}
          </Animated.View>

          <View style={styles.buttonContainer}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backBtn}
                onPress={handleBack}
                disabled={loading}
              >
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>
            )}
            {renderButton()}
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

const InputField = ({
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  toggleSecure,
  error,
  ...props
}) => (
  <View style={styles.inputGroup}>
    <View style={[styles.inputWrapper, error && styles.inputError]}>
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
    {error && <Text style={styles.errorText}>{error}</Text>}
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
    marginTop: hp(10),
  },
  header: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: hp(4),
  },
  stepContainer: {
    minHeight: hp(40),
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
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
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error || "#FF6B6B",
    fontSize: 14,
    marginTop: hp(1),
  },
  loadingBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
