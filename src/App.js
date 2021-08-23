import React, { useCallback, useEffect, useState } from "react";
import './App.css';
import sampleData from './sampleData.js';
import Button from './components/button';
import CardSection from './components/card-section';

function App() {
  // withSampleData = true -> use sample data in sampleData.js. 
  // withSampleData = false -> to use API calls
  const [withSampleData, setwithSampleData] = useState(true);

  const [dataRetrieved, setDataRetrieved] = useState([]);
  const [footerExtraInfo, setfooterExtraInfo] = useState('2021');

  const handleClickChangeDataSource = useCallback( () => {
    setwithSampleData( ( currentValue ) => !currentValue );
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
          `${process.env.REACT_APP_MARVEL_API_URL}/characters?nameStartsWith=White&ts=${process.env.REACT_APP_MARVEL_API_TS}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}&hash=${process.env.REACT_APP_MARVEL_API_HASH}`
        );
        const dataFromAPI = await response.json();
        setDataRetrieved(dataFromAPI.data.results);
        setfooterExtraInfo(dataFromAPI.attributionText)
      }

      fetchMarvelAPI();
    }

  }, [withSampleData] );

  let content;

  if ( dataRetrieved.length > 0 ) {
    content = (
      <CardSection
        title="Characters"
        type="characters"
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
          text="Change data source"
        />
      </section>

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