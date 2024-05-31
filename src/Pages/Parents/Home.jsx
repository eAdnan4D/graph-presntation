import { Button, Card } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";
const Home = () => {
  return (
    <div className="mt-20 flex flex-col justify-center items-center gap-6">
      <h1 className="font-bold text-center text-3xl">
        This Assignment Website Has Been the Cumulative Work of:
      </h1>

      <Card className="w-9/12 py-10 min-h-96 flex justify-center items-center">
        <div className="w-11/12 flex flex-row flex-wrap justify-center items-center gap-4">
          <div className="bg-blue-400 flex justify-center items-center rounded-lg w-1/3 p-4">
            <Card className="w-11/12 py-4">
              <h3 className="text-center font-bold">Osama</h3>
              <h3 className="text-center font-bold">osama_167541</h3>
            </Card>
          </div>
          <div className="bg-blue-400 flex justify-center items-center rounded-lg w-1/3 p-4">
            <Card className="w-11/12 py-4">
              <h3 className="text-center font-bold">Adnan Ali Al-As&apos;ad</h3>
              <h3 className="text-center font-bold">adnan_189704</h3>
            </Card>{" "}
          </div>
          <div className="bg-blue-400 flex justify-center items-center rounded-lg w-1/3 p-4">
            <Card className="w-11/12 py-4">
              <h3 className="text-center font-bold">Aisha Shamoot</h3>
              <h3 className="text-center font-bold">aisha_shamoot_159220</h3>
            </Card>{" "}
          </div>
          <div className="bg-blue-400 flex justify-center items-center rounded-lg w-1/3 p-4">
            <Card className="w-11/12 py-4">
              <h3 className="text-center font-bold">Laila Hussam Said</h3>
              <h3 className="text-center font-bold">laila_204265</h3>
            </Card>{" "}
          </div>
          <div className="bg-blue-400 flex justify-center items-center rounded-lg w-1/3 p-4">
            <Card className="w-11/12 py-4">
              <h3 className="text-center font-bold">Raghad Kamal Alden</h3>
              <h3 className="text-center font-bold">raghad_120170</h3>
            </Card>{" "}
          </div>
        </div>
      </Card>
      <NavLink className="group" to="/form">
        <Button>
          <div className="flex items-center text-xl">
            <p>To Data Insert Form</p>{" "}
            <ArrowRight className="!fill-blue-500  transition-transform duration-200 group-hover:translate-x-4" />
          </div>
        </Button>
      </NavLink>
    </div>
  );
};

export default Home;
