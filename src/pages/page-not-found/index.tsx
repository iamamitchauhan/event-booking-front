import React, { useEffect } from "react";
import Header from "../../components/Header";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page Not found";
  }, []);

  return (
    <div>
      <Header backUrl="/" />
      <div>
        <h1>Sorry!</h1>
        <div>Page Not Found</div>
      </div>
    </div>
  );
};

export default PageNotFound;
