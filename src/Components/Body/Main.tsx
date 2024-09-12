import { Box, SnackbarCloseReason, Stack } from "@mui/material";
import Filter from "./Filter";
import Table, { DUMMY_DATA_ROW } from "./Table";
import { useState } from "react";
import { patientTable } from "../../type";
import React from "react";

export default function Main() {
  const [data, setData] = useState(DUMMY_DATA_ROW);

  const [actionType, setActionType] = useState<"create" | "delete">();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const callData = (calledData: patientTable) => {
    setActionType("create")
    return setData((prev) => [...prev, calledData]);
  };


  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  console.log(data)

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
    setOpenSnackBar(true);
    setActionType("delete")
  };


  return (
    <Stack height="85vh" bgcolor="#F7ECDE">
      <Box height="100%" bgcolor="white" margin="15px">
        <Filter callData={callData} setOpenSnackBar={setOpenSnackBar} />
        <Table
          initialData={data}
          openSnackBar={openSnackBar}
          handleSnackBarClose={handleSnackBarClose}
          handleDelete={handleDelete}
          actionType={actionType}
        />
      </Box>
    </Stack>
  );
}
