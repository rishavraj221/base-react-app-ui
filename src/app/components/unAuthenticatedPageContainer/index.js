import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * UnauthenticatedPageContainer Component
 *
 * This component is designed to serve as a container for pages that should 
 * only be accessible when the user is unauthenticated. It checks the local 
 * storage for an authentication token and redirects authenticated users 
 * to the main game page automatically.
 *
 * Props:
 * - children: ReactNode - The content to be displayed inside the container
 * 
 * @param {object} props - The props object
 * @param {React.ReactNode} props.children - The child components to render
 * @returns {JSX.Element} - A JSX element wrapping the children
 */
const UnauthenticatedPageContainer = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the authentication token exists in localStorage
    const token = localStorage.getItem("id-token");
    
    // If the token exists, redirect to the '/game' page
    if (token) {
      router.push("/game");
    }
  }, [router]);

  return <>{children}</>;
};

export default UnauthenticatedPageContainer;
