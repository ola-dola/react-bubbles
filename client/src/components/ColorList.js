import React, { useState } from "react";
import axios from "../axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axios()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        // console.log(res);
        const newArray = colors.filter(
          oldColor => oldColor.id !== colorToEdit.id
        );
        updateColors([...newArray, res.data]);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axios()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        const newColor = colors.filter(oldColor => color.id !== oldColor.id);
        updateColors(newColor);
      })
      .catch(err => console.log(err));
  };

  const addNewColor = e => {
    axios()
      .post("http://localhost:5000/api/colors", colorToAdd)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      <form onSubmit={addNewColor}>
        <legend>Add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                color: e.target.value
              })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add new color</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
