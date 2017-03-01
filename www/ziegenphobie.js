var LightManager = new function(){

	var lightIndex = 0;
	var differentLightCount = 3;
	var lightRotationMillis = 300;

	var rotationInterval;
	
	this.startLightRotation = function()
	{
		if (!rotationInterval)
		{
			rotationInterval = window.setInterval(rotateLight, lightRotationMillis);
		}
	}

	function rotateLight()
	{
		$('.door .light').removeClass('light_rotation_' + lightIndex % 3);

		lightIndex++;
		
		$('.door .light').addClass('light_rotation_' + lightIndex % 3);
		
	}
	
	this.stopLightRotation = function($elem)
	{
		window.clearInterval(rotationInterval);
		rotationInterval = null;
		
		$('.light', $elem).addClass('light_selected');
	}

}();


$(function(){

	LightManager.startLightRotation();

	
	$('.door').on('click', function(event)
	{
		var $this = $(this);
		
		LightManager.stopLightRotation($this);

		Client.sendEvent('selectedEntry', $this.attr('id'));
	});
});

// Hier kommt das Event vom AppServer an.
document.addEventListener('eventReceived', function(event){
	var key = event.eventKey;
	var data = event.eventData;

	LightManager.startLightRotation();
	
	
	$('#result' + data['winningDoor']).attr('src', 'i/result_knuddels.gif');
	$('#door' + data['door'] + ' .curtain').animate({ 'top' : '-40px' });
	$('.playtext').html(data['text']);
});