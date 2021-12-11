import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV, faPen, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV, faPen, faSave, faWindowClose);

const Menu = ( {handleLoadCanvas, handlePrint, handleSave, colors, setColors, height, width, handleBackgroundImage, cellColor, handleChange, handleSubmit, handleBackgroundColor, handleCellColor} ) => {
	
	const [editingColors, setEditingColors] = useState(false);
	const [newColors, setNewColors] = useState(JSON.parse(JSON.stringify(colors)));
	const [activeColorEditId, setActiveColorEditId] = useState(-1);
	const [activeColorEditColor, setActiveColorEditColor] = useState('');


	useEffect(() => {
		if (activeColorEditId !== -1) {
			let tmpColors = JSON.parse(JSON.stringify(newColors))
			tmpColors[activeColorEditId-1] = {color: activeColorEditColor, id: activeColorEditId};
			setNewColors(tmpColors);
			console.log(tmpColors)
		}
	}, [activeColorEditColor])

	const handleColorEdit = (color, id) => {
		setActiveColorEditId(id);
		setActiveColorEditColor(color);
	}


	const handleEditStart = () => {
		setNewColors(JSON.parse(JSON.stringify(colors)))
		setEditingColors(!editingColors);
	}

	const handleEditSave = () => {
		handleCellColor({color: activeColorEditColor, id: activeColorEditId})
		setActiveColorEditId(-1);
		console.log(JSON.parse(JSON.stringify(newColors)))
		setColors(JSON.parse(JSON.stringify(newColors)))
		setEditingColors(false);
	}

	const handleEditCancel = () => {
		console.log('Editing canceled')
		setActiveColorEditId(-1);
		setEditingColors(!editingColors);
	}

	const ColorPicker = ({ colorsToRender = [], colorSetter = (obj) => console.log("set color to", obj) }) => {
		let colorArray;
		let colorElementArr = [];
		if (!colorsToRender.length) {
			colorArray = [
				{ color: '#009688', id: 1 },
				{ color: '#fff', id: 2 },
				{ color: '#fff', id: 3 },
				{ color: '#fff', id: 4 },
				{ color: '#fff', id: 5 },
				{ color: '#fff', id: 6 },
				{ color: '#fff', id: 7 },
				{ color: '#fff', id: 8 },
				{ color: '#fff', id: 9 },
			]
		} else {
			colorArray = colorsToRender;
		}

		colorArray.forEach((colorObj) => {
			let {color, id} = colorObj;
			colorElementArr.push(
				<div
				key={id}
				>
					<div 
					className={editingColors ? (activeColorEditId === id ? 'colorPicker-cell color-edit-selected' : 'colorPicker-cell color-edit') : (cellColor.id === id ? 'colorPicker-cell color-selected' : 'colorPicker-cell') }
					style={{background: id === activeColorEditId ? activeColorEditColor : color }}
					onClick={editingColors ? () => handleColorEdit(color, id) : () => colorSetter(colorObj)}
					>
						<p className='cell-num noselect'>{id}</p>
					</div>
					{id === activeColorEditId && <div className='sketch'><SketchPicker color={color} onChange={(color) => setActiveColorEditColor(color.hex)}/> </div>}
				</div>
			)
		})
		colorElementArr.push(
			<React.Fragment key='edit'>{!editingColors &&
			<div 
			key={'edit'}
			className={'colorPicker-cell utility-button'}
			onClick={handleEditStart}
			>
				<FontAwesomeIcon icon="pen"/>
			</div>}</React.Fragment>
		)
		colorElementArr.push(
			<React.Fragment key='edit-save'>{editingColors &&
			<div 
			key={'edit-save'}
			className={'colorPicker-cell utility-button'}
			onClick={handleEditSave}
			>
				<FontAwesomeIcon icon="save"/>
			</div>}</React.Fragment>
		)
		colorElementArr.push(
			<React.Fragment key='edit-cancel'>{editingColors &&
			<div 
			key={'edit-cancel'}
			className={'colorPicker-cell utility-button'}
			onClick={handleEditCancel}
			>
				<FontAwesomeIcon icon="window-close"/>
			</div>}</React.Fragment>
		)
		return (
			<div className="colorPicker-row">
				{colorElementArr.map(e => e)}
			</div>
		)
	}
	
	const menu = (<div className="App-Settings">
                <form id="sizePicker">
				<div className='form-buttons'>
                  <label>
                  <FontAwesomeIcon icon="arrows-alt-v" /> Height:
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
                  <FontAwesomeIcon icon="arrows-alt-h" /> Width:
                  <input
                    type="number"
                    id="input_width"
                    name="width"
                    min="1"
                    value={width}
                    onChange={handleChange} />
                  </label>
				  </div>
                  <div className='form-buttons'>
                  <input
                    type="submit"
					className="input_submit"
                    value="Create new canvas"
                    onClick={handleSubmit} />
				<br />
				<input
					type="submit"
					className="input_submit"
					value="Save canvas"
					onClick={handleSave}
				/>
				<br />
				</div>

				<div className='form-buttons'>
				<input
					type="submit"
					className="input_submit"
					value="Show"
					onClick={handlePrint}
				/>
				<br />
				<input
                    type="submit"
					className="input_submit"
                    value="Load saved canvas"
                    onClick={handleLoadCanvas} />

				<input
                    type="file"
					className="input_submit"
                    value=""
                    onChange={handleBackgroundImage} />
				</div>
                </form>


				<ColorPicker colorsToRender={editingColors ? newColors : colors} colorSetter={handleCellColor}/>
                

              </div>);

		return (
		<>
			{menu}
		</>
		)
}

export default Menu