var clientId = "";
var currentSessionId = -1;
let lastLoggedProgress = 0;
const gaID = 'G-HWSS0NKVPT';

initAnalytics();

function getClientId(callback) {
	console.log('getClientId');

	const savedUuid = localStorage.getItem('userId');

	if (savedUuid !== null) {
		console.log('There is saved client id in local storage: ' + savedUuid);
		callback(savedUuid);
	} else {
		console.log('There is no saved client id in local storage. So try to get it from gtag.');

		var gtagClientId = null;

		gtag('get', gaID, 'client_id',
			function (clientId) {
				gtagClientId = clientId;
				console.log('Client ID from gtag: ' + clientId);
				localStorage.setItem('userId', clientId);
				callback(clientId);
			});

		setTimeout(function () {
			if (gtagClientId !== null) {
				console.log('There is gtag client id: ' + gtagClientId);
			} else {
				const uuid = uuidv4();
				console.log('There is no gtag client id. So generate new and save it: ' + uuid);
				localStorage.setItem('userId', uuid);
				callback(uuid);
			}
		}, 200);
	}
}

function getAndSaveClientId() {
	getClientId((result => {
		clientId = result;
		console.log('getAndSaveClientId callback: ' + result);
	}));
}

// async function getAndSaveClientIdAsync() {
// 	clientId = await getClientIdAsync();
// 	console.log('getAndSaveClientIdAsync: ' + clientId);
// }

// function getSavedClientId() {
// 	return clientId;
// }
//
// function startYandexAnalytics() {
// 	(function (m, e, t, r, i, k, a) {
// 		m[i] = m[i] || function () {
// 			(m[i].a = m[i].a || []).push(arguments)
// 		};
// 		m[i].l = 1 * new Date();
// 		for (var j = 0; j < document.scripts.length; j++) {
// 			if (document.scripts[j].src === r) {
// 				return;
// 			}
// 		}
// 		k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
// 	})
// 	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
//
// 	ym(93348023, "init", {
// 		clickmap: true,
// 		trackLinks: true,
// 		accurateTrackBounce: true,
// 		webvisor: true
// 	});
// }

// function getSessionId() {
// let sessionId = sessionStorage.getItem('sessionId');
// if (!sessionId) {
// sessionId = generateSessionId(); 
// sessionStorage.setItem('sessionId', sessionId); 
// }

// console.log('getSessionId: ' + sessionId);
// return sessionId;
// }

// function getCurrentSessionId() {
// 	console.log('getCurrentSessionId: ' + currentSessionId);
// 	return currentSessionId;
// }

function generateSessionId() {
	var currentDate = new Date().getTime();
	var sessionId = currentDate * 1000000 + Math.floor(Math.random() * 1000000);
	return sessionId;
}

function initAnalytics() {
	console.log("initAnalytics");
	currentSessionId = generateSessionId();

	waitForAnalytics(function () {
		console.log('Google Analytics initialized!');
		getAndSaveClientId();
	});
	
	indexedDB_Available ='indexedDB' in window;
	deviceProperty = detectMobileDevice();
	basedEventProperty = initializeBasedEventProperty();
	sendEvent(Hello_World, basedEventProperty);
}

function waitForAnalytics(callback) {
	console.log("waitForAnalytics");
	if (typeof gtag !== 'undefined') {
		setTimeout(function () {
			callback();
		}, 100);
	} else {
		setTimeout(function () {
			waitForAnalytics(callback);
		}, 100);
	}
}
// function trackProgress(progress) {
// 	const currentProgress = Math.floor(progress * 100);
//
// 	if (currentProgress >= lastLoggedProgress + 50 || currentProgress === 100) {
// 		console.log(`Create_Unity_Instance_Progress: ${currentProgress}%`);
//
// 		progressProperty = {
// 			"Progress": currentProgress,
// 			"IndexedDB_Available": indexedDB_Available,
// 		};
// 		sendEvent(GameProgressEnum.Game_Create_Unity_Instance, progressProperty);
//
// 		lastLoggedProgress = currentProgress;
// 	}
// }
