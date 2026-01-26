import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

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
			<ChapterIntro
				chapterNumber={2}
				title={`The Synchronization Spells`}
				bridge={`"You've learned to open the streams," Stream Sage WebSocket said, leading Aria deeper into the flowing data. "But with great connectivity comes great complexity. Multiple users, concurrent updates, race conditions... Real-time isn't just about speed - it's about consistency."`}
			/>

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
				
				<InstructionBox character={`Stream Sage WebSocket opens a collaborative workspace.`}>
					Experience real-time synchronization challenges!
					Edit the document while Binary and Debuggora make changes too.
				</InstructionBox>
				
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

			<CodeExample
				title={`Synchronization Patterns`}
				discoveredBy={`Stream Sage's Advanced Teachings`}
				code={`// Optimistic UI - Act First, Confirm Later
function useOptimisticSync(initialData) {
  const [data, setData] = useState(initialData);
  const [pending, setPending] = useState([]);
  
  const optimisticUpdate = async (update) => {
    const tempId = Date.now();
    setData(prev => ({ ...prev, ...update })); // Apply immediately
    setPending(prev => [...prev, tempId]);
    
    try {
      const confirmed = await sendToServer(update);
      setData(prev => ({ ...prev, ...confirmed }));
    } catch (error) {
      rollbackUpdate(tempId); // Rollback on failure
      throw error;
    } finally {
      setPending(prev => prev.filter(id => id !== tempId));
    }
  };
  return { data, optimisticUpdate, isPending: pending.length > 0 };
}

// Conflict Resolution Strategies
class SyncManager {
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
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Synchronization Insight:`,
					content: `Real-time synchronization is about maintaining consistency across distributed systems. Optimistic updates improve perceived performance, conflict resolution handles concurrent edits gracefully, and event ordering ensures causality. The key is choosing the right strategy for your use case.`
				}}
				reflectionQuestions={[
					`How does optimistic updating improve user experience?`,
					`What are the trade-offs between different conflict resolution strategies?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 42 (Afternoon)`,
					content: `Synchronization is harder than I expected! When multiple users edit simultaneously, conflicts arise. Stream Sage taught three resolution strategies: Last-Write-Wins (simple but data loss risk), Merge (complex but preserves both), and Manual (user decides). Built an optimistic update system - changes appear instantly while confirming with the server in the background. Binary calculated: "The algorithms ensure eventual consistency across all nodes. Elegant!" Debuggora warned about race conditions - timing is critical when data flows constantly.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;