import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignAdd from "./pages/marketplace/AssignAdd";
import AllAds from "./pages/marketplace/AllAdds";
import EditAd from "./pages/marketplace/EditAd";
import MarketplaceHeader from "./components/Marketplace/MarketplaceHeader";

function App() {

  return (
    <Router>
      <MarketplaceHeader />
  
      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}

          //sanduni


          //jithma


          //lakshitha

          <Route path="/create-ad" element={<AssignAdd />} />
          <Route path="/all-ads" element={<AllAds />} />
          <Route path="/edit-ad/:id" element={<EditAd />} />
          //primal
        </Routes>
      </div>
    </Router>
  );
}

export default App;
