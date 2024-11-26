/**
 * This module exports factory functions for handling authentication-related operations.
 * It provides endpoint factories for signup, verification, login, token refreshing,
 * and logout functionalities. These functions are typically used to create routes
 * or handlers in a server-side framework, providing authentication mechanisms.
 */

// export {
//   signup as signupEPFactory,
//   verify as verifyEPFactory,
//   login as loginEPFactory,
//   refreshToken as refreshTokenEPFactory,
//   logout as logoutEPFactory,
// } from "./authEPFactory";

export {
  signup as signupEPFactory,
  verify as verifyEPFactory,
  login as loginEPFactory,
  refreshToken as refreshTokenEPFactory,
  logout as logoutEPFactory,
} from "./authEPFactory";

export {
  fetchGameStats as fetchGameStatsEPFactory,
  updateGameStats as updateGameStatsEPFactory,
} from "./gameStatsEPFactory";
