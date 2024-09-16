import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import BasicButtonGroup from "./Button";
import Stack from "@mui/material/Stack";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editTask } from "../app/taskSlice";

const TaskDetails = ({ getSelectedTaskDetails }) => {
  const status = ["Open", "Done", "In-progress", "Blocked"];
  const priority = ["High", "Medium", "Low"];
  const [formValidationError, setFormValidationError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      ...getSelectedTaskDetails,
    },

    validationSchema: Yup.object({
      status: Yup.string().required(" status Required"),
      priority: Yup.string().required("priority Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email Required"),
      startDate: Yup.string().required("Start date is required"),

      endDate: Yup.string().required("End date is required"),
    }),
    enableReinitialize: true,
    onSubmit: async () => {
      return null;
    },
  });

  console.log("formik", formik);
  const editHandler = async () => {
    const formErrors = await formik.validateForm();
    formik.handleSubmit();
    const { values } = formik;
    if (Object.values(formErrors).length) {
      setFormValidationError(Object.values(formErrors));
    }
    dispatch(editTask(values));
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "20px",
        overflow: "scroll",
        height: "90vh",
        padding: "10px",
      }}
    >
      <Stack spacing={3}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="email">UserID</InputLabel>
          <OutlinedInput
            id="email"
            label="userID"
            {...formik.getFieldProps("email")}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="status"
            select
            label="Status"
            helperText="Please select status"
            {...formik.getFieldProps("status")}
          >
            {status.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="priority"
            select
            label="Priority"
            helperText="Please select Priority"
            {...formik.getFieldProps("priority")}
          >
            {priority.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl sx={{ m: 1, width: "400px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem label="Start Date">
                <DatePicker
                  id="startDate"
                  disablePast
                  inputFormat="MM-dd-yyyy"
                  value={dayjs(formik.values.startDate)}
                  onChange={(value) =>
                    formik.setFieldValue(
                      "startDate",
                      dayjs(value).format("MM/DD/YYYY")
                    )
                  }
                  slotProps={{
                    textField: {
                      helperText: "MM/DD/YYYY formet",
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>

        <FormControl sx={{ m: 1, width: "400px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem label="End Date">
                <DatePicker
                  id="endDate"
                  disablePast
                  inputFormat="MM-dd-yyyy"
                  value={dayjs(formik.values.endDate)}
                  onChange={(value) =>
                    formik.setFieldValue(
                      "endDate",
                      dayjs(value).format("MM/DD/YYYY"),
                      true
                    )
                  }
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY formet",
                    },
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
      </Stack>
      {formValidationError.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <Alert variant="filled" severity="error">
            {formValidationError.map((item) => {
              console.log(item);
              return <div key={item}>Please correct {item} field</div>;
            })}
          </Alert>
        </Box>
      )}
      <BasicButtonGroup
        sx={{ margin: "20px 0px 20px 0px" }}
        Text1="Save"
        Text2="Cancel"
        editHandler={editHandler}
        deleteHandler={() => navigate("/")}
      />
    </Box>
  );
};

export default TaskDetails;
