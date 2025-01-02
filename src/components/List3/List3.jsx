import React from 'react';
import './List3.css'

const List3 = ({ list3, onRemoveFromList3 }) => {
  return (
    <div className="list-container">
      <div className="list-header">
        <h2>List 3</h2>
      </div>
      <div className="list-items">
        {list3.map((item) => (
          <div key={item.id} className="list-item">
            <h3>{item.name}</h3>
            <button onClick={() => onRemoveFromList3(item.id)}>&lt;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List3;
