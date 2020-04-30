import React from "react";
import { AppBar, Toolbar, IconButton, Typography, makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  hide: {
    display: "none"
  }
}));

export default function NavBar({ handleOpen, open }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            COVID-19 Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
