import React, { useEffect } from 'react';
import AuthTemplate from '../components/AuthTemplate';
import AuthForm from '../components/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/slices/authSlice';
import { authData } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const JoinContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { form } = useSelector((state: RootState) => ({ form: state.auth.join }))
    const { error, message, joinData } = useSelector(authData)
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { changeField } = authActions;
        const { name, value } = e.target;


        dispatch(changeField({ form: 'join', key: name, value }))


    }
    const join = () => {
        // console.log(joinData.email, joinData.password, joinData.name)
        if (!joinData.email || !joinData.name || !joinData.password) return;
        dispatch(authActions.join({ email: joinData.email, password: joinData.password, name: joinData.name, rank: joinData.rank }))
    }
    useEffect(() => {
        if (error) { setTimeout(() => { dispatch(authActions.errorReset()) }, 2000); return; }
        if (message === 'join_ok') {
            navigate('/')
        }

    })
    useEffect(() => {
        return () => {
            dispatch(authActions.initForm('join'))
        }
    }, [dispatch])
    return (
        <AuthTemplate>
            <AuthForm type="join" onChange={onChange} form={joinData} onSubmit={join} error={error} />
        </AuthTemplate>
    );
};

export default JoinContainer;