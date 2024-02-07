import React from 'react';
type Props = {
    model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
}
const ExportComponent: React.FC<Props> = ({ model, setModel }) => {

    return (
        <div className='export-wrapper'>
            <div className="export-container">

                <div className="orderSheet">
                    <table>
                        <tr>
                            <th className='month'>MODEL</th>
                            <th className='month'>JAN</th>
                            <th className='month'>FEB</th>
                            <th className='month'>MAR</th>
                            <th className='month'>APR</th>
                            <th className='month'>MAY</th>
                            <th className='month'>JUN</th>
                        </tr>
                        <tr>
                            <td className='model'>AAAA</td>
                            <td><input type="number" defaultValue={0} min={0} className="order_count"></input></td>
                            <td><input type="number" defaultValue={0} min={0} className="order_count"></input></td>
                            <td><input type="number" defaultValue={0} min={0} className="order_count"></input></td>
                            <td><input type="number" defaultValue={0} min={0} className="order_count"></input></td>
                            <td><input type="number" defaultValue={0} min={0} className="order_count"></input></td>
                            <td><input type="number" defaultValue={0} min={0} className="order_count"></input></td>
                        </tr>

                    </table>
                </div>
                <div className="summary">
                    <div className='buttons'>
                        <label htmlFor="orders"><img src='/images/excel_btn.png' alt='excel'></img></label>
                        <input type="file" name="orders" id="orders" />
                    </div>
                    <div className="selector">
                        <input type="radio" name="month" id="m1" />
                        <label htmlFor="m1">JAN</label>
                        <input type="radio" name="month" id="m2" />
                        <label htmlFor="m2">FEB</label>
                        <input type="radio" name="month" id="m3" />
                        <label htmlFor="m3">MAR</label>
                        <input type="radio" name="month" id="m4" />
                        <label htmlFor="m4">ARP</label>
                        <input type="radio" name="month" id="m5" />
                        <label htmlFor="m5">MAY</label>
                        <input type="radio" name="month" id="m6" />
                        <label htmlFor="m6">JUN</label>
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


                </div>
            </div>
        </div >
    );
};

export default ExportComponent;