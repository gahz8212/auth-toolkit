import React from 'react';
type Props = {
    changeCurrency: (endPoint: string) => void;
    searchCurrency: () => void;
    resultCurrency: { [key: string]: { [key: string]: number } } | null
}
const HomeComponent: React.FC<Props> = ({ changeCurrency, searchCurrency, resultCurrency }) => {

    const onChange = (e: any) => {
        const { value } = e.target;
        changeCurrency(value)
    }
    console.log(resultCurrency)
    return (<div style={{ margin: '7rem 0' }}>
        <div>
            <select name="toCurrency" id="" onChange={onChange} defaultValue='usd'>
                <option value="usd">USD</option>
                <option value="jpy">JPY</option>
                <option value="krw">KOR</option>
            </select>

            <select name="fromCurrency" id="" onChange={onChange} defaultValue='jpy'>
                <option value="usd">USD</option>
                <option value="jpy">JPY</option>
                <option value="krw">KOR</option>
            </select>
        </div>
        <div><input type="button" name="" id="" value="검색" onClick={searchCurrency} /></div>
        {/* <input type="text" name="" id="" value={resultCurrency!.usd.jpy} /> */}




    </div>)
};

export default HomeComponent;