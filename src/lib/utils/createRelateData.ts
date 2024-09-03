///////합산가격과 위치값 계산/////////
export const makeRelateData_View_Horizon = (
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
    itemName: string;
    unit: string;
    im_price: number;
    sum_im_price: number;
    ex_price: number;
    type: string;
  }[]
) => {
  let extraTop = 0;
  let extraLeft = 0;
  let origin = 15;
  let lastTop = 0;
  let history: number[] = [];
  let viewArray: {
    currentId: number;
    top: number;
    left: number;
    point: number;
    ex_price: number;
    sum_im_price: number;
    type: string;
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
  const searchType = (id: number) => {
    return items.filter((item) => item.id === id).map((item) => item.type)[0];
  };
  const calculatePoint = (length: number) => {
    let point = 1;
    for (let i = length; i < inheritPointArray.length; i++) {
      point = inheritPointArray[i] * point;
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
    inheritPoint: number,
    type: string
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
          type: searchType(relate.LowerId),
        }));
      children.sort(
        (a, b) =>
          relations.filter((relate) => relate.UpperId === a.current).length -
          relations.filter((relate) => relate.UpperId === b.current).length
      );

      if (type === "ASSY") {
        if (lastTop >= top) {
          top = lastTop + 50;
        }
      }

      const newItem = {
        currentId: id,
        itemName: searchItemName(id),
        top: top,
        left: left,
        point: inheritPoint,
        sum_im_price: Number(im_price),
        ex_price: Number(ex_price),
        type: type,
      };
      viewArray.push(newItem);
      if (history.length > 0) {
        viewArray.forEach((arr) =>
          history.forEach((his, index) =>
            arr.currentId === his
              ? (arr.sum_im_price +=
                  newItem.sum_im_price * calculatePoint(index) * 1)
              : 0
          )
        );
      }
      if (children.length === 0) {
        lastTop = top > lastTop ? top + 30 : lastTop;
        inheritPointArray.pop();
        history.pop();
        return;
      }
      for (let index = 0; index < children.length; index++) {
        if (uppers?.includes(children[index].current)) {
          history = [selectedItem];
          inheritPointArray = [];
          left = origin;
        }
        if (!history.includes(id)) {
          history.push(id);
        }
        inheritPoint = children[index].point;
        inheritPointArray.push(inheritPoint);
        extraLeft = index % 3;
        if (index === 0 && extraLeft === 0) {
          extraTop = 0;
        }
        if (index > 0 && extraLeft === 0) {
          extraTop += 1;
        }
        findChildren(
          children[index].current,
          itemName,
          children[index].type === "PARTS" ? top + 80 * extraTop : top + 80,
          children[index].type === "PARTS"
            ? left + 80 * (extraLeft + 1)
            : left + 40,
          children[index].im_price,
          children[index].ex_price,
          inheritPoint,
          children[index].type
        );
      }
    }
  };
  const createRelateViewHorizon = (id: number) => {
    findChildren(
      id,
      "",
      15,
      15,
      searchIm_price(selectedItem),
      searchEx_price(selectedItem),
      inheritPoint,
      searchType(selectedItem)
    );
    return viewArray;
  };
  return createRelateViewHorizon(selectedItem);
};
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
    itemName: string;
    unit: string;
    im_price: number;
    sum_im_price: number;
    ex_price: number;
    type: string;
  }[]
) => {
  let extraTop = 0;
  let extraLeft = 0;
  let origin = 15;
  let lastTop = 0;
  let history: number[] = [];
  let viewArray: {
    currentId: number;
    top: number;
    left: number;
    point: number;
    ex_price: number;
    sum_im_price: number;
    type: string;
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
  const searchType = (id: number) => {
    return items.filter((item) => item.id === id).map((item) => item.type)[0];
  };
  const calculatePoint = (length: number) => {
    let point = 1;
    for (let i = length; i < inheritPointArray.length; i++) {
      point = inheritPointArray[i] * point;
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
    inheritPoint: number,
    type: string
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
          type: searchType(relate.LowerId),
        }));
      children.sort(
        (a, b) =>
          relations.filter((relate) => relate.UpperId === a.current).length -
          relations.filter((relate) => relate.UpperId === b.current).length
      );

      if (type === "ASSY") {
        if (lastTop >= top) {
          top = lastTop + 50;
        }
      }
      const newItem = {
        currentId: id,
        itemName: searchItemName(id),
        top: top,
        left: left,
        point: inheritPoint,
        sum_im_price: Number(im_price),
        ex_price: Number(ex_price),
        type: type,
      };
      viewArray.push(newItem);

      if (history.length > 0) {
        viewArray.forEach((arr) =>
          history.forEach((his, index) =>
            arr.currentId === his
              ? (arr.sum_im_price +=
                  newItem.sum_im_price * calculatePoint(index) * 1)
              : 0
          )
        );
      }
      if (children.length === 0) {
        lastTop = top > lastTop ? top + 30 : lastTop;
        inheritPointArray.pop();
        history.pop();
        return;
      }
      for (let index = 0; index < children.length; index++) {
        if (uppers?.includes(children[index].current)) {
          history = [selectedItem];
          inheritPointArray = [];
          left = origin;
        }
        if (!history.includes(id)) {
          history.push(id);
        }
        inheritPoint = children[index].point;
        inheritPointArray.push(inheritPoint);
        extraLeft = index % 8;
        if (index === 0 && extraLeft === 0) {
          extraTop = 0;
        }
        if (index > 0 && extraLeft === 0) {
          extraTop += 1;
        }
        findChildren(
          children[index].current,
          itemName,
          children[index].type === "PARTS" ? top + 80 * extraTop : top + 80,
          children[index].type === "PARTS"
            ? left + 80 * (extraLeft + 1)
            : left + 40,
          children[index].im_price,
          children[index].ex_price,
          inheritPoint,
          children[index].type
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
      inheritPoint,
      searchType(selectedItem)
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
        UpperId: string | number;
        LowerId: number;
        point: number;
      }[]
    | null,
  items: {
    id: number;
    unit: string;
    im_price: number;
    sum_im_price: number;
  }[]
) => {
  let history: number[] = [];
  let priceArray: {
    currentId: number;
    sum_im_price: number;
    // ex_price: number;
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

  const calculatePoint = (length: number) => {
    let point = 1;
    for (let i = length; i < inheritPointArray.length; i++) {
      point = inheritPointArray[i] * point;
    }
    return point;
  };
  const findChildren = (
    id: number,
    im_price: number,
    inheritPoint: number
    // itemName: string,
    // ex_price: number,
  ) => {
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

      const newItem = {
        currentId: id,
        point: inheritPoint,
        sum_im_price: Number(im_price), //이렇게 강제로 형 변환을 시켜줘야 하나.
        // itemName: searchItemName(id),
        // ex_price: ex_price,
      };

      priceArray.push(newItem);
      if (history.length > 0) {
        priceArray.forEach((arr) =>
          history.forEach((his, index) =>
            arr.currentId === his
              ? (arr.sum_im_price +=
                  newItem.sum_im_price * calculatePoint(index) * 1)
              : 0
          )
        );
      }
      if (children.length === 0) {
        inheritPointArray.pop();
        history.pop();
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
          children[index].im_price,
          inheritPoint
          // itemName,
          // children[index].ex_price,
        );
      }
    }
  };
  const createRelatePrice = (id: number) => {
    findChildren(
      id,
      searchIm_price(selectedItem),
      inheritPoint
      // searchEx_price(selectedItem),
      // "",
    );
    return priceArray;
  };
  return createRelatePrice(selectedItem);
};
