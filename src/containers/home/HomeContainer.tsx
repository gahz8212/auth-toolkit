import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { itemData, itemActions } from '../../store/slices/itemSlice';
import { relateActions } from '../../store/slices/relationSlice'
import { editActions } from '../../store/slices/editSlice';
import { currencyActions, currencyData } from '../../store/slices/currencySlice';
import { makeRelateData_Price } from '../../lib/utils/createRelateData'
import { chatData, chatActions } from '../../store/slices/chatSlice'
import { userData } from '../../store/slices/userSlice';
import { imageInsert } from '../../lib/utils/createFormData';
import io from 'socket.io-client'
import axios from 'axios';
import HomeComponent from './HomeComponent';
const socket = io('/', { withCredentials: true, path: '/socket.io' })



const HomeContainer = () => {
    const dispatch = useDispatch();
    const { items, dragItems, relations } = useSelector(itemData)
    const { fromCurrency, resultCurrency } = useSelector(currencyData)
    const { auth } = useSelector(userData)

    const searchCurrency = () => {
        // alert('search')
        dispatch(currencyActions.searchCurrency())
    }
    const { imageList, status, messages } = useSelector(chatData)
    const once = useRef(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<{ chat: string, name: string, image: string }[]>([])
    const [users, setUsers] = useState<string[]>([])
    // console.log('messages', messages)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value)

    }
    const onInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // imageList가 비어있으면 비어 있는대로 => 생성
        // imageList에 데이터가 있으면 있는대로 => 수정
        // 결과적으로 imageList와 조합해서 새로운 formData를 만들어 주는 함수인 것
        const formData = imageInsert(e, imageList)
        dispatch(chatActions.addImage(await formData))
    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        send();
        setMessage('')
    }
    const send = async () => {
        return await axios.post('/home/chat', { message })
    }
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
        }
    }
    useEffect(() => {
        dispatch(itemActions.initForm())
        dispatch(editActions.initForm())
        dispatch(itemActions.getItem())
        dispatch(relateActions.initRelate())
    }, [dispatch])
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
        dispatch(itemActions.inputDragItems(newArray))
    }, [])
    useEffect(() => {
        if (dragItems) {
            const result = dragItems.reduce((acc: { [key: number]: number }, curr) => {
                if (curr.type === 'SET' || curr.type === 'ASSY') {
                    if (items) {
                        const view = makeRelateData_Price(curr.id, relations, items)
                        const price = view[0].sum_im_price * curr.point;
                        if (acc[curr.targetId]) {
                            acc[curr.targetId] = price + acc[curr.targetId]
                        } else {
                            acc[curr.targetId] = price + acc[curr.targetId]

                        }
                    }
                } else {
                    if (acc[curr.targetId]) {
                        acc[curr.targetId] += curr.im_price * curr.point
                    } else {
                        acc[curr.targetId] = curr.im_price * curr.point
                    }
                }
                return acc;
            }, {})
            // console.log('result', result)
            dispatch(relateActions.calculateTotalPrice(result))
        }
    }, [dragItems, dispatch, items, relations])
    useEffect(() => { dispatch(currencyActions.searchCurrency()) }, [dispatch])


    useEffect(() => {
        if (!io) return
        if (once.current) {
            once.current = false;
            return
        }
        socket.on('chat', (data: { chat: string, name: string, image: string, userList: string[] }) => {
            // console.log('data', data)
            setChats(prev => [...prev, data])
            if (data.image) {
                setTimeout(scrollToBottom, 1000)
            } else {
                setTimeout(scrollToBottom, 100)
            }
        })
        once.current = true;
        return () => {
            socket.off('chat', (data: { chat: string, name: string, image: string, userList: string[] }) => {
                setChats(prev => [...prev, data])
            })
        }
    }, [])
    useEffect(() => {
        const result = localStorage.getItem('users')?.split(',')
        if (result)
            setUsers(result)
        if (!io) return
        if (once.current) {
            once.current = false;
            return
        }
        socket.on('login_response', (data) => {
            console.log('login_response_data', typeof data, data)
            // setUsers(data)
            const users: string[] = data
            const usersString = users.toString();
            // console.log(usersString)
            try {

                localStorage.removeItem('users')
                localStorage.setItem('users', usersString)
            } catch (e) { console.log('local storage is goes bad') }
            setUsers(users)
        })
        once.current = true;
        return () => {
            socket.off('login_response', (data) => {
                console.log(data)
                const users: string[] = data
                setUsers(users)
            })
        }
    }, [])
    useEffect(() => {
        if (!io) return;
        if (once.current) {
            once.current = false;
            return
        }
        socket.on('logout_response', (data) => {
            const users: string[] = Object.values(data)
            const usersString = users.toString();
            try {
                localStorage.removeItem('users')
                localStorage.setItem('users', usersString)
                localStorage.getItem('users')
                // console.log(result)
            } catch (e) { console.log('local storage is goes bad') }
            setUsers(users)

        })
        once.current = true;
        return () => {
            socket.off('logout_response', (data) => {
                const users: string[] = Object.values(data)
                setUsers(users)

            })
        }
    }, [])
    useEffect(() => {
        // setChats(prev => prev.concat(messages))
        setChats(messages)
        setTimeout(scrollToBottom, 100)
    }, [messages])
    // useEffect(() => {
    //     setTimeout(scrollToBottom, 1000)
    //     // scrollToBottom()
    // }, [chats])
    return (
        <HomeComponent
            fromCurrency={fromCurrency}
            searchCurrency={searchCurrency}
            resultCurrency={resultCurrency}
            users={users}
            auth={auth}
            onInsertImage={onInsertImage}
            scrollRef={scrollRef}
            onChange={onChange}
            onSubmit={onSubmit}
            message={message}
            messages={chats}
        />
    );
};
export default HomeContainer;