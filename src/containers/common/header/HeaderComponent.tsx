import React from 'react';
import { Link } from 'react-router-dom'

type Props = {
    auth: { name: string } | null;
    logout: () => void;
    time: string
    extends_auth: () => void;
    remainingTime: number
}

const HeaderComponent: React.FC<Props> = ({ auth, logout, time, extends_auth, remainingTime }) => {
    return (
        <>
            <div className='headerContainer'>
                <div className="headerWraper">
                    <div className="logo">
                        <img src="/images/ek_logo.png" alt="logo" />
                    </div>
                    <div className="status">
                        {auth?.name}
                        <div className="button">
                            {auth ? <div style={{ display: 'flex' }}>
                                <button onClick={logout}>LOGOUT</button>
                                <div>
                                    <span>남은시간</span><br /><span> {time}</span>
                                </div>
                                {/* <button>연장하기</button> */}
                            </div> : <Link to='/'>LOGIN</Link>}
                        </div>
                    </div>
                </div>
                {
                    <div
                        className={`expAlarm ${(remainingTime <= 1000 * 60 * 5 && remainingTime > 0) ? 'visible' : 'hidden'}
                        ${(remainingTime <= 1000 * 60 * 2 && remainingTime > 0) ? 'red' : 'blue'}`}>
                        <div className="content">
                            <p>몇 분 후면 자동으로 로그아웃이 됩니다.</p>
                            <br />
                            <p>시간 연장을 원하시면 </p>
                            <p>아래 연장 버튼이나 F5 버튼을,</p>
                            <br />
                            <p>지금 로그아웃 하시려면</p>
                            <p>아래 로그아웃 버튼을 눌러주세요.</p>
                        </div>
                        <div className="buttons">
                            <button onClick={extends_auth}>연장</button>
                            <button onClick={logout}>로그아웃</button>
                        </div>
                    </div>}
            </div >
            <div className="space"></div>
        </>
    );
};

export default HeaderComponent;