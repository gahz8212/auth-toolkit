import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editActions, editData } from '../../../store/slices/editSlice';
import { itemActions, itemData } from '../../../store/slices/itemSlice';
import { formSelector, formActions } from '../../../store/slices/formSlice';
import { imageInsert } from '../../../lib/utils/createFormData'

import EditFormComponent from './EditFormComponent';
import { makeRelateData_Price } from '../../../lib/utils/createRelateData'
const EditFormContainer = () => {
    const dispatch = useDispatch();
    const { prev, next, status } = useSelector(editData)
    const { items, relations, backup: backups } = useSelector(itemData)
    const { dragItems, dragItem: dragedItem } = useSelector(editData)
    const [totalPrice, setTotalPrice] = useState(0)
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
            [key: string]: number | string | { url: string }[] | boolean | {}[]
        },
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
        dispatch(editActions.initForm())
        dispatch(formActions.toggle_form({ form: 'edit', value: false }))
    }
    const results = items?.filter((item: any) => item.groupType !== null).map((item: any) => {
        return ({ category: item.category, type: item.groupType })
    })
    results?.forEach((result) => {
        const json_arr = goodType.map((ar: any) => JSON.stringify(ar))
        if (!json_arr.includes(JSON.stringify(result))) {
            setGoodType([result, ...goodType].sort())
        }
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

    const drag_on = (targetId: number, itemId: number) => {

        if ((dragItems?.filter(dragItem => dragItem.id === itemId && dragItem.targetId === targetId).length === 0) && targetId !== itemId) {
            dispatch(editActions.drag_on(targetId))

        }
    }
    const addCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {

        let idx = dragItems?.findIndex(item => item.id === itemId && item.targetId === targetId)
        if (typeof targetId === 'number' && typeof itemId === 'number' && items) {
            dispatch(editActions.addCount({ idx, targetId }))
            const price = makeRelateData_Price(targetId, relations, items)[0].sum_im_price
            setTotalPrice(price)
        }
    }

    const removeCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {
        let idx = dragItems?.findIndex(item => item.targetId === targetId && item.id === itemId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(editActions.removeCount({ idx, targetId }))
        }
    }


    useEffect(() => {
        if (status.message === 'edit_ok' && items) {
            const idx = (items.findIndex(item => item.id === next.id))
            const newItems = [...items];
            newItems.splice(idx, 1, next)
            dispatch(itemActions.changeItems(newItems))
            ////                            
            if (backups) {
                const Bidx = (backups.findIndex(backup => backup.id === next.id))
                const newBItems = [...backups];
                newBItems.splice(Bidx, 1, next)
                dispatch(itemActions.changeBItems(newBItems))
            }                             ////
            ////                                                         ////
            const createdRelations = dragItems?.map(dragItem => ({ UpperId: dragItem.targetId, LowerId: dragItem.id, point: dragItem.point }));
            // 현재 그룹창에 있는 새로운 dragItems를 relation 형식으로 변환
            if (createdRelations) {
                const newRelations =
                    relations?.filter(relation => relation.UpperId !== next.id)
                // 실제 relations에서 변환된 dragItems가 아닌것만 남긴 relations     
                // console.log('createdRelations', createdRelations)
                // console.log('newRelations', newRelations)
                if (createdRelations && newRelations) {
                    // console.log('updateRelations', [...createdRelations, ...newRelations])
                    dispatch(itemActions.updateRelation([...createdRelations, ...newRelations])
                        //  변환된 dragItems가 없는 relations에 새로운 dragItems 주입

                    )
                }

            }
        }
    }, [status, dispatch,])
    useEffect(() => {
        if (status.message === 'remove_ok' && items) {
            const idx = (items.findIndex(item => item.id === next.id))
            const newItems = [...items]
            newItems.splice(idx, 1)
            dispatch(itemActions.changeItems(newItems))
            dispatch(editActions.initForm())
        }
    }, [status, dispatch,])

    useEffect(() => {
        if (dragItems) {
            const result = dragItems.reduce((acc, curr) => {
                // console.log(curr.type)
                if (curr.type === 'SET' || curr.type === 'ASSY') {
                    if (items) {

                        const price = makeRelateData_Price(curr.id, relations, items)[0].sum_im_price
                        acc += price * curr.point;
                    }
                } else {
                    acc += (curr.im_price * curr.point)

                }
                return acc
            }, 0)
            // console.log(result)
            setTotalPrice(result)
        }
    }, [dragItems])


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
            dragItems={dragItems}
            relations={relations}

            totalPrice={totalPrice}
        // dragItem={dragItem} 
        // onDrop={onDrop}
        />
    );
};

export default EditFormContainer;