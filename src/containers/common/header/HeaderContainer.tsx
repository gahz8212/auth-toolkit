import React, { useState, useEffect } from 'react';
import HeaderComponent from './HeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
import { userData, userActions } from '../../../store/slices/userSlice';
import { PageActions } from '../../../store/slices/pageSlice';
import io from 'socket.io-client'
const socket = io('/', { withCredentials: true, path: '/socket.io' })
const HeaderContainer = () => {
    const dispatch = useDispatch();
    const [time, setTime] = useState('')
    const { auth, status } = useSelector(userData)
    const [remainingTime, setRemainingTime] = useState<number>(0)
    const logout = () => {
        if (auth) {
            socket.emit('logout_user', auth.name)//clientId를 넣어줘야 한다
            dispatch(userActions.expires_init())
            dispatch(PageActions.initPage())
            dispatch(userActions.logout())
            try {
                localStorage.removeItem('user')
            } catch (e) { console.log('local storage goes bad') }
        }
    }
    const extends_auth = () => {
        dispatch(userActions.extends_auth())
    }
    useEffect(() => {
        const es = new EventSource('/sse')
        const end = new Date(status.expires)
        console.log(typeof end)
        let restTime = '00:00:00'
        es.onmessage = function (e: any) {
            const server = new Date(parseInt(e.data, 10))
            const remainingTime = (end.getTime() - server.getTime());
            setRemainingTime(remainingTime)
            if (server >= end) {
                setTime('00:00:00');
                es.close();
                logout()
            } else {
                const seconds = ('0' + Math.floor((remainingTime / 1000) % 60)).slice(-2)
                const minutes = ('0' + Math.floor((remainingTime / 1000 / 60) % 60)).slice(-2)
                const hours = ('0' + Math.floor((remainingTime / 1000 / 60 / 60) % 60)).slice(-2)
                restTime = `${hours}:${minutes}:${seconds}`
                setTime(restTime)
            }
        }
        return () => {
            es.close()
        }
    }, [status.expires])
    return (
        <div>
            <HeaderComponent auth={auth} logout={logout} time={time} extends_auth={extends_auth} remainingTime={remainingTime} />
        </div>
    );
};

export default HeaderContainer;