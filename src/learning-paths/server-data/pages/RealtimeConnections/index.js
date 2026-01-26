import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './RealtimeConnections.css';

function RealtimeConnections() {
	const [connectionStatus, setConnectionStatus] = useState('disconnected');
	const [messages, setMessages] = useState([]);
	const [activeUsers, setActiveUsers] = useState([]);
	const [dataStream, setDataStream] = useState([]);
	const [selectedProtocol, setSelectedProtocol] = useState('websocket');
	const [isStreaming, setIsStreaming] = useState(false);
	const [syncConflicts, setSyncConflicts] = useState([]);
	const [resolvedConflicts, setResolvedConflicts] = useState([]);
	const connectionRef = useRef(null);

	// Simulate WebSocket connection
	const connectWebSocket = () => {
		setConnectionStatus('connecting');
		setTimeout(() => {
			setConnectionStatus('connected');
			// Simulate initial users
			setActiveUsers([
				{ id: 1, name: 'Aria', status: 'online' },
				{ id: 2, name: 'Binary', status: 'online' },
				{ id: 3, name: 'Debuggora', status: 'online' }
			]);
		}, 1000);
	};

	// Disconnect WebSocket
	const disconnectWebSocket = () => {
		setConnectionStatus('disconnected');
		setActiveUsers([]);
		setIsStreaming(false);
	};

	// Send message
	const sendMessage = (content, sender = 'Aria') => {
		const newMessage = {
			id: Date.now(),
			sender,
			content,
			timestamp: new Date().toISOString()
		};
		setMessages([...messages, newMessage]);
	};

	// Start data stream
	const startDataStream = () => {
		setIsStreaming(true);
		const interval = setInterval(() => {
			if (connectionStatus !== 'connected') {
				clearInterval(interval);
				return;
			}
			setDataStream(prev => [...prev, {
				id: Date.now(),
				value: Math.floor(Math.random() * 100),
				timestamp: new Date().toISOString()
			}].slice(-20)); // Keep last 20 entries
		}, 1000);
		connectionRef.current = interval;
	};

	// Stop data stream
	const stopDataStream = () => {
		setIsStreaming(false);
		if (connectionRef.current) {
			clearInterval(connectionRef.current);
		}
	};

	// Add sync conflict
	const addSyncConflict = (conflict) => {
		setSyncConflicts([...syncConflicts, conflict]);
	};

	// Resolve conflict
	const resolveConflict = (conflictId, resolution) => {
		const conflict = syncConflicts.find(c => c.id === conflictId);
		if (conflict) {
			setResolvedConflicts([...resolvedConflicts, { ...conflict, resolution }]);
			setSyncConflicts(syncConflicts.filter(c => c.id !== conflictId));
		}
	};

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (connectionRef.current) {
				clearInterval(connectionRef.current);
			}
		};
	}, []);

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Real-time Connections`}
				subtitle={`Journey to the Living Streams where data flows continuously`}
				opener={`Stream Sage WebSocket appeared in a shimmer of constantly updating data. "Traditional APIs are like letters - you send, you wait, you receive. But what if you need continuous conversation?" The sage gestured to the Living Streams flowing around them. "Here, data flows like water - always moving, always connected."`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					connectionStatus,
					setConnectionStatus,
					messages,
					sendMessage,
					activeUsers,
					dataStream,
					selectedProtocol,
					setSelectedProtocol,
					isStreaming,
					connectWebSocket,
					disconnectWebSocket,
					startDataStream,
					stopDataStream,
					syncConflicts,
					addSyncConflict,
					resolveConflict,
					resolvedConflicts
				}}
			/>

			<LessonFooter
				courseId={`server-data`}
				lessonId={`realtime-connections`}
				totalChapters={3}
			/>
		</div>
	);
}

export default RealtimeConnections;