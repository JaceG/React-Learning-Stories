import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		connectionStatus,
		dataStream,
		isStreaming,
		startDataStream,
		stopDataStream,
		syncConflicts,
		addSyncConflict,
		resolveConflict,
		resolvedConflicts
	} = useOutletContext();

	const [editingText, setEditingText] = useState('Welcome to collaborative editing!');
	const [remoteText, setRemoteText] = useState('Welcome to collaborative editing!');
	const [showConflict, setShowConflict] = useState(false);

	// Simulate remote user edits
	useEffect(() => {
		if (connectionStatus === 'connected' && !showConflict) {
			const interval = setInterval(() => {
				const edits = [
					'Binary is typing...',
					'Debuggora suggests improvements...',
					'Real-time collaboration in action!'
				];
				setRemoteText(edits[Math.floor(Math.random() * edits.length)]);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [connectionStatus, showConflict]);

	const simulateConflict = () => {
		const conflict = {
			id: Date.now(),
			local: editingText,
			remote: remoteText,
			field: 'document',
			timestamp: new Date().toISOString()
		};
		addSyncConflict(conflict);
		setShowConflict(true);
	};

	const handleResolve = (conflictId, resolution) => {
		resolveConflict(conflictId, resolution);
		setShowConflict(false);
		if (resolution === 'local') {
			setRemoteText(editingText);
		} else {
			setEditingText(remoteText);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: The Synchronization Spells</h2>

			<div className='chapter-bridge'>
				<p>The Living Streams flowed smoothly, but Stream Sage WebSocket had more 
				to teach about the complexities of real-time data synchronization.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Aria</strong> learned the complexity of real-time data. "Multiple 
					users, concurrent updates, conflict resolution," Stream Sage explained. 
					"Real-time isn't just about speed - it's about consistency."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> warned: "Watch for race conditions! When data 
					flows constantly, timing becomes critical."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Collaborative Editing Demo</h3>
				<p className='instruction'>
					<strong>👉 Experience real-time synchronization challenges!</strong>
					Edit the document while Binary and Debuggora make changes too.
				</p>
				
				<div className='collaboration-demo'>
					<div className='editor-instance'>
						<div className='editor-header'>
							<span><strong>Aria's Editor</strong> (You)</span>
							<span style={{color: '#3498db'}}>●</span>
						</div>
						<div className='editor-content'>
							<textarea
								value={editingText}
								onChange={(e) => setEditingText(e.target.value)}
								style={{
									width: '100%',
									minHeight: '120px',
									border: 'none',
									background: 'transparent',
									resize: 'none',
									fontFamily: 'monospace'
								}}
							/>
							<span className='cursor-indicator aria'></span>
						</div>
					</div>

					<div className='editor-instance'>
						<div className='editor-header'>
							<span><strong>Binary's Editor</strong> (Remote)</span>
							<span style={{color: '#e74c3c'}}>●</span>
						</div>
						<div className='editor-content'>
							{remoteText}
							<span className='cursor-indicator binary'></span>
						</div>
					</div>
				</div>

				<div style={{textAlign: 'center', margin: '20px 0'}}>
					<button 
						className='stream-button start'
						onClick={simulateConflict}
						disabled={connectionStatus !== 'connected' || showConflict}>
						🔀 Simulate Sync Conflict
					</button>
				</div>

				<h3 className='section-title'>Synchronization Conflicts</h3>
				{syncConflicts.length > 0 && (
					<div className='sync-conflicts'>
						{syncConflicts.map(conflict => (
							<div key={conflict.id} className='conflict-item'>
								<div className='conflict-header'>
									<div className='conflict-title'>⚠️ Synchronization Conflict Detected!</div>
									<div style={{fontSize: '0.8em', color: '#7f8c8d'}}>
										{new Date(conflict.timestamp).toLocaleTimeString()}
									</div>
								</div>
								<div style={{margin: '10px 0'}}>
									<div><strong>Your version:</strong> {conflict.local}</div>
									<div><strong>Remote version:</strong> {conflict.remote}</div>
								</div>
								<div className='conflict-options'>
									<button 
										className='resolve-button accept-local'
										onClick={() => handleResolve(conflict.id, 'local')}>
										Keep Mine
									</button>
									<button 
										className='resolve-button accept-remote'
										onClick={() => handleResolve(conflict.id, 'remote')}>
										Accept Theirs
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				{resolvedConflicts.length > 0 && (
					<div className='resolved-conflicts'>
						<h4>✅ Resolved Conflicts</h4>
						{resolvedConflicts.map((conflict, index) => (
							<div key={index} className='resolved-item'>
								<span className='resolved-icon'>✓</span>
								<span>Conflict resolved: chose {conflict.resolution} version</span>
							</div>
						))}
					</div>
				)}

				<h3 className='section-title'>Real-time Data Stream</h3>
				<div className='realtime-chart'>
					{isStreaming ? (
						<svg width='100%' height='160'>
							<polyline
								className='chart-line'
								points={dataStream.map((d, i) => 
									`${(i / dataStream.length) * 100}%,${160 - (d.value / 100) * 160}`
								).join(' ')}
							/>
						</svg>
					) : (
						<div style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '100%',
							color: '#95a5a6'
						}}>
							Start streaming to see real-time data
						</div>
					)}
				</div>
				
				<div className='stream-controls'>
					<button 
						className='stream-button start'
						onClick={startDataStream}
						disabled={connectionStatus !== 'connected' || isStreaming}>
						▶️ Start Data Stream
					</button>
					<button 
						className='stream-button stop'
						onClick={stopDataStream}
						disabled={!isStreaming}>
						⏸️ Stop Stream
					</button>
					{isStreaming && (
						<span style={{color: '#27ae60'}}>
							📊 Streaming... ({dataStream.length} data points)
						</span>
					)}
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Synchronization Patterns</span>
					<span className='discovered-by'>Stream Sage's Advanced Teachings</span>
				</div>
				<pre>
{`// Optimistic UI Updates - Act First, Confirm Later
function useOptimisticSync(initialData) {
  const [data, setData] = useState(initialData);
  const [pending, setPending] = useState([]);
  
  const optimisticUpdate = async (update) => {
    // Apply update immediately
    const tempId = Date.now();
    setData(prev => ({ ...prev, ...update }));
    setPending(prev => [...prev, tempId]);
    
    try {
      // Send to server
      const confirmed = await sendToServer(update);
      // Replace optimistic with confirmed
      setData(prev => ({ ...prev, ...confirmed }));
    } catch (error) {
      // Rollback on failure
      rollbackUpdate(tempId);
      throw error;
    } finally {
      setPending(prev => prev.filter(id => id !== tempId));
    }
  };
  
  return { data, optimisticUpdate, isPending: pending.length > 0 };
}

// Conflict Resolution - The Sage's Algorithm
class SyncManager {
  constructor() {
    this.localVersion = 0;
    this.serverVersion = 0;
    this.pendingChanges = [];
  }
  
  detectConflict(localChange, serverChange) {
    // Same field modified by both
    if (localChange.field === serverChange.field) {
      // Check timestamps
      if (Math.abs(localChange.timestamp - serverChange.timestamp) < 100) {
        return {
          type: 'CONCURRENT_EDIT',
          local: localChange,
          server: serverChange
        };
      }
    }
    return null;
  }
  
  resolveConflict(conflict, strategy = 'LAST_WRITE_WINS') {
    switch (strategy) {
      case 'LAST_WRITE_WINS':
        return conflict.local.timestamp > conflict.server.timestamp
          ? conflict.local : conflict.server;
          
      case 'MERGE':
        return this.mergeChanges(conflict.local, conflict.server);
        
      case 'MANUAL':
        return this.promptUserResolution(conflict);
    }
  }
}

// Event Ordering - Maintaining Causality
class EventSequencer {
  constructor() {
    this.sequence = 0;
    this.buffer = new Map();
    this.processed = new Set();
  }
  
  processEvent(event) {
    // Assign sequence number
    event.seq = ++this.sequence;
    event.timestamp = Date.now();
    
    // Check dependencies
    if (event.dependsOn && !this.processed.has(event.dependsOn)) {
      // Buffer until dependency is processed
      this.buffer.set(event.id, event);
      return;
    }
    
    // Process event
    this.applyEvent(event);
    this.processed.add(event.id);
    
    // Check buffer for newly processable events
    this.processBuffer();
  }
  
  processBuffer() {
    for (const [id, event] of this.buffer) {
      if (!event.dependsOn || this.processed.has(event.dependsOn)) {
        this.applyEvent(event);
        this.processed.add(id);
        this.buffer.delete(id);
      }
    }
  }
}

// State Reconciliation - Binary's Pattern
function useStateReconciliation(ws) {
  const [state, setState] = useState({});
  const [version, setVersion] = useState(0);
  
  useEffect(() => {
    // Request full state on reconnect
    ws.on('open', () => {
      ws.send({ type: 'REQUEST_STATE', lastVersion: version });
    });
    
    ws.on('state_snapshot', (snapshot) => {
      if (snapshot.version > version) {
        setState(snapshot.state);
        setVersion(snapshot.version);
      }
    });
    
    ws.on('state_delta', (delta) => {
      if (delta.baseVersion === version) {
        // Apply delta
        setState(prev => applyDelta(prev, delta));
        setVersion(delta.version);
      } else {
        // Version mismatch - request full state
        ws.send({ type: 'REQUEST_STATE', lastVersion: version });
      }
    });
  }, [ws, version]);
  
  return state;
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Synchronization Insight:</h3>
				<p>
					Real-time synchronization is about more than just speed - it's about 
					maintaining consistency across distributed systems. Optimistic updates 
					improve perceived performance, conflict resolution handles concurrent 
					edits gracefully, and event ordering ensures causality. The key is 
					choosing the right strategy for your use case.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Synchronization Challenges</h3>
				<p>
					<strong>How does optimistic updating improve user experience?</strong> 
					Consider the psychological impact of immediate feedback versus waiting 
					for server confirmation.
				</p>
				<p>
					<strong>What are the trade-offs between different conflict resolution strategies?</strong> 
					Think about last-write-wins simplicity versus manual resolution accuracy.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					<strong>Aria</strong> mastered the synchronization spells, watching as 
					conflicting edits resolved seamlessly. "It's like conducting an orchestra 
					where every musician plays at a different tempo!"
				</p>
				<p>
					<strong>Binary</strong> calculated furiously. "The algorithms ensure 
					eventual consistency across all nodes. Elegant!"
				</p>
				<p>
					<strong>Stream Sage WebSocket</strong> smiled. "You've learned to maintain 
					harmony in chaos. Now, ready to scale to the Omnipresent Network?"
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;