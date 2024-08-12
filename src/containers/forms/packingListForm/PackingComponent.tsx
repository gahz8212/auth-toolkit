import React, { useRef } from 'react';
type Props = {

    selectedMonth: string;
    packingData: any[] | undefined;
    totalResult: { [x: string]: { carton: number; weight: number; cbm: number; price: number; }; }[]
    CartonExcelContainer: () => JSX.Element
}
const PackingComponent: React.FC<Props> = ({ selectedMonth, packingData, totalResult,CartonExcelContainer }) => {

    let newData: { [key: string]: number | string }[] = []
    if (packingData && selectedMonth) {
        const headers = Object.keys(packingData[0]).slice(1, 6)
        for (let data of packingData) {
            let origin = {};
            let extra = {}
            for (let header of headers) {
                if (data[header] - data[header] / data.moq) {
                    origin = { ...origin, ...{ itemName: data.itemName } }
                }
                if ((data[header]) % data.moq) {
                    extra = { ...extra, ...{ itemName: data.itemName } }
                }
            }
            if (Object.keys(origin).length) {
                newData.push(origin)
            }
            if (Object.keys(extra).length) {
                newData.push(extra)
            }
        }
    }
    const dragItem = useRef<number>(0);
    const dragOverItem = useRef<number>(0);
    const dragItemStart = (index: number) => {
        dragItem.current = index
    }
    const dragItemEnter = (index: number) => {
        dragOverItem.current = index
    }
    const drop = () => {
        const newList = JSON.parse(JSON.stringify(newData));
        let target = newList[dragOverItem.current]
        newList[dragOverItem.current] = newList[dragItem.current]
        newList[dragItem.current] = target
        // console.log(newList)
    }
    const datas = (
        packingData?.map((data, index) => <div className='packing-rows'
            draggable
            onDragStart={() => { dragItemStart(index) }}
            onDragEnter={() => { dragItemEnter(index) }}
            onDragEnd={drop}
        >
            <div className='packing-data'>{data.itemName}</div>
            {/* {data[selectedMonth] && <div className='invoice-data'>{data[selectedMonth]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>} */}
            {/* {data[selectedMonth] && <div className='invoice-data'>${(data.ex_price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>} */}
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
            {<CartonExcelContainer />}
        </div>

    );
};
export default PackingComponent;