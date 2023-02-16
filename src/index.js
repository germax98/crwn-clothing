import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/product.context';
import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> 
        <ProductProvider>
          <App />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>  
  </React.StrictMode>
);


