import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from './/pages/Register';
import Main from './pages/Main';
import ForgotPassword from './pages/Forgot';
import Login from './pages/Login';
import Word from './pages/Word';
import Test from './pages/Test';
import Analysis from './pages/Analysis';

const routes=createBrowserRouter(
    [
        // Sayfa Bulunamadı
        {
            path:'*',
            element:<App/>
        },
        // Giriş
        {
        path:'/',
        element:<App/>
      },
        // Girdikten Sonraki Sayfa
        {
        path:'/Main',
        element:<Main/>
      },
      {
        // register
        path:'/Register',
        element:<Register/>
      },
      {
        // register
        path:'/Login',
        element:<Login/>
      },
      {
        // şifre unuttum
        path:'/Forgot',
        element:<ForgotPassword/>
      },
      {
        // Kelime Ekleme
        path:'/Word',
        element:<Word/>
      
      },
      {
        // Test Sayfası
        path:'/Test',
        element:<Test/>
      },
      {
        // Analiz Sayfası
        path:'/Analysis',
        element:<Analysis/>
      
      }
    ])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={routes}/>
  </React.StrictMode>
);