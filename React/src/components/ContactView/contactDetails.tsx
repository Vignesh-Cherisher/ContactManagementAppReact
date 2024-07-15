import {
  Typography,
  Box,
  Grid,
  Icon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectContactById } from "../../store/contactItem.slice";
import ImageWithAlt from "../../theme/ImgElement";
import { useEffect } from "react";

const ContactDetails: React.FC = () => {
  const navigate = useNavigate();
  const isLoading = useSelector(
    (state: RootState) => state.contactItem.isLoading
  );
  const { id } = useParams();
  const contactData = useSelector((state: RootState) =>
    selectContactById(state, parseInt(id!))
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isLoading) {
      if (contactData === undefined) {
        navigate("/notFound");
      }
    }
  }, [isLoading, navigate, contactData]);

  return (
    <>
      {isLoading && <Box>Loading...</Box>}
      {contactData && (
        <>
          <Box
            sx={{
              justifyContent: "center",
              ...(isSmallScreen ? { display: "block" } : { display: "flex" }),
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                p: "1rem 2rem",
                maxWidth: "1500px",
                ...(isSmallScreen ? { flexDirection: "column-reverse" } : ""),
              }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
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
                  {contactData.dob ?? ""}
                </Typography>
              </Grid>
              <Grid
                item
                key={contactData.id}
                xs={8}
                sm={5}
                md={4}
                lg={4}
                xl={3}
                sx={{ mb: "1rem" }}
                textAlign="right"
              >
                <ImageWithAlt
                  alt={contactData.fName}
                  src={contactData.url}
                  width="75%"
                ></ImageWithAlt>
                <Icon
                  sx={{
                    ...(contactData.isFav
                      ? { color: "red" }
                      : { color: "gray" }),
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
