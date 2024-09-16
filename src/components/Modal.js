import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TaskDetails from "./TaskDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  p: 4,
};

export default function Modal() {
  const [open, setOpen] = React.useState(true);

  const { taskId } = useParams();
  const navigate = useNavigate();
  const { rows } = useSelector((state) => state.task);

  const getSelectedTaskDetails = rows.find((row) => row.task == taskId);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <div>
      <Modal
        sx={{ marginTop: "80px" }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit the Task: {taskId}
            </Typography>
            <TaskDetails getSelectedTaskDetails={getSelectedTaskDetails} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
