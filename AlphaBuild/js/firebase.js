	/* <script type="module">
   // Import the functions you need from the SDKs you need 
	 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"; 
	 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js"; 
	 import { getAuth  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"; 
	 import { getFirestore  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"; 
	 import { getStorage  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"; 
	 import { getDatabase  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"; 
   // TODO: Add SDKs for Firebase products that you want to use 
   // https://firebase.google.com/docs/web/setup#available-libraries 

   // Your web app's Firebase configuration 
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional 
   const firebaseConfig = { 
     apiKey: "AIzaSyD4BqWA-euwGXZTMv89Vxu-6GAVDa2Ye_8", 
     authDomain: "stickman-workout.firebaseapp.com", 
     databaseURL: "https://stickman-workout.firebaseio.com", 
     projectId: "stickman-workout", 
     storageBucket: "stickman-workout.appspot.com", 
     messagingSenderId: "153867387756", 
     appId: "1:153867387756:web:87886d9306a0f288612949", 
     measurementId: "G-DBJ10Q44XG" 
   }; 

   // Initialize Firebase 
   const app = initializeApp(firebaseConfig); 
   const analytics = getAnalytics(app); 
   const auth = getAuth(app); 
   const firestore = getFirestore(app); 
   const storage = getStorage(app); 
   const database = getDatabasegetDatabase(app); 
 </script> */

function firebaseInit() {
  /* Your web app's Firebase configuration */
  /* For Firebase JS SDK v7.20.0 and later, measurementId is optional */
  const firebaseConfig = {
	apiKey: "AIzaSyDITR8RlYZrzzew78V69hTQntk9oKXT4wg",
	authDomain: "dev-blocks-ee2af.firebaseapp.com",
	databaseURL: "https://dev-blocks-ee2af-default-rtdb.firebaseio.com",
	projectId: "dev-blocks-ee2af",
	storageBucket: "dev-blocks-ee2af.appspot.com",
	messagingSenderId: "132218426245",
	appId: "1:132218426245:web:d1d9adb090e15506242aec"
  };

  /* // Initialize Firebase */ 
  const firebaseApp   = firebase.initializeApp(firebaseConfig);
  //const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
}
	
function getPersistanceType(persistanceType) {
	switch (persistanceType)
	{
		case 0: return firebase.auth.Auth.Persistence.LOCAL;
		case 1: return firebase.auth.Auth.Persistence.SESSION;
		case 2: return firebase.auth.Auth.Persistence.NONE;
		default: return firebase.auth.Auth.Persistence.LOCAL;
	}
}
