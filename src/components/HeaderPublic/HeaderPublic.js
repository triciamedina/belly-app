import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderPublic.css';
import { Header } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';

function HeaderPublic() {
    return (
        <Header className='Header Public'>
            <LockupHorizontal />
            <div>
                <Link className='TextLink' to='/login'>
                    Sign in
                </Link>
                <Link className='ButtonLink' to='/register'>
                    Try it out
                </Link>
            </div>
        </Header>
    )
}

export default HeaderPublic;