import { useEffect, useReducer, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import "./CallPage.scss";
import Messenger from "./../UI/Messenger/Messenger";
import MessageListReducer from "../../reducers/MessageListReducer";
import Alert from "../UI/Alert/Alert";
import MeetingInfo from "../UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import axios from "axios";
import { api_url } from "../../utils/api";

var peer = null;
const initialState = [];

const CallPage = () => {
    const navigate = useNavigate();
    let { roomId } = useParams();
    const isAdmin = window.location.hash === "#init" ? true : false;
    const url = `${window.location.origin}${window.location.pathname}`;
    // let alertTimeout = null;
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const peerInstance = useRef(null);

    const [messageList, messageListReducer] = useReducer(
        MessageListReducer,
        initialState
    );

    const [streamObj, setStreamObj] = useState();
    const [screenCastStream, setScreenCastStream] = useState();
    const [meetInfoPopup, setMeetInfoPopup] = useState(false);
    const [isPresenting, setIsPresenting] = useState(false);
    const [isMessenger, setIsMessenger] = useState(false);
    const [messageAlert, setMessageAlert] = useState({});
    const [isAudio, setIsAudio] = useState(true);
    const [isVideo, setIsVideo] = useState(true);

    useEffect(() => {
        if (isAdmin) {
            setMeetInfoPopup(true);
        }
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        peer = new Peer();
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            setStreamObj(mediaStream);
            myVideo.current.srcObject = mediaStream;
        });

        peer.on('open', async (id) => {
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                setStreamObj(mediaStream);
                myVideo.current.srcObject = mediaStream;
            });
            let payload = {
                id: roomId,
                peerId: id
            };
            await axios.post(`${api_url}/api/meeting/create`, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

        })

        peer.on('call', (call) => {
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                myVideo.current.srcObject = mediaStream;
                call.answer(mediaStream);
                call.on('stream', function (remoteStream) {
                    userVideo.current.srcObject = remoteStream

                });
            });
        })

        peerInstance.current = peer;

        if (!isAdmin) {
            getRecieverCode();
        }
        // eslint-disable-next-line
    }, []);

    const getRecieverCode = async () => {
        const { data } = await axios.get(`${api_url}/api/meeting/${roomId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (data) {
            var remotePeerId = data.peerId;
            call(remotePeerId);
        }
    };

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (mediaStream) => {

            myVideo.current.srcObject = mediaStream;
            const call = peerInstance.current.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream) => {
                userVideo.current.srcObject = remoteStream;
            });
        });
    }

    const sendMsg = (msg) => {
        peer.send(msg);
        messageListReducer({
            type: "addMessage",
            payload: {
                user: "you",
                msg: msg,
                time: Date.now(),
            },
        });
    };

    const screenShare = () => {
        navigator.mediaDevices
            .getDisplayMedia({ video: true, cursor: true })
            .then((screenStream) => {
                // peer.replaceTrack(screenCastStream);
                peer.call(roomId, screenCastStream)
                setScreenCastStream(screenStream);
                setIsPresenting(true);
            });
    };

    const stopScreenShare = () => {
        screenCastStream.getVideoTracks().forEach(function (track) {
            track.stop();
        });
        peer.replaceTrack(
            screenCastStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
        );
        setIsPresenting(false);
    };

    const toggleAudio = (value) => {
        streamObj.getAudioTracks()[0].enabled = value;
        setIsAudio(value);
    };

    const toggleVideo = (value) => {
        streamObj.getVideoTracks()[0].enabled = value;
        setIsVideo(value);
    };

    const disconnectCall = () => {
        peer.destroy();
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="callpage-container">
            <video id="video-1" ref={myVideo} autoPlay></video>
            <video id="video-2" ref={userVideo} autoPlay></video>
            <CallPageFooter
                isPresenting={isPresenting}
                stopScreenShare={stopScreenShare}
                screenShare={screenShare}
                isAudio={isAudio}
                isVideo={isVideo}
                toggleAudio={toggleAudio}
                toggleVideo={toggleVideo}
                disconnectCall={disconnectCall}
                roomId={roomId}
            />
            {isAdmin && meetInfoPopup && (
                <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
            )}
            {isMessenger ? (
                <Messenger
                    setIsMessenger={setIsMessenger}
                    sendMsg={sendMsg}
                    messageList={messageList}
                />
            ) : (
                messageAlert.isPopup && <Alert messageAlert={messageAlert} />
            )}
        </div>
    );
};
export default CallPage;