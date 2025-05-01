import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignAdd from "./pages/marketplace/AssignAdd";
import AllAds from "./pages/marketplace/AllAdds";

function App() {

  return (
    <Router>
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
          //primal
        </Routes>
      </div>
    </Router>
  );
}

export default App;
