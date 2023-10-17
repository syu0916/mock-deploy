import { Dispatch, SetStateAction } from 'react';
import '../styles/main.css';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    history: JSX.Element[]

}

/**
 * @param props: an object containing the history state hook that maintains the history
 */
export function REPLHistory(props : REPLHistoryProps) {
    console.log(props)

    // manages the history of the commands and their outputs.
    return (
        <div className="repl-history">
            {props.history.map(logEntrance => logEntrance)}
        </div>
    );
}