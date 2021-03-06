import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

// Router Link
import { Link } from 'react-router-dom';

// MUIstyles
import { makeStyles, useTheme } from '@material-ui/core/styles';
//MUIcore
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  ClickAwayListener
} from '@material-ui/core';
//MUIicons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// Images
import logo1 from '../../static/Images/KnowMe-copy.png';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.1) '
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

// FUNCTION ALL COMPONENT
function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(prev => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logoutUser = () => {

    location.href = '/api/logout';
  }

  const renderingContent = () => {
    switch (props.auth) {
      case null:
      case false:
        return (
          <div>
            <MenuList>
              <Divider variant="middle" />

              {/* Links to pages */}
              <MenuItem component={Link} to="/" onClick={handleDrawerClose}>
                Home
              </MenuItem>
            </MenuList>
            <MenuList>
              <MenuItem
                component={Link}
                to="/register"
                onClick={handleDrawerClose}
              >
                Sign Up
              </MenuItem>
            </MenuList>
            <MenuList>
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleDrawerClose}
              >
                Login
              </MenuItem>
            </MenuList>

            <MenuList>
              <MenuItem
                component={Link}
                to="/guidelines"
                onClick={handleDrawerClose}
              >
                Guidelines
              </MenuItem>
            </MenuList>
          </div>
        );
      default:
        return (
          <div>
            <MenuList>
              <Divider variant="middle" />

              {/* Links to pages */}
              <MenuItem component={Link} to="/" onClick={handleDrawerClose}>
                Home
              </MenuItem>
            </MenuList>
            <MenuList>
              <MenuItem
                component={Link}
                to="/register"
                onClick={handleDrawerClose}
              >
                Sign Up
              </MenuItem>
            </MenuList>
            <MenuList>
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleDrawerClose}
              >
                Login
              </MenuItem>
            </MenuList>

            <MenuList>
              <MenuItem
                component={Link}
                to="/guidelines"
                onClick={handleDrawerClose}
              >
                Guidelines
              </MenuItem>
            </MenuList>
            <MenuList>
              <MenuItem onClick={handleDrawerClose, logoutUser}>
                Log Out
              </MenuItem>
            </MenuList>
          </div>
        );
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </ClickAwayListener>
      </AppBar>
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
          <img src={logo1} alt="logo1" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        {/* Side Item List */}
        {renderingContent()}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      />
    </div>
  );
}
function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(PersistentDrawerLeft);
