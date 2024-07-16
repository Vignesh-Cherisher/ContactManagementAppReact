import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

interface ImageWithAltProps {
  src: string;
  alt: string;
  width?: string | number;
}

const ImageWithAlt: React.FC<ImageWithAltProps> = ({
  src,
  alt,
  width,
}) => {
  const [imgError, setImgError] = useState(false);
  const handleImageError = () => {
    setImgError(true);
  };

  const handleImageSuccess = () => {
    setImgError(false)
  }

  return (
    <Box
      sx={{
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        width : { width },
        aspectRatio : "1/1",
        border : "1px solid #ccc",
        overflow : "hidden",
        position : "relative",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    >
      {!imgError ? (
        <img
          src={src}
          alt={alt}
          width="100%"
          onError={handleImageError}
          onLoadedData={handleImageSuccess}
          style={{ objectFit: "cover", aspectRatio : "1/1" }}
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
          bgcolor="#f0f0f0"
        >
          <Typography variant="h2" color="textSecondary" fontFamily="poppins">
            {alt[0]}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageWithAlt;