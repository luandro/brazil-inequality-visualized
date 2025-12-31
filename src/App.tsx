import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/context/DataContext";
import Home from "./pages/Home";
import Truth from "./pages/Truth";
import Poverty from "./pages/Poverty";
import Labor from "./pages/Labor";
import Wealth from "./pages/Wealth";
import Simulator from "./pages/Simulator";
import Methodology from "./pages/Methodology";
import DataExplorer from "./pages/DataExplorer";
import Deprecated from "./pages/Deprecated";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/truth" element={<Truth />} />
            <Route path="/poverty" element={<Poverty />} />
            <Route path="/labor" element={<Labor />} />
            <Route path="/wealth" element={<Wealth />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/data" element={<DataExplorer />} />
            <Route path="/deprecated" element={<Deprecated />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
