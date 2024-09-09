import { Box, Stack } from "@mui/material";
import Filter from "./Filter"
import Table from "./Table";

export default function Main () {
    return (
        <Stack height="85vh" bgcolor="#F7ECDE">
            <Box height="100%" bgcolor="white" margin="15px">
                <Filter/>
                <Table/>
            </Box>
        </Stack>
    )
}