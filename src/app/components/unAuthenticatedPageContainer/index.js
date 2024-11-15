import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UnauthenticatedPageContainer = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("id-token")) {
      router.push("/app");
    }
  }, []);

  return <>{children}</>;
};

export default UnauthenticatedPageContainer;
