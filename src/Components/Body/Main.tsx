import { Box, Stack } from "@mui/material";
import Filter from "./Filter";
import Table, { DUMMY_DATA_ROW } from "./Table";
import { useState } from "react";
import { patientTable } from "../../type";

export default function Main() {
  const [data, setData] = useState(DUMMY_DATA_ROW);

  const callData = (calledData: patientTable) => {
    return setData((prev) => [...prev, calledData]);
  };

  console.log(data);

  return (
    <Stack height="85vh" bgcolor="#F7ECDE">
      <Box height="100%" bgcolor="white" margin="15px">
        <Filter callData={callData} />
        <Table data={data} />
      </Box>
    </Stack>
  );
}
