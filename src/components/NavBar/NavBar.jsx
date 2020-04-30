import React from "react";
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  navLink: {
    textDecoration: "none",
    color: "inherit"
  }
}));

export default function NavBar({ handleOpen }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleOpen} edge="start" className={clsx(classes.menuButton)}>
            <MenuIcon />
          </IconButton>
          <Link className={classes.navLink} to="/covid19">
            <Typography variant="h6" noWrap>
              COVID-19 Tracker
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
