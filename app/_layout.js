import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Stack } from "expo-router/stack";
// import VerifyOtp from "./auth/verifyOtp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          name="auth/verifyOtp"
          component={VerifyOtp}
          options={{ headerShown: false }}
        /> */}
      </Stack>
    </PersistQueryClientProvider>
  );
}
