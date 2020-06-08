import React from 'react';
import { Redirect } from  'react-router-dom';
import './LandingPage.css';
import HeaderPublic from '../../components/HeaderPublic/HeaderPublic';
import { LockupVertical } from '../../components/UI/Logo';
import { useStateValue } from '../../state';
import BellyMockupPrimary from '../../img/belly-screen-1@2x.png';
import BellyMockupSecondary from '../../img/belly-screen-2@2x.png';

function LandingPage() {
    const [{ login }] = useStateValue();
    
    return login.isLoggedIn 

    // If referrer token exists redirect to referrer
    ? <Redirect to={'/bills'} />
    
    // Render login or register page
    : (
        <>
        <HeaderPublic />
        <main className='LandingPage'>
            <div className='LandingPage__hero'>
                <LockupVertical />
                <div className='text-container'>
                    <h3>How much do I owe you?</h3>
                    <p>A question we often ask after a meal with friends.</p>
                </div>
            </div>
            <div className='LandingPage__secondary'>
                <h3>What can we do to make this math easier?</h3>
                <img className='mockup primary' src={BellyMockupPrimary} alt='' />
                <img className='mockup secondary' src={BellyMockupSecondary} alt='' />
            </div>
        </main>
        <footer className='LandingPage__footer'>
            <p>Belly© 2020. All rights reserved.</p>
            <a href='https://github.com/triciamedina/belly-app' target='_blank' rel='noopener noreferrer'>GitHub</a>
        </footer>
        </>
    )
}

export default LandingPage;