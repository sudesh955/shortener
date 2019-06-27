import { hot } from "react-hot-loader/root";
import React, { useReducer, useEffect, Suspense, useCallback } from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Link, subscribe } from "./links";
import Create from "./Create";
import NotFound from "./NotFound";

const LinkView = React.lazy(() => import("./LinkView"));
const List = React.lazy(() => import("./List"));

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
        {state.selected === null && <Create />}
        <Suspense fallback={null}>
          {state.selected === null ? (
            <List view={viewLink} data={state.links} />
          ) : (
            <LinkView link={state.selected} unselect={unselect} />
          )}
        </Suspense>
      </Box>
    </CssBaseline>
  );
}

export default hot(App);
