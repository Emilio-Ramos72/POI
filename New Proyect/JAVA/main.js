/*

import AgoraRTM from "agora-rtm-sdk";
const client = AgoraRTM.createInstance("demoAppId", { enableLogUpload: false }); // Pass your App ID here.
*/

//agora.io
let APP_ID = "88c51109f43d4e018557e060cc20601e";

let token = null;
let uid = Math.floor(Math.random() * 1000000);

let channel;

let localstream;
let remotestream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

let init = async () => {
  //agora
  /*
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  client.init(APP_ID, function () {
    console.log("AgoraRTC client initialized");
  });
  channel;

  var channelName = "main";

  client.join(
    token,
    channelName,
    uid,
    function (uid) {
      console.log("User " + uid + " joined the channel");
    },
    function (err) {
      console.error("Failed to join the channel", err);
    }
  );

  var localStream = AgoraRTC.createStream({
    audio: true,
    video: false,
  });
  localStream.init(
    function () {
      // La transmisión local está lista para ser enviada
    },
    function (err) {
      console.error("Failed to initialize local stream", err);
    }
  );
  localStream.play("webcamVideo");

  client.publish(localStream, function (err) {
    console.error("Failed to publish local stream", err);
  });
  
  */

  //ask permision

  localstream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  //set local stream

  document.getElementById("webcamVideo").srcObject = localstream;

  createOffer();
};

let handleUserJoined = async (MemberId) => {
  console.log("New User Joined:", MemberId);
};

let createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers);

  //set remote stream
  remotestream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remotestream;

  //get and set tracks
  localstream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localstream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remotestream.addTrack();
    });
  };

  //candidates
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log("New ICE Candidate", event.candidate);
    }
  };

  //offers
  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  console.log("offer", offer);
};

init();
