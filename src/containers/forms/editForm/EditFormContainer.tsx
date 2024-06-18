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
    const { items, dragItems, dragItem: dragedItem } = useSelector(itemData)
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

            // dispatch(editActions.initForm())
            // dispatch(editActions.changeInitial({ name, value }))
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


        // results.forEach((result) => {
        //     const json_arr = goodType.map((ar: any) => JSON.stringify(ar))
        //     if (!json_arr.includes(JSON.stringify(result))) {
        //         setGoodType([result, ...goodType].sort())
        //     }
        // })
        return ({ category: item.category, type: item.groupType })
    })
    const insertGroupType = () => {
        if (next.new_groupType.toString()) {
            setGoodType([{ category: next.category.toString(), type: next.new_groupType.toString() }, ...goodType])
            dispatch(editActions.changeField({ name: 'groupType', value: next.new_groupType }))
        }
    }
    const insertSupplyer = () => {
        if (next.new_supplyer.toString()) {
            setSupplyer([next.new_supplyer.toString(), ...supplyer].sort())
            dispatch(editActions.changeField({ name: 'supplyer', value: next.new_supplyer }))
        }
    }
    const dragItem = (id: number | '') => {
        const item = items.filter(item => item.id === id).map(item => (
            {
                id: item.id,
                type: item.type,
                category: item.category,
                itemName: item.itemName,
                desript: item.descript,
                unit: item.unit,
                im_price: item.im_price,
                use: item.use,
                point: 0
            }
        ));
        dispatch(itemActions.inputDragItem(item[0]))
    }
    const onDrop = () => {
        dispatch(itemActions.initialDragItem())
    }
    const drag_on = (targetId: number, itemId: number) => {
        if (dragItems.filter(dragItem => dragItem.id === itemId && dragItem.targetId === targetId).length === 0)
            dispatch(itemActions.drag_on(targetId))
    }
    const addCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {

        let idx = dragItems.findIndex(item => item.id === itemId && item.targetId === targetId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            // console.log('targetId', targetId)
            dispatch(itemActions.addCount({ idx, targetId }))
        }
    }
    const removeCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {
        let idx = dragItems.findIndex(item => item.targetId === targetId && item.id === itemId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.removeCount({ idx, targetId }))
        }
    }
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
            insertSupplyer={insertSupplyer}
            dragedItem={dragedItem}
            drag_on={drag_on} addCount={addCount} removeCount={removeCount}
            dragItem={dragItem} dragItems={dragItems} onDrop={onDrop}
        />
    );
};

export default EditFormContainer;