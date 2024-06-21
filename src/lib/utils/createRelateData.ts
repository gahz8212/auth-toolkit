let viewArray: {
  currentId: number;
  top: number;
  left: number;
  ex_price: number;
  sum_im_price: number;
}[] = [];
let priceArray: { currentId: number; sum_im_price: number }[] = [];

export const makeRelateData_View = (
  id: number,
  relates: {
    upper: number;
    current: number;
    point: number;
    im_price: number;
    ex_price: number;
  }[]
) => {
  let lastLeft = 0;
  let history: number[] = [];
  viewArray = [];
  const uppers = relates.reduce((acc: number[], cur: { upper: number }) => {
    if (!acc.includes(cur.upper)) {
      acc.push(cur.upper);
    }
    return acc;
  }, []);
  const findChildren = (
    id: number,
    top: number,
    left: number,
    im_price: number,
    ex_price: number
  ) => {
    const children = relates
      .filter((relate) => relate.upper === id)
      .map((relate) => ({
        current: relate.current,
        im_price: relate.im_price,
        point: relate.point,
        ex_price: relate.ex_price,
      }));
    children.sort(
      (a, b) =>
        relates.filter((relate) => relate.upper === a.current).length -
        relates.filter((relate) => relate.upper === b.current).length
    );
    if (lastLeft >= left) {
      left = lastLeft + 60;
    }
    const newItem = {
      currentId: id,
      top: top,
      left: left,
      sum_im_price: im_price,
      ex_price: ex_price,
    };
    viewArray.push(newItem);
    if (history.length > 0) {
      history.forEach((his) =>
        viewArray.forEach((arr) =>
          arr.currentId === his ? (arr.sum_im_price += newItem.sum_im_price) : 0
        )
      );
    }
    if (children.length === 0) {
      lastLeft = left > lastLeft ? left + 50 : lastLeft;
      return;
    }
    for (let index = 0; index < children.length; index++) {
      if (uppers.includes(children[index].current)) {
        history = [];
      }
      if (!history.includes(id)) {
        history.push(id);
      }
      findChildren(
        children[index].current,
        top + 60,
        left + index * 60,
        children[index].im_price * children[index].point,
        children[index].ex_price
      );
    }
  };
  const createRelateView = (id: number) => {
    findChildren(id, 0, 60, 0, 0);
    return viewArray;
  };
  return createRelateView(id);
};

export const makeRelateData_Price = (
  relates: {
    upper: number;
    current: number;
    point: number;
    im_price: number;
    ex_price: number;
  }[]
) => {
  let history: number[] = [];
  priceArray = [];
  const uppers = relates.reduce((acc: number[], cur: { upper: number }) => {
    if (!acc.includes(cur.upper)) {
      acc.push(cur.upper);
    }
    return acc;
  }, []);
  const findChildren = (id: number, im_price: number) => {
    const children = relates
      .filter((relate) => relate.upper === id)
      .map((relate) => ({
        current: relate.current,
        im_price: relate.im_price,
        point: relate.point,
      }));
    children.sort(
      (a, b) =>
        relates.filter((relate) => relate.upper === a.current).length -
        relates.filter((relate) => relate.upper === b.current).length
    );

    const newItem = {
      currentId: id,
      sum_im_price: im_price,
    };
    priceArray.push(newItem);
    if (history.length > 0) {
      history.forEach((his) =>
        priceArray.forEach((arr) =>
          arr.currentId === his ? (arr.sum_im_price += newItem.sum_im_price) : 0
        )
      );
    }
    if (children.length === 0) {
      return;
    }
    for (let index = 0; index < children.length; index++) {
      if (uppers.includes(children[index].current)) {
        history = [];
      }
      if (!history.includes(id)) {
        history.push(id);
      }
      findChildren(
        children[index].current,
        children[index].im_price * children[index].point
      );
    }
  };
  const createRelatePrice = (uppers: number[]) => {
    uppers.forEach((upper) => findChildren(upper, 0));
    return priceArray;
  };
  return createRelatePrice(uppers);
};
