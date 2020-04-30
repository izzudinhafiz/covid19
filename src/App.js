import React from "react";
import AppBody from "./AppBody";
import { NavBar, SideBar } from "./components";

import clsx from "clsx";
import { makeStyles, useTheme, CssBaseline } from "@material-ui/core";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },

  content: {
    flexGrow: 1,
    padding: "1px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar handleOpen={handleDrawerOpen} handleClose={handleDrawerClose} open={open} />
      <SideBar handleOpen={handleDrawerOpen} handleClose={handleDrawerClose} open={open} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
        onClick={open ? handleDrawerClose : null}
      >
        <div className={classes.drawerHeader} />
        <AppBody />
      </main>
    </div>
  );
}

export default App;
