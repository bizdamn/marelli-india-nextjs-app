import React, { useState, useContext } from "react";
import Link from 'next/link'
import Image from 'next/image'
import {
  AppBar,
  Grid,
  Box,
  Toolbar,
  IconButton,
  Menu,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Button } from "../Wrappers";
import { DataStore } from '../../../utils/DataStore';
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../utils/LayoutContext";


export default function Header(props) {
  const { state,dispatch } = useContext(DataStore);
  const { userInfo } = state;
  var classes = useStyles();
  const router = useRouter();
  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local

  var [profileMenu, setProfileMenu] = useState(null);

  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    router.push('/login');
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Grid justifyContent='center' alignItems='center' container>
          <Grid item xs={2}>
            <Image style={{ marginLeft: '2rem' }} width={100} src="./logo.svg" alt="" />
          </Grid>
          <Grid item  xs={8}>
            <Box>
            <Typography
              variant="h4"
              align="center"
              className='appbar-title'
            >
              SMART  TEMPERATURE  & HUMIDITY MONITORING SYSTEM
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
          <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          
            <Image width={70}  src="./client-logo.png" alt="" />
            </IconButton>
          </Grid>
        </Grid>

     
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
          <Typography variant="h4" weight="medium">
              {userInfo ? (
                <>  {userInfo.name}</>
              ) : (<></>)}
            </Typography>
          <Typography variant="p" weight="medium">
              {userInfo ? (
                <>Role: &nbsp;&nbsp;  {userInfo.isAdmin?(<>Admin</>):(<>User</>)}</>
              ) : (<></>)}
            </Typography>
      
          </div>


          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => logoutClickHandler()}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
