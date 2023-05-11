import React, { useState } from "react";
import "../header/Header.scss";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {setLogout} from "../../state/index";
/**
 * The Header component displays the application header with the logo, search bar,
 * and user profile settings.
 *
 * @param {function} searchRecipes - A function that searches for recipes based on user input.
 * @param {boolean} isProfile - A boolean that determines if the header is being used on a profile page.
 * @returns {JSX.Element} - A JSX.Element representing the Header component.
 */
function Header({searchRecipes, isHome, handleNavigateHome, handleNavigateProfile}) {
  const dispatch = useDispatch();
  
  const userId = useSelector((state) => state.user._id)
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputData, setInputData] = useState("");
  const user = useSelector((state) => state.user);
  
   /**
   * Handles input changes for the search bar.
   *
   * @param {object} e - The input change event.
   */
  function handleInput(e) {
    e.preventDefault();
    if(inputData.trim() === ""){
      return;
    }
    else{
      const data = inputData.trim();
      searchRecipes(data);
    }
    setInputData("");
  }
  return (
    <div className="header-wrapper">
      {/* Logo */}
      <div className="logo-wrapper" onClick={() => handleNavigateHome()}>
        <img src={logo} alt="logo" className="logo-image" />
        <span className="name">Recipe Book</span>
      </div>
      {/* Search Bar (only shown on home page) */}
      {isHome && <form className="input-wrapper" onSubmit={(e) => handleInput(e)}>
        <input
          required
          type="text"
          value={inputData}
          className="header-input"
          onChange={(e) => setInputData(e.target.value)}
          placeholder="What do you want to cook today?"
        />
        <button type="submit" className="search-icon-wrapper">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon"
          />
        </button>
      </form>}

      {/* User Profile Settings */}
      <div className="profile-section-wrapper">
        <FontAwesomeIcon
          className="gear-icon"
          icon={faGear}
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        />
        {/* User Profile Dropdown */}
        <div
          className="profile-settings-wrapper"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <img
            className="user-image"
            src={`https://recipe-book-ycpw.onrender.com/assets/${user.picture}`}
            alt="user"
          />
          <span className="user-name">
            {user.firstName} {user.lastName}
          </span>
        </div>
        {/* User Profile Dropdown Options */}
        <div className={`dropdown-wrapper ${showDropdown ? "show" : "hide"}`}>
          <span className="dropdown-profile"onClick={() => {
            handleNavigateProfile(userId);
          }}>Profile</span>
          <span className="dropdown-logout" onClick={() => dispatch(setLogout())}>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
