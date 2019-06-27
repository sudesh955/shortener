import { hot } from "react-hot-loader/root";
import React, { useReducer, useEffect, useCallback } from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Link, subscribe } from "./links";
import List from "./List";
import Create from "./Create";
import NotFound from "./NotFound";
import LinkView from "./LinkView";

type State = {
  links: Link[];
  selected: null | Link;
};

type Action =
  | {
      type: "LINKS";
      links: Link[];
    }
  | {
      type: "SELECT";
      link: null | Link;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LINKS":
      return { ...state, links: action.links };
    case "SELECT":
      return { ...state, selected: action.link };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { links: [], selected: null });
  useEffect(() => subscribe(links => dispatch({ type: "LINKS", links })), []);
  const viewLink = (link: Link) => dispatch({ type: "SELECT", link });
  const unselect = useCallback(
    () => dispatch({ type: "SELECT", link: null }),
    []
  );
  return (
    <CssBaseline>
      <Box maxWidth={600} m="auto" pt={2}>
        <NotFound />
        {state.selected === null ? (
          <>
            <Create />
            <List view={viewLink} data={state.links} />
          </>
        ) : (
          <LinkView link={state.selected} unselect={unselect} />
        )}
      </Box>
    </CssBaseline>
  );
}

export default hot(App);
