import { render } from "preact";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationProvider } from "preact-iso";

import { Home } from "./pages/Home/index.jsx";
import "./style.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        {/* <Header /> */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Home />
        </main>
      </LocationProvider>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
