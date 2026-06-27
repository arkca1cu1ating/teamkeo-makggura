const firebaseConfig = {
  apiKey: "AIzaSyAIl6sNYPBSVnfyug6GXFF9SafgieqdXSE",
  authDomain: "teamkeo-makggura.firebaseapp.com",
  databaseURL: "https://teamkeo-makggura-default-rtdb.firebaseio.com/",
  projectId: "teamkeo-makggura",
  storageBucket: "teamkeo-makggura.firebasestorage.app",
  messagingSenderId: "551695182532",
  appId: "1:551695182532:web:da21a42d3cc733344c7791",
  measurementId: "G-EXBW43DLT9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function makeRoomCode() {
  return Math.random().toString(36).substring(2, 8);
}

function createRoom() {
  const roomCode = makeRoomCode();
  const roomRef = db.ref('rooms/' + roomCode);

  roomRef.set({
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    players: {
      p1: true,
      p2: false
    },
    buttons: {
      A: { on: false, owner: null },
      B: { on: false, owner: null }
    }
  }).then(() => {
    location.href = 'room.html?room=' + encodeURIComponent(roomCode) + '&role=p1';
  }).catch((error) => {
    alert('방 생성 실패: ' + error.message);
  });
}

function joinRoom() {
  const roomCode = document.getElementById('roomInput').value.trim();
  if (!roomCode) {
    alert('Room Code를 입력해주세요.');
    return;
  }

  const roomRef = db.ref('rooms/' + roomCode);
  roomRef.once('value').then((snapshot) => {
    if (!snapshot.exists()) {
      alert('존재하지 않는 방 코드입니다.');
      return;
    }

    roomRef.child('players/p2').set(true).then(() => {
      location.href = 'room.html?room=' + encodeURIComponent(roomCode) + '&role=p2';
    });
  }).catch((error) => {
    alert('입장 실패: ' + error.message);
  });
}
