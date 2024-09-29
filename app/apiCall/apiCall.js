import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { router } from "expo-router";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const { EXPO_PUBLIC_API_ENDPOINT } = process.env;

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_ENDPOINT,
});

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGluIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImNvdW50cnkiOiJpbml0IiwicGhvbmVfbnVtYmVyIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImxhc3ROYW1lIjoiaW5pdCIsImZpcnN0TmFtZSI6ImluaXQiLCJ1c2VyRGV0YWlsc192ZXJpZnkiOiJpbml0IiwiZW1haWxfdmVyaWYiOiJpbml0IiwicGhvbmVfbnVtYmVyX3ZlcmlmIjoiaW5pdCIsImt5YyI6ImluaXQiLCJiYW5rX3ZlcmlmIjoiaW5pdCIsImlkX3ZlcmlmIjoiaW5pdCIsImFncmVlX3RvX3Rlcm1zIjoiaW5pdCIsIkJsb2NrZWQiOiJpbml0IiwiX2lkIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwiZmlyc3ROYW1lIjp0cnVlLCJsYXN0TmFtZSI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwaG9uZV9udW1iZXIiOnRydWUsImNvdW50cnkiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJ1c2VyRGV0YWlsc192ZXJpZnkiOnRydWUsImVtYWlsX3ZlcmlmIjp0cnVlLCJwaG9uZV9udW1iZXJfdmVyaWYiOnRydWUsImt5YyI6dHJ1ZSwiYmFua192ZXJpZiI6dHJ1ZSwiaWRfdmVyaWYiOnRydWUsImFncmVlX3RvX3Rlcm1zIjp0cnVlLCJjcmVhdGVkQXQiOnRydWUsInVwZGF0ZWRBdCI6dHJ1ZSwiX192Ijp0cnVlLCJCbG9ja2VkIjp0cnVlLCJwaW4iOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjZmMTc3YTJjZjhkNzVmN2JkODAxNDcxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwidXNlcm5hbWUiOiJKb2VEb2UxMjMiLCJlbWFpbCI6InNvbHV3aXp5QGdtYWlsLmNvbSIsInBob25lX251bWJlciI6MjM0ODEzMzA5MjM0MSwiY291bnRyeSI6Ik5pZ2VyaWEiLCJwYXNzd29yZCI6IiQyYSQxMCRFcnEzMFUzekRoWG9rYnpMMy5qNE1lMkxubThrak4yNk1WUm8xYzJEdXUuTW9qUlBzTUpOVyIsInVzZXJEZXRhaWxzX3ZlcmlmeSI6dHJ1ZSwiZW1haWxfdmVyaWYiOnRydWUsInBob25lX251bWJlcl92ZXJpZiI6dHJ1ZSwia3ljIjpmYWxzZSwiYmFua192ZXJpZiI6ZmFsc2UsImlkX3ZlcmlmIjpmYWxzZSwiYWdyZWVfdG9fdGVybXMiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTIzVDE0OjEzOjU0LjA2OVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA5LTI2VDA4OjUzOjA1LjY3OFoiLCJfX3YiOjAsIkJsb2NrZWQiOmZhbHNlLCJwaW4iOiIkMmEkMTAkODZBRUdJRi5mLlpwQzI2OXpqSzI0ZTFmd2s4UlYweWdOc1RNLlJYMFBBVDZKd0hnQ2k3R20ifSwiaWF0IjoxNzI3NTU3NTU0LCJleHAiOjE3Mjc2NDM5NTR9.suU78aTDbNbkmtvZXGQubNvOEtUCT35i79Q1v7qLx-0";

const getDepositLink = async ({ currency, amount }) => {
  const response = await api.post(
    `/deposit?currency=${currency}`,
    { amount },
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

const sendMoney = async ({ currency, amount, receiver, pin }) => {
  const response = await api.post(
    `/sendmoney`,
    JSON.stringify({
      amount,
      receiver,
      pin,
    }),
    {
      params: { currency },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const getWalletDetails = async () => {
  const response = await api.get(`/wallet/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
      console.error("Error converting money:", error.response.data);
    },
  });
};

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

export const useGetWalletDetails = () => {
  return useQuery({
    queryKey: ["getWalletDetails"],
    queryFn: getWalletDetails,
    onError: (error) => {
      console.error("Error fetching wallet details:", error);
    },
  });
};

export const useSendMoney = () => {
  return useMutation({
    mutationFn: sendMoney,
    onError: (error) => {
      console.error("Error sending money:", error);
    },
  });
};
export const getBanks = async (country) => {
  const response = await api.get(`/payout/get-banks`, {
    params: { country },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Banks;
};

export const getMobileMoney = async (country) => {
  const response = await api.get(`/payout/get-mobileMoney`, {
    params: { country },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.Banks;
};
