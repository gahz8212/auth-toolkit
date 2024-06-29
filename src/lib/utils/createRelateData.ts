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
        itemName: itemName,
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
          top + 60,
          left + index * 60,
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
      searchItemName(selectedItem),
      0,
      60,
      searchIm_price(selectedItem),
      searchEx_price(selectedItem),
      inheritPoint
    );
    return viewArray;
  };
  return createRelateView(selectedItem);
};

export const makeRelateData_Price = (
  selectedItem: number,
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
  let priceArray: { currentId: number; sum_im_price: number }[] = [];
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
  const calculatePoint = (length: number) => {
    let point = 1;
    for (let i = length; i < inheritPointArray.length; i++) {
      point = point * inheritPointArray[i];
    }
    return point;
  };
  const findChildren = (id: number, im_price: number, inheritPoint: number) => {
    if (relations) {
      const children = relations
        .filter((relate) => relate.UpperId === id)
        .map((relate) => {
          return {
            current: relate.LowerId,
            im_price: searchIm_price(relate.LowerId),
            point: relate.point,
          };
        });
      children.sort(
        (a, b) =>
          relations.filter((relate) => relate.UpperId === a.current).length -
          relations.filter((relate) => relate.UpperId === b.current).length
      );

      const newItem = {
        currentId: id,
        sum_im_price: im_price,
      };
      priceArray.push(newItem);

      if (history.length > 0) {
        priceArray.forEach((arr) =>
          history.forEach((his, index) =>
            arr.currentId === his
              ? (arr.sum_im_price += im_price * calculatePoint(index))
              : 0
          )
        );
      }
      if (children.length === 0) {
        return;
      }

      for (let index = 0; index < children.length; index++) {
        //uppers의 기능이 뭔지 확인해 볼것.
        //단지 여기서는 자식이 있는 부모의 배열일뿐 바꾸어야 한다.

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
          children[index].im_price,
          inheritPoint
        );
      }
    }
  };
  const createRelatePrice = (selectedItem: number) => {
    findChildren(selectedItem, searchIm_price(selectedItem), inheritPoint);
    return priceArray;
  };

  return createRelatePrice(selectedItem);
};

export const makeDragItems = (
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
  relations?.map((rel) => items.filter((item) => item.id === rel.LowerId));
};
