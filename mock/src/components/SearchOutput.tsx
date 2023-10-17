import { Dispatch, SetStateAction } from "react";
import { TableComponentSearch } from "./TableComponentSearch";
import { mockedSearchZoo } from "../../mocks/searchResponse";

interface REPLOutputProps {
  toggle: number;
  responses: JSX.Element[];
  setResponses: Dispatch<SetStateAction<JSX.Element[]>>;
  currentDataset: any;
}

/**
 * produces the output for searches based on the search mocks.
 * @param command the full command containing search and its arguments
 * @param prop an object contianing all of the state hooks that are needed.
 */
export function searchOutput(command: string, prop: REPLOutputProps) {
  let splitCommand: string[] = command.split(" ");
  let searchColumn: string | number = splitCommand[1];
  let searchTerm: string = splitCommand[2];
  let concatenatedResponse: JSX.Element;

  // if the current dataset is not loaded
  if (prop.currentDataset == null || prop.currentDataset == undefined || prop.currentDataset["type"] == "error") {
    concatenatedResponse = (
      <div className="error-message" aria-label="search-error">
        {prop.toggle == 0 ? 'Brief output: ' : 'Verbose output: command = ' + command}
        <b>No dataset has been loaded at this time.</b>
      </div>
    );
    prop.setResponses([
      ...prop.responses,
      concatenatedResponse,
      <hr aria-label="command-separator"></hr>,
    ]);
  } 
  // if there is a dataset loaded:
  else {
    let temp = mockedSearchZoo(searchColumn, searchTerm);
    console.log(temp)
    if (temp.length == 1 && temp[0].length == 0) {
      concatenatedResponse = (
        <div className="error-message" aria-label="search-error">
          {prop.toggle == 0 ? 'Brief output: ' : 'Verbose output: command = ' + command}
          <b>No entries with column or search term were found in loaded csv.</b>
        </div>
      );
    } else {
      concatenatedResponse = (
        <div aria-label="search-response">
          {prop.toggle == 0 ? 'Brief output: ' : 'Verbose output: command = ' + command}
          {TableComponentSearch(mockedSearchZoo(searchColumn, searchTerm))}
        </div>
      );
    }

    prop.setResponses([
      ...prop.responses,
      concatenatedResponse,
      <hr aria-label="command-separator"></hr>,
    ]);
  }
}
