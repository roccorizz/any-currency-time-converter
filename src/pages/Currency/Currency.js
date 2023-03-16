
import CurrencyInput from '@/pages/Currency/CurrencyInput'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { Typewriter } from 'react-simple-typewriter'
function Currency() {
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('BDT');

    const [rates, setRates] = useState({});



    useEffect(() => {
        axios.get('https://api.apilayer.com/fixer/latest?base=USD&apikey=mgVytttPKDO3SzqJMAECoCK0xuVrL6FZ')
            .then(response => {
                setRates(response.data.rates);

            })
            .catch(error => { console.log(error) })
    }, [])

    useEffect(() => {
        if (!!rates) {
            function init() {

                handleAmount1Change(1);
            }
            init();
        }

    }, [rates])

    function format(number) {
        return number.toFixed(2);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
    }
    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setCurrency2(currency2);
    }



    const handleType = (number) => {
        // access word count number
        console.log(number)
    }



    return (
        <div>
            <div>
                <h1>
                    Any <span style={{ color: 'red', fontWeight: 'bold' }}>
                        {/* Style will be inherited from the parent element */}
                        <Typewriter
                            words={['Currency', 'Time']}
                            loop={Infinity}
                            cursor
                            cursorStyle=''
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}

                            onType={handleType}
                        />
                    </span> Converter{' '}

                </h1>
            </div>
            <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={rates ? Object.keys(rates) : []}
                amount={amount1}
                currency={currency1}
            />

            <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={rates ? Object.keys(rates) : []}
                amount={amount2}
                currency={currency2}
            />

        </div>
    )
}

export default Currency;