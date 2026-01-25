import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const { renderCount, calculatePerformance } = useOutletContext();

	const [itemCount, setItemCount] = useState(100);
	const [renderingAll, setRenderingAll] = useState(false);
	const [showProblem, setShowProblem] = useState(false);
	const scrollContainerRef = useRef(null);

	// Generate dummy data
	const generateItems = (count) => {
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			name: `Ancient Scroll #${i + 1}`,
			content: `Knowledge preserved for eternity...`,
		}));
	};

	const items = generateItems(itemCount);
	const performance = calculatePerformance();

	// Simulate performance impact
	useEffect(() => {
		if (renderingAll && itemCount > 1000) {
			setShowProblem(true);
		}
	}, [renderingAll, itemCount]);

	return (
		<div className='chapter'>
			<ChapterIntro chapterNumber={1} title='The Infinite Archive' />

			<div className='story-section'>
				<p className='story-paragraph'>
					Deep beneath the React Kingdom lay the{' '}
					<strong>Virtualization Vault</strong>, an endless archive
					containing millions of scrolls. <strong>Aria</strong>{' '}
					descended into its depths, only to find the entrance blocked
					by a crowd of exhausted messengers.
				</p>

				<p className='story-paragraph'>
					<strong>Vault Guardian Zephyr</strong> appeared, floating
					effortlessly above the chaos. "They try to carry every
					scroll at once," he explained. "The human eye can only read
					a few at a time, yet they burden themselves with thousands.
					This is the
					<strong>Rendering Paradox</strong>."
				</p>

				<p className='story-paragraph'>
					He gestured to the infinite shelves stretching into
					darkness. "When rendering lists of thousands of items, React
					creates DOM nodes for each one. The browser struggles,
					memory explodes, and scrolling becomes torture. We must
					teach you the art of <strong>virtual scrolling</strong>."
				</p>

				<div className='vault-chamber'>
					<h3>The Rendering Burden</h3>
					<p style={{ color: 'white', textAlign: 'center' }}>
						Attempting to render {itemCount.toLocaleString()}{' '}
						items...
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Problem with Large Lists
				</h3>
				<InstructionBox character='Guardian Zephyr gestures to the infinite shelves.'>
					Increase the number of items and try rendering them all at
					once. Watch how performance degrades as the list grows!
				</InstructionBox>

				<div className='vault-controls'>
					<div className='control-group'>
						<label className='control-label'>
							Number of Items:
							<span className='control-value'>
								{itemCount.toLocaleString()}
							</span>
						</label>
						<input
							type='range'
							min='100'
							max='10000'
							step='100'
							value={itemCount}
							onChange={(e) =>
								setItemCount(Number(e.target.value))
							}
							className='control-slider'
						/>
					</div>

					<div className='demo-controls'>
						<button
							className='demo-button'
							onClick={() => setRenderingAll(!renderingAll)}>
							{renderingAll
								? 'Stop Rendering'
								: 'Render All Items'}
						</button>
					</div>
				</div>

				{renderingAll && (
					<div
						className='infinite-container'
						ref={scrollContainerRef}>
						<div style={{ padding: '10px' }}>
							{items
								.slice(0, Math.min(itemCount, 1000))
								.map((item) => (
									<div
										key={item.id}
										className='virtual-item'
										style={{ position: 'relative' }}>
										<strong>{item.name}</strong>
										<span
											style={{
												marginLeft: '20px',
												color: '#6b7280',
											}}>
											{item.content}
										</span>
									</div>
								))}
							{itemCount > 1000 && (
								<div
									style={{
										padding: '20px',
										textAlign: 'center',
										color: '#ef4444',
									}}>
									⚠️ Browser limits prevent rendering more
									than 1000 items!
								</div>
							)}
						</div>
					</div>
				)}

				{showProblem && (
					<div className='performance-monitor'>
						<h4>Performance Impact Analysis</h4>
						<div className='perf-metrics'>
							<div className='perf-metric'>
								<div className='metric-label'>DOM Nodes</div>
								<div
									className={`metric-value ${itemCount > 5000 ? 'danger' : 'warning'}`}>
									{itemCount.toLocaleString()}
								</div>
							</div>
							<div className='perf-metric'>
								<div className='metric-label'>Memory Usage</div>
								<div className='metric-value danger'>
									{(itemCount * 0.5).toFixed(0)}MB
								</div>
							</div>
							<div className='perf-metric'>
								<div className='metric-label'>Scroll FPS</div>
								<div className='metric-value danger'>
									{Math.max(5, 60 - itemCount / 100).toFixed(
										0
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<CodeExample
				title='Scroll of Infinite Problems'
				discoveredBy='The Traditional Approach'
				code={`// The Problem: Rendering Everything

// Traditional list rendering - ALL items in DOM
function TraditionalList({ items }) {
  return (
    <div className="list-container">
      {items.map(item => (
        <div key={item.id} className="list-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <img src={item.image} alt={item.title} />
        </div>
      ))}
    </div>
  );
}

// With 10,000 items:
// - 10,000 DOM nodes created
// - 10,000 images loaded
// - Massive memory usage
// - Terrible scroll performance

// Performance breakdown:
const performanceImpact = {
  initialRender: '5000ms+',    // Blocking!
  memoryUsage: '500MB+',       // Per list!
  scrollFPS: '<10fps',         // Janky!
  reRenderTime: '1000ms+'      // Sluggish!
};

// Common scenarios that suffer:
// 1. Social media feeds
// 2. Data tables
// 3. Chat messages
// 4. Search results
// 5. Product catalogs

// Browser limitations:
// - Maximum DOM nodes: ~1.5 million
// - Usable limit: ~10,000 nodes
// - Smooth scrolling: <1,000 nodes

// The pain points:
function PainfulExample() {
  const [items, setItems] = useState(
    generateMillionItems()
  );
  
  // This will freeze the browser!
  return (
    <div>
      {items.map(item => (
        <ExpensiveComponent 
          key={item.id} 
          data={item} 
        />
      ))}
    </div>
  );
}`}
			/>

			<div className='list-comparison'>
				<div className='comparison-panel'>
					<div className='comparison-title traditional'>
						Traditional Rendering
					</div>
					<ul style={{ paddingLeft: '20px' }}>
						<li>Renders all items immediately</li>
						<li>Creates DOM node for each item</li>
						<li>Loads all images/assets</li>
						<li>Memory usage grows linearly</li>
						<li>Scroll performance degrades</li>
					</ul>
				</div>
				<div className='comparison-panel'>
					<div className='comparison-title virtualized'>
						Virtual Scrolling (Coming Next!)
					</div>
					<ul style={{ paddingLeft: '20px' }}>
						<li>Renders only visible items</li>
						<li>Reuses DOM nodes</li>
						<li>Loads assets on demand</li>
						<li>Constant memory usage</li>
						<li>Smooth 60fps scrolling</li>
					</ul>
				</div>
			</div>

			<div className='story-section'>
				<div className='guardian-warning'>
					<h4>Guardian Zephyr's Warning</h4>
					<p className='story-paragraph'>
						"You see the problem now! Each scroll they carry weighs down the entire kingdom. But fear not - in the next chamber, I will teach you to render only what the eye can see, creating the illusion of infinity with finite resources."
					</p>
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: 'Vault Guardian Zephyr',
						description: 'Master of the infinite scroll and keeper of the Virtualization Vault. His wisdom: "Render only what the eye can see. The rest exists in potential, not in the DOM."'
					}
				]}
				lessonInsight={{
					title: 'The Infinite Problem:',
					content:
						"Large lists are one of the most common performance bottlenecks in web applications. Whether it's a social feed, data table, or search results, rendering thousands of items destroys performance. The browser must calculate layout, paint, and composite for every single item, even those far outside the viewport. This is why virtual scrolling exists - to create the illusion of a complete list while only rendering what's necessary.",
				}}
				reflectionQuestions={[
					'Guardian Zephyr has revealed the burden of infinite rendering. Think about your own applications - do you have lists that grow without bound? Product searches that return thousands of results? Chat histories that never end?',
					'Every unnecessary DOM node is a weight your users must carry. The path to performance begins with recognizing this burden.',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 28 (Morning)",
					content:
						"Deep beneath the React Kingdom lies the Virtualization Vault - an endless archive containing millions of scrolls. I found the entrance blocked by exhausted messengers trying to carry every scroll at once! Vault Guardian Zephyr explained the Rendering Paradox: the human eye can only read a few items at a time, yet traditional rendering creates DOM nodes for ALL items. With 10,000 items: 5000ms+ initial render, 500MB+ memory, <10fps scrolling! Browser limits: ~1.5 million DOM nodes max, but smooth scrolling requires <1,000. This is why social feeds, data tables, and search results struggle. The solution: virtual scrolling!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;
