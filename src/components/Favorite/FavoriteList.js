import React, { useState, useEffect } from "react";

function FavoriteList({ favoriteList, onItemRemove, onClearList }) {
  
  const [newItem, setNewItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    setIsListEmpty(favoriteList.length === 0);
  }, [favoriteList]);

  const handleNewItemChange = (event) => {
    setNewItem(event.target.value);
  };


  const handleNewItemSubmit = (event) => {
    event.preventDefault();
    const newItemTrimmed = newItem.trim();

    if (newItemTrimmed !== "") {
      if (favoriteList.includes(newItemTrimmed)) {
        setErrorMessage("This item is already in your favorite list.");
      } else {
        favoriteList.push(newItemTrimmed);
        onItemRemove([...favoriteList]);
        setNewItem("");
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please enter a valid item name.");
    }
  };


  const handleItemRemove = (itemIndex) => {
    const newFavoriteList = favoriteList.filter((item, index) => index !== itemIndex);
    onItemRemove(newFavoriteList);
  };

  const handleClearList = () => {
    onClearList();
  };


  return (
    <div>
      <h2>Your Favorite Items:</h2>
      <form onSubmit={handleNewItemSubmit}>
        <input
          type="text"
          placeholder="Add new item..."
          value={newItem}
          onChange={handleNewItemChange}
        />
        <button type="submit">Add</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {isListEmpty ? (
        <p>You don't have any favorite items yet.</p>
      ) : (
        <div>
          <ul>
            {favoriteList.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => handleItemRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearList}>Clear List</button>
        </div>
      )}
      <p>You have {favoriteList.length} favorite items.</p>
    </div>
  );
}

export default FavoriteList;
