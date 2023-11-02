import { Fragment } from "react";
import { useState } from "react";

export default function FilterBySteps({ value, onChange }) {
    return (
      <div>
        <h3>Number of Steps</h3>
        <input
          type="range"
          min="1"
          max="40"
          value={value}
          name='numberOfSteps'
          onChange={onChange}
        ></input>
        <p>Selected value: {value}</p>
      </div>
    );
  }