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
import {updateUserInfo, deleteUserInfo} from "../../../api/UserInfoAPI";
import { UserInfo } from "../../../Models/UserInfo";

import homeTitle from "../../../assets/title.svg"
import headerLogo from "../../../assets/logo.svg"

export const Header = ({ currentUserData }) => {
  const { actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const navigate = useNavigate();
  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState(false);
  const canvasEditable = useSelector((state: RootState) => state)
  const dispatch = useDispatch();

  async function saveUserWebsite(){
    debugger
    const currentUserInfo:UserInfo = {
      _id: currentUserData._id,
      userEmail: currentUserData.userEmail,
      userWebsite: query.serialize()
    }
    const response = await updateUserInfo(currentUserInfo);
    openSaveSnackbar();
    console.log(response);
  }

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
        setSaveSnackbarOpen(true);
      });
    console.log(response);
    console.log(query.serialize());
  }

  async function deleteUserWebsite(){
    const currentUserInfo:UserInfo = {
      _id: currentUserData._id,
      userEmail: currentUserData.email,
      userWebsite: query.serialize()
    }
    const response = await deleteUserInfo(currentUserInfo);
    console.log("delete")
    console.log(response);
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
  const closeSaveSnackbar = () => {
    setSaveSnackbarOpen(false);
  };
  const openSaveSnackbar = () => {
    setSaveSnackbarOpen(true);
  }

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
          onClick={saveUserWebsite}
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
        open={saveSnackbarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{top:"24px"}}
        onClose={closeSaveSnackbar}
      >
        <Alert onClose={closeSaveSnackbar} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Saving success</AlertTitle>
          You works have been saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
