import React, { useState, useRef } from 'react';
import InvoiceContainer from '../invoiceForm/InvoiceContainer';
import { useDrag } from 'react-use-gesture';
type Props = {
    model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
    onChangeOrder: (e: any) => void;
    onChangeGood: (e: any) => void;
    orderInput: React.LegacyRef<HTMLInputElement> | undefined;
    partsInput: React.LegacyRef<HTMLInputElement> | undefined;
    orderData: any[] | null;
    months: string[] | null;
    invoiceData: any[] | null;
    invoiceForm: { visible: boolean; position: { x: number; y: number } };
    openInvoiceForm: () => void;
    changePosition: (form: string, position: { x: number, y: number }) => void;

}
const ExportComponent: React.FC<Props> = ({
    model,
    setModel,
    onChangeOrder,
    onChangeGood,
    orderInput,
    partsInput,
    orderData,
    months,
    invoiceData,
    invoiceForm,
    openInvoiceForm,
    changePosition

}) => {
    const dragItem: any = useRef();
    const dragOverItem: any = useRef();
    let dragItemKey = '';
    let dragOverItemKey = ''
    const invoicePos = useDrag((params => { changePosition('invoice', { x: params.offset[0] + 100, y: params.offset[1] + 200 }) }))
    const [selectedMonth, setSelectedMonth] = useState<string>('Feb')
    let orderdata;
    if (invoiceData) {
        const keys = Object.keys(invoiceData[0]).slice(1, 6)
        months = keys;
        // console.log('orderData at component', orderData)
        const onDragStart = (index: number, column: number) => {
            dragItem.current = index;
            dragItemKey = months ? months[column] : '';
            console.log('dragstart', dragItem.current, dragItemKey)
        }
        const onDragEnter = (index: number, column: number) => {
            dragOverItem.current = index;
            dragOverItemKey = months ? months[column] : '';
            console.log('dragenter', dragOverItem, dragOverItemKey)
        }
        const onDrop = () => {
            const copyList: { [key: string]: number }[] = [...invoiceData]

            console.log(copyList[2].Feb)
            // copyList[dragOverItem.current][dragOverItemKey] = 1
            copyList[dragOverItem.current][dragOverItemKey] = copyList[dragItem.current][dragItemKey]
            // let originData = copyList[dragOverItem.current][dragOverItemKey]
            // copyList[dragItem.current][dragItemKey] = originData
            dragItem.current = null;
            dragOverItem.current = null;
        }
        orderdata = orderData?.map((data, tr) =>
            <div className='tr'>
                <div className='td'>{data.name}</div>
                {months?.map((month, td) =>
                    <div className='td'
                        draggable
                        onDragStart={() => { onDragStart(tr, td) }}
                        onDragEnter={() => { onDragEnter(tr, td) }}
                        onDragEnd={onDrop}

                    >{data[month]}</div>)}
            </div>
        )
    }

    return (
        <div className='export-wrapper'>
            {invoiceForm.visible && <div>
                <div {...invoicePos()} style={{ color: 'black', position: 'fixed', top: invoiceForm.position.y, left: invoiceForm.position.x, zIndex: 3, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '500px', fontWeight: '700', paddingTop: '0.5rem', userSelect: 'none', textAlign: "center" }}>INVOICE</span>
                </div>
                <div style={{ position: 'fixed', top: invoiceForm.position.y, left: invoiceForm.position.x, zIndex: 2 }}>
                    <InvoiceContainer selectedMonth={selectedMonth} />
                </div>
            </div>}
            <div className="export-container">
                <div className="orderSheet">
                    <div className='table'>
                        <div className='thead'>
                            <div className='tr'>
                                <div className='th model'>Item</div>
                                {months?.map((month, idx) => (
                                    <div className='th' key={idx}>{month}</div>
                                ))}
                            </div>

                        </div>
                        <div className='tbody'>
                            {React.Children.toArray(orderdata)}
                        </div>
                    </div>
                </div>



                <div className="summary">
                    <div className='buttons'>
                        <label htmlFor="orders">Order 입력 <img src='/images/excel_btn.png' alt='excel'></img></label>
                        <input type="file" name="orders" id="orders" onChange={onChangeOrder} ref={orderInput} />
                        <label htmlFor="parts">제품 입력 <img src='/images/excel_btn.png' alt='excel'></img></label>
                        <input type="file" name="parts" id="parts" onChange={onChangeGood} ref={partsInput} />
                    </div>
                    <div className="selector">
                        {months?.map(month =>
                            <>
                                <input type="radio" name="month" id={month} value={month}
                                    checked={month === selectedMonth} onChange={() => setSelectedMonth(month)} />
                                <label htmlFor={month}>{month}</label>
                            </>)}
                    </div>
                    <div className={`sumTable  ${model === 'parts' ? "model" : 'parts'}`}>
                        <div className="arrow">
                            {<span className="material-symbols-outlined back" onClick={() => {
                                setModel('model')
                            }}>
                                arrow_back_ios
                            </span>}
                            {<span className="material-symbols-outlined forward" onClick={() => {
                                setModel('parts')
                            }}>
                                arrow_forward_ios
                            </span>}
                        </div>
                        <div className="modelTable">
                            <table>
                                <tr className='header'>
                                    <td colSpan={3}>
                                    </td>
                                </tr>
                                <tr className='body'>
                                    <th>제품</th>
                                    <th>수량</th>
                                </tr>
                            </table>
                        </div>
                        <div className="partsTable">
                            <table>
                                <tr className='header'>
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className='body'>

                                    <th>부자재</th>
                                    <th>수량</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {(invoiceData || orderData) && <span className="material-symbols-outlined" onClick={() => openInvoiceForm()}>
                        list_alt_add
                    </span>}
                </div>
                I</div>
        </div >
    );
};

export default ExportComponent;