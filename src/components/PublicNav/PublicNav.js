import React from 'react';
import './PublicNav.css';

import { Header, TextLink } from '../UI/UI';
import { Lockup } from '../UI/Logo';

function PublicNav() {
    return (
        <Header className='Header PublicNav'>
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

export default PublicNav;