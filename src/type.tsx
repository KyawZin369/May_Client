import { Dayjs } from "dayjs";

// export interface NewPatient {
//     PetName: string;
//     Pawrent: string;
//     Gender: string;
//     PhoneNumber: string;
//     City: string;
//     Status: string;
//     Breed: string;
//     DateOfBirth: Dayjs | null;
//     Address: string;
//     Township: string; 
// }

 export type patientTable = {
    id: string;
    petName: string;
    status: boolean;
    pawrent: string;
    breed: string;
    gender: string;
    DateOfBirth: Date;
    PhoneNo: string;
    Address: string;
  };