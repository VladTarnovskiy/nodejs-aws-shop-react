import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useOrders } from "~/queries/orders";

export default function Orders() {
  const { data } = useOrders();

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        Order details, status updates, and deletion are not supported by cart
        API. Only the order list is available.
      </Alert>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell align="right">Items count</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {order.address?.firstName} {order.address?.lastName}
                </TableCell>
                <TableCell align="right">{order.items.length}</TableCell>
                <TableCell align="right">{order.address?.address}</TableCell>
                <TableCell align="right">
                  {order.statusHistory[order.statusHistory.length - 1].status}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={order.id}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
