import React from 'react';
import './LandingPage.css';
import HeaderPublic from '../../components/HeaderPublic/HeaderPublic';
import { LockupVertical } from '../../components/UI/Logo';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
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
                <h3>And the answer is...</h3>
                <img src='https://dummyimage.com/300x400/ffffff/909090.png&text=placeholder' alt='' />
                <img src='https://dummyimage.com/300x400/ffffff/909090.png&text=placeholder' alt='' />
            </div>
        </main>
        <footer className='LandingPage__footer'>
            <Link className='ButtonLink' to='/login'>
                Try it out
            </Link>
        </footer>
        </>
    )
}

export default LandingPage;