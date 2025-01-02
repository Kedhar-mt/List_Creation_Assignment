import React from 'react';
import './ListItem.css'

const ListItem = ({ item, onMoveItem, listNumber }) => {
  return (
    <div className="list-item">
      <h3>{item.name}</h3>
      <button onClick={() => onMoveItem(listNumber, 3, item.id)}>&gt;</button>
    </div>
  );
};

export default ListItem;
