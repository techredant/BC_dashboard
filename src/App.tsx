import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Overview from "./pages/Overview";
import UsersPage from "./pages/UsersPage";
import VerificationPage from "./pages/VerificationPage";
import PoliticiansPage from "./pages/PoliticiansPage";
import FeedsPage from "./pages/FeedsPage";
import MarketsPage from "./pages/MarketsPage";
import TrendsPage from "./pages/TrendsPage";
import LivestreamsPage from "./pages/LivestreamsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/politicians" element={<PoliticiansPage />} />
            <Route path="/feeds" element={<FeedsPage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="/livestreams" element={<LivestreamsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
