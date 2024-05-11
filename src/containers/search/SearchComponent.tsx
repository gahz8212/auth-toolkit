import React, { useRef } from 'react';
type Props = {

    onChange: (e: any) => void;
    search: {
        all: boolean;
        결합: boolean;
        회로: boolean;
        전장: boolean;
        기구: boolean;
        기타: boolean;
    };
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const SearchComponent: React.FC<Props> = ({ visible, onChange, search, focus, setFocus }) => {
    const inputRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
    return (
        <>
        <div className="nav_base"></div>
        <form className={`search-container ${visible ? 'visible' : ''}`}>
            <div className="input-group">

                <input type="checkbox" name="all" id="all" onChange={onChange} checked={search.all === true} />
                <label htmlFor="all">전체</label>

                <input type="checkbox" name="결합" id="group-결합물" onChange={onChange} checked={search.결합 === true} />
                <label htmlFor="group-결합물">결합물</label>
                <input type="checkbox" name="회로" id="group-회로물" onChange={onChange} checked={search.회로 === true} />
                <label htmlFor="group-회로물">회로물</label>
                <input type="checkbox" name="전장" id="group-전장물" onChange={onChange} checked={search.전장 === true} />
                <label htmlFor="group-전장물">전장물</label>
                <input type="checkbox" name="기구" id="group-기구물" onChange={onChange} checked={search.기구 === true} />
                <label htmlFor="group-기구물">기구물</label>
                <input type="checkbox" name="기타" id="group-기타물" onChange={onChange} checked={search.기타 === true} />
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
                    </>
    );
};

export default SearchComponent;