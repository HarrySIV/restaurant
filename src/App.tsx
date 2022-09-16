import React from 'react';
import './styles/_app.scss';

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Locations } from './pages/Locations';
import { Careers } from './pages/Careers';
import { Order } from './pages/Order';
import { ErrorPage } from './pages/ErrorPage';
import { SiteMap } from './shared/SiteMap';
import { MainHeader } from './shared/Header/MainHeader';

import { useHttpClient } from './shared/hooks/http-hook';
import { LoadingSpinner } from './shared/UIElements/LoadingSpinner';
import { OrderProvider } from './shared/hooks/orderContext/OrderContext';

export function App() {
  const { isLoading } = useHttpClient();
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
      <div className="wrapper">
        <OrderProvider>
          <MainHeader />
          <main>
            {isLoading && <LoadingSpinner />}
            {routes}
          </main>
        </OrderProvider>
      </div>
      <SiteMap />
    </BrowserRouter>
  );
}
