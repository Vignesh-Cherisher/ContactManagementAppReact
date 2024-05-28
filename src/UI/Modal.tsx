import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { ReactElement } from "react";

interface fcProps extends React.PropsWithChildren {
  open: boolean;
  handleClose: () => void;
  triggerAction?: () => void;
  children: ReactElement;
}

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

const UIModal: React.FC<fcProps> = ({
  open,
  handleClose,
  triggerAction,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        {children}
        <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
          {triggerAction && <Button onClick={triggerAction}>Yes</Button>}
          <Button onClick={handleClose} variant="contained">{triggerAction ? 'No' : 'OK'}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UIModal;
