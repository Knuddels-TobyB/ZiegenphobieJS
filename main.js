var App = (new function() {
	
	var usersPlaying = {};
    var isShuttingDown = false;
    
    var htmlFile = new HTMLFile('start.html');
    var appContent = AppContent.overlayContent(htmlFile, 243, 266);

    this.onAppStart = function() {
	    KnuddelsServer.getChannel().getOnlineUsers(UserType.Human).forEach(function(user) {
		    App.onUserJoined(user)
	    });
    };
    
    this.onUserJoined = function(user)
    {
       	var botNick = KnuddelsServer.getDefaultBotUser().getNick().escapeKCode();
    	user.sendPrivateMessage('Lust auf ne Runde Ziegenphobie? Mit nur _°BB>_h1 Knuddel|/appknuddel ' + botNick + '<°°°_ bist du dabei!');
    };
    
    this.onUserLeft = function(user)
    {
    	if (usersPlaying[user.getNick()] == 1)
    	{
    		KnuddelsServer.getDefaultBotUser().transferKnuddel(user, new KnuddelAmount(1), 'Du hast den Channel verlassen.');
    	
    		delete usersPlaying[user.getNick()];
    	}
    };
    
    this.onPrepareShutdown = function()
    {
    	if (!isShuttingDown)
    	{
    		isShuttingDown = true;
    		
    		for (var key in usersPlaying)
    		{
    			var value = usersPlaying[key];
    			
    			var userId = KnuddelsServer.getUserId(key);
    			var user = KnuddelsServer.getUser(userId);
    			
    			KnuddelsServer.getDefaultBotUser().transferKnuddel(user, new KnuddelAmount(1), 'Die App fährt gleich herunter.');
				user.removeAppContent();
    			
    			delete usersPlaying[key];
    		}
    	}
    }
    
    this.onBeforeKnuddelReceived = function(knuddelTransfer)
    {
    	var sender = knuddelTransfer.getSender();
    	
    	if (!sender.canSendAppContent(appContent))
    	{
    		knuddelTransfer.reject('Sorry, mit diesem Gerät kannst du gerade nicht spielen.');
    	}
    	else if (sender.isChannelOwner() && knuddelTransfer.getKnuddelAmount().asNumber() != 1)
    	{
			knuddelTransfer.accept();
    	}
    	else if (isShuttingDown)
    	{
    		knuddelTransfer.reject('Du App nimmt gerade keine neuen Spieler an.');
    	}
    	else if (usersPlaying[sender.getNick()])
    	{
    		knuddelTransfer.reject('Du spielst bereits.');
    	}
    	else if (knuddelTransfer.getKnuddelAmount().asNumber() != 1)
    	{
    		var botNick = KnuddelsServer.getDefaultBotUser().getNick().escapeKCode();
    		knuddelTransfer.reject('Du musst genau _°BB>_h1 Knuddel senden|/appknuddel ' + botNick + '<°°°_...');
    	}
    	else
    	{
    		knuddelTransfer.accept();
    	}
    };
    
    this.onKnuddelReceived = function(user, receiver, knuddelAmount)
    {
    	if (knuddelAmount.asNumber() == 1)
    	{
		    usersPlaying[user.getNick()] = 1;
		    user.setAppContent(appContent);
    	}
    	else
    	{
    		user.sendPrivateMessage('Vielen Dank für die Einzahlung.');
    	}
    };
    
    this.onEventReceived = function(user, key, data)
    {
    	if (key == 'selectedEntry' && usersPlaying[user.getNick()] == 1)
    	{
	    	usersPlaying[user.getNick()] = 2;
    	
	    	setTimeout(function(){
	    		var doorNumber = parseInt(data[data.length - 1], 10);
	    		
	    		var winningDoorNumber = RandomOperations.nextInt(2) + 1;
	    		
	    		var hasWon = winningDoorNumber == doorNumber;
	    	
	    		var text = hasWon ? 'Richtig getippt' : 'Knapp daneben';

			    user.getAppContentSession(AppViewMode.Overlay).getAppContent().sendEvent('openDoor', {
				    'door': doorNumber,
				    'winningDoor': winningDoorNumber,
				    'text': text
			    });
	    	
	    		if (hasWon)
	    		{
	    			KnuddelsServer.getDefaultBotUser().transferKnuddel(user, new KnuddelAmount(2), 'Richtig getippt...');
	    		}
	    		
	    		
	    		setTimeout(function(){
		    		var botNick = KnuddelsServer.getDefaultBotUser().getNick().escapeKCode();
		    		user.sendPrivateMessage('Na, Lust auf _°BB>_hnoch eine Runde|/appknuddel ' + botNick + '<°°°_?');
		    	
		    		user.removeAppContent();
		    		delete usersPlaying[user.getNick()];
	    		}, 4000);
	    	}, 1500);
    	}
    };
    
    
}());