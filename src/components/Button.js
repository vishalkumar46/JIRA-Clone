import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function BasicButtonGroup({
  editHandler,
  deleteHandler,
  Text1 = "edit",
  Text2 = "delete",
  sx,
}) {
  return (
    <ButtonGroup
      sx={{ ...sx }}
      variant="contained"
      aria-label="Basic button group"
    >
      <Button onClick={editHandler}>{Text1}</Button>
      <Button onClick={deleteHandler}>{Text2}</Button>
    </ButtonGroup>
  );
}
