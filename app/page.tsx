import { AppProvider } from "@/lib/AppContext";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
