import React from 'react';
type Props = {

    selectedMonth: string;
    packingData: any[] | undefined;
    totalResult: { [x: string]: { carton: number; weight: number; cbm: number; price: number; }; }[]
}
const PackingComponent: React.FC<Props> = ({ selectedMonth, packingData, totalResult }) => {

    if (packingData && selectedMonth) {
        let newData: { [key: string]: number | string }[] = []
        const headers = Object.keys(packingData[0]).slice(1, 6)
        for (let data of packingData) {
            let origin = {};
            let extra = {}
            for (let header of headers) {
                if (data[header] - data[header] / data.moq) {
                    origin = { ...origin, ...{ name: data.name } }
                }
                if ((data[header]) % data.moq) {
                    extra = { ...extra, ...{ name: data.name } }
                }
            }
            newData.push(origin, extra)
        }
        console.log(newData)
    }











    const datas = (
        packingData?.map(data => <div className='packing-rows'>
            <div className='packing-data'>{data.name}</div>
            {/* {data[selectedMonth] && <div className='invoice-data'>{data[selectedMonth]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>} */}
            {/* {data[selectedMonth] && <div className='invoice-data'>${(data.export_price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>} */}
            {data[selectedMonth] && <div className='invoice-data'>{(data[selectedMonth] / data.moq)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
            {data[selectedMonth] && <div className='invoice-data'>{(data[selectedMonth] / data.moq * data.weight).toFixed(1)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
            {data[selectedMonth] && <div className='invoice-data'>{(data[selectedMonth] / data.moq * data.cbm).toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
        </div>)
    )
    const footer = (totalResult?.map(result => <div className='tr'>
        {result[selectedMonth] && <div className='th'>TOTAL</div>}
        {result[selectedMonth] && <div className='th'>{result[selectedMonth].carton}C/T</div>}
        {result[selectedMonth] && <div className='th'>{result[selectedMonth].weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}Kg</div>}
        {result[selectedMonth] && <div className='th'>{result[selectedMonth].cbm.toFixed(1)}CBM</div>}
        {/* {result[selectedMonth] && <div className='th'>${result[selectedMonth].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>} */}
    </div>))
    return (
        <div className='packing-container'>

            <div className='table'>
                <div className='thead'>
                    <div className='tr'>
                        <div className='th'>Item</div>
                        {/* <div className='th'>수량</div> */}
                        <div className='th'>카톤</div>
                        <div className='th'>무게(Kg)</div>
                        <div className='th'>CBM</div>
                    </div>
                </div>
                <div className='tbody'>
                    {React.Children.toArray(datas)}
                </div>
                <div className='tfoot'>
                    {React.Children.toArray(footer)}
                </div>
            </div>
        </div>

    );
};
export default PackingComponent;