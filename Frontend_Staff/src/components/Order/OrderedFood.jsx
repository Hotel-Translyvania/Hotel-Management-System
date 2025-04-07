import React from "react";
import foodOrderData from "@/TestData/foodOrderData";
import { foodOrderColumns } from "./orderColumns";
import { CustomTable } from "../Table/Table";

const OrderedFood = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-lg font-semibold font-serif">Ordered Food</h2>
      <CustomTable
        data={foodOrderData}
        columns={foodOrderColumns}
        pageSize={8}
        defaultSort={foodOrderColumns.find(
          (column) => column.id === "OrderTime"
        )}
        maxWidth="48"
      />
    </div>
  );
};

export default OrderedFood;
