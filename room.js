const params=new URLSearchParams(location.search);
const room=params.get('room');
const role=params.get('role');

const firebaseConfig={apiKey:"YOUR_KEY",authDomain:"YOUR_DOMAIN",databaseURL:"YOUR_DB_URL",projectId:"YOUR_PROJECT_ID"};
firebase.initializeApp(firebaseConfig);
const db=firebase.database();
document.getElementById('room').innerText="Room:"+room;

function select(r){
 db.ref('rooms/'+room+'/win').set({role:role,result:r});
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