import React from "react";
import Home from "./pages/Home.jsx"
import Bookmarked from "./pages/Bookmarked.jsx";
import Saved from "./pages/Saved.jsx";
import ReadArticle from "./pages/ReadArticle.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();

    return (
        <div className="main-container">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/saved-articles" element={<Saved />} />
                <Route path="/bookmarked-articles" element={<Bookmarked />} />
                <Route path="/read-article" element={<ReadArticle />} />
            </Routes>
        </div>
    );
};

export default App;
