import GoodsForm from "../Components/Form/GoodsForm";
import TruckForm from "../Components/Form/TruckForm";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import FormHook from "../../Hooks/Form/FormHook";
import { Button } from "@mui/material";
import FormDataDisplay from "../Components/Form/FormDataDisplay";
const Form = () => {
  const [
    stage,
    setStage,
    trucks,
    handleAddTrucks,
    handleUpdateName,
    handleUpdateCapacity,
    handleDelete,
    handleDeleteAllTrucks,
    goods,
    handleAddGoods,
    handleUpdateGoodsName,
    handleUpdateWeight,
    handleUpdateQuantity,
    handleDeleteGoods,
    handleDeleteAllGoods,
  ] = FormHook();
  return (
    <div className="flex flex-col justify-start gap-10 items-center font-[roboto] relative">
      <div
        className={`absolute z-[100]  transition-all duration-1000 ease-out ${
          stage === 0 ? "opacity-1 translate-x-0" : "opacity-0 -translate-x-96"
        }`}
      >
        <h1 className="mt-10 font-bold text-blue-400 text-3xl text-center">
          Enter your data then click Submit
        </h1>
        <TruckForm
          trucks={trucks}
          handleAddTrucks={handleAddTrucks}
          handleUpdateName={handleUpdateName}
          handleUpdateCapacity={handleUpdateCapacity}
          handleDelete={handleDelete}
          handleDeleteAllTrucks={handleDeleteAllTrucks}
        />{" "}
        <div className="mx-auto w-fit mt-10">
          <Button
            className="w-52 max-w-52 h-16 max-h-16 !text-3xl "
            onClick={() => setStage(1)}
          >
            Submit
          </Button>
        </div>
      </div>
      <div
        className={`absolute transition-all duration-1000 ease-out ${
          stage === 1
            ? "opacity-1 z-[101] translate-x-0"
            : "opacity-0 z-[99] -translate-x-96"
        }`}
      >
        <div
          className={`${
            stage === 0 ? "absolute top-0 bottom-0 w-full z-[100]" : null
          }`}
        ></div>
        <GoodsForm
          goods={goods}
          handleAddGoods={handleAddGoods}
          handleUpdateGoodsName={handleUpdateGoodsName}
          handleUpdateWeight={handleUpdateWeight}
          handleUpdateQuantity={handleUpdateQuantity}
          handleDeleteGoods={handleDeleteGoods}
          handleDeleteAllGoods={handleDeleteAllGoods}
          className="absolute top-0"
        />
        <div className="flex flex-row justify-between">
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-3xl"
              onClick={() => setStage(0)}
            >
              Return
            </Button>
          </div>
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-3xl "
              onClick={() => setStage(2)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`absolute transition-all duration-1000 ease-out ${
          stage === 2
            ? "opacity-1 z-[101] translate-x-0"
            : "opacity-0 z-[99] -translate-x-96"
        }`}
      >
        <div
          className={`${
            stage !== 2 ? "absolute top-0 bottom-0 w-full z-[100]" : null
          }`}
        ></div>
        <FormDataDisplay trucks={trucks} goods={goods} />
        <div className="flex flex-row justify-between">
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-3xl"
              onClick={() => setStage(1)}
            >
              Return
            </Button>
          </div>
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-3xl "
              onClick={() => setStage(2)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
