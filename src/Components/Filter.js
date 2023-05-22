import React from "react";
import "./componentcss/Filter.css";

function Filter({selectedFloor, onFloorChange }) {


  return (
    <div>
       <select value={selectedFloor} className="filter-dropdown" onChange={onFloorChange}>
        <option value="All Floors">All Floors</option>
        <option value="0">Ground Floor</option>
        <option value="1">Floor 1</option>
        <option value="2">Floor 2</option>
        <option value="3">Floor 3</option>
        <option value="4">Floor 4</option>
      </select>
    </div>
  );
}

export default Filter;

