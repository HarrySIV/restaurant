import './_app.scss';

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import { Home } from './pages/home/Home';
import { Menu } from './pages/menu/Menu';
import { About } from './pages/About';
import { Locations } from './pages/Locations';
import { Careers } from './pages/Careers';
import { Order } from './pages/order/Order';
import { ErrorPage } from './pages/ErrorPage';
import { SiteMap } from './shared/sections/SiteMap';
import { MainHeader } from './shared/sections/header/MainHeader';
import { OrderProvider } from './shared/hooks/orderContext/OrderContext';

export function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/order" element={<Order />} />
      <Route path="/error-page" element={<ErrorPage />} />
      <Route path="/redirect" element={<Navigate to="/error-page" />} />
    </Routes>
  );
  return (
    <BrowserRouter>
      <div className="body">
        <div className="main-wrapper">
          <OrderProvider>
            <MainHeader />
            <main>{routes}</main>
          </OrderProvider>
        </div>
        <SiteMap />
      </div>
    </BrowserRouter>
  );
}
