import { useEffect, useState } from "react";

const DataApiHook = () => {
  const [data, setData] = useState({ trucks: [], goods: [] });
  const [loading, setLoading] = useState(false);
  const [population, setPopulation] = useState(0);
  const [generation, setGeneration] = useState(0);

  const handlePopulation = (e) => {
    setPopulation(e.target.value);
  };
  const handleGeneration = (e) => {
    setGeneration(e.target.value);
  };

  const submit = (trucks, goods, isGenetic = false) => {
    const goodsArray = goods.map((item) => {
      return [item.name, item.weight, item.quantity, 0];
    });
    console.log(goodsArray);
    setLoading(true);
    setData({ trucks: [], goods: [] });
    const response = {
      trucks: [
        {
          truckName: "A",
          truckCapacty: 20,
          payload: [
            ["Carrot", 10, 20, 1],
            ["Melon", 12, 50, 1],
          ],
          totalWeight: 22,
          totalQuantity: 70,
        },
        {
          truckName: "B",
          truckCapacty: 14,
          payload: [["Apple", 13, 22, 1]],
          totalWeight: 13,
          totalQuantity: 22,
        },
      ],
      goods: [
        // name, weight, quantity(value), isTaken initally 0
        ["Carrot", 10, 20, 0],
        ["Apple", 13, 22, 0],
        ["Melon", 12, 50, 0],
      ],
    };
    setTimeout(() => {
      setLoading(false);
      setData(response);
    }, 5000);
  };

  const submitGenetic = (trucks, goods) => {
    // same logic but with generation and population values
    submit(trucks, goods, true);
  };

  useEffect(() => {
    console.log(
      data?.trucks,
      Array.isArray(data?.trucks),
      data?.trucks?.length > 0,
      data?.trucks.map((item) => {
        return item.truckName + item.truckCapacty;
      })
    );
  }, [data]);

  return [
    submit,
    submitGenetic,
    data,
    loading,
    population,
    generation,
    handlePopulation,
    handleGeneration,
  ];
};

export default DataApiHook;
