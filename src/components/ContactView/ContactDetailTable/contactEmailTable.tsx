import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { RootState } from "../../../store";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useGetEmailAddressListQuery } from "../../../services/emailAddressList.service"
import { emailAddressListActions, selectEmailAddressListById } from "../../../store/emailAddressList.slice"

const ContactEmailTable: React.FC = () => {
  const {data: emailAddressData} = useGetEmailAddressListQuery()
  const dispatch = useDispatch()
  const { id } = useParams()

  const dataByIdSelector = useSelector((state: RootState) => 
    selectEmailAddressListById(state, `email${id!}`)
  )
  
  let dataArray: [string, string][] = []

  if(dataByIdSelector) {
    dataArray = (Object.entries(dataByIdSelector)).slice(1)
  }

  useEffect(() => {
    if(emailAddressData) {
      dispatch(emailAddressListActions.emailAddressListSetAll(emailAddressData))
    }
  }, [emailAddressData,dispatch])

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
          {dataByIdSelector!== undefined && dataArray.map((emailAddress) => (
            <TableRow
              key={emailAddress[0]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {emailAddress[0].toUpperCase()}
              </TableCell>
              <TableCell align="center">
                {emailAddress[1].length > 0 ? emailAddress[1] : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactEmailTable