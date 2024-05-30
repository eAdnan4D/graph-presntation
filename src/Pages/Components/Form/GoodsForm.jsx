import {
  Button,
  Card,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import { PlusOne } from "@mui/icons-material";
import GoodsFormHook from "../../../Hooks/Form/GoodsFormHook";

const GoodsForm = ({
  goods,
  handleAddGoods,
  handleUpdateGoodsName,
  handleUpdateWeight,
  handleUpdateQuantity,
  handleDeleteGoods,
  handleDeleteAllGoods,
}) => {
  return (
    <div>
      <Card className="text-center p-5 my-5 w-fit mx-auto ">
        <h1 className="!text-blue-400 font-bold">Goods</h1>
      </Card>
      <Card className="py-10 px-20">
        <FormGroup>
          <FormControl>
            <div className="flex-row flex items-center gap-16 select-none justify-center">
              <p>Add Some Goods</p>
              <Button
                onClick={handleAddGoods}
                className="!bg-blue-300 py-1 px-3 text-black text-lg font-bold rounded-full"
              >
                <PlusOne />
              </Button>
            </div>
          </FormControl>
        </FormGroup>
        <Card className="!shadow-sm mt-5 !bg-blue-300 px-5 py-3 min-w-[50rem]">
          <div>
            {Array.isArray(goods) &&
              goods.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="px-5 py-3 flex flex-row justify-between items-center mt-5"
                  >
                    <div className="flex flex-row gap-5">
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
                    </div>

                    <div className="flex flex-row justify-between items-center gap-2">
                      <FormControl>
                        <InputLabel id="name">Name</InputLabel>
                        <Input
                          id="name"
                          className="max-w-24"
                          value={item.name}
                          onChange={(e) => handleUpdateGoodsName(e, index)}
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel id="weight">Weight</InputLabel>
                        <Input
                          id="weight"
                          className="max-w-24"
                          onChange={(e) => handleUpdateWeight(e, index)}
                          value={item.weight}
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel id="quantity">Quantity</InputLabel>
                        <Input
                          id="quantity"
                          className="max-w-24"
                          onChange={(e) => handleUpdateQuantity(e, index)}
                          value={item.quantity}
                        />
                      </FormControl>
                      <Button onClick={() => handleDeleteGoods(index)}>
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
            onClick={handleDeleteAllGoods}
          >
            Delete All
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GoodsForm;
