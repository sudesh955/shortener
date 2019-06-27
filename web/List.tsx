import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/Code";

import { Link, remove } from "./links";

type Props = {
  data: Link[];
  view: (link: Link) => void;
};

function List({ data, view }: Props) {
  return (
    <Box mt={2}>
      <Typography variant="h4">Your links</Typography>
      {data.map(link => {
        return (
          <Box key={link.id} clone mt={2}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <MLink target="_blank" href={`/${link.id}`}>
                    {`${window.location.host}/${link.id}`}
                  </MLink>
                  <ArrowRightIcon />
                  <MLink target="_blank" href={link.url}>
                    {link.url}
                  </MLink>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => view(link)}
                >
                  View
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => remove(link.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}

export default React.memo<Props>(List);
