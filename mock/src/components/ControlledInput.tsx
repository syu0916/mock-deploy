import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }


  /**
   * @param value:the value input into the input field
   * @param setValue: the state updater for the shared state
   * @param ariaLabel: the arialabel associated with this component
   */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }