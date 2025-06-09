import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>Chapter 3: The Omnipresent Network</h2>

			<div className='chapter-bridge'>
				<p>With synchronization mastered, Stream Sage WebSocket revealed the ultimate 
				real-time pattern - the Omnipresent Network that connects all users across 
				all devices.</p>
			</div>

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
				<p className='instruction'>
					<strong>👉 Explore the features that make applications feel alive and connected!</strong>
				</p>
				
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

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Omnipresent Network Architecture</span>
					<span className='discovered-by'>The Ultimate Real-time Pattern</span>
				</div>
				<pre>
{`// Real-time Presence System - Feel the Connection
class PresenceManager {
  constructor(ws) {
    this.ws = ws;
    this.users = new Map();
    this.activities = new Map();
    this.listeners = new Set();
  }
  
  // Track user presence
  trackPresence(userId, status) {
    this.users.set(userId, {
      id: userId,
      status,
      lastSeen: Date.now(),
      device: this.detectDevice()
    });
    
    this.broadcast({
      type: 'presence_update',
      userId,
      status
    });
  }
  
  // Track user activity
  trackActivity(userId, activity) {
    this.activities.set(userId, {
      type: activity.type,
      target: activity.target,
      timestamp: Date.now()
    });
    
    // Debounced broadcast
    this.debouncedBroadcast({
      type: 'activity_update',
      userId,
      activity: activity.type
    });
  }
  
  // Get active users in a context
  getActiveUsers(context) {
    return Array.from(this.users.values())
      .filter(user => user.status === 'online')
      .map(user => ({
        ...user,
        activity: this.activities.get(user.id)
      }));
  }
}

// Live Cursor Tracking - See Others Work
function useLiveCursors(roomId) {
  const [cursors, setCursors] = useState(new Map());
  const ws = useWebSocket(\`/rooms/\${roomId}\`);
  
  const updateCursor = useCallback((position) => {
    ws.send({
      type: 'cursor_move',
      position,
      userId: currentUser.id,
      color: currentUser.color
    });
  }, [ws]);
  
  useEffect(() => {
    ws.on('cursor_update', (data) => {
      setCursors(prev => new Map(prev).set(data.userId, {
        x: data.position.x,
        y: data.position.y,
        color: data.color,
        name: data.userName
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
  
  return { cursors, updateCursor };
}

// Cross-Device Sync - Seamless Experience
class DeviceSyncManager {
  constructor() {
    this.deviceId = this.generateDeviceId();
    this.syncQueue = [];
    this.lastSync = Date.now();
  }
  
  // Sync state across devices
  async syncState(state) {
    const syncData = {
      deviceId: this.deviceId,
      timestamp: Date.now(),
      state: this.compressState(state),
      checksum: this.calculateChecksum(state)
    };
    
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(syncData)
      });
      
      const { merged, conflicts } = await response.json();
      
      if (conflicts.length > 0) {
        return this.resolveConflicts(conflicts);
      }
      
      return merged;
    } catch (error) {
      // Queue for later sync
      this.syncQueue.push(syncData);
      return state;
    }
  }
  
  // Intelligent conflict resolution
  resolveConflicts(conflicts) {
    return conflicts.map(conflict => {
      // Device priority based on last active
      if (conflict.devicePriority === this.deviceId) {
        return conflict.local;
      }
      
      // Field-level merge for non-conflicting changes
      return this.mergeStates(conflict.local, conflict.remote);
    });
  }
}

// Push Notification System - Never Miss a Beat
class NotificationService {
  constructor() {
    this.permission = 'default';
    this.subscribers = new Map();
  }
  
  async initialize() {
    // Request permission
    this.permission = await Notification.requestPermission();
    
    // Subscribe to push service
    if ('serviceWorker' in navigator && this.permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlB64ToUint8Array(PUBLIC_VAPID_KEY)
      });
      
      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
    }
  }
  
  // Send notification across all devices
  async notifyAllDevices(userId, notification) {
    const devices = await this.getUserDevices(userId);
    
    const notifications = devices.map(device => ({
      endpoint: device.endpoint,
      payload: {
        title: notification.title,
        body: notification.body,
        icon: notification.icon,
        badge: '/badge.png',
        data: {
          url: notification.url,
          timestamp: Date.now()
        }
      }
    }));
    
    return Promise.all(
      notifications.map(n => this.sendNotification(n))
    );
  }
}

// Complete Omnipresent Implementation
function OmnipresentApp() {
  const presence = usePresence();
  const { cursors } = useLiveCursors(roomId);
  const sync = useDeviceSync();
  const notifications = useNotifications();
  
  return (
    <div className="omnipresent-container">
      <PresenceIndicator users={presence.activeUsers} />
      <LiveCursors cursors={cursors} />
      <SyncStatus status={sync.status} />
      {notifications.map(n => (
        <Toast key={n.id} notification={n} />
      ))}
      {/* Your app content */}
    </div>
  );
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Omnipresent Network Lesson:</h3>
				<p>
					True real-time applications create a sense of presence and connection. 
					By combining WebSocket connections, presence tracking, cursor sharing, 
					and cross-device synchronization, applications transcend being mere 
					tools to become shared spaces where users collaborate naturally. The 
					Omnipresent Network makes distance irrelevant.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Connected Experiences</h3>
				<p>
					<strong>How does user presence change the nature of an application?</strong> 
					Consider how knowing others are present affects user behavior and engagement.
				</p>
				<p>
					<strong>What are the privacy implications of omnipresent features?</strong> 
					Think about the balance between connection and user privacy preferences.
				</p>
			</div>

			<div className='character-intro'>
				<h4>Aria's Journal - Living Streams Day 3</h4>
				<p>
					The Omnipresent Network is incredible! Users feel connected across 
					space and time. Real-time isn't just about speed anymore - it's about 
					creating shared experiences. I can't wait to apply these patterns to 
					make the React Kingdom feel more alive and connected!
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					<strong>Aria</strong> stood before the complete Omnipresent Network, 
					watching as users across the kingdom collaborated in real-time. "It's 
					beautiful - everyone connected, everyone present!"
				</p>
				<p>
					<strong>Stream Sage WebSocket</strong> smiled proudly. "You've mastered 
					the Living Streams. Real-time is no longer a feature - it's the foundation 
					of modern applications."
				</p>
				<p>
					<strong>Binary</strong> calculated the network traffic. "Millions of 
					messages, perfectly synchronized. The efficiency is remarkable!"
				</p>
				<p>
					<strong>Debuggora</strong> nodded. "And with proper error handling, 
					the network remains stable even under stress."
				</p>
				<p>
					Master Aurelius appeared. "Excellent work with real-time connections. 
					But data doesn't always need to flow constantly. Ready to learn the 
					art of caching at the Caching Castle?"
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;