import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Form from "./Form";
import { patientTable } from "../../type";

interface FilterProps {
  callData: (newData: patientTable) => void;
  setOpenSnackBar: (setData: boolean) => void;
  handleClickAddPatient: () => void;
  setPetNameFilter : ( petName : string ) => void;
  petNameFilter : string;
}

const Search = styled("div")(() => ({
  position: "relative",
  border: "2px solid rgba(68, 68, 68, 0.5)",
  borderRadius: "50px",
  width: "100%",
  marginTop: "20px",
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Filter({
  callData,
  setOpenSnackBar,
  handleClickAddPatient,
  setPetNameFilter,
  petNameFilter
}: FilterProps) {
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box margin="20px">
        <Box>
          <Typography variant="h4" fontWeight="900" color="#54BAB9">
            Patient List
          </Typography>
        </Box>
        <Box width="300px">
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#557DE9" }} />
            </SearchIconWrapper>
            <StyledInputBase
              value={petNameFilter}
              placeholder="Search Table..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setPetNameFilter(e.target.value)}
            />
          </Search>
        </Box>
        <Box display="flex" maxWidth="300px" marginTop="20px">
          <Box width="140px" marginRight="20px">
            <FormControl fullWidth>
              <InputLabel
                id="status-select-label"
                sx={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  marginLeft: "25px",
                }}
              >
                <Typography fontWeight={800}>Status All</Typography>
              </InputLabel>
              <Select
                labelId="status-select-label"
                sx={{ height: "35px", borderRadius: "15px" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width="140px">
            <FormControl fullWidth>
              <InputLabel
                id="breed-select-label"
                sx={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  marginLeft: "25px",
                }}
              >
                <Typography fontWeight={800}>Breed All</Typography>
              </InputLabel>
              <Select
                labelId="breed-select-label"
                sx={{ height: "35px", borderRadius: "15px" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box margin="70px 20px 20px 20px">
        <Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#54BAB9" }}
            onClick={() => {
              handleClickAddPatient();
              handleOpen();
            }}
          >
            + Add New Patient
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
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
                <Typography textAlign="center" fontSize="15px" fontWeight="800">
                  Enter New Patient information Below
                </Typography>
              </Box>
              <Form
                handleClose={handleClose}
                callData={callData}
                setOpenSnackBar={setOpenSnackBar}
              />
            </Box>
          </Modal>
        </Box>
        <Box display="flex" marginTop="20px" alignItems="center">
          <Typography fontWeight={900} marginRight="10px">
            Row Per Page:{" "}
          </Typography>
          <FormControl sx={{ width: "70px" }}>
            <Select sx={{ height: "35px", borderRadius: "15px" }}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
