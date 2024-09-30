import '../Question/smallwindow.css';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../UseContext/context';

function SmallWindow({ show, handleClose, data, onSave }) {
    const { darkMode, AddNote } = useAppContext();
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    // Initialize note from AddNote based on questionId
    const [note, setNote] = useState('');

    useEffect(() => {
        // Find note from AddNote array based on questionId
        const foundNote = AddNote.find(element => element.questionId === data._id);
        if (foundNote) {
            setNote(foundNote.notes);  // If a note is found, set it
        } else {
            setNote('');  // If no note is found, clear the note
        }
    }, [data, AddNote]);  // Re-run effect when `data` or `AddNote` changes

    // Handle save logic
    const handleSave = () => {
        onSave(note);  // Call onSave with the current note
        setNote('');  // Clear note after saving
        handleClose();  // Close the modal
    };

    return (
        <div className={showHideClassName}>
            <section className={`modal-main`}>
                <div className='name1'>{data.Name}</div>
                <button className="close-btn" onClick={handleClose}>×</button>
                <div className={`data`}>
                    <textarea
                        className='text-black-500'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows="19"
                        cols="20"
                    ></textarea>
                    <button className='saveNotebtn' onClick={handleSave}>Save</button>
                </div>
            </section>
        </div>
    );
}

export default SmallWindow;
