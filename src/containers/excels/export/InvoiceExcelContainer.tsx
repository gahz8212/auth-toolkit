import React, { useEffect } from 'react';
import * as Excel from 'exceljs'
import { saveAs } from 'file-saver';
import ExportExcelComponent from './InvoiceExcelComponent';
import { OrderData } from '../../../store/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

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
        tel: '               TEL : +82-(0)32-466-2687',
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
        'Destination': 'Dallas, Texas USA.',
    },
    8: {
        'NO&Date': '',
        page1: '1 OF 1',
        page2: '2 OF 2'
    },
    9: {
        'Payment': 'T/T Net 30days',
    },
    10: {
        'Term': ['FOB BUSAN PORT IN KOREA', 'CIF'],
    },
    11: {
        'Remarks1': `A. This shipment doesn't contain `,
        'Remarks2': `solid wooden packing material.`,
        'Forwarder': 'B. '
    },
}

const columnWidths = [22, 30, 9.63, 4, 10.5, 10]
// const invoiceData = { EDT: [], NOBARK: [], RDT: [], LAUNCHER: [] };

type Props = {
    selectedMonth: string
}

const InvoiceExcelContainer: React.FC<Props> = ({ selectedMonth }) => {
    const dispatch = useDispatch();
    const { orderData } = useSelector(OrderData)
    const selectedOrderData = orderData?.filter(data => data[selectedMonth])
        .map(data => (
            {
                category: data.category,
                name: data.itemName,
                amount: data[selectedMonth],
                price: data.ex_price,
                sets: data.sets

            }))
    // console.log(selectedOrderData)
    if (selectedOrderData) {

        // { category: 'EDT'|'NOBARK'|'RDT'|'LAUNCHER'; name: string; amount: Number, price: number; sets:string }' 형식에 '{ EDT: never[]; NOBARK: never[]; RDT: never[]; LAUNCHER: never[]; }


        const arrayDatas = selectedOrderData.reduce(
            (acc: { [key: string]: {}[] }, curr) => {
                acc[curr.category].push({ name: curr.name, amount: curr.amount, price: curr.price, sets: curr.sets })
                return acc;
            }, { EDT: [], NOBARK: [], RDT: [], LAUNCHER: [] })
        const keys = Object.keys(arrayDatas)
        const result = keys.map((key, index) => Object.entries(arrayDatas)[index])
        console.log(result)
        // const changedOrders=
    }
    const styleTitleCell = (cell: Excel.Cell) => {
        cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
    };
    const makeInvoice = async () => {
        try {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Invoice', { pageSetup: { paperSize: 9, margins: { left: 0.3, right: 0.3, top: 0, bottom: 0, header: 0, footer: 0 } } });
            // worksheet.getColumn(1).style.font = { size: 9 }
            worksheet.columns = [
                { header: '', key: '', width: columnWidths[0] + 0.58 },
                { header: '', key: '', width: columnWidths[1] + 0.58 },
                { header: '', key: '', width: columnWidths[2] + 0.58 },
                { header: '', key: '', width: columnWidths[3] + 0.58 },
                { header: '', key: '', width: columnWidths[4] + 0.58 },
                { header: '', key: '', width: columnWidths[5] + 0.58 },
            ]

            worksheet.mergeCells("A1:F1")
            worksheet.mergeCells("B59:F59")

            worksheet.getRow(1).height = 36.75;
            for (let i = 2; i < 18; i++) {
                worksheet.getRow(i).height = 14.25
            }
            for (let i = 18; i < 59; i++) {
                worksheet.getRow(i).height = 12
            }
            worksheet.getRow(59).height = 46.5

            styleTitleCell(worksheet.getCell('A1'))
            worksheet.getCell('A1').value = {
                richText: [{ font: { name: 'Arial Black', size: 20, bold: true }, text: title[0], }],
            };

            for (let i = 1; i < 7; i++) {
                worksheet.getCell(`${String.fromCharCode(i + 64)}${17}`).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
            }
            for (let i = 1; i < 3; i++) {
                worksheet.getCell(`${String.fromCharCode(i + 64)}${5}`).border = { bottom: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${9}`).border = { bottom: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${12}`).border = { bottom: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${15}`).border = { top: { style: 'thin' } }
            }
            for (let i = 3; i < 7; i++) {
                worksheet.getCell(`${String.fromCharCode(i + 64)}${5}`).border = { top: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${8}`).border = { top: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${12}`).border = { top: { style: 'thin' } }
            }
            for (let i = 2; i < 59; i++) {
                worksheet.getCell(`A${i}`).border = { left: { style: 'thick' } }
                if (i === 5 || i === 9 || i === 12 || i === 14 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(65)}${i}`).border = { bottom: { style: 'thin' }, left: { style: 'thick' } }
                }
                worksheet.getCell(`F${i}`).border = { right: { style: 'thick' } }
                if (i === 4 || i === 7 || i === 11 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(67)}${i}`).border = { left: { style: 'thick' }, bottom: { style: 'thin' } }
                    worksheet.getCell(`${String.fromCharCode(70)}${i}`).border = {
                        right: { style: 'thick' }, bottom: { style: 'thin' }
                    }
                }
            }

            for (let i = 13; i < 59; i++) {
                worksheet.getCell(`${String.fromCharCode(66)}${i}`).border = { left: { style: 'thin' } }
                if (i === 14 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(66)}${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 1; i < 59; i++) {
                worksheet.getCell(`C${i}`).border = { left: { style: 'thin' } }
                if (i === 4 || i === 7 || i === 11 || i === 16 || i === 17) {
                    worksheet.getCell(`C${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 18; i < 59; i++) {
                worksheet.getCell(`${String.fromCharCode(68)}${i}`).border = { left: { style: 'dotted' }, right: { style: 'dotted' } }
            }
            worksheet.getCell('A1').border = {
                top: { style: "thick" },
                bottom: { style: "thin" },
                right: { style: "thick" },
                left: { style: "thick" },
            };
            worksheet.getCell('B59').border = {
                top: { style: "thin" },
                right: { style: 'thick' },

                bottom: { style: "thick" },
                left: { style: "thin" },
            };
            worksheet.getCell('A59').border = {
                // top: { style: "thin" },
                bottom: { style: "thick" },


                left: { style: "thick" },
            };

            worksheet.getCell('A2').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[0] }] }//1. Shipper/Exporter
            worksheet.getCell('A3').alignment = { indent: 1 }
            worksheet.getCell('A3').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: description[1].shipper },
                { font: { name: 'Arial', size: 9, bold: false }, text: description[1].tel }]
            }

            worksheet.getCell('A4').alignment = { indent: 1 }
            worksheet.getCell('A4').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].address1 }] }
            worksheet.getCell('A5').alignment = { indent: 1 }
            worksheet.getCell('A5').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].address2 }] }

            worksheet.getCell('A6').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[1] }] }//2. Consignee
            worksheet.getCell('A7').alignment = { indent: 1 }
            worksheet.getCell('A7').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: description[2].Consignee }] }
            worksheet.getCell('A8').alignment = { indent: 1 }
            worksheet.getCell('A8').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].address1 }] }
            worksheet.getCell('A9').alignment = { indent: 1 }
            worksheet.getCell('A9').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].address2 }] }

            worksheet.getCell('A10').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[2] }] }//3. Notify Party
            worksheet.getCell('A11').alignment = { indent: 1 }
            worksheet.getCell('A11').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: description[3].Party }] }
            worksheet.getCell('A12').alignment = { indent: 1 }
            worksheet.getCell('A12').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[3].address1 }] }

            worksheet.getCell('A13').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[3] }] }//4. Port of Loading
            worksheet.getCell('A14').alignment = { indent: 1 }
            worksheet.getCell('A14').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[4].Port[0] }] }

            worksheet.getCell('A15').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[5] }] } //6. Carrier
            worksheet.getCell('A16').alignment = { indent: 1 }
            worksheet.getCell('A16').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[6].Carrier }] }

            worksheet.getCell('B13').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[4] }] }//5. Sailing on or about
            worksheet.getCell('B14').alignment = { indent: 1 }
            worksheet.getCell('B14').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[5].Sailing }] }

            worksheet.getCell('B15').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[6] }] }//7. Final Destination
            worksheet.getCell('B16').alignment = { indent: 1 }
            worksheet.getCell('B16').value = { richText: [{ font: { name: 'Arial', size: 9, }, text: description[7].Destination }] }
            worksheet.getCell('B55').alignment = { horizontal: 'center', vertical: 'middle' }

            worksheet.getCell('B59').alignment = { horizontal: 'left', vertical: 'middle' }
            worksheet.getCell('B59').value = {
                richText: [{ font: { name: 'Arial', size: 12, bold: true }, text: 'To be continued.' }]
            }
            worksheet.getCell('C2').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[7] }] }//8. No. & Date of Invoice
            worksheet.getCell('C3').alignment = { indent: 1 }
            worksheet.getCell('C3').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[8]['NO&Date'] }] }
            worksheet.getCell('F4').alignment = { horizontal: 'center' }
            worksheet.getCell('F4').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[8].page1 }] }

            worksheet.getCell('C5').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[8] }] }//9. Payment Terms and Conditions
            worksheet.getCell('C6').alignment = { indent: 1 }
            worksheet.getCell('C6').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[9].Payment }] }

            worksheet.getCell('C8').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[9] }] }//10. Freight Term
            worksheet.getCell('C9').alignment = { indent: 1 }
            worksheet.getCell('C9').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[10].Term[0] }] }

            worksheet.getCell('C12').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[10] }] }//11. Remarks
            worksheet.getCell('C13').alignment = { indent: 1 }
            worksheet.getCell('C13').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[11].Remarks1 }] }
            worksheet.getCell('C14').alignment = { indent: 1 }
            worksheet.getCell('C14').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[11].Remarks2 }] }
            worksheet.getCell('C15').alignment = { indent: 1 }
            worksheet.getCell('C15').value = { richText: [{ font: { name: 'Arial', size: 9, color: { argb: 'ff0' }, }, text: description[11].Forwarder }] }

            worksheet.getCell('A17').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[11] }] }//12. Mark & No.Pkgs
            worksheet.getCell('B17').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[12] }] }//13. Description of goods
            worksheet.getCell('C17').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[13] }] }//14. Quantity
            worksheet.getCell('D17').value = { richText: [{ font: { name: 'Arial', size: 9, }, text: headers[14] }] }//Unit
            worksheet.getCell('D17').alignment = { horizontal: 'center' }
            worksheet.getCell('E17').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[15] }] }//15. Unit price
            worksheet.getCell('F17').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[16] }] }//16. Amount


            //===================================================================================================================================================

            worksheet.mergeCells("A60:F60")
            worksheet.mergeCells("B114:B115")
            worksheet.mergeCells("E114:F115")
            worksheet.mergeCells("A116:F116")

            worksheet.getRow(60).height = 36.75;
            for (let i = 61; i < 77; i++) {
                worksheet.getRow(i).height = 14.25
            }
            for (let i = 77; i < 116; i++) {
                worksheet.getRow(i).height = 12
            }
            worksheet.getRow(116).height = 69

            styleTitleCell(worksheet.getCell('A60'))
            worksheet.getCell('A60').value = {
                richText: [{ font: { name: 'Arial Black', size: 20, bold: true }, text: title[0], }],
            };

            for (let i = 1; i < 7; i++) {
                worksheet.getCell(`${String.fromCharCode(i + 64)}${76}`).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
            }
            for (let i = 1; i < 3; i++) {
                worksheet.getCell(`${String.fromCharCode(i + 64)}${64}`).border = { bottom: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${68}`).border = { bottom: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${71}`).border = { bottom: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${74}`).border = { top: { style: 'thin' } }
            }
            for (let i = 3; i < 7; i++) {
                worksheet.getCell(`${String.fromCharCode(i + 64)}${64}`).border = { top: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${67}`).border = { top: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(i + 64)}${71}`).border = { top: { style: 'thin' } }
            }
            for (let i = 61; i < 116; i++) {
                worksheet.getCell(`A${i}`).border = { left: { style: 'thick' } }
                if (i === 64 || i === 68 || i === 71 || i === 73 || i === 75 || i === 76) {
                    worksheet.getCell(`A${i}`).border = { left: { style: 'thick' }, bottom: { style: 'thin' } }
                }
                worksheet.getCell(`F${i}`).border = { right: { style: 'thick' } }
                if (i === 63 || i === 66 || i === 70 || i === 75 || i === 76) {
                    worksheet.getCell(`C${i}`).border = { bottom: { style: 'thin' } }
                    worksheet.getCell(`F${i}`).border = {
                        right: { style: 'thick' }, bottom: { style: 'thin' }
                    }
                }
            }

            for (let i = 72; i < 116; i++) {
                worksheet.getCell(`B${i}`).border = { left: { style: 'thin' } }
                if (i === 73 || i === 75 || i === 76) {
                    worksheet.getCell(`B${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 60; i < 116; i++) {
                worksheet.getCell(`C${i}`).border = { left: { style: 'thin' } }
                if (i === 63 || i === 66 || i === 70 || i === 75 || i === 76) {
                    worksheet.getCell(`C${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 77; i < 114; i++) {
                worksheet.getCell(`${String.fromCharCode(68)}${i}`).border = { left: { style: 'dotted' }, right: { style: 'dotted' } }
            }
            worksheet.getCell('A60').border = {
                top: { style: "thick" },
                bottom: { style: "thin" },
                right: { style: "thick" },
                left: { style: "thick" },
            };
            worksheet.getCell('B114').border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
                left: { style: "thin" },
            };
            worksheet.getCell('F114').border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thick" },
                left: { style: "thin" },
            };
            worksheet.getCell('C114').border = {
                top: { style: "thin" },
            };
            worksheet.getCell('D114').border = {
                top: { style: "thin" },
            };
            worksheet.getCell('D116').border = {
                top: { style: "thin" },
                bottom: { style: "thick" },
                right: { style: "thick" },
                left: { style: "thick" },
            };





            worksheet.getCell('A61').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[0] }] }//1. Shipper/Exporter
            worksheet.getCell('A62').alignment = { indent: 1 }
            worksheet.getCell('A62').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: description[1].shipper },
                { font: { name: 'Arial', size: 9, bold: false }, text: description[1].tel }]
            }

            worksheet.getCell('A63').alignment = { indent: 1 }
            worksheet.getCell('A63').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].address1 }] }
            worksheet.getCell('A64').alignment = { indent: 1 }
            worksheet.getCell('A64').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].address2 }] }

            worksheet.getCell('A65').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[1] }] }//2. Consignee
            worksheet.getCell('A66').alignment = { indent: 1 }
            worksheet.getCell('A66').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: description[2].Consignee }] }
            worksheet.getCell('A67').alignment = { indent: 1 }
            worksheet.getCell('A67').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].address1 }] }
            worksheet.getCell('A68').alignment = { indent: 1 }
            worksheet.getCell('A68').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].address2 }] }

            worksheet.getCell('A69').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[2] }] }//3. Notify Party
            worksheet.getCell('A70').alignment = { indent: 1 }
            worksheet.getCell('A70').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: description[3].Party }] }
            worksheet.getCell('A71').alignment = { indent: 1 }
            worksheet.getCell('A71').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[3].address1 }] }

            worksheet.getCell('A72').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[3] }] }//4. Port of Loading
            worksheet.getCell('A73').alignment = { indent: 1 }
            worksheet.getCell('A73').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[4].Port[0] }] }

            worksheet.getCell('A74').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[5] }] } //6. Carrier
            worksheet.getCell('A75').alignment = { indent: 1 }
            worksheet.getCell('A75').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[6].Carrier }] }

            worksheet.getCell('B72').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[4] }] }//5. Sailing on or about
            worksheet.getCell('B73').alignment = { indent: 1 }
            worksheet.getCell('B73').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[5].Sailing }] }

            worksheet.getCell('B74').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[6] }] }//7. Final Destination
            worksheet.getCell('B75').alignment = { indent: 1 }
            worksheet.getCell('B75').value = { richText: [{ font: { name: 'Arial', size: 9, }, text: description[7].Destination }] }
            worksheet.getCell('B114').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('B114').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: 'TOTAL' }]
            }


            worksheet.getCell('D114').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('D114').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: 'SET' }]
            }
            worksheet.getCell('D115').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('D115').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: 'EA' }]
            }

            worksheet.getCell('D116').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('D116').value = {
                richText: [{ font: { name: 'Arial', size: 11, bold: true }, text: 'Signed By' }]
            }
            worksheet.getCell('C61').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[7] }] }//8. No. & Date of Invoice
            worksheet.getCell('C62').alignment = { indent: 1 }
            worksheet.getCell('C62').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[8]['NO&Date'] }] }
            worksheet.getCell('F63').alignment = { horizontal: 'center' }
            worksheet.getCell('F63').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[8].page2 }] }

            worksheet.getCell('C64').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[8] }] }//9. Payment Terms and Conditions
            worksheet.getCell('C65').alignment = { indent: 1 }
            worksheet.getCell('C65').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[9].Payment }] }

            worksheet.getCell('C67').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[9] }] }//10. Freight Term
            worksheet.getCell('C68').alignment = { indent: 1 }
            worksheet.getCell('C68').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[10].Term[0] }] }

            worksheet.getCell('C71').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[10] }] }//11. Remarks
            worksheet.getCell('C72').alignment = { indent: 1 }
            worksheet.getCell('C72').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[11].Remarks1 }] }
            worksheet.getCell('C73').alignment = { indent: 1 }
            worksheet.getCell('C73').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[11].Remarks2 }] }
            worksheet.getCell('C74').alignment = { indent: 1 }
            worksheet.getCell('C74').value = { richText: [{ font: { name: 'Arial', size: 9, color: { argb: 'ff0' }, }, text: description[11].Forwarder }] }

            worksheet.getCell('A76').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[11] }] }//12. Mark & No.Pkgs
            worksheet.getCell('B76').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[12] }] }//13. Description of goods
            worksheet.getCell('C76').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[13] }] }//14. Quantity
            worksheet.getCell('D76').value = { richText: [{ font: { name: 'Arial', size: 9, }, text: headers[14] }] }//Unit
            worksheet.getCell('D76').alignment = { horizontal: 'center' }
            worksheet.getCell('E76').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[15] }] }//15. Unit price
            worksheet.getCell('F76').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[16] }] }//16. Amount




            const image_sign = './images/sign.png'
            const response_sign = await fetch(image_sign)
            const buffer_sign = await response_sign.arrayBuffer();
            const imageSign = workbook.addImage({
                buffer: buffer_sign,
                extension: 'png',
            });

            worksheet.addImage(imageSign, {
                tl: { col: 2, row: 115.3 }, ext: { width: 270, height: 40 }, editAs: 'absolute'
            });


            const image_logo = './images/dtlogo.png'
            const response_logo = await fetch(image_logo)
            const buffer_logo = await response_logo.arrayBuffer();
            const imageDiamond = workbook.addImage({
                buffer: buffer_logo,
                extension: 'png',
            });
            worksheet.addImage(imageDiamond, {
                tl: { col: 0.5, row: 18 }, ext: { width: 150, height: 80 }, editAs: 'absolute'
            });
            worksheet.addImage(imageDiamond, {
                tl: { col: 0.5, row: 77 }, ext: { width: 150, height: 80 }, editAs: 'absolute'
            });

            const imageEK_logo = './images/ek_logo.png';
            const response = await fetch(imageEK_logo);
            const buffer = await response.arrayBuffer()
            const EK_logoImageId3 = workbook.addImage({
                buffer: buffer,
                extension: 'png',
            });
            worksheet.addImage(EK_logoImageId3, {
                tl: { col: 0.5, row: 0.1 }, ext: { width: 135, height: 42 }, editAs: 'absolute'
            });
            worksheet.addImage(EK_logoImageId3, {
                tl: { col: 0.5, row: 59.1 }, ext: { width: 135, height: 42 }, editAs: 'absolute'
            });


            const fileData = await workbook.xlsx.writeBuffer();
            const blob = new Blob([fileData], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            saveAs(blob, 'INVOICE')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <ExportExcelComponent
                makeInvoice={makeInvoice}
            />
        </div>
    );
};

export default InvoiceExcelContainer;