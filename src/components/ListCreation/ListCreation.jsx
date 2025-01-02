import React from 'react';
import ListContainer from '../ListContainer/ListContainer';

const ListCreation = ({ list1, list2, newList, onMoveItem }) => {
  return (
    <div className="list-creation">
      <ListContainer title="List 1" items={list1} onMoveItem={onMoveItem} listNumber={1} />
      <div className="new-list-container">
        <h2>New List</h2>
        <div className="list-items">
          {newList.map((item) => (
            <div key={item.id} className="list-item">
              <h3>{item.name}</h3>
              <button onClick={() => onMoveItem(3, 2, item.id)}>&lt;</button>
            </div>
          ))}
        </div>
      </div>
      <ListContainer title="List 2" items={list2} onMoveItem={onMoveItem} listNumber={2} />
    </div>
  );
};

export default ListCreation;
