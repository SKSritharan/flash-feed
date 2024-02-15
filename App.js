import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppNavigation from "./navigations/AppNavigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}
