import React, { useState } from 'react';
type Props = {}
const HomeComponent: React.FC<Props> = ({ }) => {
    const [currencyData, setCurrencyData] = useState(null)
    const [fromCurrency, setFromCurrency] = useState<string>('eur')
    const [toCurrency, setToCurrency] = useState<string>('krw')
    const [isAmount, setAmount] = useState<number>(0)
    return (<div>


    </div>)
};

export default HomeComponent;