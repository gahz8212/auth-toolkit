import React from 'react';

type Props = {
    onChange: (e: any) => void;
    onInsertImage: (e: any) => void;
    onSubmit: (e: any) => void;
    message: string;
    messages: { name: string, chat: string, image: string }[]
    scrollRef: React.RefObject<HTMLDivElement>;
    auth: { name: string; } | null;
    users: string[]
    fromCurrency: string;
    searchCurrency: () => void;
    resultCurrency: { [key: string]: { [key: string]: number } } | null
}
const HomeComponent: React.FC<Props> = ({ fromCurrency, resultCurrency, users, onInsertImage, auth, scrollRef, message, onSubmit, onChange, messages }) => {
    // console.log(messages)
    if (!resultCurrency) return null;
    return (
        <div className='Wrap-home'>
            <div className='currentcy_form'>
                <div className="title">환율계산기</div>
                <div className="curr">

                    <div className='currData'>
                        <span className='unit'>1$</span>
                        <span>\{(1 / resultCurrency![fromCurrency]!.usd).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <div className='currData'>
                        <span className='unit'>1￥</span>
                        <span>\{(1 / resultCurrency![fromCurrency]!.jpy).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    {/* <div className='outter' style={{ width: '300px', height: '300px', overflowY: 'auto' }} >
                        <div className='inner' style={{ width: '270px', height: '1000px' }}></div>
                    </div> */}
                </div>
            </div >

            <div className="myboard">
                게시판 자리
            </div>
            <div className='Wrap-chat-user'>

                <div className="Wrap-chat">

                    <div className="search">

                        <input type="date" name="startDay" id="sdate" required />
                        <input type="date" name="endDay" id="edate" required />
                        <select name="user" id="" >
                            <option value="">전체</option>
                            {
                                users && users.map(user =>
                                    <option value="">{user}</option>
                                )
                            }
                        </select>
                        <input type="text" name="phrase" id="" />
                        <button className='btn'>검색</button>
                    </div>
                    <div className="chats" ref={scrollRef}>
                        {messages?.map((message, index) => {
                            // console.log('message.name', message.name, 'auth.name:', auth?.name)
                            return (<div key={index} className={`chat ${message.name === 'system' ? 'center' : message?.name === auth?.name ? 'right' : 'left'}`}>
                                <div className='username'>
                                    {message.name === 'system' ? '' : message.name === auth?.name ? "" : message.name}
                                </div>
                                {message.chat && message.chat}
                                <div>
                                    {message.image && <img key={index} src={message.image} alt='img' width='100px'></img>}
                                </div>
                            </div>)
                        })}
                    </div>
                    <form className="control"
                        onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} value={message} />
                        <button className='btn' >전송</button>
                        <label htmlFor="photo" className='btn'>사진</label>
                        <input type="file" name="images" id="photo" onChange={onInsertImage} multiple accept='image/*' />
                    </form>
                </div>
                <div className="userList">
                    접속한 직원 명단
                    <ul>
                        {users && users.map(user => auth?.name !== user && <li key={user}>{user}</li>)}
                    </ul>
                </div>
            </div>
        </div>)
};

export default HomeComponent;