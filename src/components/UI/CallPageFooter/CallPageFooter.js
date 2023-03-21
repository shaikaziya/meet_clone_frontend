import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faMicrophone,
    faPhone,
    faMicrophoneSlash,
    faLaptop,
    faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./CallPageFooter.scss";
import { formatDate } from "./../../../utils/helpers";
import { useEffect, useState } from "react";

const CallPageFooter = ({ isPresenting, stopScreenShare, screenShare, isAudio, toggleAudio, isVideo, toggleVideo, disconnectCall, roomId }) => {
    let interval = null;
    const [currentTime, setCurrentTime] = useState(() => { return formatDate(); });

    useEffect(() => {
        interval = setInterval(() => setCurrentTime(formatDate()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="footer-item">
            <div className="left-item">
                <div className="icon-block">
                    {currentTime} &nbsp;&nbsp; | &nbsp;&nbsp; {roomId}
                </div>
            </div>
            <div className="center-item">
                <div
                    className={`icon-block ${!isAudio ? "red-bg" : null}`}
                    onClick={() => toggleAudio(!isAudio)}
                >
                    <FontAwesomeIcon
                        className="icon"
                        icon={isAudio ? faMicrophone : faMicrophoneSlash}
                    />
                </div>
                <div className="icon-block red-bg" onClick={disconnectCall}>
                    <FontAwesomeIcon className="icon phone-red" icon={faPhone} />
                </div>
                <div className={`icon-block ${!isVideo ? "red-bg" : null}`}>
                    <FontAwesomeIcon className="icon" icon={isVideo ? faVideo : faVideoSlash} onClick={() => toggleVideo(!isVideo)} />
                </div>
                <div className="icon-block">
                    {isPresenting ? (
                        <FontAwesomeIcon className="icon" icon={faLaptop} onClick={stopScreenShare} />
                    ) : (
                        <FontAwesomeIcon className="icon" icon={faLaptop} onClick={screenShare} />
                    )}
                </div>
            </div>
            <div className="right-item">

            </div>
        </div>
    );
};

export default CallPageFooter;