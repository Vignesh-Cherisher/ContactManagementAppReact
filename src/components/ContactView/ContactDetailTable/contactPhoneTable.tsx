import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGetPhoneNumberListQuery } from "../../../services/phoneNumberList.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { phoneNumberListActions, selectPhoneNumberGroupById } from "../../../store/phoneNumberList.slice";
import { RootState } from "../../../store";
import { useParams } from "react-router-dom";

const ContactPhoneTable: React.FC = () => {
  const {data: phoneNumberData} = useGetPhoneNumberListQuery()

  const dispatch = useDispatch()
  const { id } = useParams()
  const dataByIdSelector = useSelector((state: RootState) => 
    selectPhoneNumberGroupById(state, `phone${id!}`)
  )
  
  let dataArray: [string, string][] = []

  if(dataByIdSelector) {
    dataArray = (Object.entries(dataByIdSelector)).slice(1)
  }

  useEffect(() => {
    if(phoneNumberData) {
      dispatch(phoneNumberListActions.phoneNumberListSetAll(phoneNumberData))
    }
  }, [phoneNumberData, dispatch])

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
          {dataByIdSelector!== undefined && dataArray.map((phoneNumber) => (
            <TableRow
              key={phoneNumber[0]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {phoneNumber[0].toUpperCase()}
              </TableCell>
              <TableCell align="center">
                {phoneNumber[1].length > 0 ? phoneNumber[1] : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactPhoneTable