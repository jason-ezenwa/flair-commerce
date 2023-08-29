import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from "./components/Home";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import About from "./components/About";
function App() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/shop' exact element={<Shop />} />
        </Routes>
        
    </Router>
);

}
export default App;