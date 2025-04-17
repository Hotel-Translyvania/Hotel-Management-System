// src/components/Admin/Managers.jsx
import React, { useState, useEffect } from "react";
import { CustomTable } from "../Table/Table";
import AddManager from "./AddManagers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ManagersColumns from "./ManagersCoulumn";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const Managers = () => {
  const [addManagerIsOpen, setAddManagerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Fixed typo
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Fixed typo
      try {
        const response = await api.get("/manager");
        const formattedManagers = response.data.data.map((manager) => ({
          firstName: manager.firstName,
          lastName: manager.lastName,
          email: manager.email,
          phone: manager.phoneNumber,
          registeredAt: manager.registrationDate,
          id: manager.id,
          address: manager.address,
          hotel: manager.hotelName || "Hotel",
          picture:
            manager?.profielPic ||
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        }));
        setManagers(formattedManagers);
        setError(null);
      } catch (error) {
        setError(error.message || "Failed to fetch managers");
      } finally {
        setIsLoading(false); // Fixed typo
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading Managers...</div>
        <SpinPage />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <CustomTable
        data={managers}
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