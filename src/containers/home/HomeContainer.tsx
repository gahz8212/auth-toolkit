import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { relateActions } from '../../store/slices/relationSlice'
import { editActions } from '../../store/slices/editSlice';
import { makeRelateData_Price } from '../../lib/utils/createRelateData'
import * as Excel from "exceljs";
import { saveAs } from 'file-saver'
import HomeComponent from './HomeComponent';
const orders = [
    {
        orderNum: "A309012",
        menu: "햄버거",
        price: 12000,
        date: "2023-05-01",
    },
    {
        orderNum: "B882175",
        menu: "아메리카노(ice)",
        price: 1900,
        date: "2023-05-17",
    },
    {
        orderNum: "B677919",
        menu: "떡볶이",
        price: 6000,
        date: "2023-05-28",
    },
    {
        orderNum: "A001092",
        menu: "마라탕",
        price: 28000,
        date: "2023-06-12",
    },
    {
        orderNum: "A776511",
        menu: "후라이드치킨",
        price: 18000,
        date: "2023-06-12",
    },
    {
        orderNum: "A256512",
        menu: "고급사시미",
        price: 289900,
        date: "2023-06-12",
    },
    {
        orderNum: "C114477",
        menu: "단체도시락",
        price: 1000000,
        date: "2023-06-19",
    }]
const title = ['COMMERCIAL INVOICE', 'PROFORMA INVOICE'];
const headers = [
    '1. Shipper/Exporter',
    '2. Consignee',
    '3. Notify Party',
    '4. Port of Loading',
    '5. Sailing on or about',
    '6. Carrier',
    '7. Final Destination',
    '8. No. & Date of Invoice',
    '9. Payment Terms and Conditions',
    '10. Freight Term',
    '11. Remarks',
    '12. Mark & No.Pkgs',
    '13. Description of goods',
    '14. Quantity',
    'Unit',
    '15. Unit price',
    '16. Amount',
]
const description = {

    1: {
        shipper: 'EUNKI ELECTRONICS CO., LTD.',
        address1: '#812, Chunui Techno-park 3',
        address2: 'Jomaru-ro 385gil 80, Bucheon-si, Gyeonggi-do 14558, KOREA'
    },
    2: {
        Consignee: 'D.T. SYSTEMS, INC.',
        address1: '2872 Walnut Hill Lane, Dallas, TX 75229 USA.',
        address2: 'Tel: 214-350-9446   Bryant Kim, bryantkim@dtsystems.com'
    },
    3: {
        'Party': 'D.T. SYSTEMS, INC.',
        address1: 'Tel: 214-350-9446   Susan Rhee, susanrhee@dtsystems.com',
    },
    4: {
        'Port': ['BUSAN PORT', 'INCHOEN AIR PORT'],
    },
    5: {
        'Sailing': '',
    },
    6: {
        Carrier: '',
    },
    7: {
        'Destination': '',
    },
    8: {
        'NO&Date': '',
        page: '1 of 1'
    },
    9: {
        'Payment': 'T/T Net 30days',
    },
    10: {
        'Term': ['FOB BUSAN PORT IN KOREA', 'CIF'],
    },
    11: {
        'Remarks': `A. This shipment doesn't contain solid wooden packing material.`,
        'Forwarder': ''
    },
}

