import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { formSelector, formActions } from '../../store/slices/formSlice';
import HomeComponent from './HomeComponent';
const HomeContainer = () => {
    const dispatch = useDispatch();

    return (
        <HomeComponent

        />
    );
};
export default HomeContainer;