// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9ZPEiBAO9kXXqF3U4ll_oo-MNYWTjvCA",
  authDomain: "todo-app2-a2c31.firebaseapp.com",
  projectId: "todo-app2-a2c31",
  storageBucket: "todo-app2-a2c31.appspot.com",
  messagingSenderId: "217891272643",
  appId: "1:217891272643:web:f3f65b03c4ec37004daf76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const signOut = signOut();
const database = getDatabase();

var email = document.getElementById("email");
var password = document.getElementById("password");

const checkCurrentUser = localStorage.getItem("currentUser") ? true : false;

console.log(window.location.pathname);

if (
  (window.location.pathname === "/" && checkCurrentUser) ||
  (window.location.pathname === "/signup.html" && checkCurrentUser)
) {
  window.location = "todoapp.html";
} else if (window.location.pathname === "/todoapp.html" && !checkCurrentUser) {
  window.location = "/";
}

// checkCurrentUser? window.location = "todoapp.html" : window.location = "./"

console.log("user", checkCurrentUser);

window.signUp = function () {
  var users = {
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, users.email, users.password)
    .then((userCredential) => {
      const user = userCredential.user;
      // --------------------------------------------------------------------
      const keyRef0 = ref(database, "Users/");
      user.id = push(keyRef0).key;

      const taskReference = ref(database, `Users/${user.id}`);

      set(taskReference, user.uid);
      localStorage.setItem("currentUser", user.uid);

      // ------------------------------------------------------------------------

      alert("User Created successfuly");
      window.location = "todoapp.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

var currentUser;
window.signIn = function () {
  var users = {
    email: email.value,
    password: password.value,
  };
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location = "todoapp.html";
      //  ------------------------------------
      currentUser = user.uid;

      localStorage.setItem("currentUser", currentUser);

      // --------------------------------------
    })
    .catch((error) => {
      console.log(error);

      const errorCode = error.code;
      const errorMessage = error.message;

      alert(
        errorMessage.includes("email")
          ? "Please Enter correct email"
          : errorMessage.includes("password")
          ? "you have entered incorrect password"
          : errorMessage
      );
    });
};

window.addTodo = function () {
  var input=document.getElementById("input").value
  var parent=document.getElementById("parent")
  parent.innerHTML+=`<ul><li>${input}</li></ul>`
  const user = auth.currentUser;
  var task={
      task:input,
      userId : user.uid
  }
  
  console.log(user);
  
  const keyRef = ref(database,"task/")
      task.id=push(keyRef).key;
      
        const taskReference = ref(database,`Users/${user.uid}/tasks/${task.id}`)
  
        set(taskReference,task)
};
window.getData=function(){


  var parent=document.getElementById("parent")
    const ref2=ref(database,"Users/")
    onValue(ref2,function(x){

    var data=x.val();

    data && 

      Object?.values(data)?.map(({tasks})=>{
        tasks &&
        Object?.values(tasks)?.map((eachTask)=>{
  parent.innerHTML+=`<li>${eachTask.task}</li>`

            console.log(eachTask.task);
          })
        })
        // for(let i in data){
    //   console.log(data[i])
    // }
    



    })
    
}