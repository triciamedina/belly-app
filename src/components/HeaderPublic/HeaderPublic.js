import React from 'react';
import './HeaderPublic.css';

import { Header, TextLink } from '../UI/UI';
import { Lockup } from '../UI/Logo';

function HeaderPublic() {
    return (
        <Header className='Header Public'>
            <Lockup />
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