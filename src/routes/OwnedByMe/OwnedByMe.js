import React from 'react';
import './OwnedByMe.css';

import { ButtonLink } from '../../components/UI/UI';

function OwnedByMe() {
    return (
        <div className='OwnedByMe'>
            <div className='OwnedByMe__title-container'>
                <h2 className='OwnedByMe__title'>
                    Owned by me
                </h2>
                <ButtonLink className='ButtonLink OwnedByMe__add-button'>
                    <span>New bill</span>
                </ButtonLink>
            </div>
            {/* BillsList here */}
        </div>
    )
}

export default OwnedByMe;