const columnWidths = [21, 28, 9.63, 3.63, 10.38, 10.5]
const HomeContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems, relations } = useSelector(itemData)

    const styleTitleCell = (cell: Excel.Cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffebebeb" },


        };

        cell.border = {
            bottom: { style: "thin", color: { argb: "-100000f" } },
            right: { style: "thin", color: { argb: "-100000f" } },
        };
        cell.font = {
            name: "Arial Black",
            size: 18,
            bold: true,
            color: { argb: "ff252525" },

        };
        cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };


    };
    const styleHeaderCell = (cell: Excel.Cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffebebeb" },
        };
        cell.border = {
            bottom: { style: "thin", color: { argb: "-100000f" } },
            right: { style: "thin", color: { argb: "-100000f" } },
        };
        cell.font = {
            name: "Arial",
            size: 12,
            bold: true,
            color: { argb: "ff252525" },
        };
        cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
    };

    const styleDataCell = (cell: Excel.Cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffffffff" },
        };
        cell.border = {
            bottom: { style: "thin", color: { argb: "-100000f" } },
            right: { style: "thin", color: { argb: "-100000f" } },
        };
        cell.font = {
            name: "Arial",
            size: 10,
            color: { argb: "ff252525" },
        };
        cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
    };
    const exportFile = async (rows: { orderNum: string, menu: string, price: number, date: string }[]) => {
        try {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Columns');
            worksheet.getColumn(1).values = [
                ,
                ,
                2,
                description[1].shipper,
                description[1].address1,
                description[1].address2,
                ,
                ,
                11]
            worksheet.getColumn(1).style.font = { size: 9 }
            worksheet.columns = [
                { header: '', key: '', width: columnWidths[0], style: { font: { size: 9, name: 'arial' } } },
                { header: '', key: '', width: columnWidths[1], style: { font: { size: 9, name: 'arial' } } },
                { header: '', key: '', width: columnWidths[2], style: { font: { size: 9, name: 'arial' } } },
                { header: '', key: '', width: columnWidths[3], style: { font: { size: 9, name: 'arial' } } },
                { header: '', key: '', width: columnWidths[4], style: { font: { size: 9, name: 'arial' } } },
                { header: '', key: '', width: columnWidths[5], style: { font: { size: 9, name: 'arial' } } },
            ]
            worksheet.mergeCells("A1:F1")

            // worksheet.getCell('A1').value = title[1]//COMMERCIAL INVOICE
            worksheet.getCell('A1').value = {
                richText: [{ font: { size: 12, bold: true, name: 'arial' }, text: title[0], }],

            };
            styleTitleCell(worksheet.getCell('A1'))
            worksheet.getRow(1).height = 40;


            worksheet.getCell('A2').value = { richText: [{ font: { size: 9, bold: true, name: 'arial' }, text: headers[0] }] }//1. Shipper/Exporter
            // worksheet.getCell('A2').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('A6').value = headers[1]//2. Consignee
            // worksheet.getCell('A6').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('A10').value = headers[2]//3. Notify Party
            // worksheet.getCell('A10').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('A13').value = headers[3]//4. Port of Loading
            // worksheet.getCell('A13').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('A15').value = headers[5]//6. Carrier
            // worksheet.getCell('A15').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('B13').value = headers[4]//5. Sailing on or about
            // worksheet.getCell('B13').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('B15').value = headers[6]//7. Final Destination
            // worksheet.getCell('B15').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('C2').value = headers[7]//8. No. & Date of Invoice
            // worksheet.getCell('C2').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('C5').value = headers[8]//9. Payment Terms and Conditions
            // worksheet.getCell('C5').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('C8').value = headers[9]//10. Freight Term
            // worksheet.getCell('C8').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('C12').value = headers[10]//11. Remarks
            // worksheet.getCell('C12').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('A17').value = headers[11]//12. Mark & No.Pkgs
            // worksheet.getCell('A17').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('B17').value = headers[12]//13. Description of goods
            // worksheet.getCell('B17').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('C17').value = headers[13]//14. Quantity
            // worksheet.getCell('C17').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('D17').value = headers[14]//Unit
            // worksheet.getCell('D17').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('E17').value = headers[15]//15. Unit price
            // worksheet.getCell('E17').style.font = { size: 9, name: 'arial', bold: true }
            // worksheet.getCell('F17').value = headers[16]//16. Amount
            // worksheet.getCell('F17').style.font = { size: 9, name: 'arial', bold: true }




            const fileData = await workbook.xlsx.writeBuffer();
            const blob = new Blob([fileData], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            saveAs(blob, 'INVOICE')
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(editActions.initForm())
        dispatch(itemActions.getItem())
        dispatch(relateActions.initRelate())
    }, [dispatch])

    useEffect(() => {
        let newArray: { [key: string]: number | string }[] = [];
        relations?.filter(relation => items?.filter(item => {
            if (relation.LowerId === item.id) {
                newArray.push({
                    id: relation.LowerId, point: relation.point, targetId: relation.UpperId,
                    itemName: item.itemName, type: item.type, category: item.category, im_price: item.im_price
                })
                return newArray;
            } else { return null }
        }))

        dispatch(itemActions.inputDragItems(newArray))
    }, [])


    useEffect(() => {
        if (dragItems) {
            const result = dragItems.reduce((acc: { [key: number]: number }, curr) => {
                if (curr.type === 'SET' || curr.type === 'ASSY') {
                    if (items) {
                        const view = makeRelateData_Price(curr.id, relations, items)
                        const price = view[0].sum_im_price * curr.point;
                        if (acc[curr.targetId]) {
                            acc[curr.targetId] = price + acc[curr.targetId]
                        } else {
                            acc[curr.targetId] = price
                        }
                    }
                } else {
                    if (acc[curr.targetId]) {
                        acc[curr.targetId] += curr.im_price * curr.point
                    } else {
                        acc[curr.targetId] = curr.im_price * curr.point
                    }
                }
                return acc;
            }, {})
            dispatch(relateActions.calculateTotalPrice(result))
        }
    }, [dragItems])

    return (
        <HomeComponent
            list={orders}
            exportFile={exportFile}
        />
    );
};
export default HomeContainer;