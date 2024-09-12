import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { NewPatient, patientTable } from "../../type";
import generateID from "../../utils/GrenratedId";

interface FormProps {
  handleClose: () => void;
  callData?: (data: patientTable) => void;
  setOpenSnackBar?: (setData: boolean) => void;
  setUpdateData ?: (updateData : patientTable) => void
}

const Form = ({ handleClose, callData, setOpenSnackBar, setUpdateData }: FormProps) => {
  const { control, handleSubmit, setValue, watch } = useForm<NewPatient>({
    defaultValues: {
      PetName: "",
      Pawrent: "",
      Gender: "",
      PhoneNumber: "",
      City: "",
      Status: "",
      Breed: "",
      DateOfBirth: dayjs(),
      Address: "",
      Township: "",
    },
  });

  const onSubmit: SubmitHandler<NewPatient> = (data) => {
    const combinedLocation = `${data.Township}, ${data.City}`;

    if (callData) {
      callData({
        id: generateID(),
        ...data,
        Address: combinedLocation,
      });
    }

    handleClose();
    
    if (setOpenSnackBar) {
      setOpenSnackBar(true);
    }

    if(setUpdateData){
      setUpdateData(data)
    }
  };

  // const [status, setStatus] = useState<string>("");
  // const [breed, setBreed] = useState<string>("");
  const [value, setValues] = useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleStatusChange = (event: SelectChangeEvent) => {
    setValue("status", event.target.value);
  };

  const handleBreedChange = (event: SelectChangeEvent) => {
    setValue("breed", event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box maxWidth="600px" display="flex" flexDirection="row" p={2} gap={4}>
        <Box flex={2} display="flex" flexDirection="column" gap={3}>
          <Controller
            name="petName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Pet Name" size="small" />
            )}
          />
          <Controller
            name="pawrent"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Pawrent" size="small" />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          <Controller
            name="PhoneNo"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Contact Phone Number" size="small" />
            )}
          />
          <Controller
            name="City"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="City" size="small" />
            )}
          />
        </Box>
        <Box flex={2} display="flex" flexDirection="column" gap={3}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    {...field}
                    value={watch("status")}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Food Allergy">Food Allergy</MenuItem>
                    <MenuItem value="Picky eater">Picky eater</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          />
          <Controller
            name="breed"
            control={control}
            render={({ field }) => (
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Breed</InputLabel>
                  <Select
                    {...field}
                    value={watch("breed")}
                    label="Breed"
                    onChange={handleBreedChange}
                  >
                    <MenuItem value="Golden Retriever">
                      Golden Retriever
                    </MenuItem>
                    <MenuItem value="Bulldog">Bulldog</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          />
          <Controller
            name="DateOfBirth"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  value={value}
                  onChange={(newValue) => setValues(newValue)}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="Address"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Address" sx={{ height: "50px" }} />
            )}
          />
          <Controller
            name="Township"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Township" size="small" />
            )}
          />
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Button
          type="submit"
          sx={{
            marginRight: 2,
            width: "150px",
            bgcolor: "#54BAB9",
            color: "white",
          }}
        >
          Add
        </Button>

        <Button
          onClick={() => handleClose()}
          variant="outlined"
          type="button"
          sx={{ marginLeft: 2, width: "150px" }}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default Form;
