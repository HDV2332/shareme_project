import React from "react";
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'

ReactDom.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <Router>
            <App/>
        </Router>
    </GoogleOAuthProvider>
, document.getElementById('root'))