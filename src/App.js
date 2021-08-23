import React, { useCallback, useEffect, useState } from "react";
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
  const [filters, setFilters] = useState('nameStartsWith=White');

  const handleClickChangeDataSource = useCallback( () => {
    setwithSampleData( ( currentValue ) => !currentValue );
    if ( withSampleData ) {
      setEntity('characters');
    }
  }, [] );

  useEffect( () => {
    if ( withSampleData ) {
      // With sample data
      setfooterExtraInfo(sampleData.attributionText)
      setDataRetrieved(sampleData.data.results);
    } else {
      // With API calls
      async function fetchMarvelAPI() {
        let response = await fetch(
          `${process.env.REACT_APP_MARVEL_API_URL}/${entity}${query}?${filters}&ts=${process.env.REACT_APP_MARVEL_API_TS}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}&hash=${process.env.REACT_APP_MARVEL_API_HASH}`
        );
        const dataFromAPI = await response.json();
        setDataRetrieved(dataFromAPI.data.results);
        setfooterExtraInfo(dataFromAPI.attributionText)
      }

      fetchMarvelAPI();
    }

  }, [withSampleData, entity, query, filters] );

  const handleClickChangeToCharacters = () => {
    setEntity('characters');
    setQuery('');
    setFilters('');
  };

  const handleClickChangeToComics = () => {
    setEntity('comics');
    setQuery('');
    setFilters('');
  };

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
              handleClick={handleClickChangeToCharacters}
              text="Characters"
            />

            <Button
              handleClick={handleClickChangeToComics}
              text="Comics"
            />
          </>
        }
      </section>

      { (!withSampleData) && 
        <>
          <section className="search-input-container">
            <SearchInput
              id="searchCharacter"
              text="Character name"
              placeholder="Name starts with ..."
              handleOnChange={ (currentValue) => {
                setFilters((currentValue.target.value ? 'nameStartsWith=' + currentValue.target.value : ''));
                setEntity('characters');
                } }
            />

            <SearchInput
              id="searchComic"
              text="Comic title"
              placeholder="Title starts with ..."
              handleOnChange={ (currentValue) => {
                setFilters((currentValue.target.value ? 'titleStartsWith=' + currentValue.target.value : ''));
                setEntity('comics');
                } }
            />
          </section>
        </>
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