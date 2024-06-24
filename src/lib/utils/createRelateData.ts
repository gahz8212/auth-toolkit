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
  relations:
    | {
        UpperId: number;
        LowerId: number;
        point: number;
      }[]
    | null,
  items: {
    id: number;
    type: string;
    groupType: string;
    category: string;
    itemName: string;
    descript: string;
    unit: string;
    im_price: number;
    sum_im_price: number;
    ex_price: number;
    use: boolean;
    supplyer: string;
    weight: number;
    cbm: number;
    moq: number;
    set: boolean;
    Images: { url: string }[];
    Good: { groupName: string };
  }[]
) => {
  let lastLeft = 0;
  let history: number[] = [];
  viewArray = [];
  const uppers = relations?.reduce(
    (acc: number[], cur: { UpperId: number }) => {
      if (!acc.includes(cur.UpperId)) {
        acc.push(cur.UpperId);
      }
      return acc;
    },
    []
  );
  const searchIm_price = (id: number) => {
    return items
      .filter((item) => item.id === id)
      .map((item) => item.im_price)[0];
  };
  const searchEx_price = (id: number) => {
    return items
      .filter((item) => item.id === id)
      .map((item) => item.ex_price)[0];
  };
  const findChildren = (
    id: number,
    top: number,
    left: number,
    im_price: number,
    ex_price: number
  ) => {
    if (relations) {
      const children = relations
        .filter((relate) => relate.UpperId === id)
        .map((relate) => ({
          current: relate.LowerId,
          im_price: searchIm_price(relate.LowerId),
          point: relate.point,
          ex_price: searchEx_price(relate.LowerId),
        }));
      children.sort(
        (a, b) =>
          relations.filter((relate) => relate.UpperId === a.current).length -
          relations.filter((relate) => relate.UpperId === b.current).length
      );
      // console.log(children);
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
            arr.currentId === his
              ? (arr.sum_im_price += newItem.sum_im_price)
              : 0
          )
        );
      }
      if (children.length === 0) {
        lastLeft = left > lastLeft ? left + 50 : lastLeft;
        return;
      }
      for (let index = 0; index < children.length; index++) {
        if (uppers?.includes(children[index].current)) {
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
    }
  };
  const createRelateView = (id: number) => {
    findChildren(id, 0, 60, 0, 0);
    return viewArray;
  };
  return createRelateView(id);
};

export const makeRelateData_Price = (
  relations:
    | {
        UpperId: number;
        LowerId: number;
        point: number;
        // im_price: number;
        // ex_price: number;
      }[]
    | null,
  items: {
    id: number;
    type: string;
    groupType: string;
    category: string;
    itemName: string;
    descript: string;
    unit: string;
    im_price: number;
    sum_im_price: number;
    ex_price: number;
    use: boolean;
    supplyer: string;
    weight: number;
    cbm: number;
    moq: number;
    set: boolean;
    Images: { url: string }[];
    Good: { groupName: string };
  }[]
) => {
  let history: number[] = [];
  priceArray = [];
  const uppers = relations?.reduce(
    (acc: number[], cur: { UpperId: number }) => {
      if (!acc.includes(cur.UpperId)) {
        acc.push(cur.UpperId);
      }
      return acc;
    },
    []
  );
  // console.log('uppers',uppers)
  const searchIm_price = (id: number) => {
    return items
      .filter((item) => item.id === id)
      .map((item) => item.im_price)[0];
  };
  const searchEx_price = (id: number) => {
    return items
      .filter((item) => item.id === id)
      .map((item) => item.ex_price)[0];
  };
  const findChildren = (id: number, im_price: number) => {
    if (relations) {
      const children = relations
        .filter((relate) => relate.UpperId === id)
        .map((relate) => ({
          current: relate.LowerId,
          im_price: searchIm_price(relate.LowerId),
          point: relate.point,
        }));
      children.sort(
        (a, b) =>
          relations.filter((relate) => relate.UpperId === a.current).length -
          relations.filter((relate) => relate.UpperId === b.current).length
      );
      console.log("children", children);
      const newItem = {
        currentId: id,
        sum_im_price: im_price,
      };
      priceArray.push(newItem);
      if (history.length > 0) {
        history.forEach((his) =>
          priceArray.forEach((arr) =>
            arr.currentId === his
              ? (arr.sum_im_price += newItem.sum_im_price)
              : 0
          )
        );
      }
      if (children.length === 0) {
        return;
      }
      for (let index = 0; index < children.length; index++) {
        if (uppers?.includes(children[index].current)) {
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
    }
  };
  const createRelatePrice = (uppers: number[]) => {
    uppers.forEach((upper) => findChildren(upper, 0));
    return priceArray;
  };
  if (uppers) {
    return createRelatePrice(uppers);
  }
};







export const makeDragItems=(relations:
  | {
      UpperId: number;
      LowerId: number;
      point: number;

    }[]
  | null,
items: {
  id: number;
  type: string;
  groupType: string;
  category: string;
  itemName: string;
  descript: string;
  unit: string;
  im_price: number;
  sum_im_price: number;
  ex_price: number;
  use: boolean;
  supplyer: string;
  weight: number;
  cbm: number;
  moq: number;
  set: boolean;
  Images: { url: string }[];
  Good: { groupName: string };
}[])=>{

  relations?.map(rel=>items.filter(item=>item.id===rel.LowerId))
}