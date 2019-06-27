import React, {
  useCallback,
  ChangeEvent,
  FormEvent,
  useReducer,
  useEffect
} from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MLink from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import Done from "@material-ui/icons/Done";

import { Link, createLink } from "./links";

type Props = {};

type State = {
  url: string;
  error: null | string;
  request: null | Promise<Link>;
  link: null | Link;
};

type Action =
  | {
      type: "UPDATE_URL";
      value: string;
    }
  | {
      type: "ERROR";
      value: string | null;
    }
  | {
      type: "CREATING";
      request: Promise<Link>;
    }
  | {
      type: "LINK";
      link: Link;
    };

function init(): State {
  return {
    url: "",
    error: null,
    request: null,
    link: null
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_URL":
      return { ...state, url: action.value };
    case "ERROR":
      return { ...state, error: action.value };
    case "CREATING":
      return { ...state, request: action.request, error: null };
    case "LINK":
      return { ...state, link: action.link, request: null };
    default:
      throw new Error();
  }
}

function List() {
  const [state, dispatch] = useReducer(reducer, null, init);
  const changeURL = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: "UPDATE_URL",
        value: event.currentTarget.value
      }),
    []
  );
  const create = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateURL(state.url);
    if (validation instanceof Error) {
      dispatch({
        type: "ERROR",
        value: "This does not look like url. Be sure to add http or https."
      });
      return;
    }
    dispatch({ type: "CREATING", request: createLink(validation) });
  };
  const creating = state.request !== null;
  useEffect(() => {
    const request = state.request;
    if (request === null) return;
    let cancelled = false;
    request.then(link => dispatch({ type: "LINK", link }));
    return () => {
      cancelled = true;
    };
  }, [state.request]);
  return (
    <Box clone padding={2}>
      <Paper>
        <Typography variant="h4">URL shortener</Typography>
        <form onSubmit={create}>
          <Box my={3}>
            <TextField
              autoFocus
              fullWidth
              label="URL"
              value={state.url}
              disabled={creating}
              onChange={changeURL}
              helperText={state.error}
              error={state.error !== null}
            />
          </Box>
          <Box mb={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={creating}
            >
              Create
            </Button>
          </Box>
        </form>
        {creating && <CircularProgress />}
        {state.link !== null && <ShortLink link={state.link} />}
      </Paper>
    </Box>
  );
}

function ShortLink({ link }: { link: Link }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Done />
      <MLink target="_blank" href={`/${link.id}`}>
        {`${window.location.host}/${link.id}`}
      </MLink>
      <Button variant="contained" color="secondary">
        New
      </Button>
    </Box>
  );
}

function validateURL(str: string): Error | string {
  try {
    return new URL(str).toString();
  } catch (err) {
    return err;
  }
}

export default React.memo<Props>(List);
