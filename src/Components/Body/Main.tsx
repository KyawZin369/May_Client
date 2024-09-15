import { Box, SnackbarCloseReason, Stack } from "@mui/material";
import Filter from "./Filter";
import Table, { DUMMY_DATA_ROW } from "./Table";
import { useEffect, useState } from "react";
import { patientTable } from "../../type";
import React from "react";

export default function Main() {
  const [data, setData] = useState(DUMMY_DATA_ROW);

  const [actionType, setActionType] = useState<"create" | "delete" | "update">(
    "create"
  );
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [petNameFilter, setPetNameFilter] = useState("");

  const [filteredData, setFilteredData] = useState<patientTable[]>([]);

  const [isFilter, setIsFilter] = useState<boolean>(true);

  const callData = (calledData: patientTable) => {
    setActionType("create");
    setData((prev) => [...prev, calledData]);
    console.log(calledData)
  };

  const updateHandler = (updateDataid: string, updateData: patientTable) => {
    const updatedData = data.map((v) => {
      return v.id === updateDataid ? { ...updateData, id: updateDataid } : v;
    });

    console.log(updateData);
    console.log(updatedData);

    setData(updatedData);
    setActionType("update");
    setOpenSnackBar(true);
  };

  console.log(data);

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
    setOpenSnackBar(true);
    setActionType("delete");
  };

  const handleClickAddPatient = () => {
    setActionType("create");
  };

  const handleClickEditPatient = () => {
    setActionType("update");
  };

  useEffect(() => {
    if (isFilter) {
      const filterText = petNameFilter.toLowerCase();
      const filterData = data.filter((item) =>
        item.petName?.toLowerCase().includes(filterText)
      );
      setFilteredData(filterData);
      setIsFilter(true);
    }
  }, [data, petNameFilter]);

  return (
    <Stack height="85vh" bgcolor="#F7ECDE">
      <Box height="100%" bgcolor="white" margin="15px">
        <Filter
          callData={callData}
          setOpenSnackBar={setOpenSnackBar}
          actionType={actionType}
          handleClickAddPatient={handleClickAddPatient}
          setPetNameFilter={setPetNameFilter}
          petNameFilter={petNameFilter}
        />
        <Table
          initialData={data}
          filteredData={filteredData}
          openSnackBar={openSnackBar}
          handleSnackBarClose={handleSnackBarClose}
          handleDelete={handleDelete}
          actionType={actionType}
          updateHandler={updateHandler}
          handleClickEditPatient={handleClickEditPatient}
          isFilter={isFilter}
        />
      </Box>
    </Stack>
  );
}
