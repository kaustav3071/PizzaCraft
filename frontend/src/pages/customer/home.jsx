import React from "react";
import Header from "../../components/Header/Header";
import About from "../../components/About/about";
import Features from "../../components/Features/Features";
import AppDownload from "../../components/AppDownload/AppDownload";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <About />
            <Features />
            <AppDownload />
        </div>
    );
}

export default Home;