import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@mui/material";

const emailTypeList: string[] = ['personal', 'work']

const ContactFormEmailTable: React.FC = () => {

  return (
    <TableContainer component={Paper} sx={{height:"fit-content"}}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              
              Email
            </TableCell>
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
                <TextField label="email-id" name={`${emailAddress}-email`} type="email"></TextField>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactFormEmailTable