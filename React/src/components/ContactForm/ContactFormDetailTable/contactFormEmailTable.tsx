import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { EmailAddressGroup } from "../../../models/emailAddress.model";

const emailTypeList: string[] = ["personal", "work"];

type ContactFormEmailTableType = {
  emailGroup: EmailAddressGroup;
  isLoading: boolean;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputGroup: string
  ) => void;
};

const ContactFormEmailTable: React.FC<ContactFormEmailTableType> = ({
  isLoading,
  emailGroup,
  handleInputChange,
}) => {
  return (
    <>
      {!isLoading && (
        <>
          <TableContainer component={Paper} sx={{ height: "fit-content" }}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emailTypeList.map((emailAddress) => (
                  <TableRow
                    key={emailAddress}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {emailAddress.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="email-id"
                        name={emailAddress}
                        type="email"
                        value={emailGroup[emailAddress as keyof EmailAddressGroup] ?? ''}
                        onChange={(event) => handleInputChange(event, 'emailGroup')}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default ContactFormEmailTable;
