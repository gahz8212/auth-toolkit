import React,{useState} from 'react';
import NavComponent from '../common/navigate/NavComponent';
import SearchContainer from '../search/SearchContainer';
const NavSearchContainer = () => {
  const[visible,setVisible]=useState(false)
    return (
        <div>
            <NavComponent setVisible={setVisible} visible={visible}/>
            <SearchContainer setVisible={setVisible} visible={visible}/>
          
        </div>
    );
};

export default NavSearchContainer;