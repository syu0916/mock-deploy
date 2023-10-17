import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';
import { VerbosityController } from './VerbosityController';



/**
 * The overall component to be returned to the UI
 */
export default function REPL() {
  
  // deprecated.
  const [cmdList, setCommandList] = useState<string[]>([]);

  // maintains the history of all of the commands and their outputs
  const [responses, setResponses] = useState<JSX.Element[]>([]);

  // maintains the verbosity mode of the 
  const [verbosity, setVerbosity] = useState<number>(0);

  // maintains the dataMap of all of the previously tried file paths
  const [dataMap, setDataMap] = useState<Map<string, JSON>>(new Map<string, JSON>())

  // maintains the LOADED datset
  const [currentDataset, setCurrentDataset] = useState<JSON | null>(null)


  return (
    <div className="repl">  
      <REPLHistory history = {responses}/>

      <VerbosityController toggle = {verbosity} setToggle = {setVerbosity}/>
      <hr></hr>

      {/* {REPL Input handles all of the work and divides and conquers across other components} */}
      <REPLInput toggle = {verbosity} setToggle = {setVerbosity} 
      responses = {responses} setResponses= {setResponses}
      dataMap={dataMap} setDataMap={setDataMap}
      currentDataset = {currentDataset} setCurrentDataset = {setCurrentDataset}/>
      
    </div>
  );
}
