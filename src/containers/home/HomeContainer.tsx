import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { formSelector, formActions } from '../../store/slices/formSlice';
import HomeComponent from './HomeComponent';
const HomeContainer = () => {
    const dispatch = useDispatch();
    const { input, edit, } = useSelector(formSelector)
    const openAddForm = () => {
        dispatch(formActions.toggle_form({ form: 'input', value: !input.visible }))
    }
    const changePosition = (form: string, position: { x: number, y: number }) => {
        dispatch(formActions.changePosition({ form, position }))
    }
    return (
        <HomeComponent
            input={input}
            edit={edit}
            openAddForm={openAddForm}
            changePosition={changePosition}
        />
    );
};
export default HomeContainer;