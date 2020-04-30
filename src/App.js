import React from "react";
import TimeSeriesBody from "./TimeSeriesBody";
import AnalysisBody from "./AnalysisBody";
import { NavBar, SideBar } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, CssBaseline } from "@material-ui/core";

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
    })
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
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar handleOpen={handleDrawerOpen} handleClose={handleDrawerClose} open={open} />
        <SideBar handleOpen={handleDrawerOpen} handleClose={handleDrawerClose} open={open} />

        <main className={clsx(classes.content)} onClick={open ? handleDrawerClose : null}>
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path="/covid19" exact component={TimeSeriesBody} />
            <Route path="/covid19/analysis" component={AnalysisBody} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
