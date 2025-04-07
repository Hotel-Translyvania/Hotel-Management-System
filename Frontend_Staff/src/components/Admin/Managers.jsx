import React, { useState } from "react";
import { CustomTable } from "../Table/Table";
import { managersDatabase } from "./ManagersDatabase";
import AddManager from "./AddManagers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ManagersColumns from "./ManagersCoulumn";

const Managers = () => {
    const [addManagerIsOpen,setAddManagerOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center gap-4">
      <CustomTable
        data={managersDatabase}
        columns={ManagersColumns}
        onAddClick={() => setAddManagerOpen(true)}
        addButtonText={"Add Manager"}
        pageSize={8}
      />

      <Dialog open={addManagerIsOpen} onOpenChange={setAddManagerOpen}>
        <DialogContent>
          <AddManager onSuccess={() => setAddManagerOpen(false)} />
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Managers;
