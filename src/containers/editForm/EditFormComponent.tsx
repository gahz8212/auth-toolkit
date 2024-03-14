import React from 'react';
type Props = {
    prev: {
        [key: string]: string | number | boolean | { url: string }[],
        id: number,
        category: string,
        partsName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;

        use: boolean,
        supplyer: string,
        Images: { url: string }[]
    };
    next: {
        [key: string]: string | number | boolean | { url: string }[],
        id: number,
        category: string,
        partsName: string,
        descript: string,
        unit: string,
        im_price: number;
        ex_price: number;

        use: boolean,
        supplyer: string,
        Images: { url: string }[]


    };
    // images: { url: string }[]
    onChange: (e: any) => void;
    editImage: (e: any) => void;
    editItem: (item: {
        [key: string]: '' | number | string | { url: string }[] | boolean,
    }) => void;
    removeItem: (id: number) => void;
    removeImage: (id: number, url: string) => void;
    closeForm: () => void;
}
const EditFormComponent: React.FC<Props> = ({ prev, next, onChange, editImage, editItem, removeItem, removeImage, closeForm }) => {

    return (
        <div className={`form-container ${next.category}`}>

            <form className={`edit-form`}
                onSubmit={(e) => {
                    e.preventDefault();
                    // console.log(next)
                    const changedProps: {
                        [key: string]: '' | number | string | boolean | { url: string }[],

                    } = {};
                    const keys = Object.keys(next);
                    for (let key of keys) {
                        if (prev[key] !== next[key]) {
                            changedProps[key] = next[key]
                        }
                    }
                    const newItem = ({ id: next.id, ...changedProps })
                    // console.log(newItem)
                    editItem(newItem)
                }
                }
            >
                <div className="edits">
                    {/* <div className='form-title edit'>아이템 수정</div> */}
                    <div className="category">
                        <input type="radio" id="결합물_edit" name="category" value="결합" checked={next.category === '결합'} onChange={onChange} />
                        <label htmlFor="결합물_edit">결합</label>
                        <input type="radio" id="회로물_edit" name="category" value="회로" checked={next.category === '회로'} onChange={onChange} />
                        <label htmlFor="회로물_edit">회로</label>
                        <input type="radio" id="전장물_edit" name="category" value="전장" checked={next.category === "전장"} onChange={onChange} />
                        <label htmlFor="전장물_edit">전장</label>
                        <input type="radio" id="기구물_edit" name="category" value="기구" checked={next.category === "기구"} onChange={onChange} />
                        <label htmlFor="기구물_edit">기구</label>
                        <input type="radio" id="포장물_edit" name="category" value="포장" checked={next.category === "포장"} onChange={onChange} />
                        <label htmlFor="포장물_edit">포장</label>
                        <input type="radio" id="기타물_edit" name="category" value="기타" checked={next.category === "기타"} onChange={onChange} />
                        <label htmlFor="기타물_edit">기타</label>
                    </div>
                    <input type="text" name="partsName" value={next.partsName} onChange={onChange} placeholder='이름 입력' onFocus={e => e.target.select()} />
                    <div>

                        <textarea name="descript" value={next.descript} onChange={onChange} placeholder='설명 입력' onFocus={e => e.target.select()}>{next.descript}</textarea>
                    </div>
                    {/* <input type="number" name="count" value={next.count} onChange={onChange} min={0} placeholder='수량 입력' onFocus={e => e.target.select()} /> */}
                    <div className="currency">
                        <input type="radio" id="￦_edit" value="\" name="unit" checked={next.unit === "\\"} onChange={onChange} />
                        <label htmlFor="￦_edit">￦</label>
                        <input type="radio" id="$_edit" value="$" name="unit" checked={next.unit === "$"} onChange={onChange} />
                        <label htmlFor="$_edit">$</label>
                        <input type="radio" id="￥_edit" value="￥" name="unit" checked={next.unit === "￥"} onChange={onChange} />
                        <label htmlFor="￥_edit">￥</label>
                        <input type="number" name="im_price" value={next.im_price} onChange={onChange} min={0} placeholder='입고단가 입력' step={0.1} onFocus={e => e.target.select()} />
                        <input type="number" name="ex_price" value={next.ex_price} onChange={onChange} min={0} placeholder='출고단가 입력' step={0.1} onFocus={e => e.target.select()} />
                    </div>
                    <div>
                    </div>
                    <div>
                        <div className="uses">
                            <input type="text" name="supplyer" value={next.supplyer} onChange={onChange} placeholder='공급자 입력' onFocus={e => e.target.select()} />
                            <input id='use_edit' type="radio" name="use" value={1} onChange={onChange} checked={next.use === true} />
                            <label htmlFor="use_edit">사용</label>
                            <input id='no-use_edit' type="radio" name="use" value={0} onChange={onChange} checked={next.use === false} />
                            <label htmlFor="no-use_edit">미사용</label>
                        </div>
                    </div>
                    <div className='file'>
                        <label htmlFor="file_edit">그림 추가</label>
                        <input type="file" id="file_edit" name="images" onChange={editImage} multiple accept='image/*' />
                    </div>
                </div>
                <div className="imageList_edit">
                    {next.Images.map((image, index) => <div key={index} className='image' onDoubleClick={() => { removeImage(next.id, image.url) }}><img src={image.url} width='90px' alt={image.url} /></div>)}
                </div>
                <div className="input-submit_edit">

                    <button type='submit'>수정</button>
                    <button type='button' onClick={() => { removeItem(prev.id) }}>삭제</button>
                    <button type='button' onClick={closeForm}>닫기</button>
                </div>
            </form>
        </div>
    );
};

export default EditFormComponent;