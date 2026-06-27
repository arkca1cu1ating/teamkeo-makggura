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

let currentRoom = null;
let myRole = null;
let roomRef = null;

function createRoom() {
  const key = Math.random().toString(36).substring(2, 8);
  document.getElementById('room').value = key;
}

function joinRoom(role) {
  const room = document.getElementById('room').value.trim();
  if (!room) {
    alert('Room Key를 먼저 입력하거나 방 생성을 눌러주세요.');
    return;
  }

  currentRoom = room;
  myRole = role;
  roomRef = db.ref('rooms/' + currentRoom);

  document.getElementById('app').style.display = 'block';
  document.getElementById('roomDisplay').innerText = 'Room: ' + currentRoom;
  document.getElementById('myRoleText').innerText = myRole === 'p1' ? '나는 1P입니다.' : '나는 2P입니다.';

  // 기존 리스너 중복 방지
  roomRef.off();

  // 두 사람 모두 같은 방의 p1/p2 상태를 실시간으로 봄
  roomRef.on('value', (snapshot) => {
    const data = snapshot.val() || {};
    updateUI(data);
  });

  setupButtonPermissions();
}

function setupButtonPermissions() {
  const p1Btn = document.getElementById('p1Btn');
  const p2Btn = document.getElementById('p2Btn');

  // 1P로 입장한 사람은 1P만 조작 가능
  p1Btn.disabled = myRole !== 'p1';
  p2Btn.disabled = myRole !== 'p2';

  p1Btn.onclick = () => {
    if (myRole !== 'p1') return;
    togglePlayer('p1');
  };

  p2Btn.onclick = () => {
    if (myRole !== 'p2') return;
    togglePlayer('p2');
  };
}

function togglePlayer(playerKey) {
  if (!roomRef) return;

  roomRef.child(playerKey).once('value').then((snap) => {
    const current = snap.val() || false;
    const updateData = {};
    updateData[playerKey] = !current;
    roomRef.update(updateData);
  });
}

function updateUI(data) {
  const p1State = data.p1 || false;
  const p2State = data.p2 || false;

  updateButton('p1Btn', '1P', p1State);
  updateButton('p2Btn', '2P', p2State);
}

function updateButton(buttonId, label, state) {
  const btn = document.getElementById(buttonId);
  btn.innerText = state ? label + ' ON' : label + ' OFF';
  btn.style.background = state ? '#4CAF50' : '#999';
}
