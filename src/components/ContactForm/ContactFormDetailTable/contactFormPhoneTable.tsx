import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { phoneNumberStateType } from "../contactFormView";
import { ChangeEvent, FocusEvent } from "react";
import { PhoneNumberGroup } from "../../../models/phoneList.model";

export const phoneTypeList: string[] = ["home", "work", "main", "other"];

type ContactFormPhoneTableType = {
  phoneNumberState: phoneNumberStateType;
  phoneGroup: PhoneNumberGroup;
  isLoading: boolean;
  handlePhoneState: (
    phoneType: string,
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const ContactFormPhoneTable: React.FC<ContactFormPhoneTableType> = ({
  phoneNumberState,
  handlePhoneState,
  isLoading,
  phoneGroup,
  handleInputChange,
}) => {

  return (
    <>
      {!isLoading && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell align="center">Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phoneTypeList.map((phoneType: string) => (
                  <TableRow
                    key={phoneType}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {phoneType.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="phone number"
                        error={phoneNumberState[phoneType]}
                        helperText={
                          phoneNumberState[phoneType] && "Enter a valid number"
                        }
                        value={phoneGroup[phoneType as keyof PhoneNumberGroup] ?? ''}
                        onChange={handleInputChange}
                        onBlur={(event) => handlePhoneState(phoneType, event)}
                        name={phoneType}
                        type="tel"
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      )}

    </>
  );
};

export default ContactFormPhoneTable;
