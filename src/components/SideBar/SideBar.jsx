import React from "react";
import { ListItem, Drawer, ListItemText, ListItemIcon, useTheme, makeStyles, Divider, IconButton, List } from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 0,
    flexShrink: 0
  },

  drawerPaper: {
    width: drawerWidth
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },

  navLink: {
    textDecoration: "none",
    color: "inherit"
  }
}));

export default function SideBar({ handleClose, open }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </div>
        <Divider />
        <List>
          <Link className={classes.navLink} onClick={handleClose} to="/covid19">
            <ListItem button key={"chart"}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText>Timeseries</ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.navLink} onClick={handleClose} to="/covid19/analysis">
            <ListItem button key={"analysis"}>
              <ListItemIcon>
                <BubbleChartIcon />
              </ListItemIcon>
              <ListItemText>Analysis</ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.navLink} onClick={handleClose} to="/covid19/sketch">
            <ListItem button key={"analysis"}>
              <ListItemIcon>
                <BubbleChartIcon />
              </ListItemIcon>
              <ListItemText>Sketch</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
