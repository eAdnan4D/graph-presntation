import { useState } from "react";

const FormHook = () => {
  const [stage, setStage] = useState(0);
  const [level, setLevel] = useState(0);
  const [check, setCheck] = useState(false);

  const [trucks, setTrucks] = useState([]);
  const [goods, setGoods] = useState([]);
  const handleAddTrucks = () => {
    setTrucks((prevState) => {
      const updatedState = [...prevState];
      updatedState.push({
        name: `Truck ${trucks.length + 1}`,
        capacity: 5,
      });
      return updatedState;
    });
  };

  const handleDeleteTrucks = (index) => {
    setTrucks((prevState) => {
      const updatedState = [...prevState];
      updatedState.splice(index, 1);
      return updatedState;
    });
  };

  const handleUpdateTrucksName = (event, index) => {
    setTrucks((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        name:
          event.target.value !== "" ? event.target.value : `Truck ${index + 1}`,
      };
      return updatedState;
    });
  };

  const handleUpdateCapacity = (event, index) => {
    if (isNaN(event.target.value)) {
      return;
    }
    setTrucks((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        capacity:
          Number(event.target.value) > 1 ? Number(event.target.value) : 1,
      };
      return updatedState;
    });
  };

  const handleDeleteAllTrucks = () => {
    setTrucks([]);
  };

  const handleAddGoods = () => {
    setGoods((prevState) => {
      const updatedState = [...prevState];
      updatedState.push({
        name: `Goods ${goods.length + 1}`,
        weight: 5,
        quantity: 5,
      });
      return updatedState;
    });
  };

  const handleUpdateGoodsName = (event, index) => {
    setGoods((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        name:
          event.target.value !== "" ? event.target.value : `Goods ${index + 1}`,
      };
      return updatedState;
    });
  };

  const handleUpdateWeight = (event, index) => {
    if (isNaN(event.target.value)) {
      return;
    }
    setGoods((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        weight: Number(event.target.value) > 1 ? Number(event.target.value) : 1,
      };
      return updatedState;
    });
  };

  const handleUpdateQuantity = (event, index) => {
    if (isNaN(event.target.value)) {
      return;
    }
    setGoods((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        quantity:
          Number(event.target.value) > 1 ? Number(event.target.value) : 1,
      };
      return updatedState;
    });
  };

  const handleDeleteGoods = (index) => {
    setGoods((prevState) => {
      const updatedState = [...prevState];
      updatedState.splice(index, 1);
      return updatedState;
    });
  };

  const handleDeleteAllGoods = () => {
    setGoods([]);
  };

  return [
    check,
    level,
    setLevel,
    stage,
    setStage,
    trucks,
    handleAddTrucks,
    handleUpdateTrucksName,
    handleUpdateCapacity,
    handleDeleteTrucks,
    handleDeleteAllTrucks,
    goods,
    handleAddGoods,
    handleUpdateGoodsName,
    handleUpdateWeight,
    handleUpdateQuantity,
    handleDeleteGoods,
    handleDeleteAllGoods,
  ];
};

export default FormHook;
