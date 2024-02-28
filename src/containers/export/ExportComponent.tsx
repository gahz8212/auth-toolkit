import React, { useState, useRef } from 'react';
import InvoiceContainer from '../invoiceForm/InvoiceContainer';
import PackingContainer from '../packingListForm/PackingContainer';
import AddItemContainer from '../forms/addItemForm/AddItemContainer';
import { useDrag } from 'react-use-gesture';
import { OrderAction } from '../../store/slices/orderSlice'
import { useDispatch } from 'react-redux'
type Props = {
    model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
    onChangeOrder: (e: any) => void;
    onChangeGood: (e: any) => void;
    orderInput: React.LegacyRef<HTMLInputElement> | undefined;
    partsInput: React.LegacyRef<HTMLInputElement> | undefined;
    orderData: any[] | null;
    months: string[] | null;
    // invoiceData: any[] | null;
    openInvoiceForm: () => void;
    openPackingForm: () => void;
    openAddItemForm: () => void;
    invoiceForm: { visible: boolean; position: { x: number; y: number } };
    packingForm: { visible: boolean; position: { x: number; y: number } };
    addItemForm: { visible: boolean; position: { x: number; y: number } };
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
    // invoiceData,
    invoiceForm,
    packingForm,
    addItemForm,
    openInvoiceForm,
    openPackingForm,
    openAddItemForm,
    changePosition

}) => {
    const dragItem: any = useRef();
    const dragOverItem: any = useRef();
    const dispatch = useDispatch();
    let dragItemKey = '';
    let dragOverItemKey = ''
    const invoicePos = useDrag((params => { changePosition('invoice', { x: params.offset[0] + 100, y: params.offset[1] + 200 }) }))
    const packingPos = useDrag((params => { changePosition('packing', { x: params.offset[0] + 100, y: params.offset[1] + 200 }) }))
    const addItemPos = useDrag((params => { changePosition('addItem', { x: params.offset[0] + 100, y: params.offset[1] + 200 }) }))


    let orderdata;
    // console.log(orderdata)
    const [selectedMonth, setSelectedMonth] = useState<string>('')

    if (orderData) {
        const keys = Object.keys(orderData[0]).slice(1, 6)
        months = keys;

        const onDragStart = (index: number, column: number) => {
            dragItem.current = index;
            dragItemKey = months ? months[column] : '';
        }
        const onDragEnter = (index: number, column: number) => {
            dragOverItem.current = index;
            dragOverItemKey = months ? months[column] : '';
        }
        const onDrop = () => {
            const copyList: { [key: string]: number | string | null }[] = JSON.parse(JSON.stringify(orderData))
            copyList[dragOverItem.current][dragOverItemKey] = copyList[dragItem.current][dragItemKey];
            copyList[dragItem.current][dragItemKey] = null
            dragItem.current = null;
            dragOverItem.current = null;
            dispatch(OrderAction.getData(copyList))
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

                    >{data[month]}
                        {/* <input type="number" name={`${month}`} value={data[month]} onChange={(e) => { onChange(e, tr) }} /> */}
                    </div>)}
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
            {packingForm.visible && <div>
                <div {...packingPos()} style={{ color: 'black', position: 'fixed', top: packingForm.position.y, left: packingForm.position.x, zIndex: 3, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '500px', fontWeight: '700', paddingTop: '0.5rem', userSelect: 'none', textAlign: "center" }}>PACKING</span>
                </div>
                <div style={{ position: 'fixed', top: packingForm.position.y, left: packingForm.position.x, zIndex: 2 }}>
                    <PackingContainer
                        selectedMonth={selectedMonth}
                    />
                </div>
            </div>}
            {addItemForm.visible && <div>
                <div {...addItemPos()} style={{ color: 'black', position: 'fixed', top: addItemForm.position.y, left: addItemForm.position.x, zIndex: 3, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '500px', fontWeight: '700', paddingTop: '0.5rem', userSelect: 'none', textAlign: "center" }}>ADD</span>
                </div>
                <div style={{ position: 'fixed', top: addItemForm.position.y, left: addItemForm.position.x, zIndex: 2 }}>
                    <AddItemContainer
                    // selectedMonth={selectedMonth}
                    />
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
                        <button onClick={openAddItemForm}>추가 입력</button>
                        <label htmlFor="parts">제품 입력 <img src='/images/excel_btn.png' alt='excel'></img></label>
                        <input type="file" name="parts" id="parts" onChange={onChangeGood} ref={partsInput} />
                    </div>
                    <div className="selector">
                        {months?.map((month, index) =>
                            <div key={index}>
                                <input type="radio" name="month" id={month} value={month}
                                    checked={month === selectedMonth} onChange={() => setSelectedMonth(month)} />
                                <label htmlFor={month}>{month}</label>
                            </div>)}
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
                    <div className='forms'>
                        {(orderData) && <span className="material-symbols-outlined invoice" onClick={openInvoiceForm}>
                            list_alt_add
                        </span>}
                        {(orderData) && <span className="material-symbols-outlined packing" onClick={openPackingForm}>
                            list_alt_add
                        </span>}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ExportComponent;