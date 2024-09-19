import React from 'react';
type Props = {
    fromCurrency: string;
    searchCurrency: () => void;
    resultCurrency: { [key: string]: { [key: string]: number } } | null
}
const HomeComponent: React.FC<Props> = ({ fromCurrency, resultCurrency }) => {


    if (!resultCurrency) return null;
    return (<div style={{ margin: '7rem 0' }}>

        <div>{(1 / resultCurrency![fromCurrency]!.usd).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div>{(1 / resultCurrency![fromCurrency]!.jpy).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>

    </div>)
};

export default HomeComponent;