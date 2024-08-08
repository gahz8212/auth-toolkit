import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { relateActions } from '../../store/slices/relationSlice'
import { editActions } from '../../store/slices/editSlice';
import { makeRelateData_Price } from '../../lib/utils/createRelateData'
import * as Excel from "exceljs";
import { saveAs } from 'file-saver'
import HomeComponent from './HomeComponent';
import dtlogo from '../../../public/images/dtlogo.png'
import sign from '../../../public/images/SIGN.png'

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
        'Destination': 'Dallas, Texas USA.',
    },
    8: {
        'NO&Date': '',
        page: '1 OF 1'
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
        // cell.font = {
        //     name: "Arial",
        //     size: 20,
        //     bold: true,
        //     color: { argb: "ff252525" },

        // };
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
            const worksheet = workbook.addWorksheet('Invoice');
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
            worksheet.getRow(1).height = 40;
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
                // worksheet.getCell(`${String.fromCharCode(i + 64)}${9}`).border = { bottom: { style: 'thin' } }
                // worksheet.getCell(`${String.fromCharCode(i + 64)}${12}`).border = { bottom: { style: 'thin' } }
                // worksheet.getCell(`${String.fromCharCode(i + 64)}${15}`).border = { top: { style: 'thin' }, right: { style: 'thin' } }
            }
            for (let i = 1; i < 60; i++) {
                worksheet.getCell(`${String.fromCharCode(65)}${i}`).border = { left: { style: 'thin' } }
                if (i === 1 || i === 5 || i === 9 || i === 12 || i === 14 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(65)}${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
                worksheet.getCell(`${String.fromCharCode(67)}${i}`).border = { left: { style: 'thin' } }
                worksheet.getCell(`${String.fromCharCode(71)}${i}`).border = { left: { style: 'thin' } }
                if (i === 1 || i === 4 || i === 7 || i === 11 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(67)}${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 13; i < 60; i++) {
                worksheet.getCell(`${String.fromCharCode(66)}${i}`).border = { left: { style: 'thin' } }
                if (i === 14 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(66)}${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 18; i < 60; i++) {
                worksheet.getCell(`${String.fromCharCode(68)}${i}`).border = { left: { style: 'dotted' }, right: { style: 'dotted' } }
                worksheet.getCell(`${String.fromCharCode(69)}${i}`).border = { right: { style: 'dotted' } }
            }
            const myBase64Image = 'data:image/png;base64,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'
            const imageId2 = workbook.addImage({
                base64: myBase64Image,
                extension: 'png',
            });
            worksheet.addImage(imageId2, 'A18:A19');






            worksheet.getCell('A2').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[0] }] }//1. Shipper/Exporter
            worksheet.getCell('A3').alignment = { indent: 1 }
            worksheet.getCell('A3').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].shipper }] }
            worksheet.getCell('A4').alignment = { indent: 1 }
            worksheet.getCell('A4').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].address1 }] }
            worksheet.getCell('A5').alignment = { indent: 1 }
            worksheet.getCell('A5').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[1].address2 }] }

            worksheet.getCell('A6').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[1] }] }//2. Consignee
            worksheet.getCell('A7').alignment = { indent: 1 }
            worksheet.getCell('A7').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].Consignee }] }
            worksheet.getCell('A8').alignment = { indent: 1 }
            worksheet.getCell('A8').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].address1 }] }
            worksheet.getCell('A9').alignment = { indent: 1 }
            worksheet.getCell('A9').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[2].address2 }] }

            worksheet.getCell('A10').value = { richText: [{ font: { name: 'Arial', bold: true, size: 9 }, text: headers[2] }] }//3. Notify Party
            worksheet.getCell('A11').alignment = { indent: 1 }
            worksheet.getCell('A11').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[3].Party }] }
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

            worksheet.getCell('C2').value = { richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: headers[7] }] }//8. No. & Date of Invoice
            worksheet.getCell('C3').alignment = { indent: 1 }
            worksheet.getCell('C3').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[8]['NO&Date'] }] }
            worksheet.getCell('F4').alignment = { horizontal: 'center' }
            worksheet.getCell('F4').value = { richText: [{ font: { name: 'Arial', size: 9 }, text: description[8].page }] }

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