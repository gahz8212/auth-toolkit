import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { relateData, relateActions } from '../../store/slices/relationSlice'
import { editActions, editData } from '../../store/slices/editSlice';
import { formSelector, formActions } from '../../store/slices/formSlice';
import RsettingComponent from './RsettingComponent';

import { makeRelateData_View } from '../../lib/utils/createRelateData'


const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems, dragItem: dragedItem, relations } = useSelector(itemData)
    const { input, edit, relate } = useSelector(formSelector)
    const { status } = useSelector(editData);
    const { relate_view } = useSelector(relateData);
    const [selectedGoodId, setSelectedGoodId] = useState<number>(-1)
    const [viewMode, setViewMode] = useState(false)
    const [openBasket, setOpenBasket] = useState(false)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const openAddForm = () => {
        dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
    }
    const changePosition = (form: string, position: { x: number, y: number }) => {
        dispatch(formActions.changePosition({ form, position }))
    }
    const selectItem = (id: number | '') => {

        const newItems = relations?.filter(relation => relation.UpperId === id)
            .map(relation => relation.LowerId)
            .map(id => items?.filter(item => item.id === id)).flat().map((arr => {
                if (arr) {
                    const point = relations.filter(relation => relation.UpperId === id && relation.LowerId === arr.id).map(relation => relation.point)[0];
                    return ({
                        id: arr.id, type: arr.type, category: arr.category, point: point,
                        im_price: arr.im_price, itemName: arr.itemName, targetId: id, unit: arr.unit

                    })
                } else {
                    return null
                }
            })
            )
        dispatch(editActions.inputDragItems(newItems))
        if (items) {

            const item = items.filter(item => item.id === id);
            if (typeof id === 'number') {

                const result = makeRelateData_View(id, relations, items)
                if (result) {

                    if (!openBasket)
                        dispatch(relateActions.insertRelation_view(result))
                }
            }
            dispatch(editActions.selectItem(item[0]));
            dispatch(formActions.toggle_form({ form: 'edit', value: true }))
        }
    }
    const viewRelation = (toggle: boolean) => {
        dispatch(formActions.toggle_form({ form: 'relate', value: toggle }))
    }
    const dragItem = (id: number | '') => {
        if (items) {
            const item = items.filter(item => item.id === id).map(item => (
                {
                    id: item.id,
                    type: item.type,
                    category: item.category,
                    itemName: item.itemName,
                    unit: item.unit,
                    im_price: item.im_price,
                    point: 0,

                    // desript: item.descript,
                    // use: item.use,
                }
            ));
            dispatch(itemActions.inputDragItem(item[0]))
            dispatch(editActions.inputDragItem(item[0]))
        }
    }
    const onDrop = () => {
        dispatch(itemActions.initialDragItem())
        dispatch(editActions.initialDragItem())
    }
    const drag_on = (targetId: number, itemId: number) => {
        if ((dragItems.filter(dragItem => dragItem.id === itemId && dragItem.targetId === targetId).length === 0) && itemId !== targetId)
            dispatch(itemActions.drag_on(targetId))
    }
    const addCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {

        let idx = dragItems.findIndex(item => item.id === itemId && item.targetId === targetId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.addCount({ idx, targetId }))
            if (items) {
                const price = makeRelateData_View(targetId, relations, items)[0].sum_im_price
                setTotalPrice(price)
            }
        }
    }
    const removeCount = (targetId: number | string | boolean, itemId: number | string | boolean) => {
        let idx = dragItems.findIndex(item => item.targetId === targetId && item.id === itemId)
        if (typeof targetId === 'number' && typeof itemId === 'number') {
            dispatch(itemActions.removeCount({ idx, targetId }))
            if (items) {
                const price = makeRelateData_View(targetId, relations, items)[0].sum_im_price
                setTotalPrice(price)
            }
        }
    }
    const addRelations = (id: number) => {
        const createdRelations = dragItems?.filter(dragItem => dragItem.targetId === id)
            .map(dragItem => ({ UpperId: dragItem.targetId, LowerId: dragItem.id, point: dragItem.point }));
        // 현재 그룹창에 있는 새로운 dragItems를 relation 형식으로 변환
        // console.log('dragedItem', dragItem)
        if (createdRelations) {
            const newRelations =
                relations?.filter(relation => relation.UpperId !== id)
            // 실제 relations에서 변환된 dragItems가 아닌것만 남긴 relations     
            // console.log('createdRelations', createdRelations)
            // console.log('newRelations', newRelations)
            if (createdRelations && newRelations) {
                // console.log('updateRelations', [...createdRelations, ...newRelations])
                dispatch(itemActions.updateRelation([...createdRelations, ...newRelations]
                    //  변환된 dragItems가 없는 relations에 새로운 dragItems 주입
                ))
            }
        }
    }
    const inputDragItems = (dragItems: {}[],) => {
        dispatch(itemActions.inputDragItems(dragItems))
        // if (items) {
        //     items.filter(item => item.id === selectedItem);
        //     if (typeof selectedItem === 'number') {
        //         const result = makeRelateData_View(selectedItem, relations, items)
        //         if (result) {
        //             dispatch(relateActions.insertRelation_view(result))
        //         }
        //     }
        // }
    }
    const addRelateGood = (
        item: {
            [key: string]: number | string | {}[]
        },
    ) => {
        dispatch(editActions.editItem(item))
        if (typeof item.id === 'number') {
            addRelations(item.id)
            setSelectedGoodId(item.id)
        }

    }
    const changeView = (toggle: boolean) => {
        setViewMode(toggle)
        if (toggle) {

            let newItem: {}[] = [];

            relate_view?.map(view => items?.map(item => {
                if (item.id === view.currentId) {
                    newItem.push({
                        ...item,
                        top: view.top,
                        left: view.left,
                        sum_im_price: view.sum_im_price,
                        point: view.point
                    })
                    return newItem;
                } else { return null }
            }
            ))
            dispatch(itemActions.viewMatrix(newItem))
        } else {
            dispatch(itemActions.backupItems())


        }
    }

    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(editActions.initForm())
        dispatch(itemActions.getItem())
        dispatch(relateActions.initRelate())
    }, [dispatch])

    useEffect(() => {
        if (status.message === 'good_ok') {
            if (items) {
                const result = makeRelateData_View(selectedGoodId, relations, items)
                if (result) {
                    dispatch(relateActions.insertRelation_view(result))
                }
            }
        }
    }, [dispatch, status.message, selectedGoodId, items, relations])

    useEffect(() => {
        if (dragItems) {
            const result = dragItems.reduce((acc: { [key: number]: number }, curr) => {
                acc[curr.targetId] = curr.im_price * curr.point
                if (curr.type === 'SET' || curr.type === 'ASSY') {
                    if (items) {
                        const view = makeRelateData_View(curr.id, relations, items)
                        const price = view[0].sum_im_price;
                        console.log(price)
                        acc[curr.targetId] = price + acc[curr.targetId]
                    }
                }
                // console.log('sum_price', curr.targetId, sum_price)
                // console.log(acc)
                return acc;
            }, {})
            console.log(result)
            // console.log('result', result)
            // setTotalPrice(result)
        }
    }, [dragItems])

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

        console.log('newArray', newArray)
        inputDragItems(newArray)
    }, [])
    return (
        <RsettingComponent items={items} selectItem={selectItem} onDrop={onDrop} dragItem={dragItem} dragItems={dragItems}
            input={input} edit={edit} openAddForm={openAddForm} changePosition={changePosition}
            drag_on={drag_on} addCount={addCount} removeCount={removeCount} dragedItem={dragedItem} relate={relate}
            viewRelation={viewRelation} relations={relations} relate_view={relate_view} addRelateGood={addRelateGood}
            inputDragItems={inputDragItems} changeView={changeView} viewMode={viewMode} setOpenBasket={setOpenBasket}
            totalPrice={totalPrice} />
    );
};

export default RsettingContainer;