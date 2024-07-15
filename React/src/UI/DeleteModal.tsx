import { Box, Button, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type FcProps = {
  open: boolean;
  handleClose: () => void;
  triggerDelete: () => void;
};

const DeleteModal: React.FC<FcProps> = ({
  open,
  handleClose,
  triggerDelete,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Delete Contact</h2>
        <p id="parent-modal-description">
          Do you really want to delete the contact item?
        </p>
        <Box sx={{ justifyContent: "flex-end", mt: "0.5rem", display: "flex" }}>
          <Button variant="contained" onClick={triggerDelete} sx={{marginRight: "0.5rem"}}>Yes</Button>
          <Button variant="outlined" onClick={handleClose}>No</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
