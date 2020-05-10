import React from 'react';
import './MenuList.css';
import MenuLink from '../MenuLink/MenuLink';
import { IconEdit, IconUsers } from '../UI/UI';
import { useStateValue } from '../../state';

function MenuList() {
    const [{ menu }] = useStateValue();
    const currentlyViewing = menu.currentlyViewing;

    return (
        <ul className='MenuList'>
            <li className={`MenuList__item ${currentlyViewing === 'owned' && 'active'}`}>
                <MenuLink path='/bills' view='owned'>
                    <IconEdit />
                    <span className='MenuList__item__name'>
                        Owned by me
                    </span>
                </MenuLink>
            </li>
            <li className={`MenuList__item ${currentlyViewing === 'shared' && 'active'}`}>
                <MenuLink path='/bills/shared' view='shared'>
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