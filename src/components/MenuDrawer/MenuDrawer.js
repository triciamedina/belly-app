import React from 'react';
import './MenuDrawer.css';

import { Button } from '../UI/UI';

function MenuDrawer(props) {
    return (
        // Need to add an overlay to disable layer behind drawer
        <div className='MenuDrawer'>
            <div className='Profile'>
                {/* Move avatar to its own component in UI? */}
                <div className='Avatar pink'>
                    TM
                </div>
                <h2 className='Profile__username'>
                    Username
                </h2>
                <Button className='Button sign-out'>
                    Sign out
                </Button>
            </div>
        </div>
    )
}

export default MenuDrawer;