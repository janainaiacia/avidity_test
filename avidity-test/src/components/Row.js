import React from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

const Row = (props) => {
  const { row, infos } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.login}
        </TableCell>
        <TableCell>{row.contributions}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Contributor Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date of the first contribution</TableCell>
                    <TableCell>Date of the last contribution</TableCell>
                    <TableCell>Average commits</TableCell>
                    <TableCell>Additions</TableCell>
                    <TableCell>Deletions per week</TableCell>
                    <TableCell>Most active period</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={infos.firstDateCommit}>
                    <TableCell component="th" scope="row">
                      {infos.firstDateCommit}
                    </TableCell>
                    <TableCell>{infos.lastDateCommit}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
