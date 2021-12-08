import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV);

const Menu = ( {height, width, backgroundColor, cellColor, menuVisible, handleChange, handleSubmit, handleBackgroundColor, handleCellColor, handleMenuVisible} ) => {
	const menu = (<div className="App-Settings">

                <h2>Canvas Settings</h2>
                {/*<h3>Choose Grid Size</h3>*/}
                <form id="sizePicker">
                  <label>
                  <FontAwesomeIcon icon="arrows-alt-v" /> Grid Height:
                  <input
                    type="number"
                    id="input_height"
                    name="height"
                    min="1"
                    value={height}
                    onChange={handleChange} />
                  </label>
                  <br />
                  <label>
                  <FontAwesomeIcon icon="arrows-alt-h" /> Grid Width:
                  <input
                    type="number"
                    id="input_width"
                    name="width"
                    min="1"
                    value={width}
                    onChange={handleChange} />
                  </label>
                  <p>
                  <input
                    type="submit"
                    id="input_submit"
                    value="Create grid"
                    onClick={handleSubmit} />
                  </p>
                </form>

                <hr className="Separator" />

                <h3>Pick A Background Color</h3>
                <CirclePicker
                  onChangeComplete={handleBackgroundColor}
                  color={ backgroundColor }
                />

                <hr className="Separator" />

                <h3>Pick A Color</h3>
                <CirclePicker
                  onChangeComplete={handleCellColor}
                  color={ cellColor }
                />
                <p>Hint: Double click to remove a color</p>
              </div>);

	const button = (
		<div className={menuVisible ? "mobile-menu menu-open" : "mobile-menu menu-closed"}>
            <button className="show-settings" onClick={handleMenuVisible}>
              {menuVisible
                ? <FontAwesomeIcon icon="angle-left" size="lg" />
                : <FontAwesomeIcon icon="angle-right" size="lg" />
              }
            </button>
        </div>
	)

	if (menuVisible) {
		return (
		<>
			{menu}
			{button}
		</>
		)
	} 
	return button
}

export default Menu