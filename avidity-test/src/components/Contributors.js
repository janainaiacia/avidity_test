import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { getApiUrl } from "../utils/gitHubUtils";
import Loading from "./Loading";

import Row from "./Row";

const DataFetch = async (request) => {
  return axios(request);
};

const Contributors = (props) => {
  const { access_token, token_type } = props;
  const [isLoading, setLoading] = useState(true);
  const [contributors, setContributors] = useState();

  const request = {
    url: `${getApiUrl()}/contributors`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      access_token: access_token,
      token_type: token_type,
      owner: "axios",
      repo: "axios",
    },
  };

  useEffect(() => {
    DataFetch(request)
      .then((response) => {
        setContributors(response.data);
        setLoading(false);
      })
      .catch((error) => {});
  }, [access_token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Contributor</TableCell>
            <TableCell>Number of contributions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contributors.map((contributor) => (
            <Row
              key={contributor.contributor.login}
              row={contributor.contributor}
              infos={contributor.infos}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Contributors;
