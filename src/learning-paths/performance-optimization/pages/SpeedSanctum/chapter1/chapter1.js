import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const {
		selectedMetric,
		handleMetricSelect,
		profilerActive,
		toggleProfiler,
		renderCount,
		incrementRender,
	} = useOutletContext();

	const [showLagMonster, setShowLagMonster] = useState(false);
	const [performanceIssues, setPerformanceIssues] = useState([]);

	// Simulate performance issue detection
	useEffect(() => {
		if (profilerActive) {
			setTimeout(() => {
				setPerformanceIssues([
					{ component: 'UserList', renders: 42, time: '127ms' },
					{ component: 'DataGrid', renders: 18, time: '89ms' },
					{ component: 'Dashboard', renders: 31, time: '156ms' },
				]);
			}, 1500);
		}
	}, [profilerActive]);

	const metrics = [
		{ id: 'renders', label: 'Total Renders', value: renderCount },
		{ id: 'time', label: 'Render Time', value: '234ms' },
		{ id: 'memory', label: 'Memory Usage', value: '45MB' },
	];

	return (
		<div className='chapter'>
			<ChapterIntro chapterNumber={1} title='The Slowing Kingdom' />

			<StorySection
				paragraphs={[
					<>
						<strong>Aria</strong>, now a React Kingdom Guide, stood
						at the edge of the Northern Mountains. The summons had
						been urgent - applications throughout the kingdom were
						slowing to a crawl. Citizens complained of stuttering
						interfaces and frozen forms.
					</>,
					<>
						<strong>Master Velocity</strong> emerged from the mist,
						his robes shimmering with optimization symbols.
						"Welcome, Aria. Your reputation precedes you. The
						kingdom faces a threat unlike any before - the{' '}
						<strong>Lag Monster</strong> has awakened."
					</>,
					<>
						He gestured toward the valley below where components
						flickered erratically. "The monster feeds on
						inefficiency - unnecessary re-renders, memory leaks, and
						bloated bundles. Before we can fight it, we must learn
						to <strong>see</strong> its influence."
					</>,
				]}
			/>

			<div className='sanctum-visualization'>
				<div className='sanctum-chamber'>
					<h3>The Speed Sanctum</h3>
					<div className='performance-crystals'>
						{metrics.map((metric) => (
							<div
								key={metric.id}
								className={`crystal ${selectedMetric === metric.id ? 'active' : ''}`}
								onClick={() => handleMetricSelect(metric.id)}>
								{metric.value}
							</div>
						))}
					</div>
					<p
						style={{
							textAlign: 'center',
							color: '#ecf0f1',
							position: 'relative',
							zIndex: 1,
						}}>
						Click the crystals to examine different performance
						metrics
					</p>
				</div>
			</div>

			<StorySection
				paragraphs={[
					<>
						"These crystals," Master Velocity explained, "represent
						the vital signs of our applications. When they glow red,
						the Lag Monster grows stronger. Our first weapon is the{' '}
						<strong>React DevTools Profiler</strong>."
					</>,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Awakening the Profiler
				</h3>
				<InstructionBox character='Master Velocity hands you the Profiler crystal.'>
					Activate the React Profiler to detect performance issues in
					the kingdom. Watch as it reveals the Lag Monster's hiding
					places!
				</InstructionBox>

				<div className='profiler-interface'>
					<div className='profiler-header'>
						<h4>React DevTools Profiler</h4>
						<button
							className={`profiler-button ${profilerActive ? 'active' : ''}`}
							onClick={() => {
								toggleProfiler();
								incrementRender();
							}}>
							{profilerActive ? '⏹ Stop' : '🔴 Record'}
						</button>
					</div>

					{profilerActive && (
						<div className='profiler-metrics'>
							<div className='metric-card'>
								<div className='metric-label'>Render Count</div>
								<div className='metric-value'>
									{renderCount}
								</div>
							</div>
							<div className='metric-card'>
								<div className='metric-label'>
									Longest Render
								</div>
								<div className='metric-value warning'>
									156ms
								</div>
							</div>
							<div className='metric-card'>
								<div className='metric-label'>
									Wasted Renders
								</div>
								<div className='metric-value danger'>18</div>
							</div>
						</div>
					)}

					{performanceIssues.length > 0 && (
						<div style={{ marginTop: '20px' }}>
							<h5>Performance Issues Detected:</h5>
							{performanceIssues.map((issue, index) => (
								<div
									key={index}
									style={{
										margin: '10px 0',
										color: '#e74c3c',
									}}>
									⚠️ {issue.component}: {issue.renders}{' '}
									renders, {issue.time}
								</div>
							))}
						</div>
					)}
				</div>

				{profilerActive && !showLagMonster && (
					<div style={{ textAlign: 'center', margin: '20px 0' }}>
						<button
							className='preview-button'
							onClick={() => setShowLagMonster(true)}>
							Reveal the Lag Monster!
						</button>
					</div>
				)}

				{showLagMonster && (
					<div className='lag-monster-container'>
						<div className='lag-monster'>👾</div>
						<p>
							The Lag Monster feeds on your inefficient renders!
						</p>
					</div>
				)}
			</div>

			<CodeExample
				title='Ancient Scroll of Performance Detection'
				discoveredBy='Found in the Profiler Archives'
				code={`// Common Performance Problems the Lag Monster Exploits

// 1. Unnecessary Re-renders
function ExpensiveComponent({ data }) {
  // This component re-renders even when data hasn't changed!
  console.log('Rendering ExpensiveComponent');
  
  // Expensive calculation on every render
  const processed = data.map(item => {
    return heavyComputation(item);
  });
  
  return <div>{processed}</div>;
}

// 2. Missing Keys in Lists
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        // Missing key causes React to recreate all items!
        <li>{todo.text}</li>
      ))}
    </ul>
  );
}

// 3. Inline Function Creation
function Parent() {
  return (
    <Child 
      // New function created every render!
      onClick={() => console.log('clicked')} 
    />
  );
}

// 4. Expensive Operations in Render
function DataTable({ rows }) {
  // Sorting on every render!
  const sortedRows = rows.sort((a, b) => a.name.localeCompare(b.name));
  
  return <Table data={sortedRows} />;
}`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: 'Master Velocity',
						description:
							'Guardian of the Speed Sanctum and keeper of optimization secrets. His motto: "Measure twice, optimize once. Performance is not about speed alone, but about the perception of speed."',
					},
				]}
				lessonInsight={{
					title: "Master Velocity's Wisdom:",
					content:
						'The first step in optimization is observation. The React DevTools Profiler is your lens into the performance realm. It reveals which components render frequently, how long they take, and why they re-render. Remember: you cannot optimize what you cannot measure. Always profile before making optimization decisions.',
				}}
				reflectionQuestions={[
					"As Aria learns to see the Lag Monster's influence, think about your own applications. Have you noticed components that seem slow? Do certain interactions cause the UI to freeze? The Profiler can reveal these hidden performance dragons.",
					'What performance issues might be lurking in your code? How would you use the Profiler to hunt them down?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 25 (Morning)",
					content:
						"A new challenge has arisen! Applications throughout the kingdom are slowing to a crawl. I've traveled to the Northern Mountains where Master Velocity guards the Speed Sanctum. He's shown me the Lag Monster - a creature that feeds on inefficiency, unnecessary re-renders, memory leaks, and bloated bundles. My first weapon against it: the React DevTools Profiler. It reveals which components render frequently, how long they take, and WHY they re-render. Master Velocity's wisdom: 'You cannot optimize what you cannot measure.' Binary is cataloging all the performance metrics we've discovered!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;
