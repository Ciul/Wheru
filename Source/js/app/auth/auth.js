/***********************************************************************************
 *	name:			auth.js
 *	project:		EXP
 *	created:		07/16/2013	
 *	author:			Luis Carlos Osorio Jayk
 *	authorEmail:	luiscarlosjayk@gmail.com
 */
window.addEvent('domready', function() {
	var opener = window.self.opener;
	var origin = window.location.origin;
	
	// Check for window opener since this URI is intended always to be opened through a popup window.
	if (typeOf(opener) == 'null')
		window.location.href = '/'; // If opened directly then do not open.
		
	// Only allowed to be opened within same origin. Close if not.
	if (opener.location.origin != origin)
		window.close();
	
	// Add message native event to MooTools Element.NativeEvents. 
	Element.NativeEvents.message = 2;
	
	// Retrieve FourSquare access_token from url.
	var uri			= new URI(location.href);
	access_token	= uri.getData('access_token', 'fragment'); 
	
	// Send message with FourSquare access token retrieved from hash.
	var message		= {access_token: access_token};
	message.success	= Type.isString(access_token) && access_token !== '' ? true : false;
	
	opener.postMessage(JSON.encode(message), origin);
	
	// Close Window
	window.close();
});