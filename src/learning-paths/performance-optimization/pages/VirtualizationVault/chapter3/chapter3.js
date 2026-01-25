import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		virtualizationEnabled,
		calculatePerformance
	} = useOutletContext();

	const [masteryLevel, setMasteryLevel] = useState(0);
	const [techniquesApplied, setTechniquesApplied] = useState({
		dynamicHeights: false,
		horizontalScroll: false,
		infiniteLoader: false,
		gridVirtualization: false
	});
	const [infiniteDataLoaded, setInfiniteDataLoaded] = useState(100);
	const [vaultMastered, setVaultMastered] = useState(false);

	// Apply advanced technique
	const applyTechnique = useCallback((technique) => {
		setTechniquesApplied(prev => ({ ...prev, [technique]: true }));
		setMasteryLevel(prev => prev + 1);
	}, []);

	// Check for vault mastery
	useEffect(() => {
		if (masteryLevel >= 4) {
			setVaultMastered(true);
		}
	}, [masteryLevel]);

	// Simulate infinite loading
	const loadMoreData = useCallback(() => {
		setTimeout(() => {
			setInfiniteDataLoaded(prev => prev + 100);
		}, 1000);
	}, []);

	const performance = calculatePerformance();

	// Grid items for demonstration
	const gridItems = useMemo(() => 
		Array.from({ length: 10000 }, (_, i) => ({
			id: i,
			title: `Crystal ${i + 1}`,
			color: `hsl(${(i * 137.5) % 360}, 70%, 60%)`
		})), []
	);

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title='Mastering the Infinite'
				bridge={`"You've learned the basics of windowing," Guardian Zephyr said, revealing four mystical portals glowing with different energies. "But to become a true Virtualization Master, you must conquer four advanced challenges of the infinite realm."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"You've learned the basics," Guardian Zephyr said, "but the Vault holds deeper 
					secrets. <strong>Aria</strong>, to become a true <strong>Virtualization Master</strong>, 
					you must conquer four advanced challenges."
				</p>

				<p className='story-paragraph'>
					He revealed four mystical portals, each glowing with different energy. "Dynamic 
					heights for content that varies. Horizontal realms for sideways scrolling. 
					Infinite loading for endless data. And the ultimate challenge - 
					<strong>grid virtualization</strong> for two-dimensional infinity."
				</p>

				<p className='story-paragraph'>
					"Master all four," Zephyr proclaimed, "and the Vault will grant you the title 
					of <strong>Keeper of the Infinite</strong>. Your applications will handle any 
					amount of data with grace and speed."
				</p>

				<div className='vault-chamber'>
					<h3>The Master's Challenge</h3>
					<div style={{ color: 'white', textAlign: 'center' }}>
						Mastery Progress: {masteryLevel}/4
						{vaultMastered && <div style={{ marginTop: '10px' }}>
							✨ Vault Mastered! ✨
						</div>}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Master the Four Advanced Techniques
				</h3>
				<InstructionBox character="Guardian Zephyr reveals the four mystical portals.">
					Apply each advanced virtualization technique to complete your training 
					and become the Keeper of the Infinite!
				</InstructionBox>

				<div className='optimization-badges'>
					<div 
						className={`opt-badge ${techniquesApplied.dynamicHeights ? 'earned' : ''}`}
						onClick={() => !techniquesApplied.dynamicHeights && applyTechnique('dynamicHeights')}
						style={{ cursor: techniquesApplied.dynamicHeights ? 'default' : 'pointer' }}>
						{techniquesApplied.dynamicHeights ? '✅ Dynamic Heights' : '📏 Dynamic Heights'}
					</div>
					<div 
						className={`opt-badge ${techniquesApplied.horizontalScroll ? 'earned' : ''}`}
						onClick={() => !techniquesApplied.horizontalScroll && applyTechnique('horizontalScroll')}
						style={{ cursor: techniquesApplied.horizontalScroll ? 'default' : 'pointer' }}>
						{techniquesApplied.horizontalScroll ? '✅ Horizontal Scroll' : '↔️ Horizontal Scroll'}
					</div>
					<div 
						className={`opt-badge ${techniquesApplied.infiniteLoader ? 'earned' : ''}`}
						onClick={() => !techniquesApplied.infiniteLoader && applyTechnique('infiniteLoader')}
						style={{ cursor: techniquesApplied.infiniteLoader ? 'default' : 'pointer' }}>
						{techniquesApplied.infiniteLoader ? '✅ Infinite Loading' : '♾️ Infinite Loading'}
					</div>
					<div 
						className={`opt-badge ${techniquesApplied.gridVirtualization ? 'earned' : ''}`}
						onClick={() => !techniquesApplied.gridVirtualization && applyTechnique('gridVirtualization')}
						style={{ cursor: techniquesApplied.gridVirtualization ? 'default' : 'pointer' }}>
						{techniquesApplied.gridVirtualization ? '✅ Grid Master' : '⚡ Grid Master'}
					</div>
				</div>

				{techniquesApplied.dynamicHeights && (
					<div className='window-visualizer' style={{ marginTop: '20px' }}>
						<h4>Dynamic Height Virtualization</h4>
						<p style={{ marginBottom: '15px' }}>
							Items with varying heights require special handling - measuring and caching sizes.
						</p>
						<div className='window-diagram'>
							{[30, 80, 50, 120, 40, 90, 60].map((height, i) => (
								<div 
									key={i}
									className='diagram-item rendered'
									style={{ height: `${height}px`, marginBottom: '2px' }}>
									Item {i + 1} ({height}px)
								</div>
							))}
						</div>
					</div>
				)}

				{techniquesApplied.infiniteLoader && (
					<div className='infinite-data-viz' style={{ marginTop: '20px' }}>
						<h4>Infinite Data Loading</h4>
						<div className='data-stream'></div>
						<div className='data-window'>
							<p>Loaded: {infiniteDataLoaded} items</p>
							<button className='demo-button' onClick={loadMoreData}>
								Load More Data
							</button>
							<p style={{ marginTop: '10px', fontSize: '0.9em' }}>
								New data loads automatically as users approach the end!
							</p>
						</div>
					</div>
				)}

				{techniquesApplied.gridVirtualization && (
					<div className='window-visualizer' style={{ marginTop: '20px' }}>
						<h4>2D Grid Virtualization</h4>
						<div style={{ 
							display: 'grid', 
							gridTemplateColumns: 'repeat(5, 1fr)', 
							gap: '10px',
							padding: '20px',
							background: '#f3f4f6',
							borderRadius: '8px',
							maxHeight: '300px',
							overflow: 'hidden'
						}}>
							{gridItems.slice(0, 20).map(item => (
								<div 
									key={item.id}
									style={{
										background: item.color,
										padding: '20px',
										borderRadius: '4px',
										color: 'white',
										textAlign: 'center',
										fontWeight: 'bold'
									}}>
									{item.title}
								</div>
							))}
						</div>
						<p style={{ marginTop: '10px', textAlign: 'center', color: '#6b7280' }}>
							Virtualizing both rows AND columns for massive grids!
						</p>
					</div>
				)}
			</div>

			<CodeExample
				title="The Master Scroll of Advanced Virtualization"
				discoveredBy="Ultimate Techniques"
				code={`// Advanced Virtualization Techniques

// 1. Dynamic Heights with react-window
import { VariableSizeList } from 'react-window';

function DynamicHeightList({ items }) {
  const listRef = useRef();
  const rowHeights = useRef({});
  
  const getItemSize = (index) => {
    // Return cached height or estimate
    return rowHeights.current[index] || 100;
  };
  
  const Row = ({ index, style }) => {
    const rowRef = useRef();
    
    useEffect(() => {
      if (rowRef.current) {
        const height = rowRef.current.getBoundingClientRect().height;
        if (rowHeights.current[index] !== height) {
          rowHeights.current[index] = height;
          // Reset cached positions
          listRef.current.resetAfterIndex(index);
        }
      }
    }, [index]);
    
    return (
      <div ref={rowRef} style={style}>
        {items[index].content}
      </div>
    );
  };
  
  return (
    <VariableSizeList
      ref={listRef}
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%">
      {Row}
    </VariableSizeList>
  );
}

// 2. Horizontal Virtualization
import { FixedSizeList } from 'react-window';

function HorizontalList({ items }) {
  return (
    <FixedSizeList
      height={200}
      itemCount={items.length}
      itemSize={300} // Width instead of height
      layout="horizontal" // Key difference!
      width={800}>
      {({ index, style }) => (
        <div style={style}>
          <Card data={items[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}

// 3. Infinite Loading with react-window-infinite-loader
import InfiniteLoader from 'react-window-infinite-loader';

function InfiniteList({ loadMoreItems, hasNextPage, items }) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  
  const loadMoreItemsCallback = useCallback(() => {
    if (!isItemLoaded(items.length - 1)) {
      return loadMoreItems();
    }
  }, [items.length, loadMoreItems]);
  
  const isItemLoaded = (index) => {
    return !hasNextPage || index < items.length;
  };
  
  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItemsCallback}>
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          ref={ref}
          onItemsRendered={onItemsRendered}
          height={600}
          itemCount={itemCount}
          itemSize={50}
          width="100%">
          {({ index, style }) => (
            <div style={style}>
              {isItemLoaded(index) ? 
                items[index].name : 
                'Loading...'}
            </div>
          )}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

// 4. Grid Virtualization with react-window
import { FixedSizeGrid } from 'react-window';

function VirtualGrid({ items, columnCount }) {
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const item = items[index];
    
    if (!item) return null;
    
    return (
      <div style={{
        ...style,
        padding: '8px'
      }}>
        <GridItem data={item} />
      </div>
    );
  };
  
  return (
    <FixedSizeGrid
      columnCount={columnCount}
      columnWidth={200}
      height={600}
      rowCount={Math.ceil(items.length / columnCount)}
      rowHeight={200}
      width={1000}>
      {Cell}
    </FixedSizeGrid>
  );
}

// Pro Tips:
// 1. Use React.memo on row components
// 2. Implement proper keys
// 3. Add overscan for smooth scrolling
// 4. Consider intersection observer for lazy images
// 5. Profile with React DevTools`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: "The Master's Wisdom:",
					content: "Virtualization is not just about lists - it's a philosophy of rendering only what's necessary. From dynamic heights to infinite grids, the principles remain: measure, calculate, render efficiently, and reuse aggressively. Master these techniques, and no amount of data will overwhelm your applications. The key is choosing the right tool for each challenge."
				}}
				reflectionQuestions={[
					'Aria has become the Keeper of the Infinite, mastering every virtualization technique. But Guardian Zephyr\'s final lesson resonates: "True mastery isn\'t using these techniques everywhere - it\'s knowing when they\'re needed."',
					'As you build your applications, remember the Vault\'s teachings. Not every list needs virtualization, but when you face truly massive data, these techniques transform the impossible into the effortless.'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 28 (Evening)",
					content:
						"I've become the Keeper of the Infinite! Guardian Zephyr's four advanced challenges: 1) Dynamic Heights - VariableSizeList with cached measurements and resetAfterIndex(). 2) Horizontal Scrolling - layout='horizontal' for carousels and timelines. 3) Infinite Loading - react-window-infinite-loader to load data as users scroll near the end. 4) Grid Virtualization - FixedSizeGrid for 2D scrolling (virtualizing rows AND columns). My performance optimization journey is complete! From the Speed Sanctum (profiling, memoization), Memory Monastery (leaks, cleanup), Lazy Library (code splitting), to this Vault. Binary and I are now Performance Masters, ready for any challenge!",
				}}
				chapterEnding={[
					'With the secrets of the Virtualization Vault mastered, Aria had completed her performance optimization journey. From the Speed Sanctum to the Memory Monastery, from the Lazy Library to this infinite archive, she had learned to make React applications not just functional, but blazingly fast.',
					'The React Kingdom celebrated as applications everywhere became smoother, faster, and more responsive. Aria\'s journey through Act III had transformed her into a true Performance Master, ready for whatever challenges lay ahead...'
				]}
			/>
		</div>
	);
};

export default ChapterThree;