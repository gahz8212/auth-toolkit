import React from 'react';
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
    const invoicePos = useDrag((params => { changePosition('invoice', { x: params.offset[0] + 100, y: params.offset[1] + 150 }) }))
    return (
        <div className='export-wrapper'>
            {invoiceForm.visible && <div>
                <div {...invoicePos()} style={{ color: 'black', position: 'fixed', top: invoiceForm.position.y, left: invoiceForm.position.x, zIndex: 2, textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'inline-block', width: '300px', padding: '.3rem', userSelect: 'none' }}>INVOICE</span>
                </div>
                <div style={{ position: 'fixed', top: invoiceForm.position.y, left: invoiceForm.position.x, zIndex: 1 }}>
                    <InvoiceContainer />
                </div>
            </div>}
            <div className="export-container">
                <div className="orderSheet">
                    <table>
                        <thead>
                            <tr>
                                <th className='model'>Model</th>
                                {months?.map((month, idx) => (
                                    <th key={idx}>{month}</th>
                                ))}
                            </tr>

                        </thead>
                        <tbody>
                            {orderData?.map((order, idx) =>
                                <tr key={idx}>
                                    <td className='model'>{order.Item}</td>
                                    {months?.map(month => <td>
                                        <input type="text"
                                            defaultValue={0}
                                            min={0}
                                            className="order_count"
                                            value={order[month]} /></td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                                <input type="radio" name="month" id={month} />
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
                    {invoiceData && <span className="material-symbols-outlined" onClick={() => openInvoiceForm()}>
                        list_alt_add
                    </span>}
                </div>
                I</div>
        </div >
    );
};

export default ExportComponent;