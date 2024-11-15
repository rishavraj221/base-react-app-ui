"use client";

import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Container } from "./page.styled";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      {/* Heading */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Tic Tac Toe
      </Typography>

      {/* Paragraph */}
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

      {/* Button */}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
