import React from "react";
import Contributors from "./Contributors";

const Dashboard = ({ access_token, token_type }) => {
  return (
    <h2>
      Dashboard
      <Contributors access_token={access_token} token_type={token_type} />
    </h2>
  );
};

export default Dashboard;
