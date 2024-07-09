///////합산가격과 위치값 계산/////////
export const makeRelateData_View = (
  selectedItem: number,
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
  let viewArray: {
    currentId: number;
    top: number;
    left: number;
    ex_price: number;
    sum_im_price: number;
  }[] = [];
  let inheritPointArray: number[] = [];
  let inheritPoint = 1;
  const uppers = relations
    ?.filter((relation) => relation.UpperId === selectedItem)
    .map((relation) => relation.LowerId);

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
  const searchItemName = (id: number) => {
    return items
      .filter((item) => item.id === id)
      .map((item) => item.itemName)[0];
  };
  const calculatePoint = (length: number) => {
    let point = 1;
    for (let i = length; i < inheritPointArray.length; i++) {
      point = point * inheritPointArray[i];
    }
    return point;
  };
  const findChildren = (
    id: number,
    itemName: string,
    top: number,
    left: number,
    im_price: number,
    ex_price: number,
    inheritPoint: number
  ) => {
    if (relations) {
      const children = relations
        .filter((relate) => relate.UpperId === id)
        .map((relate) => ({
          current: relate.LowerId,
          itemName: searchItemName(relate.LowerId),
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
        itemName: searchItemName(id),
        top: top,
        left: left,
        point: inheritPoint,
        sum_im_price: im_price,
        ex_price: ex_price,
      };
      viewArray.push(newItem);

      if (history.length > 0) {
        viewArray.forEach((arr) =>
          history.forEach((his, index) =>
            arr.currentId === his
              ? (arr.sum_im_price +=
                  newItem.sum_im_price * calculatePoint(index))
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
          history = [selectedItem];
          inheritPointArray = [];
        }
        if (!history.includes(id)) {
          history.push(id);
        }
        inheritPoint = children[index].point;
        inheritPointArray.push(inheritPoint);

        findChildren(
          children[index].current,
          itemName,
          top + 80,
          left + index * 80,
          children[index].im_price,
          children[index].ex_price,
          inheritPoint
        );
      }
    }
  };
  const createRelateView = (id: number) => {
    findChildren(
      id,
      "",
      15,
      15,
      searchIm_price(selectedItem),
      searchEx_price(selectedItem),
      inheritPoint
    );
    return viewArray;
  };
  return createRelateView(selectedItem);
};

///////최상위 합산가격만 계산/////////
export const makeRelateData_Price = (
  selectedItem: number,
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
  let history: number[] = [];
  let priceArray: {
    currentId: number;
    ex_price: number;
    sum_im_price: number;
  }[] = [];
  let inheritPointArray: number[] = [];
  let inheritPoint = 1;
  const uppers = relations
    ?.filter((relation) => relation.UpperId === selectedItem)
    .map((relation) => relation.LowerId);

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
  const searchItemName = (id: number) => {
    return items
      .filter((item) => item.id === id)
      .map((item) => item.itemName)[0];
  };
  const calculatePoint = (length: number) => {
    let point = 1;
    for (let i = length; i < inheritPointArray.length; i++) {
      point = point * inheritPointArray[i];
    }
    return point;
  };
  const findChildren = (
    id: number,
    itemName: string,
    im_price: number,
    ex_price: number,
    inheritPoint: number
  ) => {
    if (relations) {
      const children = relations
        .filter((relate) => relate.UpperId === id)
        .map((relate) => ({
          current: relate.LowerId,
          itemName: searchItemName(relate.LowerId),
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

      const newItem = {
        currentId: id,
        itemName: searchItemName(id),
        point: inheritPoint,
        sum_im_price: im_price,
        ex_price: ex_price,
      };
      priceArray.push(newItem);

      if (history.length > 0) {
        priceArray.forEach((arr) =>
          history.forEach((his, index) =>
            arr.currentId === his
              ? (arr.sum_im_price +=
                  newItem.sum_im_price * calculatePoint(index))
              : 0
          )
        );
      }
      if (children.length === 0) {
        return;
      }
      for (let index = 0; index < children.length; index++) {
        if (uppers?.includes(children[index].current)) {
          history = [selectedItem];
          inheritPointArray = [];
        }
        if (!history.includes(id)) {
          history.push(id);
        }
        inheritPoint = children[index].point;
        inheritPointArray.push(inheritPoint);

        findChildren(
          children[index].current,
          itemName,
          children[index].im_price,
          children[index].ex_price,
          inheritPoint
        );
      }
    }
  };
  const createRelatePrice = (id: number) => {
    findChildren(
      id,
      "",

      searchIm_price(selectedItem),
      searchEx_price(selectedItem),
      inheritPoint
    );
    return priceArray;
  };
  return createRelatePrice(selectedItem);
};
