import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import MLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowRightIcon from "@material-ui/icons/Code";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Link, Click, clicks } from "./links";

type Props = {
  link: Link;
  unselect: () => void;
};

function LinkView({ link, unselect }: Props) {
  return (
    <>
      <Header unselect={unselect} />
      <Paper>
        <Box p={2} my={2} display="flex" justifyContent="space-between">
          <MLink target="_blank" href={`/${link.id}`}>
            {`${window.location.host}/${link.id}`}
          </MLink>
          <ArrowRightIcon />
          <MLink target="_blank" href={link.url}>
            {link.url}
          </MLink>
        </Box>
      </Paper>
      <Clicks id={link.id} />
    </>
  );
}

function Header({ unselect }) {
  return (
    <Box display="flex" alignItems="center" borderRadius="borderRadius">
      <IconButton color="inherit" onClick={unselect}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5">View Link Clicks</Typography>
    </Box>
  );
}

function Clicks({ id }: { id: string }) {
  const [state, setState] = useState<null | Click[]>(null);
  useEffect(() => {
    let cancelled = false;
    clicks(id).then(data => {
      if (cancelled) {
        return;
      }
      setState(data);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);
  return state === null ? (
    <Box display="flex" mt={2} justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <>
      {state.map(click => (
        <Box clone p={2} my={2} key={click.id}>
          <Paper>
            <dl>
              <dt>Time</dt>
              <dl>{click.createdAt.toLocaleString()}</dl>
              <dt>IP Address</dt>
              <dl>{click.ip}</dl>
              <dt>User Agent</dt>
              <dl>{click.userAgent}</dl>
              <dt>Referer</dt>
              <dl>{click.referer}</dl>
            </dl>
          </Paper>
        </Box>
      ))}
    </>
  );
}

export default LinkView;
