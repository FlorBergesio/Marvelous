import './App.css';
import sampleData from './sampleData.js';

function App() {
  // withSampleData = true -> use sample data in sampleData.js. 
  // withSampleData = false -> to use API calls
  const withSampleData = true;
  let characterArray = [];

  if ( withSampleData ) {
    // With sample data
    characterArray = sampleData.data.results;
  } else {
    // With API calls

  }

  if ( characterArray.length <= 0 ) {
    return (
      <div className="App">
        <h1>Marvelous</h1>
        <p>There are no characters available.</p>
      </div>
    );
  }

  const charactersToDisplay = characterArray.map( ( element ) => {
    return (
      <div className="single-character">
        <h3>{ element.name }</h3>
        <img className="single-character-profile-pic"
          src={ element.thumbnail.path + '.' + element.thumbnail.extension }
          alt={ element.name }
        />
      </div>
    );
  });

  return (
    <div className="App">
      <header>
        <h1>Marvelous</h1>
      </header>
      <section>
        <h2>Characters</h2>
        <div className="characters">
          { charactersToDisplay }
        </div>
      </section>
    </div>
  );
}

export default App;