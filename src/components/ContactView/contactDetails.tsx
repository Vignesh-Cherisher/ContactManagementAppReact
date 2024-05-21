import styled from "@emotion/styled";
import { Typography, Box, Grid } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  objectFit: "cover",
  borderRadius: "50%",
  aspectRatio: "1/1"
});

const ContactDetails: React.FC = () => {
  return (
    <>
    <Typography
        variant="h6"
        gutterBottom
        sx={{ m: "1rem 0 0 2rem" }}
        className="contact-title"
      >
        Contact Details
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ m: "1rem 0 0 2rem" }}
          alignItems="flex-start"
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
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
              Alfred
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
              Noel
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
              8, Arizona Street, Washington DC, US
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
              5-10-1995
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ mb: "1rem" }}>
            <Img
              alt="Profile Picture"
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ContactDetails