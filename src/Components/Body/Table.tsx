import {
  Box,
  Button,
  Modal,
  Paper,
  Popover,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import Form from "./Form";
import { patientTable } from "../../type";


const StatusImage = (status: boolean) => {
  switch (status) {
    case true:
      return <img src="/resources/picky eater.png" alt="picky eater" />;
    case false:
      return <img src="/resources/allergy.png" alt="allergy" />;
  }
};

const StyledDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-columnHeader": {
    color: "#54BAB9",
    fontWeight: "900",
  },
}));

const Action = () => {


  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const [ modalopen, setOpen ] = useState(false)

  const handleOpen = () => {
    setOpen(!modalopen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Stack>
      <Button aria-describedby={id} onClick={handleClick}>
        <img
          src="/resources/more.png"
          style={{ height: "20px", width: "20px", margin: "10px" }}
          alt=""
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopOverClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        sx={{ width: "300px" }}
      >
        <Box width="130px" display="flex" flexDirection="column">
          <Box>
            <Button fullWidth sx={{ display: "flex", justifyContent: "start" }} onClick={handleOpen}>
              <img
                src="../../../public/resources/edit.png"
                alt=""
                style={{ marginRight: "20px" }}
              />
              <Typography fontWeight="900">Edit</Typography>
            </Button>
            <Modal
              open={modalopen}
              onClose={() => handleClose()}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box bgcolor="white" padding="50px" borderRadius="10px">
                <Box width="100%" marginBottom="30px">
                  <Typography
                    variant="h5"
                    color="#54BAB9"
                    fontWeight="bolder"
                    textAlign="center"
                  >
                    Add New Patient
                  </Typography>
                  <Typography
                    textAlign="center"
                    fontSize="15px"
                    fontWeight="800"
                  >
                    Enter New Patient information Below
                  </Typography>
                </Box>
                <Form handleClose={handleClose}  />
              </Box>
            </Modal>
          </Box>
          <Button fullWidth sx={{ display: "flex", justifyContent: "start" }}>
            <img
              src="../../../public/resources/delete.png"
              alt=""
              style={{ marginRight: "20px" }}
            />
            <Typography fontWeight="900">Delete</Typography>
          </Button>
        </Box>
      </Popover>
    </Stack>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "petName", headerName: "Pet Name", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (param) => StatusImage(param.row.status),
  },
  { field: "pawrent", headerName: "Pawrent", width: 130 },
  { field: "breed", headerName: "Breed", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  {
    field: "DateOfBirth",
    headerName: "Date of Birth",
    width: 130,
    renderCell: (params) => dayjs(params.value).format("DD.MM.YYYY"),
  },
  { field: "PhoneNo", headerName: "Contact Phone No.", width: 130 },
  { field: "Address", headerName: "Address", width: 130 },
  { field: "Action", headerName: "", width: 130, renderCell: () => Action() },
];


export const DUMMY_DATA_ROW: patientTable[] = [
  {
    id: "B-0025",
    petName: "Milo",
    status: false,
    pawrent: "The' Nu San",
    breed: "Beagle",
    gender: "Male",
    DateOfBirth: new Date(2021, 4, 1),
    PhoneNo: "09797122499",
    Address: "မြောက်ဥက္ကလာပ, Hlaing, Yangon",
  },
  {
    id: "S-0189",
    petName: "MJ",
    status: false,
    pawrent: "Naychi Lin",
    breed: "Spaniel",
    gender: "Female",
    DateOfBirth: new Date(2021, 5, 18),
    PhoneNo: "09784517545",
    Address: "Hlaing Township, Yangon",
  },
  {
    id: "G-0089",
    petName: "Lu Lu",
    status: true,
    pawrent: "Pink Pink",
    breed: "Golden Retriever",
    gender: "Female",
    DateOfBirth: new Date(2021, 4, 1),
    PhoneNo: "09794878125",
    Address: "Gems Condo, Hlaing, Yangon",
  },
  {
    id: "G-0090",
    petName: "Sky",
    status: true,
    pawrent: "Kyaw Myo Oo",
    breed: "Golden Retriever",
    gender: "Male",
    DateOfBirth: new Date(2021, 4, 1),
    PhoneNo: "09979458172",
    Address: "Sanchaung, Yangon",
  },
  {
    id: "G-0089",
    petName: "Lu Lu",
    status: true,
    pawrent: "Pink Pink",
    breed: "Golden Retriever",
    gender: "Female",
    DateOfBirth: new Date(2021, 4, 1),
    PhoneNo: "09524200154",
    Address: "Mayangone, Yangon",
  },
];

// Main Table component
export default function Table({data}) {
  return (
    <Paper sx={{ height: 400, width: "100%", border: 0 }}>
      <StyledDataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
