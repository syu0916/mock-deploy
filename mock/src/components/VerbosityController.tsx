// TODO: implement the radio button that controls the brevity of the response.
import { Dispatch, SetStateAction } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'

interface VerbosityToggler {
    toggle: number
    setToggle: Dispatch<SetStateAction<number>>
}

/**
 * this component handles the behavior for the verbosity toggler
 * @param prop: an object containing the toggler state hook and the 
 * setter for the state hook
 */
export function VerbosityController(prop : VerbosityToggler) {
    function toggleVerbosity () {
        if (prop.toggle == 0) {
            prop.setToggle(1)
        } else {
            prop.setToggle(0)
        }
    }

    return (
        // a button that has a label on it, indicating whether is in brief 
        // or verbose mode.
        <ToggleButton id = 'verbosity-control' value = {prop.toggle} 
        onClick = {() => toggleVerbosity()}>
            {prop.toggle == 0 ? 'brief' : 'verbose'}
        </ToggleButton>
    );
}