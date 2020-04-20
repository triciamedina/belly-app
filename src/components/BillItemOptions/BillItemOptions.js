import React, { useRef, useEffect } from 'react';
import './BillItemOptions.css';
import { IconShare, IconTrash } from '../UI/UI';

function BillItemOptions(props) {
    
    function useOutsideClick(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                event.preventDefault();
                props.onOutsideClick();
            }
          }
          // Bind the event listener
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    return (
        <>
        <div className='disableClicks'></div>
        <div className='BillItemOptions' ref={wrapperRef}>
            <ul className='OptionsList'>
                <li className='Option'>
                    <button>
                        <IconShare />
                        <span>
                            Share
                        </span>
                    </button>
                </li>
                <li className='Option'>
                    <button
                        id={props.id}
                        onClick={props.onDelete()}
                    >
                        <IconTrash />
                        <span>
                            Delete
                        </span>
                    </button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default BillItemOptions;