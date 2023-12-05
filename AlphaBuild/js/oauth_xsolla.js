//const pages = XsollaLogin.WidgetPages;
const xl = initXsolla(getRedirectUri());
var callbackReturned = false;

function initXsolla(redirectUri) {
    var xl = new XsollaLogin.Widget({
      projectId: '6029171b-baee-40f6-969d-ef8ca917ddce',
      preferredLocale: 'en_US',
      clientId: '5909',
      responseType: 'code',
      state: random_hexadecimal(32),
      redirectUri: redirectUri,//'http://127.0.0.1:5500/html/oauth_xsolla_callback.html',
      scope: 'offline',
      // scope: 'email',
    });

    xl.mount('xl_auth');

    let channel = new BroadcastChannel('app-data');
    channel.onmessage = (eventMessage) => {
        console.log('openXsollaLoginWidget onmessage: ' + eventMessage.data);

        if (!callbackReturned) {
            console.log('callback: ' + eventMessage.data);
            callbackReturned = true;
            window.unityInstance.SendMessage("XsollaAuthProvider", "XsollaAuthProvider_BabkaAuthTokenGot", eventMessage.data);
        }
    }

    return xl;
}

function openXsollaLoginLink(link){
    callbackReturned = false;

    var linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.target = '_blank';
    document.body.appendChild(linkElement); // Temporarily add to the DOM
    linkElement.click();
    document.body.removeChild(linkElement); // Clean up afterwards
    //window.open(link, '_blank');
}

function openXsolla() {
    //document.querySelector('#xl_auth').style.display = 'block';
    xl.open();
}

function openXsollaLoginWidget(callback){
    callbackReturned = false;
    let channel = new BroadcastChannel('app-data');
    channel.onmessage = (eventMessage) => {
        console.log('openXsollaLoginWidget onmessage: ' + eventMessage.data);

        if (!callbackReturned) {
            console.log('callback: ' + eventMessage.data);
            callbackReturned = true;
            callback(eventMessage.data);
        }
    }

    var origin = window.location.origin;
    window.open(origin + "/html/oauth_xsolla.html", '_blank');
}

function getRedirectUri(){
    var origin = window.location.origin;
    return origin + "/html/oauth_xsolla_callback.html";
}

function random_hexadecimal(length) {
    var result = '';
    var characters = 'abcdef0123456789';
    var charactersLength = characters.length;
    for (i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}
