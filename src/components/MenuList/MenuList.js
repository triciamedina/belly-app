import React from 'react';
import { useLocation } from 'react-router-dom';
import './MenuList.css';
import MenuLink from '../MenuLink/MenuLink';
import { IconEdit, IconUsers } from '../UI/UI';

function MenuList() {
    const location = useLocation().pathname;

    return (
        <ul className='MenuList'>
            <li className={`MenuList__item ${location === '/bills' && 'active'}`}>
                <MenuLink path='/bills' view='owned'>
                    <IconEdit />
                    <span className='MenuList__item__name'>
                        Owned by me
                    </span>
                </MenuLink>
            </li>
            <li className={`MenuList__item ${location === '/bills/shared' && 'active'}`}>
                <MenuLink path='/bills/shared' view='shared'>
                    <IconUsers />
                    <span className='MenuList__item__name'>
                        Shared with me
                    </span>
                </MenuLink>
            </li>
        </ul>
    );
};

export default MenuList;