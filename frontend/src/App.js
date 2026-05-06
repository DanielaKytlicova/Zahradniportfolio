import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/contexts/LangContext";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Nabidka from "@/pages/Nabidka";
import OAtelieru from "@/pages/OAtelieru";
import Vzdelavani from "@/pages/Vzdelavani";
import Kontakt from "@/pages/Kontakt";

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/nabidka" element={<Nabidka />} />
          <Route path="/o-atelieru" element={<OAtelieru />} />
          <Route path="/vzdelavani" element={<Vzdelavani />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
