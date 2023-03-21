import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import "./HomePage.scss";
import Header from "../UI/Header/Header";
import { useState } from "react";

const HomePage = () => {
    const navigate = useNavigate();
    const [meetingLink, setMeetingLink] = useState("");

    const startCall = () => {
        const uid = shortid.generate();
        navigate(`/login?redirect=/${uid}#init`);
    };

    const joinCall = () => {
        window.location.replace(meetingLink)
    };

    return (
        <div className="home-page">
            <Header />
            <div className="body">
                <div className="left-side">
                    <div className="content">
                        <h2>Premium video meetings. Now free for everyone.</h2>
                        <p>
                            We re-engineered the service we built for secure business
                            meetings, Google Meet, to make it free and available for all.
                        </p>
                        <div className="action-btn">
                            <button className="btn green" onClick={startCall}>
                                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                                New Meeting
                            </button>
                            <div className="input-block">
                                <div className="input-section">
                                    <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                                    <input placeholder="Enter a code or link" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
                                </div>
                                <button className="btn no-bg" onClick={joinCall}>Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="help-text">
                        <a href="https://support.google.com/meet/?hl=en#topic=7306097" target="_blank" rel="noreferrer">Learn more</a> about Google Meet
                    </div>
                </div>
                <div className="right-side">
                    <div className="content">
                        <img src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg" alt="meeting" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;