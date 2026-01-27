import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

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
			<ChapterIntro
				chapterNumber={1}
				title={`The Living Streams`}
			/>

		<StorySection
			paragraphs={[
				<><strong>Stream Sage WebSocket</strong> appeared in a shimmer of constantly updating data. "Traditional APIs are like letters. But what if you need continuous conversation?"</>,
				`The sage demonstrated real-time streams - data flowing constantly between client and server. "WebSockets, Server-Sent Events, polling - each creates living connections."`,
				<><strong>Binary</strong> was fascinated. "It's like having an always-open portal!"</>
			]}
		/>

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
				
				<InstructionBox character={`Stream Sage WebSocket presents three glowing portals.`}>
					Choose a real-time protocol to establish your living connection!
				</InstructionBox>
				
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

			<CodeExample
				title={`Real-time Connection Fundamentals`}
				discoveredBy={`The Living Streams Codex`}
				code={`// WebSocket Connection - The Living Portal
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Portal opened!');
  ws.send(JSON.stringify({ type: 'join', user: 'Aria' }));
};
ws.onmessage = (event) => updateUI(JSON.parse(event.data));
ws.onclose = () => setTimeout(reconnect, 5000);

// Server-Sent Events - One-Way Stream
const eventSource = new EventSource('/api/stream');
eventSource.onmessage = (event) => {
  console.log('Server update:', JSON.parse(event.data));
};

// React Hook for WebSocket
function useWebSocket(url) {
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState('CLOSED');

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => setReadyState('OPEN');
    ws.onclose = () => setReadyState('CLOSED');
    ws.onmessage = (e) => setLastMessage(e.data);
    return () => ws.close();
  }, [url]);

  return { lastMessage, readyState };
}`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Stream Sage WebSocket`,
						description: `Guardian of the Living Streams and master of real-time connections. Their wisdom: "Traditional APIs are like letters. Real-time connections are like conversations - always flowing, always connected."`
					}
				]}
				lessonInsight={{
					title: `The Living Streams Lesson:`,
					content: `Real-time connections transform applications from request-response cycles to continuous conversations. WebSockets provide full-duplex communication, Server-Sent Events offer efficient server-to-client streaming, and Long Polling ensures compatibility. Each protocol has its place in the modern web.`
				}}
				reflectionQuestions={[
					`How do real-time connections change user experience?`,
					`When would you choose WebSockets over Server-Sent Events?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 42 (Morning)`,
					content: `The Living Streams are mesmerizing! Stream Sage WebSocket appeared in a shimmer of constantly updating data and taught us about real-time connections. WebSockets (🔌) provide full-duplex communication - like an always-open portal! Server-Sent Events (📡) stream server-to-client, and Long Polling (🔄) ensures compatibility. Binary was fascinated: "It's like having an always-open portal!" Connected my first WebSocket - watched data flow like water between client and server.`
				}}
			/>

			{showNotification && (
				<div className='notification-toast info'>
					Message sent through the Living Stream! 💫
				</div>
			)}
		</div>
	);
};

export default ChapterOne;