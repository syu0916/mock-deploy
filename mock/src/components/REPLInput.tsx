import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import {LoadOutput} from './LoadOutput'
import { ViewOutput } from './ViewOutput';
import { searchOutput } from './SearchOutput';

import {loadResponse} from './response'
import Button from 'react-bootstrap/Button';

/**
 * This interface contains all of the possible states managed in this component.
 * 
 */
interface REPLInputProps{
  // verbosity controller
  toggle: number
  setToggle: Dispatch<SetStateAction<number>>

  // command and output history
  responses: JSX.Element[]
  setResponses: Dispatch<SetStateAction<JSX.Element[]>>

  // stored filepaths to their datasets
  dataMap: Map<string, JSON>
  setDataMap: Dispatch<SetStateAction<Map<string, JSON>>>

  // the current dataset being operated on
  currentDataset: JSON | null
  setCurrentDataset:  Dispatch<SetStateAction<JSON | null>>
}

/**
 * This is the center control for all of the endpoints. This is the center
 * from which all other mocks are called, and it handles all of the possible
 * inputs. 
 * @param props: an object containing all of the above fields 
 */
export function REPLInput(props : REPLInputProps) {

    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');

    // manages the number of times the submit button has been pressed
    const [count, setCount] = useState<number>(0);

    // manages the map from filepath to dataset
    const [dataMap, setDataMap] =useState(new Map<string, JSON>())


    
    /**
     * handles the command-line input and outputs the approriate response
     * @param command the endpoint to be hit
     */
    function handle(command : string) {
      if (command == "") {
        props.setResponses([...props.responses, <hr aria-label = "command-separator"></hr>]);
      }

      let splitCommand : string[] = command.split(" ")
      let parsedCommand : string = splitCommand[0];
      let response: any;
      if (splitCommand[0].toLowerCase() == "load_csv") {

        // display error message for user
        if (splitCommand.length < 2) {

          props.setResponses([...props.responses, 
            <div className = {'error-message'} aria-label= {'load-error'}>
              <p><b>load_csv requires at least 1 argument.</b></p>
            </div>, 
          <hr></hr>])
        } else {

          if (dataMap.has(splitCommand[1])){
            response = dataMap.get(splitCommand[1])
          } else {
            response = loadResponse(splitCommand)
            setDataMap(dataMap.set(splitCommand[1], response))
          }
        }


        // setting the current dataset for other handlers to use
        console.log(response)
        props.setCurrentDataset(response)
        LoadOutput(command , props, response)
        


      } 
      // toggle the verbosity 
      else if (splitCommand[0].toLowerCase() == "mode") {
        if (props.toggle == 0) {
          props.setToggle(1)
        } else {
          props.setToggle(0)
        }

      } 
      // view endpoint: 
      else if (splitCommand[0].toLowerCase() == "view") {
        response = loadResponse(splitCommand)
        ViewOutput(command, props, props.currentDataset)
        handleSubmit(parsedCommand)

      } 
      // search endpoint: 
      else if (splitCommand[0].toLowerCase() == "search") {
        response = loadResponse(splitCommand)
        searchOutput(command, props)
        handleSubmit(parsedCommand)
      } 
      
      // catch-all for other unimplmented endpoints
      else {
        response = loadResponse(splitCommand)
        props.setResponses([...props.responses,
        <div className = "error-message" aria-label = "invalid-command-error">
          <b>invalid command</b>
        </div>, <hr aria-label = "command-separator"></hr>])
        handleSubmit(command + " is not a valid command.")
      }

    }

    function handleSubmit(commandString : string) {
      setCount(count + 1);
    }

    return (
        <div className="repl-input">

            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>

            <Button variant = "primary" aria-label='submit-button' onClick = {() => handle(commandString)}>Submitted {count} </Button>
        </div>
    );
  }