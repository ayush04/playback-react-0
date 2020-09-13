import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PlaybackProvider from './playback-context';

ReactDOM.render(
  <PlaybackProvider>
    <App />    
  </PlaybackProvider>,
  document.getElementById('root')
);