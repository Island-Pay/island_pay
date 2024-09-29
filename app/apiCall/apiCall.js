import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const { EXPO_PUBLIC_API_ENDPOINT } = process.env;

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_ENDPOINT,
});

// Replace getAuthToken function
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Update any other functions that use localStorage
// For example, if you're using the token variable elsewhere:
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const getDepositLink = async ({ currency, amount }) => {
  const response = await api.post(
    "/deposit",
    { currency, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getRate = async ({ from, to }) => {
  // const token = getAuthToken();
  const response = await api.get(`/convert/get-rate`, {
    params: { from, to },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const convertMoney = async ({ from, to, pin, amount }) => {
  // const token = getAuthToken();
  const response = await api.post(
    "/convert/convert",
    { from, to, pin, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useGetDepositLink = () => {
  return useMutation({
    mutationFn: getDepositLink,
    // onSuccess: router.push("/dashboard"),
    onError: (error) => {
      console.error("Error fetching deposit link:", error);
    },
  });
};

export const useGetRate = (from, to) => {
  return useQuery({
    queryKey: ["getRate", from, to],
    queryFn: () => getRate({ from, to }),
    onError: (error) => {
      console.error("Error fetching rate:", error);
    },
  });
};

export const useConvertMoney = () => {
  return useMutation({
    mutationFn: convertMoney,
    onError: (error) => {
      console.error("Error converting money:", error);
    },
  });
};

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await axios.post(
          `${EXPO_PUBLIC_API_ENDPOINT}/register/1`,
          userData
        );
        return response.data;
      } catch (error) {
        console.error("Error during sign up:", error.response?.data || error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      // Update the user data in the cache
      queryClient.setQueryData(["user"], variables);
    },
  });
};

// Add a new query to fetch user data
export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const token = await getAuthToken();
        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error
        );
        return null;
      }
    },
    initialData: null,
  });
};

const sendOtp = async ({ email }) => {
  const endpoint = `/register/verify/email/1`;

  const response = await api.get(endpoint, {
    params: { email },
    headers: {
      Authorization: `Bearer ${await getAuthToken()}`,
    },
  });
  return response.data;
};

const verifyOtp = async ({ email, otp }) => {
  const endpoint = `/register/verify/email/1`;

  const params = { email };
  const body = { otp };

  const response = await api.post(endpoint, body, {
    params,
    headers: {
      Authorization: `Bearer ${await getAuthToken()}`,
    },
  });
  return response.data;
};

export const useSendOtp = () => {
  console.log("useSendOtp");
  return useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      if (data.Access && data.Sent) {
        console.log("OTP sent successfully");
      } else {
        console.error("Failed to send OTP:", data.Error);
      }
    },
    onError: (error) => {
      console.error("Error sending OTP:", error.response?.data || error);
    },
  });
};

export const useVerifyOtp = () => {
  console.log("useVerifyOtp");
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (data.Access && data.Verified) {
        // Handle successful verification
        console.log("Email verified successfully");
      } else {
        // Handle verification failure
        console.error("Email verification failed:", data.Error);
      }
    },
    onError: (error) => {
      console.error("Error verifying OTP:", error.response?.data || error);
    },
  });
};

const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: async (data) => {
      if (data.Access) {
        // Save the entire user data in the cache
        queryClient.setQueryData(["user"], data.Data);

        try {
          // Save the auth token in AsyncStorage
          await AsyncStorage.setItem("authToken", data.Data.Auth || "");

          // Invalidate and refetch user data
          queryClient.invalidateQueries(["user"]);

          // Navigate to the dashboard or home screen
          router.replace("/dashboard");
        } catch (error) {
          console.error("Error saving login information:", error);
          Alert.alert(
            "Login Error",
            "Failed to save login information. Please try again."
          );
        }
      } else {
        Alert.alert(
          "Login Failed",
          data.Error || "An unknown error occurred. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error("Login error:", error.response?.data || error);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    },
  });
}
