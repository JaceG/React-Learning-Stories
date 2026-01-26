import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		connectionStatus,
		messages,
		sendMessage,
		activeUsers,
		dataStream
	} = useOutletContext();

	const [networkNodes, setNetworkNodes] = useState([
		{ id: 1, name: 'React Kingdom', status: 'active', connections: 42 },
		{ id: 2, name: 'Cloud Citadel', status: 'active', connections: 38 },
		{ id: 3, name: 'Data Embassy', status: 'active', connections: 29 },
		{ id: 4, name: 'Living Streams', status: 'active', connections: 51 }
	]);

	const [selectedFeature, setSelectedFeature] = useState(null);
	const [presenceEnabled, setPresenceEnabled] = useState(false);

	const omnipresentFeatures = [
		{
			id: 'presence',
			name: 'User Presence',
			icon: '👥',
			description: 'See who\'s online and what they\'re doing'
		},
		{
			id: 'cursors',
			name: 'Live Cursors',
			icon: '🖱️',
			description: 'Track cursor movements in real-time'
		},
		{
			id: 'notifications',
			name: 'Push Notifications',
			icon: '🔔',
			description: 'Instant alerts across all devices'
		},
		{
			id: 'sync',
			name: 'Cross-Device Sync',
			icon: '🔄',
			description: 'Seamless experience everywhere'
		}
	];

	const simulatePresence = () => {
		setPresenceEnabled(!presenceEnabled);
		if (!presenceEnabled) {
			sendMessage('Aria is now actively editing...', 'System');
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Omnipresent Network`}
				bridge={`"You've mastered streams and synchronization," Stream Sage WebSocket said, ascending to the highest observation platform. "Now witness the ultimate pattern - the Omnipresent Network. Here, users across all devices feel connected as one, sharing presence, cursors, and experiences in real-time."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> created a real-time collaborative system, users 
					seeing changes instantly across the kingdom. "It's like the Event Echoes, 
					but across the network!"
				</p>

				<p className='story-paragraph'>
					<strong>Stream Sage</strong> nodded. "You understand. Real-time brings 
					presence to applications. Users feel connected, not isolated."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Omnipresent Network</h3>
				
				<InstructionBox character={`Stream Sage WebSocket reveals the network dashboard.`}>
					Explore the features that make applications feel alive and connected!
				</InstructionBox>
				
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '20px',
					marginBottom: '30px'
				}}>
					{omnipresentFeatures.map(feature => (
						<div
							key={feature.id}
							className={`protocol-room ${selectedFeature === feature.id ? 'active' : ''}`}
							onClick={() => setSelectedFeature(feature.id)}
							style={{cursor: 'pointer'}}>
							<div className='protocol-icon'>{feature.icon}</div>
							<div className='protocol-name'>{feature.name}</div>
							<div className='protocol-description'>{feature.description}</div>
						</div>
					))}
				</div>

				{selectedFeature && (
					<div style={{
						background: '#f8f9fa',
						padding: '20px',
						borderRadius: '8px',
						marginBottom: '20px'
					}}>
						{selectedFeature === 'presence' && (
							<div>
								<h4>User Presence System</h4>
								<p>Track who's online and their current activity:</p>
								<div className='active-users' style={{marginTop: '15px'}}>
									{activeUsers.map(user => (
										<div key={user.id} className='user-avatar'>
											<div className={`user-status ${user.status}`}></div>
											<div className='user-icon'>
												{user.name === 'Aria' ? '👩‍💻' : user.name === 'Binary' ? '🤖' : '🔍'}
											</div>
											<div className='user-name'>{user.name}</div>
											{presenceEnabled && (
												<div style={{fontSize: '0.8em', color: '#7f8c8d'}}>
													{user.name === 'Aria' ? 'Editing...' : 'Viewing'}
												</div>
											)}
										</div>
									))}
								</div>
								<button 
									className='stream-button start'
									onClick={simulatePresence}
									style={{marginTop: '15px'}}>
									{presenceEnabled ? 'Hide Activity' : 'Show Activity'}
								</button>
							</div>
						)}
						
						{selectedFeature === 'cursors' && (
							<div>
								<h4>Live Cursor Tracking</h4>
								<div style={{
									position: 'relative',
									height: '200px',
									background: 'white',
									border: '2px solid #e0e0e0',
									borderRadius: '8px',
									marginTop: '15px'
								}}>
									<div style={{
										position: 'absolute',
										left: '30%',
										top: '40%',
										color: '#3498db',
										fontWeight: 'bold'
									}}>
										Aria's cursor ↖
									</div>
									<div style={{
										position: 'absolute',
										left: '60%',
										top: '60%',
										color: '#e74c3c',
										fontWeight: 'bold'
									}}>
										Binary's cursor ↖
									</div>
								</div>
							</div>
						)}
						
						{selectedFeature === 'notifications' && (
							<div>
								<h4>Push Notification System</h4>
								<p>Recent notifications:</p>
								<div style={{marginTop: '15px'}}>
									{messages.slice(-3).map(msg => (
										<div key={msg.id} className='notification-toast info' style={{
											position: 'relative',
											marginBottom: '10px',
											animation: 'none'
										}}>
											<strong>{msg.sender}:</strong> {msg.content}
										</div>
									))}
								</div>
							</div>
						)}
						
						{selectedFeature === 'sync' && (
							<div>
								<h4>Cross-Device Synchronization</h4>
								<p>All devices stay perfectly in sync:</p>
								<div style={{
									display: 'flex',
									justifyContent: 'space-around',
									marginTop: '20px'
								}}>
									<div style={{textAlign: 'center'}}>
										<div style={{fontSize: '3em'}}>💻</div>
										<div>Desktop</div>
										<div style={{color: '#27ae60'}}>✓ Synced</div>
									</div>
									<div style={{textAlign: 'center'}}>
										<div style={{fontSize: '3em'}}>📱</div>
										<div>Mobile</div>
										<div style={{color: '#27ae60'}}>✓ Synced</div>
									</div>
									<div style={{textAlign: 'center'}}>
										<div style={{fontSize: '3em'}}>📟</div>
										<div>Tablet</div>
										<div style={{color: '#27ae60'}}>✓ Synced</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				<h3 className='section-title'>Network Status Dashboard</h3>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
					gap: '15px'
				}}>
					{networkNodes.map(node => (
						<div key={node.id} style={{
							background: 'white',
							padding: '15px',
							borderRadius: '8px',
							border: '2px solid #e0e0e0'
						}}>
							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<strong>{node.name}</strong>
								<div className={`status-indicator ${node.status === 'active' ? 'connected' : 'disconnected'}`}></div>
							</div>
							<div style={{marginTop: '10px', color: '#7f8c8d'}}>
								{node.connections} active connections
							</div>
							<div style={{
								marginTop: '10px',
								height: '4px',
								background: '#e0e0e0',
								borderRadius: '2px',
								overflow: 'hidden'
							}}>
								<div style={{
									width: `${(node.connections / 60) * 100}%`,
									height: '100%',
									background: '#3498db'
								}}></div>
							</div>
						</div>
					))}
				</div>

				<h3 className='section-title'>Real-time Metrics</h3>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '20px',
					margin: '20px 0'
				}}>
					<div style={{
						background: '#e8f4fd',
						padding: '20px',
						borderRadius: '8px',
						textAlign: 'center'
					}}>
						<div style={{fontSize: '2em', color: '#3498db'}}>
							{messages.length}
						</div>
						<div>Messages Sent</div>
					</div>
					<div style={{
						background: '#d5f4e6',
						padding: '20px',
						borderRadius: '8px',
						textAlign: 'center'
					}}>
						<div style={{fontSize: '2em', color: '#27ae60'}}>
							{activeUsers.length}
						</div>
						<div>Active Users</div>
					</div>
					<div style={{
						background: '#fef5e7',
						padding: '20px',
						borderRadius: '8px',
						textAlign: 'center'
					}}>
						<div style={{fontSize: '2em', color: '#f39c12'}}>
							{dataStream.length}
						</div>
						<div>Data Points</div>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Omnipresent Network Architecture`}
				discoveredBy={`The Ultimate Real-time Pattern`}
				code={`// Presence System - Track who's online
