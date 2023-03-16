

import PropTypes from "prop-types";

function CurrencyInput(props) {

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

        </div>
    )
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,

}

export default CurrencyInput;
