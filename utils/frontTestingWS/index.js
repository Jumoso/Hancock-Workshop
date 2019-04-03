new function() {
	var ws = null;
	var connected = false;

	var serverUrl;
	var connectionStatus;
	var sendMessage;
	
	var connectButton;
	var disconnectButton; 
	var sendButton;

	var open = function() {
		var url = serverUrl.val();
		ws = new WebSocket(url);
		ws.onopen = onOpen;
		ws.onclose = onClose;
		ws.onmessage = onMessage;
		ws.onerror = onError;

		connectionStatus.text('OPENING ...');
		console.log('OPENING ...');
		serverUrl.attr('disabled', 'disabled');
		connectButton.hide();
		disconnectButton.show();
	}
	
	var close = function() {
		if (ws) {
			connectionStatus.text('CLOSING ...');
			console.log('CLOSING ...');
			ws.close();
		}
		connected = false;
		connectionStatus.text('CLOSED');

		serverUrl.removeAttr('disabled');
		connectButton.show();
		disconnectButton.hide();
		sendMessage.attr('disabled', 'disabled');
		sendButton.attr('disabled', 'disabled');
	}
	
	var clearLog = function() {
		$('#messages').html('');
	}
	
	var onOpen = function() {
		console.log('OPENED ' + serverUrl.val());
		addMessage("OPENED " + serverUrl.val());
		connected = true;
		connectionStatus.text('OPENED');
		sendMessage.removeAttr('disabled');
		sendButton.removeAttr('disabled');
	};
	
	var onClose = function() {
		console.log('CLOSED: ' + serverUrl.val());
		addMessage("CLOSED " + serverUrl.val());
		ws = null;
	};
	
	var onMessage = function(event) {
		var data = event.data;
		console.log("RECEIVED " + data);
		addMessage("RECEIVED " + data, "RECEIVED");
	};
	
	var onError = function(event) {
		alert(event.data);
	}
	
	var addMessage = function(data, type) {
		var msg = $('<pre>').text(data);
		if (type === 'SENT') {
			msg.addClass('sent');
		} else if (type === 'RECEIVED'){
			msg.addClass('received');
		}
		var messages = $('#messages');
		messages.append(msg);
		
		var msgBox = messages.get(0);
		while (msgBox.childNodes.length > 1000) {
			msgBox.removeChild(msgBox.firstChild);
		}
		msgBox.scrollTop = msgBox.scrollHeight;
	}

	WebSocketClient = {
		init: function() {
			serverUrl = $('#serverUrl');
			connectionStatus = $('#connectionStatus');
			sendMessage = $('#sendMessage');
			
			connectButton = $('#connectButton');
			disconnectButton = $('#disconnectButton'); 
			sendButton = $('#sendButton');
			
			connectButton.click(function(e) {
				close();
				open();
			});
		
			disconnectButton.click(function(e) {
				close();
			});
			
			sendButton.click(function(e) {
				var msg = $('#sendMessage').val();
				console.log("SENT " + msg);
				addMessage("SENT " + msg, 'SENT');
				ws.send(msg);
			});
			
			$('#clearMessage').click(function(e) {
				clearLog();
			});
		}
	};
}

$(function() {
	WebSocketClient.init();
});