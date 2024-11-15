"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AuthenticatedPageContainer from "../components/authenticatedPageContainer";
import { useStorage } from "@/context/AppContext";
import { LoadingButton } from "@mui/lab";
import { useLogoutMutation } from "@/redux/services/base-app";
import { useDispatch } from "react-redux";
import { pushToast } from "@/redux/reducers/toast";

export default function TicTacToe() {
  // Example user name, you can replace this with a dynamic name from your authentication logic
  const { user, setUser } = useStorage();

  const [logout, { isLoading, error }] = useLogoutMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleLogout = async () => {
    // Your logout logic here
    try {
      const result = await logout({
        accessToken: localStorage.getItem("access-token"),
      }).unwrap();

      if (result?.message) {
        dispatch(
          pushToast({
            message: "Logout successful!",
            severity: "success",
          })
        );

        localStorage.clear();
        setUser({});

        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
    router.push("/");
  };

  return (
    <AuthenticatedPageContainer>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {/* Game Title and Status */}
        <Typography variant="h4" align="center" gutterBottom>
          Tic Tac Toe
        </Typography>

        {/* Header with User Name and Logout Button */}
        {/* <AppBar position="static" sx={{ mb: 4 }}> */}
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Welcome, {user?.name}</Typography>
          <LoadingButton
            loading={isLoading}
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </LoadingButton>
        </Toolbar>
        {/* </AppBar> */}

        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
        </Typography>

        {/* Game Board */}
        <Grid container spacing={2}>
          {board.map((value, index) => (
            <Grid item xs={4} key={index}>
              <Paper
                onClick={() => handleClick(index)}
                sx={{
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  cursor: "pointer",
                  backgroundColor: value ? "#e3f2fd" : "#fff",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                {value}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Reset Game Button */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={resetGame}>
            Reset Game
          </Button>
        </Box>
      </Container>
    </AuthenticatedPageContainer>
  );
}

// Helper function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
