import GoodsForm from "../Components/Form/GoodsForm";
import TruckForm from "../Components/Form/TruckForm";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import FormHook from "../../Hooks/Form/FormHook";
import {
  Accordion,
  Button,
  Card,
  AccordionDetails,
  AccordionSummary,
  Input,
} from "@mui/material";
import FormDataDisplay from "../Components/Form/FormDataDisplay";
import { KeyboardReturn } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Graph from "./Graph";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import DataApiHook from "../../Hooks/Form/DataApiHook";
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
    <div className="flex-row flex relative overflow-y-hidden overflow-x-hidden">
      <div className="absolute top-0 bottom-0 w-full z-[100]"></div>

      <SidePanel level={level} setLevel={setLevel} check={check} />

      <div className="flex flex-col pt-20 justify-start gap-10 items-center w-full relative font-[roboto]">
        <div
          id="data"
          className={`transition-all flex flex-col justify-center items-center h-[75lvh]  duration-1000 ${
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
            setLevel={setLevel}
            setStage={setStage}
            trucks={trucks}
            goods={goods}
          />
        </div>

        <GraphTab level={level} solveFn={solveFn} />

        <Results
          level={level}
          setLevel={setLevel}
          trucks={trucks}
          goods={goods}
        />
      </div>
    </div>
  );
};

const SidePanel = ({ level, setLevel, check }) => {
  return (
    <div className="w-[25rem] h-[150lvh] bg-white z-[101] shadow-xl shadow-blue-100">
      <div className="mt-[35lvh] w-80 fixed">
        <div className=" cursor-pointer group" onClick={() => setLevel(0)}>
          <div
            className={`w-2/3 px-10  group-hover:w-5/6 rounded-r-full transition-all ease-out duration-300 py-3 mb-10 cursor-pointer  ${
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
            Calculate
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

const Results = ({ level, setLevel, trucks, goods }) => {
  const [
    submit,
    submitGenetic,
    data,
    loading,
    population,
    generation,
    handlePopulation,
    handleGeneration,
  ] = DataApiHook();
  const [stage, setStage] = useState(0);
  return (
    <div
      id="results"
      className={`transition-all absolute flex flex-col pt-56 gap-16 justify-center items-center duration-1000 w-full ${
        level === 2
          ? "translate-y-0 -rotate-0 z-[100] opacity-1"
          : "translate-y-96 -rotate-12 opacity-0 z-[1]"
      }`}
    >
      <div
        className={`relative transition-all duration-1000 ease-out ${
          stage === 0
            ? "opacity-1 z-[101] translate-x-0 rotate-0"
            : "opacity-0 z-[99] -translate-x-96 -rotate-12"
        }`}
      >
        <div
          className={`${
            stage !== 0 ? "absolute top-0 bottom-0 w-full z-[100]" : null
          }`}
        ></div>
        <div className="flex flex-col justify-center w-full items-center gap-16">
          <Card className="p-4 !text-blue-500 font-bold">
            Choose the type of Programming via which you want to solve
          </Card>
        </div>

        <div className="flex flex-row justify-between">
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-lg "
              onClick={() => {
                submit(trucks, goods);
                setStage(2);
              }}
            >
              Via Dynamic Programming
            </Button>
          </div>
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-lg "
              onClick={() => {
                submit(trucks, goods);
                setStage(1);
              }}
            >
              Via A Genetic Algorithm
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-xl "
              onClick={() => setLevel(0)}
            >
              Back to data insert
              <KeyboardReturn className="!fill-blue-600 !size-8" />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`absolute transition-all duration-1000 ease-out top-1 ${
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
        <Card className="!min-w-[25dvw] !min-h-56 relative flex flex-row justify-between items-center ">
          <div className="mx-auto">
            <p>Enter Population Count</p>
            <Input value={population} onChange={(e) => handlePopulation(e)} />
          </div>
          <div className="mx-auto">
            <p>Enter Generation Count</p>
            <Input value={generation} onChange={(e) => handleGeneration(e)} />
          </div>
          <div></div>
        </Card>
        <div className="flex flex-row">
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-xl "
              onClick={() => setStage(0)}
            >
              <KeyboardReturn className="!fill-blue-600 !size-8" />
            </Button>
          </div>
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-xl "
              onClick={() => {
                setStage(2);
                submitGenetic(trucks, goods);
              }}
            >
              Submit
              <KeyboardReturn className="!fill-blue-600 !size-8" />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`absolute transition-all duration-1000 ease-out top-1 ${
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
        <Card className="!min-w-[50dvw] !min-h-56 relative">
          <div>
            {loading && (
              <div className="absolute top-0 bottom-0 w-full bg-white/50 flex justify-center items-center z-[2]">
                <PuffLoader className="size-6" />
              </div>
            )}
            <div className="min-h-24 bg-blue-400 mx-5 my-5 rounded-md">
              <Card className="text-xl text-center w-fit mx-auto px-2 py-2 translate-y-2">
                Trucks
              </Card>
              <div className="flex flex-col gap-4 overflow-y-scroll max-h-[50dvh]">
                {data?.trucks &&
                Array.isArray(data?.trucks) &&
                data?.trucks?.length > 0
                  ? data?.trucks.map((item, index) => {
                      return (
                        <div key={index} className="">
                          <Card className="mx-5 flex flex-row justify-around items-center py-10 relative mb-1 overflow-scroll">
                            <div>
                              <p>Name: {item.truckName}</p>
                              <p>Capacity: {item.truckCapacty}</p>
                            </div>
                            <div>
                              <p>Total Weight: {item.totalWeight}</p>
                              <p>Total Quantity: {item.totalQuantity}</p>
                            </div>

                            <Accordion className="min-w-[50%]">
                              <AccordionSummary>
                                <p className="text-center w-full">
                                  Goods Distribution
                                </p>
                              </AccordionSummary>
                              <AccordionDetails className="overflow-y-scroll max-h-32 gap-4 grid grid-cols-2 text-center">
                                {item.payload?.map((goodsItem, index) => {
                                  return (
                                    <Card
                                      key={index}
                                      className="!bg-blue-600 py-2 px-2 "
                                    >
                                      <p className="text-white">
                                        Name: {goodsItem[0]}
                                      </p>
                                      <p className="text-white">
                                        Weight: {goodsItem[1]}
                                      </p>
                                      <p className="text-white">
                                        Quantity: {goodsItem[2]}
                                      </p>
                                      <p className="text-white">
                                        Taken: {goodsItem[3]}
                                      </p>
                                    </Card>
                                  );
                                })}
                              </AccordionDetails>
                            </Accordion>
                          </Card>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="min-h-24 bg-blue-400 mx-5 my-5 rounded-md">
              <Card className="text-xl text-center w-fit mx-auto px-2 py-2 translate-y-2">
                Remaining Goods
              </Card>
              <div className="flex flex-col gap-4 overflow-y-scroll max-h-[50dvh]">
                {data?.goods &&
                Array.isArray(data?.goods) &&
                data?.goods?.length > 0
                  ? data?.goods.map((item, index) => {
                      return (
                        <Card
                          key={index}
                          className="mx-5 flex flex-row justify-around items-center py-10 relative mb-1"
                        >
                          <p>Name: {item[0]}</p>
                          <p>Weight: {item[1]}</p>
                          <p>Quantity: {item[2]}</p>
                          <p>Taken: {item[3]}</p>
                        </Card>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </Card>
        <div className="flex flex-row justify-between">
          <div className="mx-auto w-fit mt-10">
            <Button
              className="w-52 max-w-52 h-16 max-h-16 !text-3xl"
              onClick={() => setStage(0)}
            >
              <KeyboardReturn className="!fill-blue-600 !size-8" />
            </Button>
          </div>
        </div>
      </div>

      {/* <div
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
      </Card> */}
    </div>
  );
};

const DataDisplay = ({ stage, setStage, trucks, goods, setLevel }) => {
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
            onClick={() => setLevel(1)}
          >
            Insert Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
