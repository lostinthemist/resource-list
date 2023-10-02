import React, { useState } from 'react';
import './App.css';
import { ReactComponent as EditIcon } from './TypedIcon/svg/edit-small.svg';
import { ReactComponent as DeleteIcon } from './TypedIcon/svg/trash-small.svg';
import { ReactComponent as CloseIcon } from './TypedIcon/svg/close-small.svg';

function App() {
  const [items, setItems] = useState<{ text: string; id: number }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editModes, setEditModes] = useState<boolean[]>([]);
  const [isInputFieldVisible, setInputFieldVisible] = useState<boolean>(false);
  const [detailView, setDetailView] = useState<{ isOpen: boolean; text: string }>({
    isOpen: false,
    text: '',
  });

  function showInputField(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setInputValue('https://');
    setInputFieldVisible(true);
  }

  function hideInputField() {
    setInputFieldVisible(false);
    if (inputValue === 'https://') {
      setInputValue('');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const allowedFileTypes = ['.png', '.jpg'];
      const selectedImages = Array.from(files).filter((file) =>
        allowedFileTypes.some((type) => file.name.endsWith(type))
      );

      selectedImages.forEach((image) => {
        const imageUrl = URL.createObjectURL(image); 
        const newItem = {
          text: imageUrl, 
          id: Date.now(),
        };
        setItems((prevItems) => [newItem, ...prevItems]);
        setEditModes([...editModes, false]);
      });
    }
  };

  const addItem = () => {
    if (inputValue.trim() !== '' && inputValue !== 'https://') {
      let transformedUrl = inputValue;
      if (inputValue.includes('youtube')) {
        const videoId = inputValue.split('v=')[1].split('&')[0];
        transformedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      const newItem = {
        text: transformedUrl,
        id: Date.now(),
      };
      setItems((prevItems) => [newItem, ...prevItems]);
      setEditModes([...editModes, false]);
      setInputValue('');
      hideInputField();
    }
    hideInputField();
  };

  const toggleEditMode = (index: number) => {
    const updatedEditModes = [...editModes];
    updatedEditModes[index] = !editModes[index];
    setEditModes(updatedEditModes);
  };

  const editItem = (index: number, newText: string) => {
    const updatedItems = [...items];
    updatedItems[index].text = newText;
    setItems(updatedItems);
    if (detailView.isOpen && detailView.text === items[index].text) {
      setDetailView({ isOpen: true, text: newText });
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    const updatedEditModes = editModes.filter((_, i) => i !== index);
    setEditModes(updatedEditModes);
    if (detailView.isOpen && detailView.text === items[index].text) {
      setDetailView({ isOpen: false, text: '' });
    }
  };

  const openDetailView = (text: string) => {
    setDetailView({ isOpen: true, text });
  };

  const closeDetailView = () => {
    setDetailView({ isOpen: false, text: '' });
  };

  return (
    <div className="App">
      <div className="App-sidebar">
        <form className="App-sidebar-inputArea">
          <button className="App-sidebar-btn" onClick={showInputField}>
            Insert URL
          </button>
          <label className='img-upload-input' htmlFor="img-upload">Upload IMG</label>
          <input
            type='file'
            placeholder='이미지 추가'
            id='img-upload'
            accept='.png, .jpg'
            multiple
            onChange={handleImageUpload}
          />
          {isInputFieldVisible && (
            <div className="url-inputArea">
              <input
                type="text"
                className="url-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={addItem}
              />
            </div>
          )}

        </form>
        <ul className="App-sidebar-list">
          {items.map((item, index) => (
            <li className={`App-sidebar-list-item ${detailView.isOpen && detailView.text === item.text ? 'active-item' : ''}`} key={item.id} onClick={() => openDetailView(item.text)}>
              {editModes[index] ? (
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => editItem(index, e.target.value)}
                  disabled={!editModes[index]}
                  key={item.id}
                  onBlur={() => toggleEditMode(index)}
                />
              ) : (
                <>
                  {item.text.endsWith('.png') || item.text.endsWith('.jpg') ? (
                    <>
                      <span>{item.text}</span>
                      <img src={item.text} alt='detail-view' className='App-sidebar-list-image' />
                    </>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </>
              )}

              <div className="App-sidebar-list-btnArea">
                <EditIcon className='svg-icon' width={19} height={19} onClick={() => toggleEditMode(index)} />
                <DeleteIcon className='svg-icon' width={19} height={19} onClick={() => deleteItem(index)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {detailView.isOpen && (
        <div className='App-detailSection'>
          <div className='App-detailSection-header'>
            <h2 className='App-detailSection-h2'>{detailView.text}</h2>
            <CloseIcon className='svg-icon' width={19} height={19} onClick={closeDetailView} />
          </div>
          <div className='App-detailSection-content'>
            <iframe src={detailView.text} title='detail-view' className='App-detailSection-iframe' />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

