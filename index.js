const firebaseConfig = {
  apiKey: "AIzaSyAIl6sNYPBSVnfyug6GXFF9SafgieqdXSE",
  authDomain: "teamkeo-makggura.firebaseapp.com",
  databaseURL: "https://teamkeo-makggura-default-rtdb.firebaseio.com/",
  projectId: "teamkeo-makggura"
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
