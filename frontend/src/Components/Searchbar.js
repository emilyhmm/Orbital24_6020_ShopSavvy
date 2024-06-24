import React, { useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import '../App.css'

function Searchbar() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      console.log('Event:', e);
      e.preventDefault();
      try {
        navigate(`/products?search=${input}`);
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
      }
    };
  
    return (
      <div className="header__search">
        <form onSubmit={handleSubmit} className="header__searchForm">
          <input
            className="header__searchInput"
            type="text"
            placeholder="Type to search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="header__searchButton">
            <SearchIcon className="header__searchIcon" />
          </button>
        </form>
      </div>
    );
  }
  export default Searchbar;
  
  