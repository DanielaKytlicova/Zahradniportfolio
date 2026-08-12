import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "@/contexts/LangContext";
import { ContentProvider } from "@/contexts/ContentContext";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Nabidka from "@/pages/Nabidka";
import OAtelieru from "@/pages/OAtelieru";
import Vzdelavani from "@/pages/Vzdelavani";
import ProgramDetail from "@/pages/ProgramDetail";
import Kontakt from "@/pages/Kontakt";
import Admin from "@/pages/Admin";

function ConditionalNav() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  return <Nav />;
}

function App() {
  return (
    <HelmetProvider>
      <ContentProvider>
        <LangProvider>
          <BrowserRouter>
            <ScrollToTop />
            <ConditionalNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/nabidka" element={<Nabidka />} />
              <Route path="/o-atelieru" element={<OAtelieru />} />
              <Route path="/vzdelavani" element={<Vzdelavani />} />
              <Route path="/vzdelavani/:slug" element={<ProgramDetail />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </LangProvider>
      </ContentProvider>
    </HelmetProvider>
  );
}

export default App;
