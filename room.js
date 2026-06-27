const firebaseConfig = {
  apiKey: "AIzaSyAIl6sNYPBSVnfyug6GXFF9SafgieqdXSE",
  authDomain: "teamkeo-makggura.firebaseapp.com",
  databaseURL: "https://teamkeo-makggura-default-rtdb.firebaseio.com/",
  projectId: "teamkeo-makggura"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const params=new URLSearchParams(location.search);
const room=params.get('room');
const role=params.get('role');

document.getElementById('room').innerText="Room:"+room;

function select(r){
 db.ref('rooms/'+room+'/result').set({role:role,result:r});
}

function agree(){
 db.ref('rooms/'+room+'/ready/'+role).set(true);
 db.ref('rooms/'+room+'/ready').once('value').then(s=>{
  let d=s.val();
  if(d.p1&&d.p2){
   location.href='log.html?room='+room;
  }
 });
}
