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

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const StaffList = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [isAssignStaffOpen, setIsAssignStaffOpen] = useState(false);

  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/hms/hotels/1/staff");
        const data = response.data?.data;
        const formattedStaff = data.map((staff) => ({
          id: staff.staffId,
          staffName: staff.staffName,
          email: staff.email,
          phonenumber: staff.phonenumber,
          profilePic: staff.profilePic,
          staffRole: staff.staffRole,
          staffStatus: staff.status,
          employedAt: staff.employedAt,
          staffSalary: staff.staffSalary,
          assignedRoomId: staff.assignedRoomId,
        }));

        console.log("Fetched staff:", formattedStaff);

        setStaff(formattedStaff);
        setError(null);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setError("Failed to load staff");
        setStaff([]);
      } finally {
        setIsLoading(false);
        setRefresh(false);
      }
    };

    fetchStaff();
  }, [refresh]);
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
        data={staff}
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
                setRefresh(true);
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
                setRefresh(true);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffList;
