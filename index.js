const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function createRoom(){
 let code=Math.random().toString(36).substring(2,8);
 db.ref('rooms/'+code).set({
  p1:{name:"",img:""},
  p2:{name:"",img:""},
  win:null,
  ready:{p1:false,p2:false}
 });
 location.href='room.html?room='+code+'&role=p1';
}

function joinRoom(){
 let code=document.getElementById('code').value;
 location.href='room.html?room='+code+'&role=p2';
}