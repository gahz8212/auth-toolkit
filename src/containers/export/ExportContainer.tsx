import React, { useState, useRef, useEffect } from 'react';
import ExportComponent from './ExportComponent';
import { useSelector, useDispatch } from 'react-redux'
import { OrderAction, OrderData } from '../../store/slices/orderSlice';
import * as XLSX from 'xlsx'
const ExportContainer = () => {
    const orderInput: React.LegacyRef<HTMLInputElement> | undefined = useRef(null)
    const dispatch = useDispatch()
    const { orderData } = useSelector(OrderData)
    const [model, setModel] = useState<string>('model')
    const onChange = (e: any) => {
        const selectedFile = e.target.files[0]
        const fileType = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (selectedFile && fileType.includes(selectedFile.type)) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                dispatch(OrderAction.changeFile(e.target?.result))
                const workbook = XLSX.read(e.target?.result, { type: 'buffer' })
                const worksheetname = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetname]
                // worksheet['A1'] = { t: 's', v: '' }
                // worksheet['C1'] = { t: 's', v: '' }
                // worksheet['A2'] = { t: 's', v: 'goods' }
                // worksheet['!rows'] = [];
                // worksheet['!rows'][0] = { hidden: true }
                // console.log(worksheet['A1']);

                // XLSX.writeFile(workbook, '/newfile.xlsx')
                const orderData = XLSX.utils.sheet_to_json(worksheet)
                dispatch(OrderAction.initForm())
                dispatch(OrderAction.getData(orderData))

                if (orderInput.current) orderInput.current.value = ''

            }
        }
    }
    useEffect(() => {
        if (orderData) {
            let result: boolean = window.confirm('정말?')
            if (result) {
                dispatch(OrderAction.inputOrder(orderData));
            }
        }
        return () => {
            dispatch(OrderAction.initForm())
        }
    }, [dispatch, orderData])

    return (
        <ExportComponent model={model} setModel={setModel} onChange={onChange} orderInput={orderInput} />
    );
};

export default ExportContainer;