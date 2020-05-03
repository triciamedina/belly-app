import React from 'react';

function Currency(props) {
    const { amount=0, lang='en-US', currency='USD', shouldShowSymbol=false } = props;

    return (
        <>
            { new Intl.NumberFormat(lang, 
                { 
                    style: shouldShowSymbol ? 'currency' : 'decimal', 
                    currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
                .format(amount) }
        </>
    )
}

export default Currency;