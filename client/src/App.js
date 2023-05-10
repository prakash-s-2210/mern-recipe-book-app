// Importing required dependencies
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import ProfilePage from "./components/profilePage/ProfilePage";
import LoginPage from "./components/loginPage/loginPage/LoginPage";
import {useSelector} from "react-redux";

// Main App component
function App() {
  // Using the useSelector hook to get the token from the Redux store
  const isAuth = Boolean(useSelector((state) => state.token)); 
  // Rendering the app with BrowserRouter and Routes components
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Defining the routes and their corresponding components */}
          <Route path = "/" element = {<LoginPage />} />
          {/* If authenticated, render HomePage component, else navigate to login page */}
          <Route path = "/home" element = {isAuth ? <HomePage /> : <Navigate  to = "/" />} /> 
          {/* If authenticated, render ProfilePage component, else navigate to login page */}
          <Route path = "/profile/:userId" element = {isAuth ? <ProfilePage/> : <Navigate to = "/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
