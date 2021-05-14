import React from 'react'
import { withCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import { SiApplemusic } from 'react-icons/si';
import { FiLogOut } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
}));

const NavBar = (props) => {
    const classes = useStyles();

    const Logout = () =>  {
        props.cookies.remove('jwt-token');
        window.location.href = '/';
    }

    return (
        <div>
        <AppBar position="static">
            <Toolbar>

                <button className="logo">
                <SiApplemusic/>
                </button>
                <Typography variant="h5" className={classes.title}>Lesson Review App</Typography>

                <button className="logout" onClick={()=>Logout()}>
                <FiLogOut/>
                </button>

            </Toolbar>
        </AppBar>
        </div>
    )
}

export default withCookies(NavBar)
