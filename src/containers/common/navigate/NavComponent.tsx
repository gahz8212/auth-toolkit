import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    page: string;
    changePage: (page: string) => void;
}
const NavComponent: React.FC<Props> = ({ visible, setVisible, page, changePage }) => {
    return (

        <>

        <ul className={`nav ${visible ? 'visible' : ''}`}>

            <li className={`${page === 'Home' ? "selected" : ''}`} onClick={() => changePage('Home')}><Link to='/home'>Home</Link></li>
            <li className={`${page === 'Export' ? "selected" : ''}`} onClick={() => changePage('Export')}><Link to='/Export'>Exports Manage</Link></li>
            <li className={`${page === 'Settings' ? "selected" : ''}`} onClick={() => changePage('Settings')}><Link to='/settings'>Relation Settings</Link></li>
            <li className={`${page === 'View' ? "selected" : ''}`} onClick={() => changePage('View')}><Link to='/view'>Relation View</Link></li>
            <li className={`${page === 'Search' ? "selected" : ''}`} onClick={() => changePage('Search')}><Link to='/search' onClick={() => { setVisible(!visible) }}>Search</Link></li>
        </ul>
   
        </>


    );
};

export default NavComponent;