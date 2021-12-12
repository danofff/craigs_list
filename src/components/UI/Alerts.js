import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./Alerts.module.css";

export default function TransitionAlerts({ error, setError }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(error.isError);
  }, [error]);

  return (
    <Box className={classes.alerts}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setError({ isError: false, message: "" });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
