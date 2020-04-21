import React, { useRef, useEffect } from 'react';
import './OutsideClick.css';

function OutsideClick(props) {
    const { onOutsideClick } = props;
    const wrapperRef = useRef(null);
    
    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                  event.preventDefault();
                  onOutsideClick();
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
    
    useOutsideClick(wrapperRef);

    return (
        <>
            <div className='disableClicks'></div>
            {React.cloneElement(props.children, { ref: wrapperRef })}
        </>
    )
}

export default OutsideClick;