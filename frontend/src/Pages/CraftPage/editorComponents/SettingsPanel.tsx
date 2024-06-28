import React from "react";
import { useEditor } from "@craftjs/core";
import {
  Chip,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
} from "@mui/material";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  const settingsPanelStyle = {
    selectedComponentHeader: {
      borderBottom: "1px solid #e0e0e0",
    },
    selectedComponentTitle: {
      fontSize: "15px",
    },
    selectedComponentForm: {
      padding: "8px 8px",
    },
  };

  return selected ? (
    <Box>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box>
            <Grid
              container
              alignItems="center"
              style={settingsPanelStyle.selectedComponentHeader}
              p={1}
            >
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  style={settingsPanelStyle.selectedComponentTitle}
                >
                  Selected
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  label={selected.name}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Grid item xs p={1}>
              <Typography
                variant="subtitle1"
                style={settingsPanelStyle.selectedComponentTitle}
              >
                Settings
              </Typography>
            </Grid>
          </Box>
        </Grid>

        <FormControl
          size="small"
          component="fieldset"
          style={settingsPanelStyle.selectedComponentForm}
        >
          {selected.settings && React.createElement(selected.settings)}
          {selected.isDeletable ? (
            <Grid container direction="column" style={{ paddingTop: "20px" }}>
              <Box>
                <Grid item xs p={1}>
                  <Button
                    variant="contained"
                    size="large"
                    color="error"
                    onClick={() => {
                      actions.delete(selected.id);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Box>
            </Grid>
          ) : null}
        </FormControl>
      </Grid>
    </Box>
  ) : null;
};
