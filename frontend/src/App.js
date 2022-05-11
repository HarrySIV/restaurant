import './App.css';

import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home.js';
import Menu from './pages/Menu.js';
import About from './pages/About.js';
import Locations from './pages/Locations.js';
import ErrorPage from './pages/ErrorPage.js';
import SiteMap from './shared/Footer/SiteMap.js';
import MainHeader from './shared/Header/MainHeader.js';

function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} exact />
      <Route path="/about" element={<About />} />
      <Route path="/locations" element={<Locations />} exact />
      <Route path="/error-page" element={<ErrorPage />} />
      <Route path="/redirect" element={<Navigate to="/error-page" />} exact />
    </Routes>
  );
  return (
    <BrowserRouter>
      <MainHeader />
      <main>{routes}</main>
      <SiteMap />
    </BrowserRouter>
  );
}

export default App;
