import React from "react";
import { ListItem, Drawer, ListItemText, ListItemIcon, useTheme, makeStyles, Divider, IconButton, List } from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
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
          <ListItem button key={"chart"}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText>Timeseries</ListItemText>
          </ListItem>
          <ListItem button key={"analysis"}>
            <ListItemIcon>
              <BubbleChartIcon />
            </ListItemIcon>
            <ListItemText>Analysis</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
