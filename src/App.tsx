import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import CaseStudy from "./pages/CaseStudy";
import { useI18n } from "./i18n/I18nProvider";
import Reading from "./pages/Reading";


const queryClient = new QueryClient();

const App = () => {
  const { dir } = useI18n();

  return (
    <div dir={dir} className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/main" element={<Main />} />
              <Route path="/case-studies/:slug" element={<CaseStudy />} />
              <Route path="/reading/:slug" element={<Reading />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      </div>
    );
  };

export default App;
