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
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { PhoneNumberGroup } from "../../../models/phoneList.model";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { selectPhoneNumberGroupById } from "../../../store/phoneNumberList.slice";

export const phoneTypeList: string[] = ["home", "work", "main", "other"];

type ContactFormPhoneTableType = {
  phoneNumberState: phoneNumberStateType;
  handlePhoneState: (
    phoneType: string,
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isEditing: boolean;
}

const ContactFormPhoneTable: React.FC<ContactFormPhoneTableType> = ({ phoneNumberState, handlePhoneState, isEditing }) => {
  const [formState, setFormState] = useState<PhoneNumberGroup>({
    id: "",
    home: "",
    work: "",
    main: "",
    other: "",
  });
  const { id } = useParams();
  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const phoneNumberById = useSelector((state: RootState) =>
    selectPhoneNumberGroupById(state,  `phone${id!}`)
  );

  const setFormInputState = (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [value]: event.target.value.toString(),
      };
    });
  };

  useEffect(() => {
    if (!isLoading && isEditing) {
      setFormState({
        ...phoneNumberById,
      });
    }
  }, [isLoading, isEditing, phoneNumberById]);

  return (
    <>
      {!isLoading && isEditing && (
        <>
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
                        value={formState[phoneType as keyof PhoneNumberGroup]}
                        onChange={(event) => setFormInputState(phoneType, event)}
                        onBlur={(event) => handlePhoneState(phoneType, event)}
                        name={`${phoneType}-number`}
                        type="tel"
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {!isLoading && !isEditing && (
        <>
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
                        onBlur={(event) => handlePhoneState(phoneType, event)}
                        name={`${phoneType}-number`}
                        type="tel"
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

export default ContactFormPhoneTable;
