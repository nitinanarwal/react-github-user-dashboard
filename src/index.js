import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  // dev--5dfs6q4.us.auth0.com
  // otjN1I8f1J2AAr2ufC6JQorFJtp08Adj
  <React.StrictMode>
    <Auth0Provider
      clientId='otjN1I8f1J2AAr2ufC6JQorFJtp08Adj'
      domain='dev--5dfs6q4.us.auth0.com'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//clientId='otjN1I8f1J2AAr2ufC6JQorFJtp08Adj'
// domain='dev--5dfs6q4.us.auth0.com'
//  domain={process.env.REACT_APP_DOMAIN}
// clientId={process.env.REACT_APP_CLIENT_ID}
