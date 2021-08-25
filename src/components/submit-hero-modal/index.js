import React, { useCallback, useState, useRef } from "react";
import Button from './../button';
import Modal from './../modal';

const SubmitHeroModal = (props) => {
    const refInputName = useRef(null);
    const refInputURL = useRef(null);
  
    const [modal, setModal] = useState(false); 
  
    const switchModal = useCallback( () => {
      setModal( (current) => !current );
    }, [modal] );
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const heroName = refInputName.current.value;
      const heroURL = refInputURL.current.value;
  
      const heroImg = {
        path: heroURL.slice(0, heroURL.lastIndexOf(".")),
        extension: heroURL.slice(heroURL.lastIndexOf(".") + 1)
      };
  
      const newEntryArray = [{
        id: (props.customCharacters.all.length + 1),
        name: heroName,
        thumbnail: heroImg
      }];
      props.setCustomCharacters({...props.customCharacters, all: [...newEntryArray, ...props.customCharacters.all]});
    };
    
    return (
      <>
        <Button
              handleClick={switchModal}
              text="Add your own hero"
            />
  
        { modal &&
          <Modal closeModal = {switchModal}>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="inputName">Name:</label>
              <input 
                type="text" 
                id="inputName" 
                placeholder="Character's name"
                ref={refInputName}
              />
  
              <label htmlFor="inputImg">Image URL:</label>
              <input 
                type="text" 
                id="inputImg"
                ref={refInputURL} 
              />
  
              <Button
                type="Submit"
                text="Add character"
              />
            </form>
          </Modal>
        }
      </>
    );
};

export default SubmitHeroModal;