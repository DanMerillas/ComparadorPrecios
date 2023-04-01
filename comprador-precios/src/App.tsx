import React from 'react';
import './App.css';
import { NewButtons } from './components/NewButtons';
import { ReactTable } from './components/ReactTable';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <NewButtons/>
      </header>
      <section>
       <ReactTable/>
      </section>
    </div>
  );
}

export default App;
