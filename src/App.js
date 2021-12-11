import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu';

const App = (props) => {
    window.addEventListener('beforeunload', () => {
      window.confirm()
    })

    const [height, setHeight] = useState(40)
    const [width, setWidth] = useState(78)
    const [background, setBackground] = useState('#fff')
    const [cellColor, setCellColor] = useState({color: '#f44336', id: 1})
    const [mouseDown, setMouseDown] = useState(false)
    const [menuVisible, setMenuVisible] = useState(true)
    const [backgroundImage, setBackgroundImage] = useState('')
    const [colors, setColors] = useState([
				{ color: '#009688', id: 1 },
				{ color: '#fff', id: 2 },
				{ color: '#fff', id: 3 },
				{ color: '#fff', id: 4 },
				{ color: '#fff', id: 5 },
				{ color: '#fff', id: 6 },
				{ color: '#fff', id: 7 },
				{ color: '#fff', id: 8 },
				{ color: '#fff', id: 9 },
			])

      useEffect(() => {
        handleSubmit();
      }, [])

      useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [window.performance]);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

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
  
  const handleSave = (e) => {
    e.preventDefault();

    if (window.confirm('This will override the previous save, are you sure you want to save?')) {
      const canvas = document.querySelector("#pixel_canvas");
      console.log(canvas.innerHTML);

      localStorage.setItem('savedCanvas', canvas.innerHTML);
    }
  }

  const handleLoadCanvas = (e) => {
    e.preventDefault();
    if (window.confirm('This will load previously saved canvas and remove all unsaved data, are you sure you want to continue?')) {
      const canvas = document.querySelector("#pixel_canvas");
      const storedCanvas = localStorage.getItem('savedCanvas');
      if(storedCanvas) {
        canvas.innerHTML = '';
        canvas.innerHTML += storedCanvas;
      }
    }
  }
  
  const handlePrint = (e) => {
    e.preventDefault();
    const canvas = document.querySelector("#pixel_canvas");

    localStorage.setItem('printableCanvas', canvas.innerHTML);
    window.open("/print.html", "_blank")
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const canvas = document.querySelector("#pixel_canvas");
    if (event && !window.confirm('This will create new canvas and will remove all unsaved data, are you sure you want to continue?')) {
      return
    }
    canvas.innerHTML = '';
    setBackground('#fff');
    setCellColor({ color: '#009688', id: 1 })

    for (let x = 0; x < height; x++) {
      let row = document.createElement("tr");
      row.innerHTML += `<td class='no-border'><span class='cell-num'>${x + 1}</span></td>`
      canvas.appendChild(row);

      for (let y = 0; y < width; y++) {
        let cell = document.createElement("td");
        cell.id = `cell-${x}-${y}`
        row.appendChild(cell);
      }
    }
    let numRow = document.createElement("tr");
    canvas.appendChild(numRow);
    let placeholderCell = document.createElement("td");
    placeholderCell.classList.add('no-border')

    numRow.appendChild(placeholderCell);

    for (let y = 0; y < width; y++) {
      let cell = document.createElement("td");
      cell.classList.add('no-border')
      cell.innerHTML = `<span class='cell-num'>${y + 1}</span>`
      cell.id = `cell-${y + 1}-${y}`
      numRow.appendChild(cell);
    }
  }

  // Cell color
  const handleCellColor = (color) => {
    setCellColor(color);
/*     if (!colors[color.hex]) {
      const tmpColors = { ...colors };
      tmpColors[color.hex] = Object.keys(colors).length + 1
      setColors(tmpColors);
    } */
  }

  const handleCellColorOnClick = (event) => {
    let idToBeUpdated = event.target.id;
    
    // TODO; Figure out how to make this but faster
    /*
    let bool = false;
    if (idToBeUpdated[0] === ('p')) {
      idToBeUpdated = event.target.parentNode.id;
      bool = true;
    } */
    if ((document.getElementById(idToBeUpdated) && String(idToBeUpdated).startsWith('cell'))) {
      document.getElementById(idToBeUpdated).style.backgroundColor = cellColor.color;
      document.getElementById(idToBeUpdated).innerHTML = `<p id='ph-${idToBeUpdated}' class='cell-num noselect'>${colors[cellColor.id-1].id}</p>`;
    }
      setMouseDown(true);
  }

  const handleMouseState = () => {
    setMouseDown(false);
  }


  const handleBackgroundImage = (e) => {
    e.preventDefault();

    if (window.FileReader) {
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();

      reader.onload = (ev) => {
          setBackgroundImage(ev.target.result)
          console.log(backgroundImage)
      }
      reader.readAsDataURL(file); 
    } else {
      window.alert('file reading not supported')
    }
  }
  // Remove color
  const handleColorRemove = (event) => {
    let idToBeUpdated = event.target.id;

    console.log(idToBeUpdated[0])
    if (idToBeUpdated[0] === ('p')) {
      idToBeUpdated = event.target.parentNode.id;
    }

    document.getElementById(idToBeUpdated).style.backgroundColor = '';
    document.getElementById(idToBeUpdated).innerHTML = '';
  }

  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  }

  // TODO: Separate into single components
  return (
    <div className="App">

      <header className="App-header">
        <Menu
          handleLoadCanvas={handleLoadCanvas}
          handlePrint={handlePrint}
          handleSave={handleSave}
          colors={colors}
          setColors={setColors}
          height={height}
          width={width}
          cellColor={cellColor}
          menuVisible={menuVisible}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleBackgroundImage={handleBackgroundImage}
          handleCellColor={handleCellColor}
          handleMenuVisible={handleMenuVisible}
        />
      </header>

      <div className="App-Content">


        <div className={menuVisible ? "Canvas" : "Canvas full-width"}>
          <table
            id="pixel_canvas"
            style={{backgroundColor: background, backgroundImage: `url(${backgroundImage})`}}
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
