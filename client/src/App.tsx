import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Bio from "@/pages/Bio";
import Music from "@/pages/Music";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow overflow-x-hidden">
            <div id="home" className="scroll-mt-16">
              <Home />
            </div>
            <div id="bio" className="scroll-mt-16">
              <Bio />
            </div>
            <div id="music" className="scroll-mt-16">
              <Music />
            </div>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
