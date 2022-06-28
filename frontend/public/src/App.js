import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import './App.css';

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import Home from './pages/Home.js';
import Menu from './pages/Menu.js';
import About from './pages/About.js';
import Locations from './pages/Locations.js';
import Careers from './pages/Careers.js';
import ErrorPage from './pages/ErrorPage.js';
import SiteMap from './shared/Footer/SiteMap.js';
import MainHeader from './shared/Header/MainHeader.js';

const firebaseConfig = {
  apiKey: "AIzaSyDwJUnAUl0S-FamWe8M3d-HlgjMlPF4Cs8",
  authDomain: "not-a-restaurant.firebaseapp.com",
  projectId: "not-a-restaurant",
  storageBucket: "not-a-restaurant.appspot.com",
  messagingSenderId: "833439949669",
  appId: "1:833439949669:web:870c59c95dc6cbd65cb78c",
  measurementId: "G-LCTF99W2WN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/error-page" element={<ErrorPage />} />
      <Route path="/redirect" element={<Navigate to="/error-page" />} />
    </Routes>
  );
  return (
    <BrowserRouter>
      <div className="wrapper">
        <MainHeader />
        <main>{routes}</main>
      </div>
      <SiteMap />
    </BrowserRouter>
  );
}

export default App;
