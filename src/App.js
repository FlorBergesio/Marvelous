import './App.css';
import sampleData from './sampleData.js';
import CardSection from './components/card-section';

function App() {
  // withSampleData = true -> use sample data in sampleData.js. 
  // withSampleData = false -> to use API calls
  const withSampleData = true;
  let data = [];
  let footer = "";

  if ( withSampleData ) {
    // With sample data
    footer = sampleData.attributionText;
    data = sampleData.data.results;
  } else {
    // With API calls

  }

  if ( data.length <= 0 ) {
    return (
      <div className="App">
        <h1>Marvelous</h1>
        <p>There are no results available.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Marvelous</h1>
      </header>

      <CardSection
        title="Characters"
        type="characters"
        data={ data }
      />

      <footer>
        <p>{`Marvelous - ${footer}`}</p>
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