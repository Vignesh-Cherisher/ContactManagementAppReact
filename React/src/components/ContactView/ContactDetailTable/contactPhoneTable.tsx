import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPhoneNumberListByIdQuery } from "../../../services/phoneNumberList.service";
import { PhoneNumberGroup } from "../../../models/phoneList.model";

const ContactPhoneTable: React.FC = () => {
  const { id } = useParams();
  const { data: phoneNumberData } = useGetPhoneNumberListByIdQuery(id!);

  let dataArray: [string, PhoneNumberGroup][] = [];

  if (phoneNumberData) {
    dataArray = (Object.entries(phoneNumberData).filter(item => !(item[0].includes('id') || item[0].includes('sno'))));
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth:"540px" }}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="center">Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phoneNumberData !== undefined &&
            dataArray.map((phoneNumber) => (
              <TableRow
                key={phoneNumber[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {phoneNumber[0].toUpperCase()}
                </TableCell>
                <TableCell align="center">
                  {phoneNumber[1].toString().length > 0
                    ? `${phoneNumber[1]}`
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactPhoneTable;
