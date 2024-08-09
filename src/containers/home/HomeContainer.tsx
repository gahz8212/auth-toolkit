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

const columnWidths = [22, 32, 9.63, 4, 10.5, 10.5]
const HomeContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems, relations } = useSelector(itemData)

    const styleTitleCell = (cell: Excel.Cell) => {
        // cell.fill = {
        //     type: "pattern",
        //     pattern: "solid",
        //     fgColor: { argb: "ffebebeb" },


        // };

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
        // cell.border = {
        //     bottom: { style: "thin", color: { argb: "-100000f" } },
        //     right: { style: "thin", color: { argb: "-100000f" } },
        // };
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
            const worksheet = workbook.addWorksheet('Invoice', { pageSetup: { margins: { left: 0.3, right: 0.3, top: 0, bottom: 0, header: 0, footer: 0 } } });
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
            worksheet.mergeCells("B51:B52")
            worksheet.mergeCells("E51:F52")

            worksheet.mergeCells("A53:F53")

            worksheet.getRow(1).height = 36.75;
            for (let i = 2; i < 18; i++) {
                worksheet.getRow(i).height = 14.25
            }
            for (let i = 18; i < 57; i++) {
                worksheet.getRow(i).height = 12
            }
            worksheet.getRow(53).height = 69

            styleTitleCell(worksheet.getCell('A1'))
            worksheet.getCell('A1').value = {
                richText: [{ font: { name: 'Arial Black', size: 20, bold: true }, text: title[0], }],
            };



            worksheet.getCell('A1').border = { left: { style: 'thick' }, right: { style: 'thick' }, top: { style: 'thick' }, bottom: { style: 'thick' } }

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
            for (let i = 2; i < 54; i++) {
                worksheet.getCell(`A${i}`).border = { left: { style: 'thick' } }
                if (i === 1 || i === 5 || i === 9 || i === 12 || i === 14 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(65)}${i}`).border = { left: { style: 'thick' }, bottom: { style: 'thin' } }
                }
                worksheet.getCell(`F${i}`).border = { right: { style: 'thick' } }
                if (i === 1 || i === 4 || i === 7 || i === 11 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(67)}${i}`).border = { left: { style: 'thick' }, bottom: { style: 'thin' } }
                    worksheet.getCell(`${String.fromCharCode(70)}${i}`).border = {
                        right: { style: 'thick' }, bottom: { style: 'thin' }
                    }
                }
            }

            for (let i = 13; i < 51; i++) {
                worksheet.getCell(`${String.fromCharCode(66)}${i}`).border = { left: { style: 'thin' } }
                if (i === 14 || i === 16 || i === 17) {
                    worksheet.getCell(`${String.fromCharCode(66)}${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 1; i < 51; i++) {
                worksheet.getCell(`C${i}`).border = { left: { style: 'thin' } }
                if (i === 4 || i === 7 || i === 11 || i === 16 || i === 17) {
                    worksheet.getCell(`C${i}`).border = { left: { style: 'thin' }, bottom: { style: 'thin' } }
                }
            }
            for (let i = 18; i < 51; i++) {
                worksheet.getCell(`${String.fromCharCode(68)}${i}`).border = { left: { style: 'dotted' }, right: { style: 'dotted' } }
                worksheet.getCell(`${String.fromCharCode(69)}${i}`).border = { right: { style: 'dotted' } }
            }
            worksheet.getCell('B51').border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
                left: { style: "thin" },
            };
            worksheet.getCell('F51').border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
                left: { style: "thin" },
            };
            worksheet.getCell('C51').border = {
                top: { style: "thin" },
            };
            worksheet.getCell('D51').border = {
                top: { style: "thin" },
            };
            worksheet.getCell('D53').border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
                left: { style: "thin" },
            };


            const myBase64Mark = 'data:image/png;base64,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'
            const myBase64Logo = 'data:image/png;base64,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'
            const myBase64Sign = 'data:image/png;base64,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'
            const imageId1 = workbook.addImage({
                base64: myBase64Sign,
                extension: 'png',
            });
            worksheet.addImage(imageId1, {
                tl: { col: 2, row: 52.3 }, ext: { width: 270, height: 40 }, editAs: 'absolute'
            });

            const imageId2 = workbook.addImage({
                base64: myBase64Logo,
                extension: 'png',
            });
            worksheet.addImage(imageId2, {
                tl: { col: 0.5, row: 18 }, ext: { width: 150, height: 80 }, editAs: 'absolute'
            });

            const imageSrc = './images/ek_logo.png';
            const response = await fetch(imageSrc);
            const buffer = await response.arrayBuffer()
            const imageId3 = workbook.addImage({
                buffer: buffer,
                extension: 'png',
            });
            worksheet.addImage(imageId3, {
                tl: { col: 0.5, row: 0.1 }, ext: { width: 135, height: 42 }, editAs: 'absolute'
            });







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
            worksheet.getCell('B51').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('B51').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: 'TOTAL' }]
            }


            worksheet.getCell('D51').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('D51').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: 'SET' }]
            }
            worksheet.getCell('D52').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('D52').value = {
                richText: [{ font: { name: 'Arial', size: 9, bold: true }, text: 'EA' }]
            }

            worksheet.getCell('D53').alignment = { horizontal: 'center', vertical: 'middle' }
            worksheet.getCell('D53').value = {
                richText: [{ font: { name: 'Arial', size: 11, bold: true }, text: 'Signed' }]
            }
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