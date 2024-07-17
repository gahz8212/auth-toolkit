import React, { useRef } from 'react';
import IsettingComponent from '../i-settings/IsettingComponent';
type Props = {

    onChange: (e: any) => void;
    search: {
        all: {
            typeALL: boolean;
            groupALL: boolean;
        }
        type: {
            SET: boolean;
            ASSY: boolean;
            PARTS: boolean;
        }
        group: {
            회로: boolean;
            전장: boolean;
            기구: boolean;
            포장: boolean;
            기타: boolean;
        }

    };
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    newItems: { type: string, category: string }[]
}
const SearchComponent: React.FC<Props> = ({ visible, onChange, search, focus, setFocus, newItems }) => {
    console.log('newItmes', newItems)
    const inputRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
    return (
        <>
            <div className="nav_base"></div>
            <form className={`search-container ${visible ? 'visible' : ''}`}>
                <div className="input-type">

                    <input type="checkbox" name="typeALL" id="all" onChange={onChange} checked={search.all.typeALL === true} />
                    <label htmlFor="all">전체</label>

                    <input type="checkbox" name="SET" id="type-SET" onChange={onChange} checked={search.type.SET === true} />
                    <label htmlFor="type-SET">SET</label>
                    <input type="checkbox" name="ASSY" id="type-ASSY" onChange={onChange} checked={search.type.ASSY === true} />
                    <label htmlFor="type-ASSY">ASSY</label>
                    <input type="checkbox" name="PARTS" id="type-PARTS" onChange={onChange} checked={search.type.PARTS === true} />
                    <label htmlFor="type-PARTS">PARTS</label>

                </div>
                <div className="input-group">

                    <input type="checkbox" name="groupALL" id="groupALL" onChange={onChange} checked={search.all.groupALL === true} />
                    <label htmlFor="groupALL">전체</label>

                    <input type="checkbox" name="회로" id="group-회로물" onChange={onChange} checked={search.group.회로 === true} />
                    <label htmlFor="group-회로물">회로물</label>
                    <input type="checkbox" name="전장" id="group-전장물" onChange={onChange} checked={search.group.전장 === true} />
                    <label htmlFor="group-전장물">전장물</label>
                    <input type="checkbox" name="기구" id="group-기구물" onChange={onChange} checked={search.group.기구 === true} />
                    <label htmlFor="group-기구물">기구물</label>
                    <input type="checkbox" name="포장" id="group-포장물" onChange={onChange} checked={search.group.포장 === true} />
                    <label htmlFor="group-포장물">포장물</label>
                    <input type="checkbox" name="기타" id="group-기타물" onChange={onChange} checked={search.group.기타 === true} />
                    <label htmlFor="group-기타물">기타</label>
                </div>
                <div className="sort">
                    <input type="radio" name="sort" id="category" />
                    <label htmlFor="category">분류 순</label>
                    <button>△</button>
                    <button>▽</button>
                    <input type="radio" name="sort" id="name" />
                    <label htmlFor="name">이름 순</label>
                    <button>△</button>
                    <button>▽</button>
                    <input type="radio" name="sort" id="name" />
                    <label htmlFor="name">생성일 순</label>
                    <button>△</button>
                    <button>▽</button>
                </div>

                <div className={`search ${focus ? 'focus' : ''}`}>
                    <input type="text" className='searchInput'
                        onFocus={() => setFocus(!focus)}
                        onBlur={() => setFocus(!focus)}
                        ref={inputRef}
                        autoFocus />

                    <span className={`material-symbols-outlined `}
                        onClick={() => inputRef.current?.focus()}
                    >
                        search
                    </span>

                </div >
            </form >
            <IsettingComponent newItems={newItems} topMargin={'1rem'} />
        </>
    );
};

export default SearchComponent;