import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { phoneNumberStateType } from "../contactFormView";

export const phoneTypeList: string[] = ['home', 'work','main','other']

const ContactFormPhoneTable: React.FC<{phoneNumberState: phoneNumberStateType}> = ({phoneNumberState}) => {

  return (
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
              <TextField label="phone number" error={phoneNumberState[phoneType]} helperText={phoneNumberState[phoneType] && 'Enter a valid number'} name={`${phoneType}-number`} type="tel"></TextField>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactFormPhoneTable