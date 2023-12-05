const channel = new BroadcastChannel('app-data');
var token = GetToken();
channel.postMessage(token);
// window.unityInstance.SendMessage("XsollaAuthProvider", "XsollaAuthProvider_BabkaAuthTokenGot", code);
//console.log("token: " + token);
window.close();

function GetToken(){
	const params = new URLSearchParams(window.location.search);
	if (params.has("token")){
		return params.get("token");
	}
	return null;
}
