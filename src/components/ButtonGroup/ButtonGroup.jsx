import React from 'react';
import './ButtonGroup.css';

const ButtonGroup = ({ onCreateList, onCancel, onUpdate }) => {
  return (
    <div className="button-group">
      <button onClick={onCreateList} className="button">
        Create New List
      </button>
      <button onClick={onCancel} className="cancel-button">
        Cancel
      </button>
      <button onClick={onUpdate} className="update-button">
        Update
      </button>
    </div>
  );
};

export default ButtonGroup;
