import { render } from "preact";
import { LocationProvider, ErrorBoundary, lazy, Router } from "preact-iso";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/browser";

import { Header } from "./components/Header";

import "./style.css";

Sentry.init({
  dsn: "https://523bcd0e95c565ef1f4c580690e75a9b@o4506630100090880.ingest.sentry.io/4506630117916672",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  enabled: import.meta.env.PROD,
});

const queryClient = new QueryClient();

const Home = lazy(() => import("./pages/Home/index.jsx"));
const Reservation = lazy(() => import("./pages/Reservation/index.jsx"));

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <ErrorBoundary>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Router>
              <Home path="/" />
              <Reservation path="/reservations" />
            </Router>
          </main>
        </ErrorBoundary>
      </LocationProvider>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
