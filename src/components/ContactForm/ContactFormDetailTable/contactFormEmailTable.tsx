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
import { ChangeEvent, useEffect, useState } from "react";
import { EmailAddressGroup } from "../../../models/emailAddress.model";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { selectEmailAddressListById } from "../../../store/emailAddressList.slice";

const emailTypeList: string[] = ["personal", "work"];

const ContactFormEmailTable: React.FC<{ isEditing: boolean }> = ({
  isEditing,
}) => {
  const [formState, setFormState] = useState<EmailAddressGroup>({
    id: "",
    personal: "",
    work: "",
  });
  const { id } = useParams();
  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const emailDataById = useSelector((state: RootState) =>
    selectEmailAddressListById(state,  `email${id!}`)
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
      setFormState({ ...emailDataById });
    }
  }, [isLoading, isEditing, emailDataById]);

  return (
    <>
      {!isLoading && isEditing && (
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
                        name={`${emailAddress}-email`}
                        value={formState[emailAddress as keyof EmailAddressGroup]}
                        onChange={(event) => setFormInputState(emailAddress, event)}
                        type="email"
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
                        name={`${emailAddress}-email`}
                        type="email"
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
