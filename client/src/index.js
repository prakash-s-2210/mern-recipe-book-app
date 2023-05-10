// Importing required dependencies 

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state/index";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH, 
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Persist configuration options
const persistConfig = {key: "root", storage, version: 1};

// Creating the persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Creating the Redux store with the persisted reducer and ignoring certain actions
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// Creating the root element and rendering the App component with the Provider and PersistGate components
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading ={null} persistor = {persistStore(store)}>
        <App />
      </PersistGate> 
    </ Provider>
  </>
);