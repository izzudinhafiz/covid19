import React from "react";
import TimeSeriesBody from "./TimeSeriesBody";
import AnalysisBody from "./AnalysisBody";
import SketchBody from "./SketchBody";
import { NavBar, SideBar } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
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

        <main style={{ width: "100%" }} onClick={open ? handleDrawerClose : null}>
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path="/covid19" exact component={TimeSeriesBody} />
            <Route path="/covid19/analysis" component={AnalysisBody} />
            <Route path="/covid19/sketch" component={SketchBody} size={100} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
