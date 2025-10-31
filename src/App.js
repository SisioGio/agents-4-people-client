import React, { useState,useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/general/Home";
import NotFound from "./pages/general/NotFound";

import PrivacyStatement from './components/PrivacyStatement';


import { useLocation } from "react-router-dom";
import SonicAgent from './pages/general/SonicAgent';
import RestaurantHub from './pages/restaurant/RestaurantHub';
import RestaurantLogin from './pages/restaurant/account/Login'
import RequestPasswordReset from './pages/restaurant/account/RequestPasswordReset'
import PasswordReset from './pages/restaurant/account/ResetPassword'
import ProtectedRoute from './utils/ProtectedRoute'
import TableInterface from './pages/restaurant/TableInterface';
import RestaurantOfferComponent from './pages/general/offers/RestaurantOffer';
import ContactForm from './pages/general/ContactForm';
import GuestManager from './pages/airbnb/GuestsManager';
import AirbnbOffer from './pages/general/offers/airbnb';
const App = () => {




  return (

    
     
<Layout>
   
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/restaurant/dashboard" element={<ProtectedRoute><RestaurantHub /></ProtectedRoute>} />
          <Route path='/restaurant/login' element={<RestaurantLogin />}/>
          <Route path='/restaurant/request-password-reset' element={<RequestPasswordReset />}/>
          <Route path='/restaurant/reset-password' element={<PasswordReset />}/>
       <Route path='/airbnb/guest' element={<GuestManager />}/>
       <Route path='/offer/airbnb' element={<AirbnbOffer />}/>
       
      <Route path='/restaurant/do/:restaurant_name/:table_id' element={<TableInterface />}/>
<Route path ='/offer/restaurant' element={<RestaurantOfferComponent/>}/>
         
          {/* <Route path ='/agent' element={<VoiceAgent/>}/> */}
          <Route path ='/sonic' element={<SonicAgent/>}/>
         
          <Route path ='/privacy-policy' element={<PrivacyStatement/>}/>
         <Route path ='/contact' element={<ContactForm/>}/>
         
          
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Layout>
   
  );
};

export default App;
