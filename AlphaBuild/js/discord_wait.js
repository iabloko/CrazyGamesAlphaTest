const channel = new BroadcastChannel('app-data');
var code = GetCode();
channel.postMessage(code);
window.close();

function GetCode(){
	const params = new URLSearchParams(window.location.search);
	if (params.has("code")){
		return params.get("code");
	}
	return null;
}
