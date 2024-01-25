import { render } from "preact";
import * as Sentry from "@sentry/browser";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationProvider } from "preact-iso";

import { Header } from "./components/Header";
import { Home } from "./pages/Home/index.jsx";
import "./style.css";

Sentry.init({
  dsn: "https://523bcd0e95c565ef1f4c580690e75a9b@o4506630100090880.ingest.sentry.io/4506630117916672",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  enabled: import.meta.env.PROD,
});

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Home />
        </main>
      </LocationProvider>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
