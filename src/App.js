import React, { useState, useEffect } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu';

library.add(faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV);

const App = (props) => {

    const [height, setHeight] = useState(15)
    const [width, setWidth] = useState(15)
    const [background, setBackground] = useState('#fff')
    const [cellColor, setCellColor] = useState('#f44336')
    const [mouseDown, setMouseDown] = useState(false)
    const [menuVisible, setMenuVisible] = useState(true)
    const [colors, setColors] = useState({ '#f44336': 1 })

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch(name) {
      case 'width':
        setWidth(value);
        break;
      case 'height':
        setHeight(value);
        break;
      default:
        console.log('errr');
    }
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const canvas = document.querySelector("#pixel_canvas");
    canvas.innerHTML = '';
    setBackground('#fff');
    setCellColor('#f44336')
    setColors({ '#f44336': 1 })

    for (let x = 0; x < height; x++) {
      let row = document.createElement("tr");
      canvas.appendChild(row);

      for (let y = 0; y < width; y++) {
        let cell = document.createElement("td");
        cell.id = `cell-${x}-${y}`
        row.appendChild(cell);
      }
    }
  }

  // Cell color
  const handleCellColor = (color) => {
    setCellColor(color.hex);
    if (!colors[color.hex]) {
      const tmpColors = { ...colors };
      tmpColors[color.hex] = Object.keys(colors).length + 1
      setColors(tmpColors);
    }
  }

  const handleCellColorOnClick = (event) => {
    event.target.style.backgroundColor = cellColor;
    if (document.getElementById(event.target.id)) {
      document.getElementById(event.target.id).innerHTML = `<p class='cell-num noselect'>${colors[cellColor]}</p>`;
    }
      setMouseDown(true);
  }

  const handleMouseState = () => {
    setMouseDown(false);
  }

  // Table background color
  const handleBackgroundColor = (color) => {
    setBackground(color.hex);
  };

  // Remove color
  const handleColorRemove = (event) => {
    event.target.style.backgroundColor = '';
  }

  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  }

  // TODO: Separate into single components

  return (
    <div className="App">

      <header className="App-header">
        <h1>Pixel Art Maker</h1>
      </header>

      <div className="App-Content">
        <Menu 
        height={height}
        width={width}
        backgroundColor={background}
        cellColor={cellColor}
        menuVisible={menuVisible}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBackgroundColor={handleBackgroundColor}
        handleCellColor={handleCellColor}
        handleMenuVisible={handleMenuVisible}
        />

        <div className={menuVisible ? "Canvas" : "Canvas full-width"}>
          <h2>Design Canvas</h2>
          <table
            id="pixel_canvas"
            style={{backgroundColor: background}}
            onMouseDown={handleCellColorOnClick}
            onMouseMove={mouseDown ? handleCellColorOnClick : null}
            onMouseUp={handleMouseState}
            onMouseLeave={handleMouseState}
            onTouchStart={handleCellColorOnClick}
            onTouchMove={mouseDown ? handleCellColorOnClick : null}
            onTouchEnd={handleMouseState}
            onDoubleClick={handleColorRemove}>
          </table>
        </div>
      </div>

    </div>
  );
}

export default App;
