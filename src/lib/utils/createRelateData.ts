let allArray: {
    currentId: number;
    top: number;
    left: number;
    im_price: number;
  }[] = [];
  let priceArray: { currentId: number; top: number; left: number }[] = [];
  let lastLeft = 0;
  let history: number[] = [];
  export let relations: {
    upper: number;
    current: number;
    point: number;
    im_price: number;
  }[] ;
  export const createRelateAll = (
  
    id: number
  ) => {
    findChildren( id, 0, 60, 0);
    return allArray;
  };
  export const createRelatePrice = (
   
    uppers: number[]
  ) => {
    findChildren_priceOnly( uppers);
    return priceArray;
  };
  const findChildren = (
  
    id: number,
    top: number,
    left: number,
    im_price: number
  ) => {
    const children = relations
      .filter((relation) => relation.upper === id)
      .map((relation) => ({
        current: relation.current,
        im_price: relation.im_price,
      }));
    children.sort(
      (a, b) =>
        relations.filter((relation) => relation.upper === a.current).length -
        relations.filter((relation) => relation.upper === b.current).length
    );
    if (lastLeft >= left) {
      left = lastLeft + 60;
    }
    const newItem = { currentId: id, top: top, left: left, im_price: im_price };
    allArray.push(newItem);
    if (history.length > 0) {
      history.forEach((his) =>
        allArray.forEach((arr) =>
          arr.currentId === his ? (arr.im_price += newItem.im_price) : 0
        )
      );
    }
    if (children.length === 0) {
      lastLeft = left > lastLeft ? left + 50 : lastLeft;
      return;
    }
    for (let index = 0; index < children.length; index++) {
      if (!history.includes(id)) {
        history.push(id);
      }
      findChildren(children[index].current, top + 60, left + index * 60, children[index].im_price)
    }
  };
  const findChildren_priceOnly = (
  
    uppers: number[]
  ) => {};
  