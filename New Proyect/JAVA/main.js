//console.log("AgoraRTM:", AgoraRTM);

//uuid
function uuid() {
  var ret = "",
    value;
  for (var i = 0; i < 32; i++) {
    value = (Math.random() * 16) | 0;
    // Insert the hypens
    if (i > 4 && i < 21 && !(i % 4)) {
      ret += "-";
    }
    // Add the next random character
    ret += (i === 12 ? 4 : i === 16 ? (value & 3) | 8 : value).toString(16);
  }
  return ret;
}

//agora.io
const APP_ID = "88c51109f43d4e018557e060cc20601e";
//

let token = null;
//let uid = "01b5ee24-6ba3-4b42-8aaa-7cb94d3decb7";
let uid = uuid();

let client;
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
  client = AgoraRTM.createInstance(APP_ID, { enableLogUpload: false }); // Pass your App ID here.

  await client.login({ uid, token });

  //index.html?roomid=###
  channel = client.createChannel("main");
  await channel.join();

  channel.on("MemberJoined", handleUserJoined);

  client.on("MessageFromPeer", handleMessageFromPeer);

  /*

  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  client.init(APP_ID, function () {
    console.log("AgoraRTC client initialized");
  });
  */
  /*
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
};

let handleUserJoined = async (MemberId) => {
  console.log("New User Joined:", MemberId);
  createOffer(MemberId);
};

let handleMessageFromPeer = async (Message, MemberId) => {
  console.log("Message :", Message.text);
};

let createOffer = async (MemberId) => {
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

  client.sendMessageToPeer({ text: "Hey !!!" }, MemberId);

  console.log("offer", offer);
};

init();
