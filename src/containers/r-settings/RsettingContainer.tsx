import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { editActions } from '../../store/slices/editSlice';
import { formSelector, formActions } from '../../store/slices/formSlice';
import LeftComponent from '../left/LeftComponent';
import RestComponent from '../left/RestComponent';
import CardComponent from '../common/card/CardComponent';
const RsettingContainer = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(itemData)
    const setItems = items.filter(item => item.type === 'SET')
    const otherItems = items.filter(item => item.type !== 'SET')

    const selectItem = (id: number | '') => {
        const item = items.filter(item => item.id === id);
        dispatch(editActions.selectItem(item[0]));
        dispatch(formActions.toggle_form({ form: 'edit', value: true }))
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



    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(itemActions.getItem())
    }, [dispatch])

    return (
        <div className='contents'>
            <LeftComponent items={setItems} />
            <RestComponent
                selectItem={selectItem}
                dragItem={dragItem}
                onDrop={onDrop}
                items={otherItems} />


        </div>




    );
};
export default RsettingContainer;