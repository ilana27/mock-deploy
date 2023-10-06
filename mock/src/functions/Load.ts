// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState} from 'react';

/**
 * Defines the kinds of sequence we are thinking of---the answer to 
 * the puzzle. We might imagine swapping in many of these and using 
 * the same puzzle infrastructure. 
 * 
 * @param guess A 3-number sequences
 * @returns true or false, depending on if the sequence matches
 */
export function load(filepath: string, setNotification: Dispatch<SetStateAction<string>>) {
    
}
  