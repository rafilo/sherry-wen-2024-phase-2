import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setCurrentUserInfo } from "../../store/reducer/loggedinUserInfoReducer";
import { getCurrentUserInfo, createUserInfo} from "../../api/UserInfoAPI";
import { UserInfo } from "../../Models/UserInfo";

import jwt from "jwt-decode";
import axios from "axios";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import AutoModeIcon from "@mui/icons-material/AutoMode";

import homeLogo from "../../assets/home.png"
import homeTitle from "../../assets/title.svg"
import headerLogo from "../../assets/logo.svg"

//import styles from "../../../assets/HomePage.module.css";

//define the jwt decode object
interface googleUser {
  email: string;
  family_name: string;
  given_name: string;
}

export const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function jumpToCraftPage(data) {
    //pass the data to page
    navigate("/craftpage", { state: data });
  }

  async function loginProcessDotnet(credential){
    setOpen(true)
    const currentUser = jwt<googleUser>(credential);
    const currentUserInfo:UserInfo = {
      _id: {},
      userEmail: currentUser.email,
      userWebsite: ""
    }
    const storedUserInfo = await getCurrentUserInfo(currentUserInfo);
    console.log(storedUserInfo)
    if(Object.keys(storedUserInfo).length === 0){
      await createUserInfo(currentUserInfo)
    }
    dispatch(setCurrentUserInfo(currentUserInfo))
    handleClose();
  }

  // TODO: redirect to the dashboard, then replace the jumpToCraftPage()
  async function loginProcess(credential) {
    //test the process icon for waiting api response
    // await new Promise((r) => setTimeout(r, 5000));
    const user = jwt<googleUser>(credential);
    console.log(user.email);
    // call api to create user when first login
    const response = await axios
      .post("http://localhost:3001/createUserInfo", {
        userEmail: user.email,
        familyName: user.family_name,
        givenName: user.given_name,
      })
      .then(async (response) => {
        console.log(response);
        // call api to get the user data for loading the saves
        // wait for insert into database then query the user info
        // await new Promise((r) => setTimeout(r, 500));
        const response2 = await fetch(
          `http://localhost:3001/getUserInfo/${user.email}`
        );
        const data = await response2.json();
        console.log("data: ", data);
        console.log("loginProcess");
        //close the proccess icon
        handleClose();
        jumpToCraftPage(data);
      });
  }

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="homepage" style={{ height: "100%", width: "100%" }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ background: "rgba(0, 0, 0, 0.3)", top: 0 }}
        sx={{ height: "100%", width: "100%" }}
        onClose={handleClose}
      >
        <div>
          <CircularProgress style={{color: "#0288d1"}}/>
          <Typography
              sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
              variant="h6"
              component="div"
              style={{ color: "#0288d1", position:"relative", left:"-45px"}}
            >
              Now Loading...
            </Typography>
          
        </div>
      </Snackbar>
      <Grid
        className="homepage-header"
        item
        alignItems="left"
        xs={2}
        sx={{
          borderBottom: 1,
          borderColor: "grey.300",
          height: "100%",
          overflow: "auto",
        }}
        style={{ height: "10%", width: "100%" }}
      >
        <img
          src={headerLogo}
          style={{
            height: "70px",
            width: "70px",
            position: "absolute",
            left: "100px",
            top: "3px",
          }}
        ></img>
        <img
          src={homeTitle}
          style={{
            position: "absolute",
            left: "143px",
            top: "-8px",
            height: "90px",
          }}
        ></img>
        <div
          className="header-breadcrumb"
          style={{ position: "absolute", right: "100px", top: "30px" }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              //className={styles.link}
              underline="hover"
              color="inherit"
              href="https://craft.js.org/"
              target="_blank"
              rel="noopener"
            >
              Resources
            </Link>
            <Link
              //className={styles.link}
              underline="hover"
              color="inherit"
              href="mailto:rikka9816@gmail.com"
              rel="noopener"
            >
              Contact
            </Link>
          </Breadcrumbs>
        </div>
      </Grid>
      <Grid
        style={{ height: "85%", width: "100%", backgroundColor: "#f2fbff" }}
      >
        <div
          className="introduction"
          style={{
            paddingLeft: "50px",
            paddingTop: "50px",
            width: "45%",
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              variant="h6"
              component="div"
              style={{ color: "#424242" }}
            >
              Open-source website builder powered by craft.js
            </Typography>
            <Typography
              sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
              variant="h3"
              component="div"
              style={{ color: "#424242" }}
            >
              An extensible, light-weighted lowcode website builder
            </Typography>
            <List style={{ paddingLeft: "20px" }}>
              <ListItem>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Quickly build Website with ready React-powered widgets"
                  style={{ color: "#424242" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Customize and extend functionality with code"
                  style={{ color: "#424242" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText
                  primary="open-source that allows developer to extend their own widget"
                  style={{ color: "#424242" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AutoModeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Structured database for saving your website and auto-loading feature for website for users"
                  style={{ color: "#424242" }}
                />
              </ListItem>
            </List>
            <Divider color="#e0e0e0"></Divider>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              variant="subtitle1"
              component="div"
              style={{ color: "#424242" }}
            >
              login with google:
            </Typography>
            <div
              className="google-login"
              style={{ position: "relative", top: "-50px", left: "145px" }}
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  //handleOpen();
                  //loginProcess(credentialResponse.credential);
                  loginProcessDotnet(credentialResponse.credential);
                }}
                type="icon"
                shape="circle"
              />
            </div>
          </Grid>
        </div>

        <img
          src={homeLogo}
          style={{
            height: "550px",
            width: "700px",
            position: "absolute",
            right: "50px",
            top: "150px",
          }}
        ></img>
      </Grid>
      <Grid
        sx={{
          borderTop: 1,
          borderColor: "grey.300",
          height: "100%",
          overflow: "auto",
        }}
        style={{ height: "5%" }}
      >
      </Grid>
    </div>
  );
};
