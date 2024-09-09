import { Box, Stack, Avatar, Typography, styled } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Nav() {

    const StyledNotificationIcon = styled(NotificationsIcon)({
        color: 'blue',
      });

  return (
    <Stack bgcolor="#54BAB9">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box sx={{ marginLeft: "20px" }}>
          <img
            src="../../public/resources/Logo(2).png"
            alt="May Clinic Logo"
            style={{ margin: "10px" }}
          />
        </Box>
        <Box
          width="200px"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box>
            <StyledNotificationIcon sx={{ color: "white" , cursor: "pointer"}}/>
          </Box>
          <Box>
            <Avatar alt="Remy Sharp" src="/resources/user image.png" sx={{ cursor: "pointer" }}/>
          </Box>
          <Box marginRight="10px">
            <Typography fontWeight="bold" color="white">
                Lisa
            </Typography>
            <Typography color="white">
                Operator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
