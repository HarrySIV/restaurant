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
