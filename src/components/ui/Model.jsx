"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #b8b8b8",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

export default function Model({ content }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <p
        className="text-center text-blue-600 cursor-pointer"
        onClick={handleOpen}
      >
        View Job
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
            component="h2"
          >
            Job Description
          </Typography>
          <h6 className="font-medium  text-black">About Company:</h6>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, fontSize: "14px", opacity: "0.9" }}
          >
            {content ?? "No Description Provided"}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
