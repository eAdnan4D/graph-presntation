import { useState } from "react";

const TruckFormHook = () => {
  const [trucks, setTrucks] = useState([]);

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

  const handleDelete = (index) => {
    setTrucks((prevState) => {
      const updatedState = [...prevState];
      updatedState.splice(index, 1);
      return updatedState;
    });
  };

  const handleUpdateName = (event, index) => {
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
        capacity: Number(event.target.value),
      };
      return updatedState;
    });
  };

  return [
    trucks,
    handleAddTrucks,
    handleUpdateName,
    handleUpdateCapacity,
    handleDelete,
  ];
};

export default TruckFormHook;
