import React, { useEffect, useState } from 'react';
import { LIST_CREATION_API_URL } from './constants/apiUrls';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import ListContainer from './components/ListContainer/ListContainer';
import ListCreation from './components/ListCreation/ListCreation';
import List3 from './components/List3/List3';
import Loader from './components/Loader/Loader';
import './App.css';

const App = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListCreationMode, setIsListCreationMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([false, false]);
  const [newList, setNewList] = useState([]);
  const [originalList3, setOriginalList3] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(LIST_CREATION_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        const list1Data = data.lists.filter((item) => item.list_number === 1);
        const list2Data = data.lists.filter((item) => item.list_number === 2);
        setList1(list1Data);
        setList2(list2Data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load data. Please try again.');
        setLoading(false);
      });
  };

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  const handleSelectList = (listNumber) => {
    const newSelectedLists = [...selectedLists];
    newSelectedLists[listNumber - 1] = !newSelectedLists[listNumber - 1];
    setSelectedLists(newSelectedLists);
  };

  const handleCreateList = () => {
    if (selectedLists.filter(Boolean).length !== 2) {
      alert('You should select exactly 2 lists to create a new list');
      return;
    }
    setIsListCreationMode(true);
    setNewList([]);
  };

  const handleMoveItem = (fromList, toList, itemId) => {
    let itemToMove;
    let updatedFromList;
    let updatedToList;

    if (fromList === 1) {
      itemToMove = list1.find((item) => item.id === itemId);
      updatedFromList = list1.filter((item) => item.id !== itemId);
      updatedToList = [...newList, itemToMove];
      setList1(updatedFromList);
      setNewList(updatedToList);
    } else if (fromList === 2) {
      itemToMove = list2.find((item) => item.id === itemId);
      updatedFromList = list2.filter((item) => item.id !== itemId);
      updatedToList = [...newList, itemToMove];
      setList2(updatedFromList);
      setNewList(updatedToList);
    } else if (fromList === 3) {
      itemToMove = newList.find((item) => item.id === itemId);
      updatedFromList = newList.filter((item) => item.id !== itemId);
      if (toList === 2) {
        updatedToList = [...list2, itemToMove];
        setList2(updatedToList);
      } else {
        updatedToList = [...list1, itemToMove];
        setList1(updatedToList);
      }
      setNewList(updatedFromList);
    }
  };

  const handleRemoveFromList3 = (itemId) => {
    const updatedList3 = list3.filter((item) => item.id !== itemId);
    setList3(updatedList3);
  };

  const handleCancel = () => {
    setIsListCreationMode(false);
    setNewList([]);
    setList3(originalList3);
  };

  const handleUpdate = () => {
    setOriginalList3([...list3]);
    setList3([...newList]);
    setNewList([]);
    setIsListCreationMode(false);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="failure">
        <img
          src="https://assets.ccbp.in/frontend/content/react-js/list-creation-failure-lg-output.png"
          alt="failure"
        />
        <button onClick={handleRetry}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>List Creation</h1>
        <ButtonGroup
          onCreateList={handleCreateList}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
        />
      </div>

      {!isListCreationMode ? (
        <div className="lists-container">
          <ListContainer
            title="List 1"
            items={list1}
            onSelect={handleSelectList}
            onMoveItem={handleMoveItem}
            listNumber={1}
          />
          <ListContainer
            title="List 2"
            items={list2}
            onSelect={handleSelectList}
            onMoveItem={handleMoveItem}
            listNumber={2}
          />
          {list3.length > 0 && (
            <List3 list3={list3} onRemoveFromList3={handleRemoveFromList3} />
          )}
        </div>
      ) : (
        <ListCreation
          list1={list1}
          list2={list2}
          newList={newList}
          onMoveItem={handleMoveItem}
        />
      )}
    </div>
  );
};

export default App;
