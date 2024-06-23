import React,{ useState } from "react";
import { useSelector } from "react-redux";

import { Grid, Paper, Typography,Snackbar,Alert, AlertTitle} from "@mui/material";

import { Toolbox } from "./editor/Toolbox";
import { SettingsPanel } from "./editor/SettingsPanel";
import { Header } from "./editor/Header";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  MaterialButton,
  Container,
  Card,
  CardTop,
  CardBottom,
  Text,
  MaterialTextField,
  MaterialChip,
  MaterialSwitch,
  MaterialSelect,
  MaterialRating,
} from "./pageComponents/exportComponents";

import { Editor, Frame, Element } from "@craftjs/core";

import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";


export default function CraftPage() {
  const craftPageStyles = {
    gridContainer: {
      height: "100%",
    },
    container: {
      height: "100%",
    },
    header: {
      height: "20px",
    },
  };

  //get the data of user
  const { state } = useLocation();
  //for the saving json data
  const savedData = state.userData;
  const canvasEditable = useSelector((state: RootState) => state)

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  // TODO: merge topbar component with the main canvas component
  return (
    <div
      className="craft-page"
      style={{
        overflow: "hidden",
        ...craftPageStyles.container,
      }}
    >   
      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={ {vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
            Loading data successfully!
        </Alert>
      </Snackbar>
      <Editor
        resolver={{
          Card,
          MaterialButton,
          Text,
          Container,
          CardTop,
          CardBottom,
          MaterialTextField,
          MaterialChip,
          MaterialSwitch,
          MaterialSelect,
          MaterialRating,
          
        }}
        style={{ height: "100%" }}
      >
        <Header data={state} />
        <Grid container spacing={0} style={craftPageStyles.gridContainer}>
          <Grid
            item
            xs={0.8}
            sx={{
              borderRight: 1,
              borderColor: "grey.300",
              height: "100%",
              overflow: "auto",
            }}
            style={{
              display: canvasEditable ? "inhirit" : "none"
            }}
          >
            <Paper style={craftPageStyles.container}>
              <Toolbox />
            </Paper>
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              height: "100%",
              overflow: "auto",
              backgroundColor: "#eeeeee",
            }}
          >
            <Frame style={craftPageStyles.container} json={savedData}>
              <Element is={Container} padding={20} margin={30} canvas>
                <Card />
                <MaterialButton size="small" variant="outlined">
                  Click
                </MaterialButton>
                <Text size="small" text="Hi world!" align="inherit" />
                <Element is={Container} padding={5} canvas>
                  <Text size="small" text="It's me again!" align="inherit" />
                </Element>
              </Element>
            </Frame>
          </Grid>
          <Grid
            item
            xs={2.2}
            sx={{
              borderLeft: 1,
              borderColor: "grey.300",
              height: "100%",
              overflow: "auto",
            }}
          >
            <Paper style={craftPageStyles.container}>
              <Grid
                container
                alignItems="center"
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  display: canvasEditable ? "inhirit" : "none",
                }}
              >
                <Grid item xs>
                  <SettingsIcon
                    style={{
                      position: "relative",
                      float: "left",
                      color: "#ffffff",
                      paddingLeft: "5px",
                      paddingTop: "2px",
                      fontSize: "21px",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      paddingLeft: "28px",
                      fontSize: "15px",
                    }}
                  >
                    Setting panel
                  </Typography>
                </Grid>
              </Grid>
              <SettingsPanel
                className="setting-panel"
                style={{ height: "inherit" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}
