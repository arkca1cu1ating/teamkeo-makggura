const firebaseConfig = {
  apiKey: "AIzaSyAIl6sNYPBSVnfyug6GXFF9SafgieqdXSE",
  authDomain: "teamkeo-makggura.firebaseapp.com",
  projectId: "teamkeo-makggura",
  storageBucket: "teamkeo-makggura.firebasestorage.app",
  messagingSenderId: "551695182532",
  appId: "1:551695182532:web:da21a42d3cc733344c7791",
  measurementId: "G-EXBW43DLT9"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentRoom = null;

function joinRoom() {
  const room = document.getElementById('room').value;
  if (!room) return;

  currentRoom = room;
  document.getElementById('app').style.display = 'block';
  document.getElementById('roomDisplay').innerText = 'Room: ' + room;

  const ref = db.ref('rooms/' + room);

  ref.on('value', (snapshot) => {
    const data = snapshot.val();
    const state = data?.state || false;
    updateUI(state);
  });

  document.getElementById('toggle').onclick = () => {
    ref.once('value').then(snap => {
      const current = snap.val()?.state || false;
      ref.set({ state: !current });
    });
  };
}

function createRoom() {
  const key = Math.random().toString(36).substring(2, 8);
  document.getElementById('room').value = key;
  joinRoom();
}

function updateUI(state) {
  const btn = document.getElementById('toggle');
  btn.innerText = state ? 'ON' : 'OFF';
  btn.style.background = state ? '#4CAF50' : '#999';
}
