import React, { useState } from "react";
import { RootState } from "../../../store/store";
import { useEditor } from "@craftjs/core";
import { useSelector, useDispatch } from "react-redux";
import { setEditableTrue, setEditableFalse } from "../../../store/reducer/editableReducer";

import {
  Box,
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useNavigate } from "react-router-dom";
import axios from "axios";

import homeTitle from "../../../assets/title.svg"
import headerLogo from "../../../assets/logo.svg"

export const Header = ({ data }) => {
  const { actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const canvasEditable = useSelector((state: RootState) => state)
  const dispatch = useDispatch();

  async function saveCanvasToServer() {
    //call the api to save user data into database
    const response = await axios
      .post("http://localhost:3001/updateUserInfo", {
        userEmail: data.userEmail,
        familyName: data.familyName,
        givenName: data.givenName,
        userData: query.serialize(),
      })
      .then(() => {
        setOpen(true);
      });
    console.log(response);
    console.log(query.serialize());
  }

  async function deleteUserWebsite(){
    console.log("delete")
  }

  function logout() {
    navigate("/");
  }
  // update editable state in redux for control usage
  function toggleEditable() {
    actions.setOptions((options) => (options.enabled = !canvasEditable));
    if (!canvasEditable) {
      dispatch(setEditableTrue());
    } else {
      dispatch(setEditableFalse());
    }
  }

  const TopbarButton = styled(Button)({
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  });
  const Deletebutton = styled(Button)({
    "&:hover": {
      backgroundColor: "#ffd9d9",
    },
    color: "#ff0000"
  })
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="header" sx={{ borderBottom: 1, borderColor: "grey.300" }}>
      <Grid container alignItems="left">
        <img
          src={headerLogo}
          style={{ height: "30px", width: "30px" }}
        ></img>
        <img
          src={homeTitle}
          style={{ position: "absolute", left: "5px", top: "-22px" }}
        ></img>
        <Deletebutton
          size="small"
          startIcon={<DeleteOutlineIcon />}
          onClick={deleteUserWebsite}
          style={{
            position: "absolute",
            right: "285px",
          }}
        >
          Delete
        </Deletebutton>
        <TopbarButton
          size="small"
          startIcon={<PlayCircleOutlineIcon />}
          onClick={toggleEditable}
          style={{
            position: "absolute",
            right: "180px",
            backgroundColor: canvasEditable ? "transparent" : "#bbdefb",
            
          }}
        >
          Preview
        </TopbarButton>
        <TopbarButton
          size="small"
          startIcon={<SaveAltIcon />}
          onClick={saveCanvasToServer}
          style={{ position: "absolute", right: "100px" }}
        >
          Save
        </TopbarButton>
        <TopbarButton
          size="small"
          startIcon={<LogoutIcon />}
          onClick={logout}
          style={{ position: "absolute", right: "5px" }}
        >
          Logout
        </TopbarButton>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{top:"24px"}}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Saving success</AlertTitle>
          You works have been saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
