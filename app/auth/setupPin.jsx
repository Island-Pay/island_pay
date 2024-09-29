import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRegisterPin } from "../apiCall/apiCall"; // Adjust the import path as necessary
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetupPin = () => {
  const router = useRouter();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [isPinConfirmationMode, setIsPinConfirmationMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const confirmInputRefs = useRef([]);
  const { mutate: registerPin } = useRegisterPin();

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handlePinChange = (text, index, isConfirmPin = false) => {
    if (/^\d*$/.test(text)) {
      const newPin = isConfirmPin ? [...confirmPin] : [...pin];
      newPin[index] = text.slice(-1); // Only keep the last digit if multiple are pasted
      isConfirmPin ? setConfirmPin(newPin) : setPin(newPin);

      // Move to next input if current input is filled
      if (text.length > 0 && index < 3) {
        if ((isConfirmPin ? confirmInputRefs : inputRefs).current[index + 1]) {
          (isConfirmPin ? confirmInputRefs : inputRefs).current[
            index + 1
          ].focus();
        }
      } else if (index === 3 && text.length > 0) {
        if ((isConfirmPin ? confirmInputRefs : inputRefs).current[index]) {
          (isConfirmPin ? confirmInputRefs : inputRefs).current[index].blur();
        }
      }
    }
  };

  const handleKeyPress = (e, index, isConfirmPin = false) => {
    if (e.nativeEvent.key === "Backspace") {
      const currentPin = isConfirmPin ? confirmPin : pin;
      if (currentPin[index] === "" && index > 0) {
        if ((isConfirmPin ? confirmInputRefs : inputRefs).current[index - 1]) {
          (isConfirmPin ? confirmInputRefs : inputRefs).current[
            index - 1
          ].focus();
        }
      }
    }
  };

  const handleSubmit = () => {
    if (pin.every((digit) => digit !== "")) {
      setIsPinConfirmationMode(true);
      if (confirmInputRefs.current[0]) {
        confirmInputRefs.current[0].focus();
      }
    } else {
      Alert.alert("Incomplete PIN", "Please enter a 4-digit PIN.");
    }
  };

  const handleConfirm = async () => {
    if (confirmPin.every((digit) => digit !== "")) {
      if (pin.join("") === confirmPin.join("")) {
        try {
          setLoading(true);
          const email = await AsyncStorage.getItem("email");
          if (email) {
            registerPin(
              { email, pin: pin.join("") },
              {
                onSuccess: () => {
                  setLoading(false);
                  router.push("dashboard/home");
                },
                onError: () => {
                  setLoading(false);
                  Alert.alert("Error", "Failed to register PIN.");
                },
              }
            );
          } else {
            setLoading(false);
            Alert.alert("Error", "User email not found.");
          }
        } catch (error) {
          setLoading(false);
          Alert.alert("Error", "Failed to retrieve user email.");
        }
      } else {
        Alert.alert(
          "PIN Mismatch",
          "The PINs you entered do not match. Please try again."
        );
        setConfirmPin(["", "", "", ""]);
        if (confirmInputRefs.current[0]) {
          confirmInputRefs.current[0].focus();
        }
      }
    } else {
      Alert.alert("Incomplete PIN", "Please re-enter your 4-digit PIN.");
    }
  };

  const renderPinInputs = (pinArray, refs, onChange, onKeyPress) => (
    <View style={styles.pinContainer}>
      {[0, 1, 2, 3].map((index) => (
        <TextInput
          key={index}
          ref={(ref) => (refs.current[index] = ref)}
          style={[
            styles.pinInput,
            pinArray[index] ? styles.pinInputFilled : null,
          ]}
          value={pinArray[index]}
          onChangeText={(text) => onChange(text, index)}
          onKeyPress={(e) => onKeyPress(e, index)}
          keyboardType="numeric"
          secureTextEntry
          maxLength={1}
          textAlign="center"
          selectTextOnFocus
          caretHidden={true}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.contentContainer}
      >
        <Image
          source={require("../../assets/images/pass.png")}
          style={styles.image}
        />
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(500)}
          style={styles.title}
        >
          {isPinConfirmationMode ? "Confirm Your PIN" : "Set Up Your PIN"}
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(700)}
          style={styles.message}
        >
          {isPinConfirmationMode
            ? "Re-enter your 4-digit PIN to confirm"
            : "Create a 4-digit PIN for secure transactions"}
        </Animated.Text>
        <Animated.View entering={FadeInUp.duration(1000).delay(900)}>
          {isPinConfirmationMode
            ? renderPinInputs(
                confirmPin,
                confirmInputRefs,
                (text, index) => handlePinChange(text, index, true),
                (e, index) => handleKeyPress(e, index, true)
              )
            : renderPinInputs(pin, inputRefs, handlePinChange, handleKeyPress)}
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(1000).delay(1100)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[
              styles.button,
              (!isPinConfirmationMode && !pin.every((digit) => digit !== "")) ||
              (isPinConfirmationMode &&
                !confirmPin.every((digit) => digit !== ""))
                ? styles.buttonDisabled
                : null,
            ]}
            onPress={isPinConfirmationMode ? handleConfirm : handleSubmit}
            disabled={
              (!isPinConfirmationMode && !pin.every((digit) => digit !== "")) ||
              (isPinConfirmationMode &&
                !confirmPin.every((digit) => digit !== ""))
            }
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.white} />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="lock"
                  size={24}
                  color={theme.colors.white}
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>
                  {isPinConfirmationMode ? "Confirm PIN" : "Set PIN"}
                </Text>
              </>
            )}
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
    width: 100,
    height: 100,
    marginBottom: hp(2),
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
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: hp(4),
  },
  pinInput: {
    backgroundColor: theme.colors.grey_clean,
    color: theme.colors.white,
    fontSize: 24,
    width: wp(15),
    height: wp(15),
    textAlign: "center",
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: "transparent",
  },
  pinInputFilled: {
    borderColor: theme.colors.purple,
    backgroundColor: theme.colors.grey_deep,
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
  buttonDisabled: {
    backgroundColor: theme.colors.grey_clean,
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

export default SetupPin;
