import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetEmailAddressListByIdQuery } from "../../../services/emailAddressList.service";
import { EmailAddressGroup } from "../../../models/emailAddress.model";

const ContactEmailTable: React.FC = () => {
  const { id } = useParams();
  const { data: emailAddressData } = useGetEmailAddressListByIdQuery(id!);

  let dataArray: [string, EmailAddressGroup][] = [];

  if (emailAddressData) {
    dataArray = (Object.entries(emailAddressData).filter(item => !(item[0].includes('id') || item[0].includes('sno'))));
  }

  return (
    <TableContainer component={Paper} sx={{ height: "fit-content", maxWidth:"540px" }}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="center">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emailAddressData !== undefined &&
            dataArray.map((emailAddress) => (
              <TableRow
                key={emailAddress[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {emailAddress[0].toUpperCase()}
                </TableCell>
                <TableCell align="center">
                  {emailAddress[1].toString().length > 0
                    ? `${emailAddress[1]}`
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactEmailTable;
