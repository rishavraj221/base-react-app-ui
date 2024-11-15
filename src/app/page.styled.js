import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 50,
  width: 450,
  margin: "0 auto",
  marginTop: "25%",
  transform: "translateY(-50%)",
});
