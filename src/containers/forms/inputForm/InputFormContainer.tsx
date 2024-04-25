import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { itemActions, itemData } from '../../../store/slices/itemSlice';
import { imageInsert } from '../../../lib/utils/createFormData'
import { formActions } from '../../../store/slices/formSlice';
import { ExcelAction, ExcelData } from '../../../store/slices/excelSlice';
import InputFormComponent from './InputFormComponent';
import * as XLSX from 'xlsx';

const InputFormContainer = () => {
    const dispatch = useDispatch()
    const excelFile = useRef<HTMLInputElement>(null)
    const [goodType, setGoodType] = useState<{ category: string, type: string }[]>([])

    const { input, imageList, items } = useSelector(itemData)
    const { file, data: datas, status } = useSelector(ExcelData)


    const onChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'use' || name === 'set') {
            value = value === '1' ? true : false
        }
        if (name === 'type') {
            dispatch(itemActions.changeInitial({ name, value }))
        }
        dispatch(itemActions.changeField({ name, value }))

    }
    const insertGroupType = () => {
        setGoodType([{ category: input.category.toString(), type: input.new_groupType.toString() }, ...goodType])
        dispatch(itemActions.changeField({ name: 'groupType', value: input.new_groupType }))

    }


    const insertImage = async (e: any) => {
        const formData = imageInsert(e, imageList)
        dispatch(itemActions.addImage(await formData))
    }
    const addItem = (
        item: {
            type: string,
            groupType: string,
            groupName: string,
            category: string,
            itemName: string,
            descript: string,
            unit: string,
            im_price: number;
            ex_price: number;
            use: boolean,
            supplyer: string,
            imageList: { url: string }[]
        }
    ) => {
        dispatch(itemActions.addItem(item))
    }
    const formClose = () => {
        dispatch(formActions.toggle_form({ form: 'input', value: false }))
        dispatch(ExcelAction.initForm())
        // console.log(excelFile.current)
    }
    const excel_onChange = (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = [
            'application/vnd.ms-excel',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    dispatch(ExcelAction.onChange(e.target?.result))
                    convertExcelData(e.target?.result)
                }
            }
        }
    }
    const convertExcelData = (file: ArrayBuffer | undefined | string | null) => {

        if (file) {
            const workbook = XLSX.read(file, { type: 'buffer' });
            const worksheetname = workbook.SheetNames[0];
            const worksheets = workbook.Sheets[worksheetname];
            const excelData = XLSX.utils.sheet_to_json(worksheets)
            dispatch(ExcelAction.onSubmit(excelData))
        }
    }
    const excel_onSubmit = () => {

        if (datas) {
            dispatch(itemActions.excelAdd(datas))
            dispatch(ExcelAction.initForm())
            if (excelFile.current) excelFile.current.value = ''

        }
    }

    const results = items.filter((item: any) => item.groupType !== null).map((item: any) =>
        ({ category: item.category, type: item.groupType }))
    results.forEach((result) => {
        const json_arr = goodType.map((ar: any) => JSON.stringify(ar))
        if (!json_arr.includes(JSON.stringify(result))) {
            setGoodType([result, ...goodType])
        }
    })
    useEffect(() => {
        dispatch(itemActions.initForm())
    }, [dispatch])

    return (
        <InputFormComponent
            onChange={onChange}
            input={input}
            insertImage={insertImage}
            imageList={imageList}
            addItem={addItem}
            formClose={formClose}
            excel_onChange={excel_onChange}
            excel_onSubmit={excel_onSubmit}
            file={file}
            excelFile={excelFile}
            insertGroupType={insertGroupType}
            goodType={goodType}

        />


    );
};

export default InputFormContainer;