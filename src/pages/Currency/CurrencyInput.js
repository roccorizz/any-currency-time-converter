import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PropTypes from "prop-types";

function CurrencyInput(props) {

    useEffect(() => {
        if (props.currency) {
            axios.get(`http://api.timezonedb.com/v2.1/list-time-zone?key=EURQ74A0QNOD&format=json&zone=${props.currency}`)
                .then(response => {
                    if (response.data && response.data.zones.length > 0) {
                        setTimeZone(response.data.zones[0].zoneName.split('/')[0]);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [props.currency])

    function handleAmountChange(event) {
        props.onAmountChange(event.target.value);
    }

    function handleCurrencyChange(event) {
        props.onCurrencyChange(event.target.value);
    }

    return (
        <div className='group'>
            <input type="text" value={props.amount} onChange={handleAmountChange} />
            <select value={props.currency} onChange={handleCurrencyChange}>
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
            </select>
            <div className='time'>Current Time: {props.time && <span>{time}</span>}</div>
        </div>
    )
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    time: PropTypes.string
}

export default CurrencyInput;
