import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Playlists from "@/pages/Playlists";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-black">
          <main className="flex-grow overflow-x-hidden">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/playlists" component={Playlists} />
            </Switch>
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
