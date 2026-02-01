import { useState, useRef, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		visibleItems,
		virtualizationEnabled,
		windowSize,
		bufferSize,
		handleScroll,
		toggleVirtualization,
		setWindowSize,
		setBufferSize,
		calculatePerformance,
	} = useOutletContext();

	const [totalItems] = useState(10000);
	const [itemHeight] = useState(50);
	const scrollContainerRef = useRef(null);
	const [scrollTop, setScrollTop] = useState(0);

	// Generate items
	const items = Array.from({ length: totalItems }, (_, i) => ({
		id: i,
		name: `Scroll of Knowledge #${i + 1}`,
		author: `Ancient Sage ${String.fromCharCode(65 + (i % 26))}`,
		power: Math.floor(Math.random() * 100) + 1,
	}));

	// Handle scroll event
	const onScroll = useCallback(
		(e) => {
			const newScrollTop = e.target.scrollTop;
			setScrollTop(newScrollTop);
			handleScroll(newScrollTop, totalItems);
		},
		[handleScroll, totalItems]
	);

	// Calculate total height for virtual spacer
	const totalHeight = totalItems * itemHeight;

	// Get currently visible items
	const getVisibleItems = () => {
		if (!virtualizationEnabled) {
			return items.slice(0, 100); // Limit for demo
		}

		return visibleItems.map((index) => ({
			...items[index],
			index,
		}));
	};

	const performance = calculatePerformance();

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='The Window of Perception'
				bridge='Guardian Zephyr led Aria to a mystical viewing chamber deep within the Vault. "Watch closely," he said, waving his hand as the infinite archive transformed. "This is the secret of virtualization - rendering only what the eye can see."'
			/>

			<StorySection
				paragraphs={[
					<>
						Guardian Zephyr led <strong>Aria</strong> to a mystical
						viewing chamber. "Watch closely," he said, waving his
						hand. The infinite archive transformed - instead of all
						scrolls being visible, only a small window showed a
						handful at a time.
					</>,
					<>
						"This is the secret of <strong>virtualization</strong>,"
						Zephyr explained. "We create a window that shows only
						what fits in the viewport, plus a small buffer. As you
						scroll, we swap the contents seamlessly. The user
						perceives infinity, but we render only necessity."
					</>,
					<>
						He demonstrated with a gesture. "The{' '}
						<strong>virtual spacer</strong> maintains the
						scrollbar's truth - showing the full height. But the
						actual scrolls? They materialize only when needed, then
						vanish when passed. This is the art of{' '}
						<strong>windowing</strong>."
					</>,
				]}
			/>

			<div className='vault-chamber'>
				<h3>The Virtualization Chamber</h3>
				<button
					className={`demo-button ${virtualizationEnabled ? 'active' : ''}`}
					onClick={toggleVirtualization}>
					{virtualizationEnabled
						? '✅ Virtualization Active'
						: '❌ Traditional Rendering'}
				</button>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Virtual Scrolling in Action
				</h3>
				<InstructionBox character='Guardian Zephyr demonstrates the windowing technique.'>
					Enable virtualization and scroll through 10,000 items!
					Adjust the window size and buffer to see how they affect
					performance.
				</InstructionBox>

				<div className='vault-controls'>
					<div className='control-group'>
						<label className='control-label'>
							Window Size (Visible Items):
							<span className='control-value'>{windowSize}</span>
						</label>
						<input
							type='range'
							min='5'
							max='30'
							value={windowSize}
							onChange={(e) =>
								setWindowSize(Number(e.target.value))
							}
							className='control-slider'
							disabled={!virtualizationEnabled}
						/>
					</div>
					<div className='control-group'>
						<label className='control-label'>
							Buffer Size (Extra Items):
							<span className='control-value'>{bufferSize}</span>
						</label>
						<input
							type='range'
							min='0'
							max='10'
							value={bufferSize}
							onChange={(e) =>
								setBufferSize(Number(e.target.value))
							}
							className='control-slider'
							disabled={!virtualizationEnabled}
						/>
					</div>
				</div>

				<div className='window-visualizer'>
					<h4>Virtualization Diagram</h4>
					<div className='window-diagram'>
						<div
							className='window-buffer'
							style={{
								top: `${Math.max(0, (scrollTop / itemHeight - bufferSize) * 2)}px`,
								height: `${(windowSize + bufferSize * 2) * 2}px`,
							}}></div>
						<div
							className='window-viewport'
							style={{
								top: `${(scrollTop / itemHeight) * 2}px`,
								height: `${windowSize * 2}px`,
							}}></div>
						{Array.from(
							{ length: Math.min(50, totalItems) },
							(_, i) => (
								<div
									key={i}
									className={`diagram-item ${
										virtualizationEnabled &&
										visibleItems.includes(i)
											? 'rendered'
											: ''
									}`}>
									{virtualizationEnabled &&
										visibleItems.includes(i) &&
										'✓'}
								</div>
							)
						)}
					</div>
					<div
						style={{
							marginTop: '10px',
							fontSize: '0.9em',
							color: '#6b7280',
						}}>
						<span style={{ color: '#3b82f6' }}>■ Viewport</span> |
						<span style={{ color: '#10b981', marginLeft: '10px' }}>
							□ Buffer
						</span>{' '}
						|
						<span style={{ marginLeft: '10px' }}>
							Rendered: {visibleItems.length}/{totalItems}
						</span>
					</div>
				</div>

				<div
					className='infinite-container'
					ref={scrollContainerRef}
					onScroll={onScroll}>
					<div className='virtual-scroller'>
						{virtualizationEnabled && (
							<div
								className='scroll-spacer'
								style={{ height: `${totalHeight}px` }}
							/>
						)}
						{getVisibleItems().map((item, i) => (
							<div
								key={item.id}
								className='virtual-item visible'
								style={
									virtualizationEnabled
										? {
												position: 'absolute',
												top: `${item.index * itemHeight}px`,
												height: `${itemHeight}px`,
											}
										: {
												position: 'relative',
												height: `${itemHeight}px`,
											}
								}>
								<div style={{ flex: 1 }}>
									<strong>{item.name}</strong>
									<span
										style={{
											marginLeft: '20px',
											color: '#6b7280',
											fontSize: '0.9em',
										}}>
										by {item.author}
									</span>
								</div>
								<span
									style={{
										color: '#3b82f6',
										fontWeight: 'bold',
									}}>
									Power: {item.power}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className='performance-monitor'>
					<h4>Performance Comparison</h4>
					<div className='perf-metrics'>
						<div className='perf-metric'>
							<div className='metric-label'>DOM Nodes</div>
							<div
								className={`metric-value ${virtualizationEnabled ? '' : 'danger'}`}>
								{virtualizationEnabled
									? visibleItems.length
									: '100+'}
							</div>
						</div>
						<div className='perf-metric'>
							<div className='metric-label'>Memory Usage</div>
							<div
								className={`metric-value ${virtualizationEnabled ? '' : 'warning'}`}>
								{virtualizationEnabled
									? performance.memoryUsage
									: '100MB'}
							</div>
						</div>
						<div className='perf-metric'>
							<div className='metric-label'>Render Time</div>
							<div
								className={`metric-value ${virtualizationEnabled ? '' : 'danger'}`}>
								{virtualizationEnabled
									? performance.withVirtual
									: performance.withoutVirtual}
								ms
							</div>
						</div>
					</div>
				</div>
			</div>

			<CodeExample
				title='Scroll of Virtual Implementation'
				discoveredBy='The Windowing Technique'
				code={`// Virtual Scrolling Implementation

// Basic Virtual Scroller Component
function VirtualScroller({ 
  items, 
  itemHeight, 
  containerHeight,
  buffer = 5 
}) {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil(
    (scrollTop + containerHeight) / itemHeight
  );
  
  // Add buffer for smooth scrolling
  const visibleStart = Math.max(0, startIndex - buffer);
  const visibleEnd = Math.min(
    items.length - 1, 
    endIndex + buffer
  );
  
  // Get visible items
  const visibleItems = items.slice(visibleStart, visibleEnd + 1);
  
  // Total height for scrollbar
  const totalHeight = items.length * itemHeight;
  
  return (
    <div 
      className="scroll-container"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}>
      
      {/* Virtual spacer maintains scrollbar */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        
        {/* Render only visible items */}
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}>
            <ItemComponent data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Using react-window (recommended library)
import { FixedSizeList } from 'react-window';

function OptimizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}      // Container height
      itemCount={items.length}
      itemSize={50}     // Row height
      width="100%">
      {Row}
    </FixedSizeList>
  );
}

// Advanced: Variable height items
import { VariableSizeList } from 'react-window';

function DynamicList({ items }) {
  const getItemSize = (index) => {
    // Calculate height based on content
    return items[index].expanded ? 150 : 50;
  };
  
  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%">
      {Row}
    </VariableSizeList>
  );
}

// Performance tips:
// 1. Memoize row components
const Row = memo(({ data, index, style }) => {
  return <div style={style}>{data[index]}</div>;
});

// 2. Use overscan for smoother scrolling
<FixedSizeList
  overscanCount={5} // Render extra items
  // ... other props
/>

// 3. Implement scroll-to-item
const listRef = useRef();
const scrollToItem = (index) => {
  listRef.current.scrollToItem(index, 'center');
};`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: "Guardian Zephyr's Wisdom:",
					content:
						'Virtual scrolling (windowing) renders only the items currently visible in the viewport, plus a small buffer for smooth scrolling. By maintaining a virtual spacer element that represents the total height, we preserve natural scrolling behavior while dramatically reducing DOM nodes. Libraries like react-window and react-virtualized make this technique accessible, handling edge cases and optimizations automatically.',
				}}
				reflectionQuestions={[
					"Guardian Zephyr has shown you the power of rendering only what's necessary. This technique transforms impossible lists into smooth experiences. Where in your applications could virtual scrolling unlock new possibilities?",
					"Remember: users don't need to see everything at once - they need to access everything smoothly. Virtualization provides that illusion perfectly.",
				]}
				journalEntry={{
					title: "Aria's Journal - Day 28 (Afternoon)",
					content:
						'Guardian Zephyr showed me the Window of Perception - the secret of virtualization! We create a window showing only what fits in the viewport plus a small buffer. As you scroll, we swap contents seamlessly - users perceive infinity, but we render only necessity! The virtual spacer maintains scrollbar truth (full height), but actual items materialize only when needed. I scrolled through 10,000 items with only ~20 DOM nodes! The react-window library provides FixedSizeList and VariableSizeList. Key insight: calculate visible range, add buffer, position items absolutely, maintain spacer height. 60fps achieved!',
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
