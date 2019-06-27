import React, { useState } from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";

function NotFound() {
  const [state, setState] = useState<boolean>(window.location.pathname !== "/");
  if (window.location.href === "/") return null;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={state}
      onClose={() => setState(false)}
      message="Link not found"
    />
  );
}

export default NotFound;
