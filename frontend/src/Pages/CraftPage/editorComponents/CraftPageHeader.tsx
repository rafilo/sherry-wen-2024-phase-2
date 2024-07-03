import React, { useState } from "react";
import { RootState } from "../../../store/store";
import { useEditor } from "@craftjs/core";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditableTrue,
  setEditableFalse,
} from "../../../store/reducer/editableReducer";

import {
  Box,
  Grid,
  Button,
  Alert,
  AlertTitle,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useNavigate } from "react-router-dom";
import { updateUserInfo, deleteUserInfo } from "../../../api/UserInfoAPI";
import { UserInfo } from "../../../Models/UserInfo";

import homeTitle from "../../../assets/title.svg";
import headerLogo from "../../../assets/logo.svg";

export const CraftPageHeader: React.FC<UserInfo> = ({
  _id,
  userEmail,
  userWebsite,
}) => {
  const { actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const navigate = useNavigate();
  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasEditable = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const closeSaveSnackbar = () => {
    setSaveSnackbarOpen(false);
  };
  const openSaveSnackbar = () => {
    setSaveSnackbarOpen(true);
  };
  const closeDeleteSnackbar = () => {
    setDeleteSnackbarOpen(false);
  };
  const openDeleteSnackbar = () => {
    setDeleteSnackbarOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const redirectToHomepage = () => {
    navigate("/");
  };

  async function saveUserWebsite() {
    setIsSaving(true);
    const currentUserInfo: UserInfo = {
      _id: _id,
      userEmail: userEmail,
      userWebsite: query.serialize(),
    };
    const response = await updateUserInfo(currentUserInfo);
    openSaveSnackbar();
    setIsSaving(false);
    console.log(response);
  }

  async function deleteUserWebsite() {
    setIsDeleting(true);
    const currentUserInfo: UserInfo = {
      _id: _id,
      userEmail: userEmail,
      userWebsite: query.serialize(),
    };
    const response = await deleteUserInfo(currentUserInfo);
    setIsDeleting(false);
    openDeleteSnackbar();
    console.log("delete");
    redirectToHomepage();
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
    color: "#ff0000",
  });

  return (
    <Box className="header" sx={{ borderBottom: 1, borderColor: "grey.300" }}>
      <Grid container alignItems="left">
        <img src={headerLogo} style={{ height: "30px", width: "30px" }}></img>
        <img
          src={homeTitle}
          style={{ position: "absolute", left: "5px", top: "-22px" }}
        ></img>
        <Deletebutton
          size="small"
          startIcon={<DeleteOutlineIcon />}
          onClick={openDeleteDialog}
          disabled={isDeleting}
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
          disabled={isSaving}
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
        style={{ top: "24px" }}
        onClose={closeSaveSnackbar}
      >
        <Alert
          onClose={closeSaveSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Saving success</AlertTitle>
          You works have been saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: "24px" }}
        onClose={closeDeleteSnackbar}
      >
        <Alert
          onClose={closeDeleteSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Deleting success</AlertTitle>
          You works have been successfully deleted!
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete current website"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete current website? You'll be redirected to
            homepage after the deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>No</Button>
          <Button onClick={deleteUserWebsite} autoFocus variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
