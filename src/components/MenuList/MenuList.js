import React from 'react';
import './MenuList.css';

import MenuLink from '../MenuLink/MenuLink';
import { IconEdit, IconUsers } from '../UI/UI';

function MenuList() {
    return (
        <ul className='MenuList'>
            <li className='MenuList__item'>
                <MenuLink path='/bills'>
                    <IconEdit />
                    <span className='MenuList__item__name'>
                        Owned by me
                    </span>
                </MenuLink>
            </li>
            <li className='MenuList__item'>
                <MenuLink path='/bills/shared'>
                    <IconUsers />
                    <span className='MenuList__item__name'>
                        Shared with me
                    </span>
                </MenuLink>
            </li>
        </ul>
    )
}

export default MenuList;