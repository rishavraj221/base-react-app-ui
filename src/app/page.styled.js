/**
 * The purpose of this file is to create a styled `Container` component using MUI's `Box` and `styled` function.
 * This component is designed to be a centered container with a column layout that aligns and justifies its children
 * content at the center. It is adapted to be responsive in a parent view with a fixed width and gap between items.
 */

import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * Container component styled using MUI's `styled`.
 * 
 * This component provides a responsive flex container with centered alignment and a vertical gap.
 * It is transformed to center vertically on the viewport.
 */
export const Container = styled(Box)({
  display: "flex", // Using flexbox for layout
  flexDirection: "column", // Arranging children vertically
  alignItems: "center", // Centering children horizontally
  justifyContent: "center", // Centering children vertically
  gap: 50, // Setting a gap between children
  width: 450, // Fixed width for the container
  margin: "0 auto", // Centering container inside its parent horizontally
  marginTop: "25%", // Initial top margin
  transform: "translateY(-50%)", // Adjusting for vertical centering
});
