import React, { useCallback, useEffect, useState, createContext, useRef } from "react";
import './App.css';
import sampleData from './sampleData.js';
import Button from './components/button';
import SearchInput from './components/search-input';
import CardSection from './components/card-section';
import Modal from './components/modal';

export const EntityContext = createContext('characters');

function App() {
  // withSampleData = true -> use sample data in sampleData.js. 
  // withSampleData = false -> to use API calls
  const [withSampleData, setwithSampleData] = useState(false);

  const [dataRetrieved, setDataRetrieved] = useState([]);
  const [footerExtraInfo, setfooterExtraInfo] = useState('2021');

  const [entity, setEntity] = useState('characters');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState('');

  const [customCharacters, setCustomCharacters] = useState([]);

  const refInputName = useRef(null);
  const refInputURL = useRef(null);

  const handleClickChangeDataSource = useCallback( () => {
    setwithSampleData( ( currentValue ) => !currentValue );
  }, [] );

  const fetchApi = useCallback( async () => {
    let response = await fetch(
      `${process.env.REACT_APP_MARVEL_API_URL}/${entity}${query}?${filters}&ts=${process.env.REACT_APP_MARVEL_API_TS}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}&hash=${process.env.REACT_APP_MARVEL_API_HASH}`
    );
    const dataFromAPI = await response.json();
    setDataRetrieved(dataFromAPI.data.results);
    setfooterExtraInfo(dataFromAPI.attributionText);
  }, [entity, query, filters] );

  useEffect( () => {
    if ( withSampleData ) {
      // With sample data
      setEntity('characters');
      setfooterExtraInfo(sampleData.attributionText);
      setDataRetrieved(sampleData.data.results);
    } else {
      // With API calls
      fetchApi();
    }
  }, [withSampleData, entity, query, filters, customCharacters, fetchApi] );

  const handleClickChangeEntity = useCallback( (entity) => {
    setEntity(entity);
    setQuery('');
    setFilters('');
  }, [] );

  const handleChangeSearchInput = useCallback( async (entity, value) => {
    if ( withSampleData ) {
      const filtro = await dataRetrieved.filter( (element) => element.name.toLowerCase().slice(0, value.length) === value.toLowerCase() );
      setDataRetrieved(filtro);
      return;
    } else {
      switch (entity) {
        case 'characters':
          setFilters((value ? 'nameStartsWith=' + value : ''));
        break;
        case 'comics':
          setFilters((value ? 'titleStartsWith=' + value : ''));
        break;
        default:
          setFilters('');
        break;
      }
    }
    
    setEntity(entity);
  }, [withSampleData, dataRetrieved] );

  const [modal, setModal] = useState({
    showModal: false,
    url: ''
  });

  const handleModal = useCallback( (url) => {
      setModal( () => { return {showModal: true, url } } );
  }, [] );

  const closeModal = () => setModal({showModal: false, url: ''});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const heroName = refInputName.current.value;
    const heroURL = refInputURL.current.value;

    const heroImg = {
      path: heroURL.slice(0, heroURL.lastIndexOf(".")),
      extension: heroURL.slice(heroURL.lastIndexOf(".") + 1)
    };

    const newEntryArray = [{
      id: (customCharacters.length + 1),
      name: heroName,
      thumbnail: heroImg
    }];
    setCustomCharacters([...newEntryArray, ...customCharacters]);
  };

  let content;

  if ( dataRetrieved.length > 0 ) {
    content = (
      <CardSection
        data={ dataRetrieved }
      />
    );
  } else {
    content = (
      <p className="error"><span>There are no results available.</span></p>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Marvelous</h1>
      </header>

      {modal.showModal &&
        <Modal closeModal = {closeModal}>
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

      <section className="button-container">
        <Button
          handleClick={handleClickChangeDataSource}
          text={ `Change data source (To ${ ( withSampleData ? 'API' : 'Sample' ) })` }
        />

        <Button
          handleClick={handleModal}
          text="Add your own hero"
        />

        { (!withSampleData) && 
          <>
            <Button
              handleClick={ () => { handleClickChangeEntity('characters') } }
              text="Characters"
            />

            <Button
              handleClick={ () => { handleClickChangeEntity('comics') } }
              text="Comics"
            />
          </>
        }
      </section>

       
      <section className="search-input-container">
        <SearchInput
          id="searchCharacter"
          text="Character name"
          placeholder="Name starts with ..."
          handleOnChange={ (currentValue) => handleChangeSearchInput( 'characters', currentValue.target.value ) }
        />

        { (!withSampleData) &&
          <SearchInput
            id="searchComic"
            text="Comic title"
            placeholder="Title starts with ..."
            handleOnChange={ (currentValue) => handleChangeSearchInput( 'comics', currentValue.target.value ) }
          />
        }
      </section>
      
      { (customCharacters.length > 0) &&
        <EntityContext.Provider value="characters">
          <CardSection
            data={ customCharacters }
            customTitle="Your heroes"
          />
        </EntityContext.Provider>
      }

      <EntityContext.Provider value={entity}>
        { content }
      </EntityContext.Provider>

      <footer>
        <p>{`Marvelous - ${footerExtraInfo}`}</p>
        <a
          href="https://github.com/FlorBergesio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with love
        </a>
      </footer>
    </div>
  );
}

export default App;