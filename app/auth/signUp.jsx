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
  Modal,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";

const countries = [
  { name: "Nigeria", code: "+234" },
  { name: "Kenya", code: "+254" },
  { name: "Ghana", code: "+233" },
  { name: "United States", code: "+1" },
];

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
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();

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

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setPhoneNumber(country.code);
    setModalVisible(false);
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

          {/* First Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </View>
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </View>
          </View>

          {/* Middle Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={middleName}
                onChangeText={setMiddleName}
                placeholder="Middle Name"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </View>
          </View>

          {/* Username */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={theme.colors.grey_deep_2}
              />
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </View>
          </View>

          {/* Country */}
          <View style={styles.inputGroup}>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                value={selectedCountry ? selectedCountry.name : ""}
                placeholder="Select Country"
                placeholderTextColor={theme.colors.grey_deep_2}
                editable={false}
              />
              <MaterialCommunityIcons
                name="earth"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </Pressable>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="Phone Number"
                placeholderTextColor={theme.colors.grey_deep_2}
                editable={!!selectedCountry}
              />
              <MaterialCommunityIcons
                name="phone-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.icon}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
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
              {/* <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.lockIcon}
              /> */}
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor={theme.colors.grey_deep_2}
                secureTextEntry={!showConfirmPassword}
              />
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color={theme.colors.grey_deep_2}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.icon}
              />
              {/* <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={theme.colors.grey_deep_2}
                style={styles.lockIcon}
              /> */}
            </View>
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={handleSubmit}>
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Country Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalLine}></View>
                {countries.map((country) => (
                  <TouchableOpacity
                    key={country.code}
                    onPress={() => handleCountrySelect(country)}
                    style={styles.countryOption}
                  >
                    <Text style={styles.countryText}>{country.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          <Pressable onPress={() => router.push("auth/signIn")}>
            <View style={styles.alreadyHaveAccount}>
              <Text style={styles.alreadyHaveAccountText}>
                Already have an account?{" "}
                <Text style={styles.signUpLink}>Sign in</Text>
              </Text>
            </View>
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
  },
  scrollView: {
    paddingHorizontal: wp(5),
  },
  title: {
    alignSelf: "center",
    marginTop: hp(5),
    marginBottom: hp(2),
  },
  formCon: {
    marginTop: hp(4),
  },
  header: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: hp(2),
  },
  inputGroup: {
    marginBottom: hp(2),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: 8,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
  input: {
    flex: 1,
    color: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: wp(3),
  },
  icon: {
    marginLeft: wp(1),
  },
  lockIcon: {
    marginLeft: wp(1),
  },
  signInBtn: {
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2),
    borderRadius: theme.radius.lg,
    marginTop: hp(3),
  },
  signInText: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  alreadyHaveAccount: {
    marginTop: hp(3),
  },
  alreadyHaveAccountText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 16,
  },
  signUpLink: {
    color: theme.colors.purple,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalLine: {
    backgroundColor: theme.colors.white,
    height: 4,
    width: wp(20),
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 30,
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    paddingVertical: hp(2),
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    paddingHorizontal: wp(5),
  },
  countryOption: {
    padding: hp(2),
    backgroundColor: theme.colors.grey_deep_2,
    marginVertical: hp(1),
    borderRadius: 10,
    color: theme.colors.white,
  },
  countryText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;
