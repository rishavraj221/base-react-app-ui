// This file defines API-related configurations for the application.
// It provides a base URL for API requests, leveraging environment variables
// to switch between different environments (e.g., development, staging, production).
// This allows for dynamic configuration without modifying the application codebase.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
