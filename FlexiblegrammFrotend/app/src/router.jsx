import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navi from "./components/shared/navi";
import Home from "./components/home/home";
import ChartsArchive from "./components/chartsArchive/chartsArchive";
import Flowchart from "./components/charts/flowChart/flowChart";
import Overlay from "./components/overlay/overlayModal";
import ColumnChart from "./components/charts/columnChart/columnChart";
import BarChart from "./components/charts/barChart/barChart";
import OverlayAuth from "./components/overlay/overlayAuth";
import OverlayRegister from "./components/overlay/overlayRegister";
// import Announcements from "./components/chartsArchive/chartsInputBoxes/announcements";
import ShowFlowCharts from "./components/chartsArchive/flowChartInput/showFlowCharts";
import ShowBarCharts from "./components/chartsArchive/barChartInput/showBarCharts";
import ShowColumnChartsCharts from "./components/chartsArchive/columnChartInput/showColumnCharts";

function Rooter() {
    const [showOverlay, setShowOverlay] = useState(true);
    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const [isLoginVisible, setLoginVisible] = useState(false);
    const toggleOverlayLogin = () => {
        setLoginVisible(!isLoginVisible);
    };

    const [isUserRegisterVisible, setUserRegisterIsVisible] = useState(false);
    const toggleOverlayRegister = () => {
          setUserRegisterIsVisible(!isUserRegisterVisible);
    };
  
    return (
        <Router>
            <Navi toggleOverlay={toggleOverlay} toggleOverlayLogin={toggleOverlayLogin}/>
            <Overlay showOverlay={showOverlay} toggleOverlay={toggleOverlay}/>
            <OverlayAuth isLoginVisible={isLoginVisible} toggleOverlayLogin={toggleOverlayLogin} toggleOverlayRegister={toggleOverlayRegister}/>
            <OverlayRegister isUserRegisterVisible={isUserRegisterVisible} toggleOverlayRegister={toggleOverlayRegister} toggleOverlayLogin={toggleOverlayLogin}/>
            <Routes>
                <Route path="/chartsArchive" element={<ChartsArchive/>}/>
                {/* <Route path="/chartsArchive/Announcements" element={<Announcements/>}/> */}
                <Route path="/chartsArchive/flowCharts" element={<ShowFlowCharts/>}/>
                <Route path="/chartsArchive/barCharts" element={<ShowBarCharts/>}/>
                <Route path="/chartsArchive/ColumnCharts" element={<ShowColumnChartsCharts/>}/>
                <Route path="/columnChart" element={<ColumnChart/>}/>
                <Route path="/flowChart" element={<Flowchart/>}/>
                <Route path="/barChart" element={<BarChart/>}/>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
        </Router>
    );
};

export default Rooter;