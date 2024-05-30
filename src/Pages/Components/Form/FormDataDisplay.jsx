import { Card } from "@mui/material";

const FormDataDisplay = ({ trucks, goods }) => {
  return (
    <div>
      <Card className="text-center p-5 my-5 w-fit mx-auto ">
        <h1 className="!text-blue-400 font-bold">
          Are you sure this is the data you want to submit?
        </h1>
      </Card>
      <Card className="py-10 px-20 flex flex-row gap-6">
        <Card className="!shadow-sm mt-5 !bg-blue-300 px-5 py-3 min-w-[25rem]">
          <div>
            {Array.isArray(goods) &&
              goods.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="px-5 py-3 flex flex-row justify-around items-center mt-5"
                  >
                    <div>
                      <p>Name: </p>
                      <p>Weight: </p>
                      <p>Quantity: </p>
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>{item.weight}</p>
                      <p>{item.quantity}</p>
                    </div>
                  </Card>
                );
              })}
          </div>
        </Card>
        <Card className="!shadow-sm mt-5 !bg-blue-300 px-5 py-3 min-w-[25rem]">
          <div>
            {Array.isArray(trucks) &&
              trucks.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="px-5 py-3 flex flex-row justify-around items-center mt-5"
                  >
                    <div>
                      <p>Name: </p>
                      <p>Capacity: </p>
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>{item.capacity}</p>
                    </div>
                  </Card>
                );
              })}
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default FormDataDisplay;
