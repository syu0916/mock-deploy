import { Dispatch, SetStateAction } from "react";
import Table from "react-bootstrap/Table";
import { TableComponent } from "./TableComponentView";

interface REPLOutputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  toggle: number;
  responses: JSX.Element[];
  setResponses: Dispatch<SetStateAction<JSX.Element[]>>;
}

interface ViewOutputProp {
  type: string;
  data: dataResponse;
  error_message: string;
}

interface dataResponse {
  headers: string[];
  body: string[][];
}

/**
 * this component handles all of the behavior necessary to view a given dataset
 * @param prop: a prop containing all of the passed state hooks. 
 */
export function ViewOutput(command: string, prop: REPLOutputProps, responseMap: JSON | null) {
   
    let concatenatedResponse :JSX.Element;
    let convertedResponseMap: ViewOutputProp = responseMap as unknown as ViewOutputProp;
    
    // errored response maps should output nothing but an informative message.
    if (responseMap == null || responseMap == undefined|| convertedResponseMap.type == "error") {
      console.log(responseMap)
      concatenatedResponse = 
        <div className = "error-message" aria-label = "view-error">
          {prop.toggle == 0 ? 'Brief output: ' : 'Verbose output: command = ' + command}
          <b>No dataset has been loaded at this time.</b>
        </div>
      prop.setResponses([...prop.responses, concatenatedResponse, 
        <hr aria-label = "command-separator"></hr>])
      return
    } 
    
    // valid responses to be viewed.
    concatenatedResponse = 
    <div aria-label = 'view-response'>
      {prop.toggle == 0 ? 'Brief output: ' : 'Verbose output: command = ' + command}
      {TableComponent(responseMap)}
    </div>;
    prop.setResponses([...prop.responses, concatenatedResponse, 
    <hr aria-label = "command-separator"></hr>])
}

