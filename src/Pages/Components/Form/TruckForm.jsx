import {
  Button,
  Card,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import TruckFormHook from "../../../Hooks/Form/TruckFormHook";
import { PlusOne } from "@mui/icons-material";
const TruckForm = ({
  trucks,
  handleAddTrucks,
  handleUpdateName,
  handleUpdateCapacity,
  handleDelete,
  handleDeleteAllTrucks,
}) => {
  return (
    <div>
      <Card className="text-center p-5 my-5 w-fit mx-auto ">
        <h1 className="!text-blue-400 font-bold">Trucks</h1>
      </Card>
      <Card className="py-10 px-20">
        <FormGroup>
          <FormControl>
            <div className="flex-row flex items-center gap-16 select-none justify-center">
              <p>Add a Truck</p>
              <Button
                onClick={handleAddTrucks}
                className="!bg-blue-300 py-1 px-3 text-black text-lg font-bold rounded-full"
              >
                <PlusOne />
              </Button>
            </div>
          </FormControl>
        </FormGroup>
        <Card className="!shadow-sm mt-5 !bg-blue-300 px-5 py-3 min-w-[60dvw]">
          <div className="flex flex-col gap-2 justify-between items-stretch flex-wrap max-h-[50dvh] overflow-x-scroll">
            {Array.isArray(trucks) &&
              trucks.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="px-5 py-3 flex flex-row justify-between items-center my-5"
                  >
                    <div className="flex flex-row gap-5">
                      <div>
                        <p>Name: </p>
                        <p>Capacity: </p>
                      </div>
                      <div>
                        <p>{item.name}</p>
                        <p>{item.capacity}</p>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center gap-2">
                      <FormControl>
                        <InputLabel id="name">Name</InputLabel>
                        <Input
                          id="name"
                          className="max-w-24"
                          value={item.name}
                          onChange={(e) => handleUpdateName(e, index)}
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel id="capacity">Capacity</InputLabel>
                        <Input
                          id="capacity"
                          className="max-w-24"
                          onChange={(e) => handleUpdateCapacity(e, index)}
                          value={item.capacity}
                        />
                      </FormControl>
                      <Button onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>
        </Card>
        <div className="mx-auto w-fit mt-10">
          <Button
            className="w-52 max-w-52 h-16 max-h-16 !text-lg "
            onClick={handleDeleteAllTrucks}
          >
            Delete All
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TruckForm;
