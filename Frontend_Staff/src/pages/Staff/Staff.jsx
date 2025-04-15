import React, { useState, useEffect } from "react";
import { CustomTable } from "@/components/Table/Table";
import staffColumns from "@/components/Staff/staffCoulmns";
import { staffDatabase } from "@/TestData/staffDatabase";
import AddStaff from "./AddStaff";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditStaff from "./EditStaff";
import AssignStaff from "./AssignStaff";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";
import { useStaffStore } from "@/components/store/useStaffStore";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const StaffList = () => {
  const {fetchStaff, initialized, isLoading, staffs} = useStaffStore();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [isAssignStaffOpen, setIsAssignStaffOpen] = useState(false);


  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (!initialized) {
      fetchStaff();
    }
  }, [fetchStaff]);



  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading staff...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <CustomTable
        data={staffs}
        columns={staffColumns}
        meta={{
          onEditClick: (staff) => {
            setIsEditStaffOpen(true);
            setSelectedStaff(staff);
          },
          onAssignClick: (staff) => {
            setIsAssignStaffOpen(true);
            setSelectedStaff(staff);
          },
        }}
        addButtonText="Add Staff"
        onAddClick={() => setIsAddStaffOpen(true)}
        pageSize={8}
      />

      <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
        <DialogContent>
          <AddStaff onSuccess={() => {setIsAddStaffOpen(false);
            setRefresh(true);
          }} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
        <DialogContent>
          {selectedStaff && (
            <EditStaff
              staffData={selectedStaff}
              onSuccess={() => {
                setIsEditStaffOpen(false);
                setSelectedStaff(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAssignStaffOpen} onOpenChange={setIsAssignStaffOpen}>
        <DialogContent className={"sm:max-w-2xl"}>
          {selectedStaff && (
            <AssignStaff
              staff_id={selectedStaff.id}
              onSuccess={() => {
                setIsAssignStaffOpen(false);
                setSelectedStaff(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffList;
