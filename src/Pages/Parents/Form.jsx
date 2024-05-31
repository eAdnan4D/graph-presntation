import GoodsForm from "../Components/Form/GoodsForm";
import TruckForm from "../Components/Form/TruckForm";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import FormHook from "../../Hooks/Form/FormHook";
import { Button, Card } from "@mui/material";
import FormDataDisplay from "../Components/Form/FormDataDisplay";
import { KeyboardReturn } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Graph from "./Graph";
const Form = () => {
  async function solveFn() {
    // Here the request and the retruned data from the back
    return ["A", "B", "C"];
  }

  const [
    check,
    level,
    setLevel,
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
    <div className="flex-row flex relative">
      <div className="absolute top-0 bottom-0 w-full z-[100]"></div>

      <SidePanel level={level} setLevel={setLevel} check={check} />

      <div className="flex flex-col mt-20 justify-start gap-10 items-center w-full relative font-[roboto]">
        <div
          id="data"
          className={`transition-all flex flex-col justify-center items-center h-[75lvh] duration-1000 ${
            level === 0
              ? "translate-y-0 -rotate-0 z-[100] opacity-1"
              : "translate-y-96 -rotate-12 opacity-0 z-[99]"
          }`}
        >
          <div
            className={`${
              level !== 0 ? "absolute top-0 bottom-0 w-full z-[100]" : null
            }`}
          ></div>
          <div
            className={`absolute z-[100]  transition-all duration-1000 ease-out ${
              stage === 0
                ? "opacity-1 translate-x-0 rotate-0"
                : "opacity-0 -translate-x-96 -rotate-12"
            }`}
          >
            <div
              className={`${
                stage !== 0 ? "absolute top-0 bottom-0 w-full z-[100]" : null
              }`}
            ></div>
            <h1 className="mt-10 font-bold text-blue-400 text-3xl text-center">
              Enter your data then proceed
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
                className="w-52 max-w-52 h-16 max-h-16 !text-xl "
                onClick={() => setStage(1)}
              >
                Insert Trucks
              </Button>
            </div>
          </div>
          <div
            className={`absolute transition-all duration-1000 ease-out ${
              stage === 1
                ? "opacity-1 z-[101] translate-x-0 rotate-0"
                : "opacity-0 z-[99] -translate-x-96 -rotate-12"
            }`}
          >
            <div
              className={`${
                stage !== 1 ? "absolute top-0 bottom-0 w-full z-[100]" : null
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
                  <KeyboardReturn className="!fill-blue-600 !size-8" />
                </Button>
              </div>
              <div className="mx-auto w-fit mt-10">
                <Button
                  className="w-52 max-w-52 h-16 max-h-16 !text-xl "
                  onClick={() => setStage(2)}
                >
                  Insert Goods
                </Button>
              </div>
            </div>
          </div>
          <DataDisplay
            stage={stage}
            setStage={setStage}
            trucks={trucks}
            goods={goods}
          />
        </div>

        <GraphTab level={level} solveFn={solveFn} />

        <Results level={level} />
      </div>
    </div>
  );
};

const SidePanel = ({ level, setLevel, check }) => {
  return (
    <div className="w-96 h-[150lvh] bg-white z-[101] shadow-xl shadow-blue-100">
      <div className="mt-[35lvh] w-80 fixed">
        <div className=" cursor-pointer group" onClick={() => setLevel(0)}>
          <div
            className={`w-9/12 px-10  group-hover:w-5/6 rounded-r-full transition-all ease-out duration-300 py-3 mb-10 cursor-pointer  ${
              level === 0
                ? "!w-full pl-56 bg-blue-600 text-white"
                : "bg-blue-300  text-black"
            }`}
          >
            Data
          </div>
        </div>
        <div
          className="w-full cursor-pointer group"
          onClick={() => setLevel(1)}
        >
          <div
            className={`w-2/3 px-10  group-hover:w-5/6 rounded-r-full ease-out transition-all duration-300 py-3 mb-10 cursor-pointer  ${
              level === 1
                ? "!w-full pl-56 bg-blue-600 text-white"
                : "bg-blue-300  text-black"
            }`}
          >
            Graph
          </div>
        </div>
        <div
          className="w-full cursor-pointer group"
          onClick={check ? () => setLevel(2) : () => {}}
        >
          <div
            className={`w-2/3 px-10  group-hover:w-5/6 rounded-r-full ease-out transition-all duration-300 py-3 mb-10 cursor-pointer  ${
              level === 2
                ? "!w-full pl-56 bg-blue-600 text-white"
                : check
                ? "bg-blue-300  text-black"
                : "bg-gray-400 text-white"
            }`}
          >
            Results
          </div>
        </div>
      </div>
    </div>
  );
};

const GraphTab = ({ level, solveFn }) => {
  return (
    <div
      id="graph"
      className={`transition-all absolute duration-1000 w-full ${
        level === 1
          ? "translate-y-0 -rotate-0 z-[100] opacity-1"
          : "translate-y-96 -rotate-12 opacity-0 z-[1]"
      }`}
    >
      <div
        className={`${
          level !== 1 ? "absolute top-0 bottom-0 w-full z-[100]" : null
        }`}
      ></div>
      <Graph solveFn={solveFn}>
        <Graph.GraphFilter />
        <Graph.Presentation />
        <Graph.NodesList />
        <Graph.MutateGraph />
      </Graph>
    </div>
  );
};

const Results = ({ level }) => {
  return (
    <div
      id="results"
      className={`transition-all absolute flex flex-col gap-16 justify-center items-center duration-1000 w-full ${
        level === 2
          ? "translate-y-0 -rotate-0 z-[100] opacity-1"
          : "translate-y-96 -rotate-12 opacity-0 z-[1]"
      }`}
    >
      <div
        className={`${
          level !== 2 ? "absolute top-0 bottom-0 w-full z-[100]" : null
        }`}
      ></div>
      <Card className="p-4 !text-blue-500 font-bold">Results</Card>

      <Card className="p-12 w-11/12 flex gap-6 flex-col justify-center items-center">
        <h2 className="text-blue-400 font-bold">
          The distribution after calculations:
        </h2>
        <div className="rounded-lg bg-blue-300 min-h-12 w-11/12"></div>
      </Card>
    </div>
  );
};

const DataDisplay = ({ stage, setStage, trucks, goods }) => {
  return (
    <div
      className={`absolute transition-all duration-1000 ease-out ${
        stage === 2
          ? "opacity-1 z-[101] translate-x-0 rotate-0"
          : "opacity-0 z-[99] -translate-x-96 -rotate-12"
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
            <KeyboardReturn className="!fill-blue-600 !size-8" />
          </Button>
        </div>
        <div className="mx-auto w-fit mt-10">
          <Button
            className="w-52 max-w-52 h-16 max-h-16 !text-xl "
            onClick={() => setStage(2)}
          >
            Insert Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
