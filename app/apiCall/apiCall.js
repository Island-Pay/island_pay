import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const { EXPO_PUBLIC_API_ENDPOINT } = process.env;

export function useSignUpMutation(setUser) {
  const router = useRouter();

  return useMutation({
    mutationFn: (userData) =>
      axios.post(`${EXPO_PUBLIC_API_ENDPOINT}/register/1`, userData),
    onSuccess: (response) => {
      console.log("Signup successful:", response.data);
      setUser(response.data.user);
      router.push("auth/verifyOtp");
    },
    onError: (error) => {
      console.error("Signup error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred during signup"
      );
    },
  });
}
