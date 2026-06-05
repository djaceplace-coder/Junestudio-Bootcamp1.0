/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import SecureCheckout from "./pages/SecureCheckout.tsx";
import Initiation from "./pages/Initiation.tsx";
import VaultLayout from "./pages/VaultLayout.tsx";
import VaultDashboard from "./pages/VaultDashboard.tsx";
import VaultDay1 from "./pages/VaultDay1.tsx";
import VaultDay2 from "./pages/VaultDay2.tsx";
import VaultDay3 from "./pages/VaultDay3.tsx";

export default function App() {
  return (
    <div className="bg-gradient-light min-h-screen text-slate-900 font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/secure-checkout" element={<SecureCheckout />} />
          <Route path="/initiation" element={<Initiation />} />
          <Route path="/vault" element={<VaultLayout />}>
            <Route index element={<VaultDashboard />} />
            <Route path="day-1" element={<VaultDay1 />} />
            <Route path="day-2" element={<VaultDay2 />} />
            <Route path="day-3" element={<VaultDay3 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
