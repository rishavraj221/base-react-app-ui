"use client";

/**
 * Main entry component for the Tic Tac Toe application.
 *
 * This component provides a welcoming interface with a brief description
 * of the game and a button to navigate users to the login page. Utilizes
 * Material-UI components for styling and layout. The goal is to offer an
 * engaging interface for users to easily access the game.
 */

import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Container } from "./page.styled";
import { useRouter } from "next/navigation";

/**
 * Home component renders the main landing page for the Tic Tac Toe application.
 *
 * @returns {JSX.Element} - A JSX element displaying the home page with a heading,
 * a descriptive paragraph, and a button to navigate to the login page.
 */
export default function Home() {
  // Initialize the router for client-side navigation
  const router = useRouter();

  // Render the main content of the landing page
  return (
    <Container>
      {/* Display main heading */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Tic Tac Toe
      </Typography>

      {/* Display informative paragraph about the game */}
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        align="center"
      >
        Tic Tac Toe is a classic two-player game where participants take turns
        marking Xs and Os on a 3x3 grid, aiming to align three of their symbols
        horizontally, vertically, or diagonally. The simplicity of the game
        makes it easy to learn, yet it requires strategic thinking to
        outmaneuver the opponent. Our Tic Tac Toe application brings this
        timeless experience to life with an intuitive and engaging interface,
        perfect for quick and fun matches.
      </Typography>

      {/* Centered login button facilitating navigation to the login page */}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          // Navigate user to login page on button click
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
