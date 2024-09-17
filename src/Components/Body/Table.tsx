import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Popover,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import Form from "./Form";
import { patientTable } from "../../type";
import CloseIcon from "@mui/icons-material/Close";

// StatusImage function to render the image based on status
const StatusImage = (status: string) => {
  switch (status) {
    case "Food Allergy":
      return <img src="/resources/picky eater.png" alt="picky eater" />;
    case "Picky eater":
      return <img src="/resources/allergy.png" alt="allergy" />;
    default:
      return null;
  }
};

// Styled DataGrid component
const StyledDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-columnHeader": {
    color: "#54BAB9",
    fontWeight: "900",
  },
}));

// Action component now accepts an id and onDelete function as props
const Action = ({
  onDelete,
  id,
  actionType,
  updateHandler,
  data,
  handleClickEditPatient,
}: {
  onDelete: (id: string) => void;
  id: string;
  actionType: string;
  updateHandler: (updateDataid: string, updateData: patientTable) => void;
  data?: patientTable | undefined;
  handleClickEditPatient: () => void;
}) => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const [modalopen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const EditClick = () => {
    handleClickEditPatient();
    handleOpen();
  };

  console.log("this is modal" , modalopen)

  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;

  return (
    <Stack>
      <Button aria-describedby={idPopover} onClick={handleClick}>
        <img
          src="/resources/more.png"
          style={{ height: "20px", width: "20px", margin: "10px" }}
          alt="more options"
        />
      </Button>
      <Popover
        id={idPopover}
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
            <Button
              fullWidth
              sx={{ display: "flex", justifyContent: "start" }}
              onClick={() => EditClick()}
            >
              <img
                src="../../../public/resources/edit.png"
                alt="edit"
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
                    Update Patient
                  </Typography>
                  <Typography
                    textAlign="center"
                    fontSize="15px"
                    fontWeight="800"
                  >
                    Enter Update Patient information Below
                  </Typography>
                </Box>
                <Form
                  handleClose={handleClose}
                  updateHandler={updateHandler}
                  actionType={actionType}
                  data={data}
                />
              </Box>
            </Modal>
          </Box>
          <Button
            fullWidth
            sx={{ display: "flex", justifyContent: "start" }}
            onClick={() => {
              onDelete(id);
              handlePopOverClose();
            }}
          >
            <img
              src="../../../public/resources/delete.png"
              alt="delete"
              style={{ marginRight: "20px" }}
            />
            <Typography fontWeight="900">Delete</Typography>
          </Button>
        </Box>
      </Popover>
    </Stack>
  );
};

// Define columns with the updated Action column
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
  {
    field: "Action",
    headerName: "",
    width: 130,
  },
];

// Initial dummy data
export const DUMMY_DATA_ROW: patientTable[] = [
  {
    id: "B-0025",
    petName: "Milo",
    status: "Picky eater",
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
    status: "Picky eater",
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
    status: "Picky eater",
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
    status: "Food Allergy",
    pawrent: "Kyaw Myo Oo",
    breed: "Golden Retriever",
    gender: "Male",
    DateOfBirth: new Date(2021, 4, 1),
    PhoneNo: "09979458172",
    Address: "Sanchaung, Yangon",
  },
  {
    id: "G-0080",
    petName: "Lul Lul",
    status: "Food Allergy",
    pawrent: "Pink Pink",
    breed: "Golden Retriever",
    gender: "Female",
    DateOfBirth: new Date(2021, 4, 1),
    PhoneNo: "09524200154",
    Address: "Mayangone, Yangon",
  },
];

// Main Table component with delete functionality
interface TableProps {
  initialData: patientTable[];
  openSnackBar: boolean;
  handleSnackBarClose: () => void;
  handleDelete: (id : string) => void;
  actionType: string;
  updateHandler: (updateDataid: string, updateData: patientTable) => void;
  handleClickEditPatient: () => void;
  isFilter: boolean;
  filteredData: patientTable[];
  isStatusFilter: boolean;
  IsBreedAll: boolean | undefined;
}

export default function Table({
  initialData,
  openSnackBar,
  handleSnackBarClose,
  handleDelete,
  actionType,
  updateHandler,
  handleClickEditPatient,
  isFilter,
  filteredData,
  isStatusFilter,
  IsBreedAll,
}: TableProps) {
  console.log(filteredData);

  // console.log(IsBreedAll)

  console.log(isFilter);

  console.log(
    "data",
    isFilter || isStatusFilter || IsBreedAll ? filteredData : initialData
  );

  return (
    <Paper sx={{ height: 400, width: "100%", border: 0 }}>
      <StyledDataGrid
        pagination
        rows={
          isFilter || isStatusFilter || IsBreedAll ? filteredData : initialData
        }
        columns={columns.map((col) => {
          if (col.field === "Action") {
            return {
              ...col,
              renderCell: (params) =>{
                const rowData = params.row as patientTable;
                return (
                <Action
                  data={rowData}
                  id={params.row.id}
                  onDelete={handleDelete}
                  actionType={actionType}
                  updateHandler={updateHandler}
                  handleClickEditPatient={handleClickEditPatient}
                />
              )},
            };
          }
          return col;
        })}
        checkboxSelection
        sx={{ border: 0 }}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert severity="success" variant="filled">
          Patient is successfully{" "}
          {actionType === "create"
            ? "Created"
            : actionType === "delete"
            ? "Deleted"
            : actionType === "update"
            ? "Updated"
            : "Invalid"}{" "}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackBarClose}
            sx={{ marginLeft: "40px" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </Paper>
  );
}
