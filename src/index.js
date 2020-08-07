import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import * as serviceWorker from './serviceWorker';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core';

const history=createBrowserHistory()
ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
