import { Dispatch, SetStateAction, useState} from 'react';

interface REPLOutputProps{
    toggle: number
    responses: JSX.Element[]
    setResponses: Dispatch<SetStateAction<JSX.Element[]>>
  }

interface ResponseMap {
  type: string
  data: JSON
  error_message: string
}

/**
 * @param response: A response map containing type, data
 */
function successResponseMap(response: ResponseMap) {
  return ([
    <li aria-label = "load-success-response">{"Response Type: "+  response["type"] }</li>, 
    <li>{response["type"] + ": " + JSON.stringify(response["data"])}</li>
  ])
}

/**
 * @param response: a response map containing type and error_message
 */
function errorResponseMap(response: ResponseMap) {
    return ([
      <li aria-label = "load-error-response">{"Response Type: "+  response["type"] }</li>, 
      <li>{response["type"] + ": " + JSON.stringify(response["error_message"])}</li>
    ])
  }


/**
 * @param command: the command called (load_csv ...)
 * @param props: an object containing the verbosity controller, the response 
 * history and the setter for that hook
 * @param response: the mocked response map from the loader
 */
export function LoadOutput(command : string, props : REPLOutputProps, response : ResponseMap){

    let splitCommand : string[] = command.split(" ")
    let filepath : string = splitCommand[1]

    let contentResponse : JSX.Element[]
    let concatenatedResponse : JSX.Element;

    // in the case where a filepath corresponding to the mock does not exist
    if (response == null || response == undefined) {
      // should never happen
      props.setResponses([
        ...props.responses, 

        <div className = {'error-message'} aria-label= {'load-error'}>
          <p><b>load_csv requires a valid filepath</b></p>
        </div>, 

      <hr></hr>]);
      return
    }

    // for all mocks that exist:
    if (response.type == "success") {
        contentResponse = successResponseMap(response)
    } else if (response.type == "error") {
        contentResponse = errorResponseMap(response)
    }  else {
      // should never happen
      props.setResponses([
        ...props.responses, 

        <div className = {'error-message'} aria-label= {'load-error'}>
          <p><b>load_csv requires a valid filepath</b></p>
        </div>, 

      <hr></hr>]);
      return
    }

    // verbose setting
    if (props.toggle == 0) {
      concatenatedResponse = 
      <div aria-label = "load-response">
        <p aria-label = "brief-label">
          <b>Brief Output: </b>
          <ul aria-label = "load-response-map">
            {contentResponse}
          </ul>
        </p>
      </div>
    }

    // non-verbose setting
    else if (props.toggle == 1) {
      concatenatedResponse = 
      <div aria-label = "load-response">
        <p>
          <b aria-label = "verbose-label">Verbose Output: </b>
          <ul aria-label = "load-response-map">
            <li>{"Command: " + command}</li>
            {contentResponse}
          </ul>
        </p>
      </div>
    }
    // shouldn't be possible... 
    else {
      concatenatedResponse = <div> this isn't right... </div>
    }
      props.setResponses([...props.responses, concatenatedResponse, 
      <hr aria-label = "command-separator"></hr>])

    }




