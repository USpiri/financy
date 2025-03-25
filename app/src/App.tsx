import { AppRouter } from "@/router/AppRouter";
import { AppProviders } from "@/components/providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
