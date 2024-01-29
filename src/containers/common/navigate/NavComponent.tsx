import React, { useState } from 'react';
import { Link } from 'react-router-dom';
type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
    visible: boolean | undefined
}
const NavComponent: React.FC<Props> = ({ setVisible, visible }) => {

    return (
        <div>
            <ul className={`nav ${visible ? 'visible' : ''}`}>
                <li><Link to='#'>Home</Link></li>
                <li><Link to='#'>Relation Settings</Link></li>
                <li><Link to='#'>Relation View</Link></li>
                <li><Link to='' onClick={() => { setVisible(!visible) }}>Search</Link></li>
            </ul>
        </div>
    );
};

export default NavComponent;