import React, { useState, useRef } from 'react';
import InvoiceContainer from '../forms/invoiceForm/InvoiceContainer';
import PackingContainer from '../forms/packingListForm/PackingContainer';
import AddItemContainer from '../forms/addItemForm/AddItemContainer';
import PalletContainer from '../forms/packingListForm/PalletContainer';
import { useDrag } from 'react-use-gesture';
import { OrderAction } from '../../store/slices/orderSlice'
import { useDispatch } from 'react-redux'
type Props = {
    model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
    onChangeParts: (e: any) => void;
    onChangeOrder: (e: any) => void;

    onChangeItem: (e: any) => void;
    orderInput: React.LegacyRef<HTMLInputElement> | undefined;

    partsInput: React.LegacyRef<HTMLInputElement> | undefined;
    itemsInput: React.LegacyRef<HTMLInputElement> | undefined;
    orderData: any[] | null;
    months: string[] | null;

    openInvoiceForm: () => void;
    openPackingForm: () => void;
    openAddItemForm: () => void;
    invoiceForm: { visible: boolean; position: { x: number; y: number } };
    packingForm: { visible: boolean; position: { x: number; y: number } };
    addItemForm: { visible: boolean; position: { x: number; y: number } };
    palletForm: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void;

}
const ExportComponent: React.FC<Props> = ({
    model,
    setModel,
    onChangeParts,
    onChangeOrder,
    onChangeItem,
    orderInput,
    partsInput,
    itemsInput,
    orderData,
    months,
    invoiceForm,
    packingForm,
    addItemForm,
    palletForm,
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
    const packingPos = useDrag((params => { changePosition('packing', { x: params.offset[0] + 820, y: params.offset[1] + 200 }) }))
    const palletPos = useDrag((params => { changePosition('pallet', { x: params.offset[0] + 1400, y: params.offset[1] + 200 }) }))
    const addItemPos = useDrag((params => { changePosition('addItem', { x: params.offset[0] + 100, y: params.offset[1] + 200 }) }))

    let orderdata;
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
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
            <div className='td'>{data.itemName}</div>
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
    // }
    return (
        <div className='export-wrapper'>
            {invoiceForm.visible && <div>
                <div {...invoicePos()}

                    style={{
                        color: 'black',
                        position: 'fixed',
                        top: invoiceForm.position.y,
                        left: invoiceForm.position.x,
                        zIndex: 6,
                        width: '520px',
                        cursor: 'pointer',
                    }}>
                    <span style={{
                        display: 'block',
                        background: 'transparent',
                        width: '100%',
                        height: '50px',
                        fontWeight: '700',
                        paddingTop: '0.5rem',
                        userSelect: 'none',
                        textAlign: "center"
                    }}>INVOICE</span>
                    {/* <div className="spacer" style={{ height: '10px', background: 'green' }}></div> */}
                </div>
                <div style={{ position: 'fixed', top: invoiceForm.position.y, left: invoiceForm.position.x, zIndex: 2 }}>
                    <InvoiceContainer selectedMonth={selectedMonth || months![0]} />
                </div>
            </div>}
            {packingForm.visible && <div>
                <div {...packingPos()} style={{
                    color: 'black',
                    width: '520px',
                    cursor: 'pointer',
                    position: 'fixed',
                    top: packingForm.position.y,
                    left: packingForm.position.x,
                    zIndex: 4,
                    textAlign: 'center'
                }}>
                    <span style={{
                        display: 'inline-block',
                        height: '50px',
                        width: '500px',
                        fontWeight: '700',
                        paddingTop: '0.5rem',
                        userSelect: 'none',
                        textAlign: "center"
                    }}>PACKING</span>
                </div>
                <div style={{ position: 'fixed', top: packingForm.position.y, left: packingForm.position.x, zIndex: 2 }}>
                    <PackingContainer
                        selectedMonth={selectedMonth || months![0]}
                    />
                </div>
            </div>}
            {palletForm.visible && <div>
                <div {...palletPos()} style={{
                    color: 'black',
                    width: '100px',
                    cursor: 'pointer',
                    position: 'fixed',
                    top: palletForm.position.y,
                    left: palletForm.position.x,
                    zIndex: 4,
                    textAlign: 'center'
                }}>
                    <span style={{
                        display: 'inline-block',
                        height: '50px',
                        width: '100px',
                        fontWeight: '700',
                        paddingTop: '0.5rem',
                        userSelect: 'none',
                        textAlign: "center"
                    }}>PALLET</span>
                </div>
                <div style={{ position: 'fixed', top: palletForm.position.y, left: palletForm.position.x, zIndex: 2 }}>
                    <PalletContainer
                        selectedMonth={selectedMonth || months![0]}
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

                        {/* <label htmlFor="parts">부자재 입력 <img src='/images/excel_btn.png' alt='excel'></img></label>
                        <input type="file" name="parts" id="parts" onChange={onChangeParts} ref={partsInput} />
                        <button onClick={openAddItemForm}>추가 입력</button> */}





                        <label htmlFor="parts">아이템 입력 <img src='/images/excel_btn.png' alt='excel'></img></label>
                        <input type="file" name="parts" id="parts" onChange={onChangeItem} ref={itemsInput} />

                    </div>
                    <div className="selector">
                        {months?.map((month, index) =>
                            <div key={index}>
                                <input type="radio" name="month" id={month} value={month}
                                    defaultChecked={month === months[0]}
                                    onChange={() => setSelectedMonth(month)} />
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