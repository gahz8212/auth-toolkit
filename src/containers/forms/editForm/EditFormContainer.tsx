import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editActions, editData } from '../../../store/slices/editSlice';
import { itemActions, itemData } from '../../../store/slices/itemSlice';
import { formSelector, formActions } from '../../../store/slices/formSlice';
import { imageInsert } from '../../../lib/utils/createFormData'

import EditFormComponent from './EditFormComponent';

const EditFormContainer = () => {
    const dispatch = useDispatch();
    const { prev, next, status } = useSelector(editData)
    const { items } = useSelector(itemData)
    const [goodType, setGoodType] = useState<{
        category: string, type: string,
    }[]>([])
    const [supplyer, setSupplyer] = useState<string[]>([])

    const onChange = (e: any) => {
        let { name, value } = e.target;
        // console.log(value)
        if (name === 'use' || name === 'set') {
            value = value === '1' ? true : false
        }
        if (name === 'type') {

            // dispatch(itemActions.initForm())
            // dispatch(itemActions.changeInitial({ name, value }))
        }

        dispatch(editActions.changeField({ name, value }))
    }
    const editImage = async (e: any) => {
        const formData = imageInsert(e, next.Images)
        dispatch(editActions.editImage(await formData))

    }
    const editItem = (
        item: {
            [key: string]: number | string | { url: string }[] | boolean,
        }
    ) => {
        dispatch(editActions.editItem(item))
    }
    const removeItem = (id: number | '') => {
        dispatch(editActions.removeItem(id))
    }
    const removeImage = (id: number | '', url: string) => {
        const newNextImage = next.Images.filter(image => image.url !== url)
        dispatch(editActions.removeImage(newNextImage))
    }
    const closeForm = () => {
        dispatch(formActions.toggle_form({ form: 'edit', value: false }))
    }
    const results = items.filter((item: any) => item.groupType !== null).map((item: any) => {


        return ({ category: item.category, type: item.groupType })
    })
    const insertGroupType = () => {
        if (next.new_groupType.toString()) {
            setGoodType([{ category: next.category.toString(), type: next.new_groupType.toString() }, ...goodType])
            dispatch(editActions.changeField({ name: 'groupType', value: next.new_groupType }))
        }
    }
    results.forEach((result) => {
        const json_arr = goodType.map((ar: any) => JSON.stringify(ar))
        if (!json_arr.includes(JSON.stringify(result))) {
            setGoodType([result, ...goodType].sort())
        }
    })
    const supplyers = items.filter((item: any) => item.supplyer !== null).map((item: any) =>
        item.supplyer)
    supplyers.forEach(result => {
        if (result !== "" && !supplyer.includes(result)) {
            setSupplyer([result, ...supplyer].sort())
        }
    })

    useEffect(() => {
        if (status.message === 'edit_ok') {
            const idx = (items.findIndex(item => item.id === next.id))
            const newItems = [...items];
            newItems.splice(idx, 1, next)
            dispatch(itemActions.changeItems(newItems))
        }
    }, [status, dispatch])
    useEffect(() => {
        if (status.message === 'remove_ok') {
            const idx = (items.findIndex(item => item.id === next.id))
            const newItems = [...items]
            newItems.splice(idx, 1)
            dispatch(itemActions.changeItems(newItems))
            dispatch(editActions.initForm())
        }
    }, [status, dispatch])
    return (
        <EditFormComponent
            prev={prev}
            next={next}
            onChange={onChange}
            editImage={editImage}
            editItem={editItem}
            removeItem={removeItem}
            removeImage={removeImage}
            closeForm={closeForm}
            goodType={goodType}
            supplyers={supplyer}
            insertGroupType={insertGroupType}
        />
    );
};

export default EditFormContainer;