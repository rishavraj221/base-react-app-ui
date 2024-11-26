"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AuthenticatedPageContainer from "../components/authenticatedPageContainer";
import { useStorage } from "@/context/AppContext";
import { LoadingButton } from "@mui/lab";
import {
  useLogoutMutation,
  useFetchGameStatsQuery,
  useUpdateGameStatsMutation,
} from "@/redux/services/base-app";
import { useDispatch } from "react-redux";
import { pushToast } from "@/redux/reducers/toast";

export default function TicTacToe() {
  const { user, setUser } = useStorage();
  const router = useRouter();
  const dispatch = useDispatch();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board, dispatch);

  const { data: gameStats, refetch } = useFetchGameStatsQuery();
  const [updateGameStats] = useUpdateGameStatsMutation();
  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (winner) {
      updateGameStats(winner);
      refetch();
    }
  }, [winner]);

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
      dispatch(
        pushToast({
          message: "Logout failed. Please try again!",
          severity: "error",
        })
      );
    }
  };

  return (
    <AuthenticatedPageContainer>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Tic Tac Toe
        </Typography>

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

        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
        </Typography>

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

        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={resetGame}>
            Reset Game
          </Button>
        </Box>

        {gameStats && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                Game Statistics
              </Typography>
              <Typography variant="body1" align="center">
                X Wins: {gameStats.playerXWins}
              </Typography>
              <Typography variant="body1" align="center">
                O Wins: {gameStats.playerOWins}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </AuthenticatedPageContainer>
  );
}

function calculateWinner(squares, dispatch) {
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
      dispatch(
        pushToast({
          message: `Player ${squares[a]} won!`,
          severity: "success",
        })
      );
      return squares[a];
    }
  }
  return null;
}
