import React from 'react';
type Props = {
    changeCurrency: (type: string, currency: string) => void;
    searchCurrency: () => void;
}
const HomeComponent: React.FC<Props> = ({ changeCurrency, searchCurrency }) => {
    // const [currencyData, setCurrencyData] = useState(null)
    // const [fromCurrency, setFromCurrency] = useState<string>('eur')
    // const [toCurrency, setToCurrency] = useState<string>('krw')
    // const [isAmount, setAmount] = useState<number>(0)
    const onChange = (e: any) => {
        const { name, value } = e.target;
        changeCurrency(name, value)
    }
    return (<div style={{ margin: '7rem 0' }}>
        <div>
            <select name="toCurrency" id="" onChange={onChange} defaultValue='eur'>
                <option value="usd">USD</option>
                <option value="eur" >EUR</option>
                <option value="krw">KOR</option>
            </select>

            <select name="fromCurrency" id="" onChange={onChange} defaultValue='krw'>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="krw">KOR</option>
            </select>
        </div>
        <div><input type="button" name="" id="" value="검색" onClick={searchCurrency} /></div>

    </div>)
};

export default HomeComponent;