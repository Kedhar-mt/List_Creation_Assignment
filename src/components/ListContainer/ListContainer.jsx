import React from 'react';
import ListItem from '../ListItem/ListItem';

const ListContainer = ({ title, items, onSelect, onMoveItem, listNumber }) => {
  return (
    <div className="list-container">
      <div className="list-header">
        <h2>{title}</h2>
        <input type="checkbox" onChange={() => onSelect(listNumber)} />
      </div>
      <div className="list-items">
        {items.map((item) => (
          <ListItem key={item.id} item={item} onMoveItem={onMoveItem} listNumber={listNumber} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
