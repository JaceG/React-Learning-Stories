import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
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

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<h1 className='lesson-title'>Real-time Connections</h1>
			<p className='lesson-subtitle'>
				Journey to the Living Streams where data flows continuously
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Render the current chapter */}
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

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='server-data'
				lessonId='realtime-connections'
			/>
		</div>
	);
}

export default RealtimeConnections;