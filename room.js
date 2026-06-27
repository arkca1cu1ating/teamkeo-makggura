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

const params = new URLSearchParams(location.search);
const roomCode = params.get('room');
const myRole = params.get('role');

let roomRef = null;

if (!roomCode || !myRole || (myRole !== 'p1' && myRole !== 'p2')) {
  alert('잘못된 접근입니다. 방 만들기 화면으로 돌아갑니다.');
  location.href = 'index.html';
} else {
  roomRef = db.ref('rooms/' + roomCode);

  document.getElementById('roomText').innerText = 'Room Code: ' + roomCode;
  document.getElementById('roleText').innerText = myRole === 'p1' ? '내 역할: 1P' : '내 역할: 2P';

  roomRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      alert('방이 존재하지 않습니다.');
      location.href = 'index.html';
      return;
    }

    updateUI(data.buttons || {});
  });
}

function toggleButton(buttonKey) {
  if (!roomRef) return;

  const buttonRef = roomRef.child('buttons/' + buttonKey);

  buttonRef.once('value').then((snapshot) => {
    const currentData = snapshot.val() || { on: false, owner: null };
    const isOn = !!currentData.on;
    const owner = currentData.owner || null;

    // OFF 상태면 누구든 ON 가능. 이때 ON 시킨 사람이 owner가 됨.
    if (!isOn) {
      buttonRef.set({
        on: true,
        owner: myRole
      });
      return;
    }

    // ON 상태면 ON 시킨 사람만 OFF 가능.
    if (owner === myRole) {
      buttonRef.set({
        on: false,
        owner: null
      });
      return;
    }

    const ownerText = owner === 'p1' ? '1P' : '2P';
    alert(ownerText + '가 ON으로 바꾼 버튼이라 OFF로 바꿀 수 없습니다.');
  });
}

function updateUI(buttons) {
  updateButton('btnA', 'A', buttons.A || { on: false, owner: null });
  updateButton('btnB', 'B', buttons.B || { on: false, owner: null });
}

function updateButton(elementId, label, data) {
  const btn = document.getElementById(elementId);
  const isOn = !!data.on;
  const owner = data.owner;

  let text = label + (isOn ? ' ON' : ' OFF');
  if (isOn && owner) {
    text += owner === 'p1' ? ' / 1P' : ' / 2P';
  }

  btn.innerText = text;
  btn.style.background = isOn ? '#4CAF50' : '#999';
}
