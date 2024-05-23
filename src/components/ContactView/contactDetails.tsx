import { Typography, Box, Grid, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import {
  selectContactById,
} from "../../store/contactItem.slice";
import { Img } from "../../util/ImgElement";
import { useEffect, useState } from "react";

const ContactDetails: React.FC = () => {
  const navigate = useNavigate();
  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const { id } = useParams();
  const contactData = useSelector((state: RootState) =>
    selectContactById(state, parseInt(id!))
  );
  const [localLoading, setLocalLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      setLocalLoading(false)
    }
    if (!isLoading && contactData === undefined) {
      navigate("/notFound")
    }
  }, [isLoading, navigate, contactData])

  return (
    <>
      {localLoading && <Box>
        Loading...
      </Box>}
      {contactData && (
        <>
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid
              container
              spacing={2}
              sx={{ p: "1rem 2rem 0 2rem" }}
              alignItems="flex-start"
              justifyContent="space-around"
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                sx={{ m: "0 0 1rem 0" }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  First Name:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  {contactData.fName}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  Last Name:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  {contactData.lName}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  Address:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  {contactData.address}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  DOB:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ m: "0 0 0.5rem 0" }}
                  className="contact-detail"
                >
                  {contactData.dob}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                sx={{ mb: "1rem" }}
                textAlign="right"
              >
                <Img alt={contactData.fName} src={contactData.url} />
                <Icon
                  sx={{
                    ...(contactData.isFav
                      ? { color: "red" }
                      : { filter: "invert(1)" }),
                  }}
                >
                  favorite
                </Icon>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ContactDetails;
