import '../styles/App.css';
// import { OutputBox } from './OutputBox';
import REPL from './REPL';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * This is the highest level component!
 */
function App() {
  let input: string[] = ['testing'];

  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>

      <REPL />      
    </div>
  );
}

export default App;
