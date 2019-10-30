import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';

ReactDOM.render(<App />, document.getElementById('root'));

WebFont.load({
    google: {
      families: ['Lobster:300,400,700', 
        'Quicksand:300,400,700', 
        'Courgette:300,400,700',
        'sans-serif']
    }
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
