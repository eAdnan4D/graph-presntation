import { useState } from "react";

const GoodsFormHook = () => {
  const { goods, setGoods } = useState([
    { name: "Shawarma", weight: "50", quantity: "4" },
    { name: "Falafel", weight: "23", quantity: "2" },
    { name: "Crispy", weight: "15", quantity: "5" },
  ]);

  const handleAddGoods = () => {};
  const handleUpdateName = () => {};
  const handleUpdateWeight = () => {};
  const handleUpdateQuantity = () => {};
  const handleDeleteGoods = () => {};

  return [
    goods,
    handleAddGoods,
    handleUpdateName,
    handleUpdateWeight,
    handleUpdateQuantity,
    handleDeleteGoods,
  ];
};

export default GoodsFormHook;
