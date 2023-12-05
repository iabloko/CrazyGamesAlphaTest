var _lastRequestNumber = 0;
var _currentRequestNumber = 0;
var parser;
var result;
var basedEventProperty;
var errorProperty;
var deviceProperty;
var progressProperty;
var normalProperty;
var indexedDB_Available;
function sendEvent(eventName, eventProperty) {
	console.log("sendEvent: " + eventName);
	var requestNumber = _currentRequestNumber++;
	sendEventLogic(eventName, requestNumber, eventProperty);
}

function sendEventLogic(eventName, requestNumber, eventProperty){
	if (clientId !== "") {
		if (_lastRequestNumber !== requestNumber){
			setTimeout(function() {
				sendEventLogic(eventName, requestNumber, eventProperty);
			}, 100);
		} else {
			var myBody =
				{
					"events":[
						{
							// "user_properties":{
							// "Server":"Prod",
							// "Fullscreen":false,
							// "ProcessorsCount":16,
							// "VideoCard":"NVIDIA GeForce GTX 1650",
							// "Min_RAM":16.0,
							// "Browser":null,
							// "Link_Open":"editor_MegaMod",
							// "Room_ID":"SERVER-EDITOR_ROOM_0001",
							// "Player_ID":"e6ba93c2-9534-4e6f-8d4f-2a864bef91c1",
							// "Player_Name":"",
							// "Skin_ID":null,
							// "Login_Method":"No Authorized",
							// "Email":"No Authorized"
							// },
							// "insert_id":"638179608219672505_-417362788",

							"event_properties": eventProperty || {},
							"session_id": currentSessionId,
							"user_id": clientId,
							"app_version": app_version,
							"platform":"HTML",
							"event_type": eventName,
						}
					]
				}

			// fetch('https://better-space-api.herokuapp.com/api/game/httpApi', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Accept': '*/*',
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify(myBody)
			// })
			// 	.then(response => _lastRequestNumber++)
			// 	.then(response => console.log("event successfully sent: " + eventName));

		}
	}

	else {
		setTimeout(function() {
			sendEventLogic(eventName, requestNumber, eventProperty);
		}, 100);
	}
}

function initializeBasedEventProperty() {
	parser = new UAParser(navigator.userAgent);
	result = parser.getResult();
	console.log("Result: " + result);

	return {
		"Browser": result && result.browser ? result.browser.name : "unknown",
		"Browser_Version": result && result.browser ? result.browser.version : "unknown",
		"Operating_System": result && result.os ? result.os.name : "unknown",
		"Operating_System_Version": result && result.os ? result.os.version : "unknown",
		"WebGL_Available": !!(window.WebGLRenderingContext && (document.createElement("canvas").getContext("webgl") || document.createElement("canvas").getContext("experimental-webgl"))),
		"WebGL_Version": (document.createElement("canvas").getContext("webgl2") !== null) ? 'WebGL2' : 'WebGL1',
		"IndexedDB_Available": indexedDB_Available,
		"DeviceType": deviceProperty,
	};
}
