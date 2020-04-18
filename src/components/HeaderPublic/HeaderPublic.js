import React from 'react';
import './HeaderPublic.css';

import { Header, TextLink } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';

function HeaderPublic() {
    return (
        <Header className='Header Public'>
            <LockupHorizontal />
            <div>
                <TextLink className='TextLink' href='#'>
                    Sign in
                </TextLink>
                <TextLink className='TextLink' href='#'>
                    Sign up
                </TextLink>
            </div>
        </Header>
    )
}

export default HeaderPublic;