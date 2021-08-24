import React, { useCallback, useEffect, useState, useMemo } from "react";
import './App.css';
import sampleData from './sampleData.js';
import Button from './components/button';
import SearchInput from './components/search-input';
import CardSection from './components/card-section';

function App() {
  // withSampleData = true -> use sample data in sampleData.js. 
  // withSampleData = false -> to use API calls
  const [withSampleData, setwithSampleData] = useState(false);

  const [dataRetrieved, setDataRetrieved] = useState([]);
  const [footerExtraInfo, setfooterExtraInfo] = useState('2021');

  const [entity, setEntity] = useState('characters');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState('');

  const handleClickChangeDataSource = useCallback( () => {
    setwithSampleData( ( currentValue ) => !currentValue );
  }, [] );

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
  }, [withSampleData, entity, query, filters] );

  const fetchApi = useCallback( async () => {
    let response = await fetch(
      `${process.env.REACT_APP_MARVEL_API_URL}/${entity}${query}?${filters}&ts=${process.env.REACT_APP_MARVEL_API_TS}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}&hash=${process.env.REACT_APP_MARVEL_API_HASH}`
    );
    const dataFromAPI = await response.json();
    setDataRetrieved(dataFromAPI.data.results);
    setfooterExtraInfo(dataFromAPI.attributionText);
  }, [entity, query, filters] );

  const handleClickChangeEntity = useCallback( (entity) => {
    setEntity(entity);
    setQuery('');
    setFilters('');
  }, [] );

  const handleChangeSearchInput = useCallback( (entity, value) => {
    switch (entity) {
      case 'characters':
        setFilters((value ? 'nameStartsWith=' + value : ''));
      break;
      case 'comics':
        setFilters((value ? 'titleStartsWith=' + value : ''));
      break;
    }
    setEntity(entity);
  }, [] );

  let content;

  if ( dataRetrieved.length > 0 ) {
    content = (
      <CardSection
        type={ entity }
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

      <section className="button-container">
        <Button
          handleClick={handleClickChangeDataSource}
          text={ `Change data source (To ${ ( withSampleData ? 'API' : 'Sample' ) })` }
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

      { (!withSampleData) && 
        <section className="search-input-container">
          <SearchInput
            id="searchCharacter"
            text="Character name"
            placeholder="Name starts with ..."
            handleOnChange={ (currentValue) => handleChangeSearchInput( 'characters', currentValue.target.value ) }
          />

          <SearchInput
            id="searchComic"
            text="Comic title"
            placeholder="Title starts with ..."
            handleOnChange={ (currentValue) => handleChangeSearchInput( 'comics', currentValue.target.value ) }
          />
        </section>
      }

      { content }

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