import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Stack } from "expo-router/stack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

let persister;
if (typeof window !== "undefined") {
  persister = createSyncStoragePersister({
    storage: window.localStorage,
  });
}

export default function Layout() {
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
