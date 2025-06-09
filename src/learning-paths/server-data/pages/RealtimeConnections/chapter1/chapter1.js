import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const {
		connectionStatus,
		messages,
		sendMessage,
		activeUsers,
		selectedProtocol,
		setSelectedProtocol,
		connectWebSocket,
		disconnectWebSocket
	} = useOutletContext();

	const [messageInput, setMessageInput] = useState('');
	const [showNotification, setShowNotification] = useState(false);

	const protocols = [
		{ id: 'websocket', name: 'WebSocket', icon: '🔌', description: 'Full-duplex communication' },
		{ id: 'sse', name: 'Server-Sent Events', icon: '📡', description: 'Server-to-client stream' },
		{ id: 'polling', name: 'Long Polling', icon: '🔄', description: 'Request-based updates' }
	];

	const handleSendMessage = () => {
		if (messageInput.trim() && connectionStatus === 'connected') {
			sendMessage(messageInput, 'Aria');
			setMessageInput('');
			setShowNotification(true);
			setTimeout(() => setShowNotification(false), 3000);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: The Living Streams</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Stream Sage WebSocket</strong> appeared in a shimmer of constantly 
					updating data. "Traditional APIs are like letters. But what if you need 
					continuous conversation?"
				</p>

				<p className='story-paragraph'>
					The sage demonstrated real-time streams - data flowing constantly between 
					client and server. "WebSockets, Server-Sent Events, polling - each creates 
					living connections."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> was fascinated. "It's like having an always-open portal!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Living Streams Visualization</h3>
				<div className='living-streams-visualization'>
					<div className='streams-container'>
						<div className='data-stream'></div>
						<div className='data-stream'></div>
						<div className='data-stream'></div>
						<div className='data-stream'></div>
						{connectionStatus === 'connected' && (
							<>
								<div className='stream-particle' style={{left: '20%', animationDelay: '0s'}}></div>
								<div className='stream-particle' style={{left: '40%', animationDelay: '0.5s'}}></div>
								<div className='stream-particle' style={{left: '60%', animationDelay: '1s'}}></div>
								<div className='stream-particle' style={{left: '80%', animationDelay: '1.5s'}}></div>
							</>
						)}
					</div>
				</div>

				<h3 className='section-title'>Real-time Protocol Selection</h3>
				<p className='instruction'>
					<strong>👉 Choose a real-time protocol to establish your living connection!</strong>
				</p>
				
				<div className='protocol-selector'>
					{protocols.map(protocol => (
						<div
							key={protocol.id}
							className={`protocol-option ${selectedProtocol === protocol.id ? 'active' : ''}`}
							onClick={() => setSelectedProtocol(protocol.id)}>
							<div className='protocol-icon'>{protocol.icon}</div>
							<div>{protocol.name}</div>
							<div style={{fontSize: '0.8em', marginTop: '5px'}}>{protocol.description}</div>
						</div>
					))}
				</div>

				<h3 className='section-title'>Connection Control</h3>
				<div className='connection-dashboard'>
					<div className='connection-status'>
						<div className={`status-indicator ${connectionStatus}`}></div>
						<span>Status: <strong>{connectionStatus}</strong></span>
						{connectionStatus === 'connected' && selectedProtocol === 'websocket' && (
							<span>Protocol: WebSocket</span>
						)}
					</div>
					
					<div className='stream-controls'>
						<button 
							className='stream-button start'
							onClick={connectWebSocket}
							disabled={connectionStatus === 'connected'}>
							⚡ Connect Stream
						</button>
						<button 
							className='stream-button stop'
							onClick={disconnectWebSocket}
							disabled={connectionStatus === 'disconnected'}>
							⏹️ Disconnect
						</button>
					</div>
				</div>

				<h3 className='section-title'>Active Users</h3>
				<div className='active-users'>
					{activeUsers.map(user => (
						<div key={user.id} className='user-avatar'>
							<div className={`user-status ${user.status}`}></div>
							<div className='user-icon'>
								{user.name === 'Aria' ? '👩‍💻' : user.name === 'Binary' ? '🤖' : '🔍'}
							</div>
							<div className='user-name'>{user.name}</div>
						</div>
					))}
				</div>

				<h3 className='section-title'>Live Chat Implementation</h3>
				{connectionStatus === 'connected' ? (
					<>
						<div className='message-stream'>
							{messages.length === 0 ? (
								<p style={{color: '#95a5a6', textAlign: 'center'}}>No messages yet. Start a conversation!</p>
							) : (
								messages.map(msg => (
									<div key={msg.id} className='message-item'>
										<div className='message-sender'>{msg.sender}</div>
										<div className='message-content'>{msg.content}</div>
										<div className='message-timestamp'>
											{new Date(msg.timestamp).toLocaleTimeString()}
										</div>
									</div>
								))
							)}
						</div>
						
						<div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
							<input
								type='text'
								value={messageInput}
								onChange={(e) => setMessageInput(e.target.value)}
								onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
								placeholder='Type a message...'
								style={{
									flex: 1,
									padding: '10px',
									borderRadius: '5px',
									border: '1px solid #e0e0e0'
								}}
							/>
							<button 
								className='stream-button start'
								onClick={handleSendMessage}>
								Send
							</button>
						</div>
					</>
				) : (
					<div style={{
						padding: '40px',
						background: '#f8f9fa',
						borderRadius: '8px',
						textAlign: 'center',
						color: '#7f8c8d'
					}}>
						Connect to the stream to enable live chat
					</div>
				)}
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Real-time Connection Fundamentals</span>
					<span className='discovered-by'>The Living Streams Codex</span>
				</div>
				<pre>
{`// WebSocket Connection - The Living Portal
const ws = new WebSocket('ws://localhost:8080');

// Connection lifecycle
ws.onopen = () => {
  console.log('Portal opened to the Living Streams!');
  ws.send(JSON.stringify({ type: 'join', user: 'Aria' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Data flows through the portal:', data);
  updateUI(data);
};

ws.onerror = (error) => {
  console.error('The streams are disturbed:', error);
};

ws.onclose = () => {
  console.log('Portal closed - attempting reconnection...');
  setTimeout(reconnect, 5000);
};

// Server-Sent Events - One-Way Stream
const eventSource = new EventSource('/api/stream');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Server whispers through the stream:', data);
};

eventSource.addEventListener('notification', (event) => {
  showNotification(JSON.parse(event.data));
});

// Long Polling - Persistent Requests
async function longPoll() {
  try {
    const response = await fetch('/api/poll', {
      method: 'GET',
      // Wait up to 30 seconds for new data
      headers: { 'X-Timeout': '30000' }
    });
    
    if (response.ok) {
      const data = await response.json();
      processUpdate(data);
    }
  } catch (error) {
    console.error('Polling disrupted:', error);
  }
  
  // Immediately poll again
  setTimeout(longPoll, 100);
}

// React Hook for WebSocket - The Sage's Pattern
function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState('CLOSED');

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => setReadyState('OPEN');
    ws.onclose = () => setReadyState('CLOSED');
    ws.onmessage = (event) => setLastMessage(event.data);
    
    setSocket(ws);
    
    return () => ws.close();
  }, [url]);

  const sendMessage = useCallback((message) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }, [socket]);

  return { sendMessage, lastMessage, readyState };
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Living Streams Lesson:</h3>
				<p>
					Real-time connections transform applications from request-response cycles to 
					continuous conversations. WebSockets provide full-duplex communication, 
					Server-Sent Events offer efficient server-to-client streaming, and Long 
					Polling ensures compatibility with older systems. Each has its place in 
					the modern web.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Real-time Communication</h3>
				<p>
					<strong>How do real-time connections change user experience?</strong> 
					Consider how instant updates affect engagement and the feeling of presence 
					in collaborative applications.
				</p>
				<p>
					<strong>When would you choose WebSockets over Server-Sent Events?</strong> 
					Think about bidirectional needs versus simple server-to-client updates.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As data flowed through the living streams, <strong>Aria</strong> marveled 
					at the continuous connection. "It's not just about getting data anymore - 
					it's about staying connected!"
				</p>
				<p>
					<strong>Stream Sage WebSocket</strong> nodded wisely. "You begin to 
					understand. But with great connectivity comes great complexity. Ready to 
					learn synchronization?"
				</p>
			</div>

			{showNotification && (
				<div className='notification-toast info'>
					Message sent through the Living Stream! 💫
				</div>
			)}
		</div>
	);
};

export default ChapterOne;