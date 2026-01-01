import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/context/DataContext";
import { NarrativeShell } from "@/components/narrative/NarrativeShell";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            {/* All routes render the same NarrativeShell - scroll sync handles positioning */}
            <Route path="/" element={<NarrativeShell />} />
            <Route path="/truth" element={<NarrativeShell />} />
            <Route path="/poverty" element={<NarrativeShell />} />
            <Route path="/labor" element={<NarrativeShell />} />
            <Route path="/wealth" element={<NarrativeShell />} />
            <Route path="/simulator" element={<NarrativeShell />} />
            <Route path="/methodology" element={<NarrativeShell />} />
            <Route path="/data" element={<NarrativeShell />} />
            <Route path="/deprecated" element={<NarrativeShell />} />
            <Route path="*" element={<NarrativeShell />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
