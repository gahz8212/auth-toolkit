import React, { useState, useRef, useEffect } from 'react';
import ExportComponent from './ExportComponent';
import { useSelector, useDispatch } from 'react-redux'
import { OrderAction, OrderData } from '../../store/slices/orderSlice';
// import * as XLSX from 'xlsx'
import ExcelJS from 'exceljs';
const ExportContainer = () => {
    const orderInput: React.LegacyRef<HTMLInputElement> | undefined = useRef(null)
    const partsInput: React.LegacyRef<HTMLInputElement> | undefined = useRef(null)
    const dispatch = useDispatch()
    const { orderData, months } = useSelector(OrderData)
    const [model, setModel] = useState<string>('model')
    const onChangeOrder = async (e: any) => {
        const selectedFile = e.target.files[0]
        const fileType = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (selectedFile && fileType.includes(selectedFile.type)) {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(selectedFile)
            const worksheet = workbook.worksheets[0];
            const worksheetData: any[] = []
            worksheet?.eachRow({ includeEmpty: false }, (row) => {
                worksheetData.push(row.values)
            })
            const headers = worksheetData[1]
            const months = headers.slice(2)
            const contents = worksheetData.slice(2)
            let orderSheet = [];
            for (let content = 0; content < contents.length - 1; content++) {
                const obj: { [key: string]: any } = {};
                orderSheet.push(obj)
                for (let header = 1; header < headers.length; header++) {
                    if (contents[content][header] === 'TOTAL') break;
                    obj[headers[header]] = contents[content][header]
                }
            }
            // console.log(orderSheet)
            const filteredOrder = orderSheet.filter(order => {
                let result = false;
                for (let header = 2; header < headers.length; header++) {
                    result = order[headers[header]];
                    if (result) {
                        break;
                    }
                }
                return result
            })
            // console.log(filteredOrder)
            dispatch(OrderAction.getData(filteredOrder));
            dispatch(OrderAction.getMonth(months))
            dispatch(OrderAction.inputOrder(filteredOrder))
            if (orderInput.current) orderInput.current.value = ''

        }
    }
    const onChangeGood = async (e: any) => {

        const selectedFile = e.target.files[0]
        const fileType = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (selectedFile && fileType.includes(selectedFile.type)) {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(selectedFile)
            const worksheet = workbook.worksheets[0];
            const worksheetData: any[] = []
            worksheet?.eachRow({ includeEmpty: false }, (row) => {
                worksheetData.push(row.values)
            })
            const headers = worksheetData[0]
            console.log(headers)
            const contents = worksheetData.slice(1);
            let GoodList: any[] = [];
            for (let content = 0; content < contents.length; content++) {
                const obj: { [key: string]: any } = {}
                GoodList.push(obj)
                for (let header = 1; header < headers.length; header++) {
                    obj[headers[header]] = contents[content][header]
                }
            }
            console.log(GoodList)
        }
    }
    // useEffect(() => {
    //     if (orderData) {
    //         let result: boolean = window.confirm('실행 하시겠습니까?')
    //         if (result) {
    //             dispatch(OrderAction.inputOrder(orderData));
    //         }
    //     }
    //     return () => {
    //         dispatch(OrderAction.initForm())
    //     }
    // }, [dispatch, orderData])

    return (
        <ExportComponent
            model={model}
            setModel={setModel}
            onChangeOrder={onChangeOrder}
            onChangeGood={onChangeGood}
            orderInput={orderInput}
            partsInput={partsInput}
            months={months}
            orderData={orderData} />
        // <ExportComponent model={model} setModel={setModel} onChange={onChange} orderInput={orderInput} />
    );
};

export default ExportContainer;