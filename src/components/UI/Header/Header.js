import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';
import { useNavigate } from "react-router-dom";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import moment from 'moment';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleProfile = () => {
        navigate("/profile");
        handleMenuClose();
    }

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        handleMenuClose();
        navigate("/");
    }

    const startCall = () => {
        const uid = shortid.generate();
        navigate(`/login?redirect=/${uid}#init`);
    };


    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="logo" onClick={() => navigate("/")}>
                <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png" alt="google" />
                <span className="help-text">Meet</span>
            </div>
            {userInfo ?
                <div className="user-info">
                    <div className="time me-4">{moment().format('h:mm:ss A • ddd, MMM D')}</div>
                    <Avatar className="me-3" onClick={handleOpenMenu} aria-controls="menu" sx={{ bgcolor: deepPurple[500] }}>{((userInfo.firstName).split(''))[0]}</Avatar>
                </div>
                :
                <div className="action-btn me-4">
                    <button type="button" onClick={() => navigate("/login")} className="btn btn-outline-primary me-3"><FontAwesomeIcon icon={faRightToBracket} />&nbsp;&nbsp;&nbsp;Sign in</button>
                    <button className="btn green" onClick={startCall}>
                        <FontAwesomeIcon className="icon-block" icon={faVideo} />&nbsp;&nbsp;
                        New Meeting
                    </button>
                </div>}
            <Menu id="menu" anchorEl={anchorEl} onClose={handleMenuClose} open={Boolean(anchorEl)}>
                <MenuItem onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> Home</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="medium" className="me-3" />
                    </ListItemIcon>
                    <ListItemText> Profile</ListItemText>

                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};
export default Header;