class PresenceManager {
  trackPresence(userId, status) {
    this.users.set(userId, {
      id: userId, status,
      lastSeen: Date.now(),
      device: this.detectDevice()
    });
    this.broadcast({ type: 'presence_update', userId, status });
  }
}

// Live Cursor Tracking
function useLiveCursors(roomId) {
  const [cursors, setCursors] = useState(new Map());
  const ws = useWebSocket(\`/rooms/\${roomId}\`);
  
  useEffect(() => {
    ws.on('cursor_update', (data) => {
      setCursors(prev => new Map(prev).set(data.userId, {
        x: data.position.x, y: data.position.y,
        color: data.color, name: data.userName
      }));
    });
    ws.on('user_left', (userId) => {
      setCursors(prev => {
        const next = new Map(prev);
        next.delete(userId);
        return next;
      });
    });
  }, [ws]);
  
  return { cursors };
}

// Complete Omnipresent App
function OmnipresentApp() {
  const presence = usePresence();
  const { cursors } = useLiveCursors(roomId);
  
  return (
    <div className="omnipresent-container">
      <PresenceIndicator users={presence.activeUsers} />
      <LiveCursors cursors={cursors} />
    </div>
  );
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Omnipresent Network Lesson:`,
					content: `True real-time applications create a sense of presence and connection. By combining WebSocket connections, presence tracking, cursor sharing, and cross-device synchronization, applications become shared spaces where users collaborate naturally. The Omnipresent Network makes distance irrelevant.`
				}}
				reflectionQuestions={[
					`How does user presence change the nature of an application?`,
					`What are the privacy implications of omnipresent features?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 42 (Evening)`,
					content: `The Omnipresent Network is incredible! Built a complete real-time system with presence tracking (👥), live cursors (🖱️), push notifications (🔔), and cross-device sync (🔄). Users across all devices feel connected as one! Stream Sage's final wisdom: "Real-time is no longer a feature - it's the foundation of modern applications." Binary calculated millions of messages, perfectly synchronized. Next stop: the Caching Castle to learn when NOT to fetch data!`
				}}
				chapterEnding={[
					`Aria stood before the complete Omnipresent Network, watching as users across the kingdom collaborated in real-time. "It's beautiful - everyone connected, everyone present!"`,
					`Stream Sage WebSocket smiled proudly. "You've mastered the Living Streams. Real-time is no longer a feature - it's the foundation of modern applications."`,
					`Binary calculated the network traffic. "Millions of messages, perfectly synchronized. The efficiency is remarkable!"`,
					`Master Aurelius appeared. "Excellent work with real-time connections. But data doesn't always need to flow constantly. Ready to learn the art of caching at the Caching Castle?"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;