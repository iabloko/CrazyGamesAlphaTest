function subscribeOnKeyEvents(){
	document.addEventListener('keydown', evt => {
		if (evt.key === 'Escape') {
			myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
		}
	});
}

