import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemActions, itemData } from '../../store/slices/itemSlice';
import { editActions } from '../../store/slices/editSlice';
import { formSelector, formActions } from '../../store/slices/formSlice';
import { ExcelData } from '../../store/slices/excelSlice';
import HomeComponent from './HomeComponent';
const HomeContainer = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector(itemData);
    const { input, edit, search } = useSelector(formSelector)
    const { data } = useSelector(ExcelData)


    const selectItem = (id: number | '') => {
        const item = items.filter(item => item.id === id);
        dispatch(editActions.selectItem(item[0]));
        dispatch(formActions.toggle_form({ form: 'edit', value: true }))


    }
    const openAddForm = () => {
        dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
    }
    const changePosition = (form: string, position: { x: number, y: number }) => {
        dispatch(formActions.changePosition({ form, position }))
    }

    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(itemActions.getItem())
    }, [dispatch])
    // useEffect(() => {
    //     if (status.message === 'excelAdd_ok') {
    //         dispatch(itemActions.addItems(data))

    //     }
    // }, [status, dispatch, data])
    return (
        <HomeComponent
            items={items}
            selectItem={selectItem}
            input={input}
            edit={edit}
            search={search}
            openAddForm={openAddForm}
            changePosition={changePosition}

        // datas={data}

        />


    );
};

export default HomeContainer;