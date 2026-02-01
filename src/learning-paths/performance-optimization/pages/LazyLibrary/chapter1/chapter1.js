import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const { bundleSize, calculateMetrics } = useOutletContext();

	const [showLibrarian, setShowLibrarian] = useState(false);
	const [selectedBook, setSelectedBook] = useState(null);
	const [understandingLevel, setUnderstandingLevel] = useState(0);

	const books = [
		{
			id: 'charts',
			name: 'Chart Magic',
			size: 180,
			description: 'Powerful data visualization',
		},
		{
			id: 'editor',
			name: 'Code Editor Tome',
			size: 250,
			description: 'Rich text editing spells',
		},
		{
			id: 'calendar',
			name: 'Time Keeper',
			size: 120,
			description: 'Calendar and date magic',
		},
		{
			id: 'animations',
			name: 'Motion Scrolls',
			size: 150,
			description: 'Animation enchantments',
		},
		{
			id: 'forms',
			name: 'Form Alchemy',
			size: 90,
			description: 'Advanced form handling',
		},
		{
			id: 'maps',
			name: 'World Atlas',
			size: 300,
			description: 'Interactive map components',
		},
	];

	const handleBookClick = (book) => {
		setSelectedBook(book);
		setUnderstandingLevel(understandingLevel + 1);
		if (understandingLevel >= 2) {
			setShowLibrarian(true);
		}
	};

	const metrics = calculateMetrics();

	return (
		<div className='chapter'>
			<ChapterIntro chapterNumber={1} title='The Burden of Knowledge' />

			<StorySection
				paragraphs={[
					<>
						<strong>Aria</strong> arrived at the Lazy Library, a
						mystical repository where all React knowledge was
						stored. But something was wrong - the main entrance was
						blocked by an enormous bundle of books, too heavy for
						anyone to move.
					</>,
					<>
						<strong>Keeper Chronos</strong>, the ancient librarian,
						appeared from the shadows. "Ah, another victim of the{' '}
						<strong>Bundle Burden</strong>. Young developers pack
						every possible library into their applications, not
						realizing that users must carry this weight with every
						page load."
					</>,
					<>
						He gestured to the towering shelves. "Each book
						represents a library or component. Some are essential
						for every visitor, but many are needed only by a few.
						Yet we force everyone to carry them all. This is the
						curse of <strong>eager loading</strong>."
					</>,
				]}
			/>

			<div className='library-hall'>
				<h3>The Great Bundle</h3>
				<div className='bundle-meter'>
					<div
						className='bundle-size'
						style={{ width: `${(bundleSize / 1250) * 100}%` }}>
						<span className='bundle-label'>
							Main Bundle: {bundleSize}KB
						</span>
					</div>
				</div>
				<p
					style={{
						textAlign: 'center',
						color: 'white',
						marginTop: '10px',
					}}>
					{bundleSize > 1000
						? '⚠️ Bundle too large for optimal loading!'
						: '✅ Bundle size improving'}
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Exploring the Bundle
				</h3>
				<InstructionBox character='Keeper Chronos gestures to the towering shelves.'>
					Click on the books to understand what's in your bundle. Each
					represents a different library that adds to your
					application's initial load time.
				</InstructionBox>

				<div className='book-shelf'>
					{books.map((book) => (
						<div
							key={book.id}
							className={`book ${selectedBook?.id === book.id ? 'selected' : ''}`}
							onClick={() => handleBookClick(book)}
							style={{ cursor: 'pointer' }}>
							<div className='book-title'>{book.name}</div>
							<div className='book-size'>{book.size}KB</div>
							{selectedBook?.id === book.id && (
								<div
									style={{
										fontSize: '0.7em',
										marginTop: '10px',
									}}>
									{book.description}
								</div>
							)}
						</div>
					))}
				</div>

				{selectedBook && (
					<div className='bundle-visualizer'>
						<h4>Bundle Impact Analysis</h4>
						<p>
							"{selectedBook.name}" adds {selectedBook.size}KB to
							your bundle.
						</p>
						<p>
							That's{' '}
							{((selectedBook.size / bundleSize) * 100).toFixed(
								1
							)}
							% of your total bundle!
						</p>
						<div style={{ marginTop: '15px', color: '#9ca3af' }}>
							<small>
								On a 3G connection, this adds ~
								{(selectedBook.size / 50).toFixed(1)} seconds to
								load time.
							</small>
						</div>
					</div>
				)}
			</div>

			<CodeExample
				title='Scroll of Bundle Analysis'
				discoveredBy='The Weight of Dependencies'
				code={`// The Problem: Everything Loaded Upfront

// Traditional approach - ALL components imported immediately
import React from 'react';
import HeavyChartLibrary from 'heavy-chart-library'; // 180KB
import RichTextEditor from 'rich-text-editor';      // 250KB
import CalendarWidget from 'calendar-widget';       // 120KB
import AnimationSuite from 'animation-suite';       // 150KB
import MapComponent from 'interactive-maps';        // 300KB

// Total bundle size: 1000KB+ before your code!

function App() {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <div>
      {/* User might never click these! */}
      <button onClick={() => setShowChart(true)}>
        Show Analytics
      </button>
      
      {showChart && <HeavyChartLibrary />}
      {showEditor && <RichTextEditor />}
    </div>
  );
}

// Bundle Analysis Tools:
// 1. webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// 2. Create React App built-in
npm run build
npx source-map-explorer 'build/static/js/*.js'

// 3. Lighthouse Performance Audit
// - Shows "Reduce JavaScript execution time"
// - Lists unused JavaScript

// Common Bundle Bloat Sources:
// - Moment.js with all locales (200KB+)
// - Lodash imported fully (70KB+)
// - Multiple UI component libraries
// - Development-only code in production
// - Duplicate dependencies
// - Unminified libraries`}
			/>

			<div className='performance-dashboard'>
				<h4>Current Performance Impact</h4>
				<div className='metrics-grid'>
					<div className='metric-box'>
						<div className='metric-label'>Bundle Size</div>
						<div className='metric-value'>
							{(bundleSize / 1000).toFixed(1)}
							<span className='metric-unit'>MB</span>
						</div>
					</div>
					<div className='metric-box'>
						<div className='metric-label'>3G Load Time</div>
						<div className='metric-value'>
							{(bundleSize / 50).toFixed(1)}
							<span className='metric-unit'>sec</span>
						</div>
					</div>
					<div className='metric-box'>
						<div className='metric-label'>Parse Time</div>
						<div className='metric-value'>
							{(bundleSize / 100).toFixed(0)}
							<span className='metric-unit'>ms</span>
						</div>
					</div>
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: 'Keeper Chronos',
						description:
							'Guardian of the Lazy Library and master of temporal loading. His wisdom: "Load only what is needed, when it is needed. Time and bandwidth are precious resources that should never be wasted."',
					},
				]}
				lessonInsight={{
					title: "Keeper Chronos's Wisdom:",
					content:
						"Modern JavaScript applications often ship massive bundles containing code that many users will never execute. Every kilobyte increases download time, parse time, and execution time. The first step to optimization is understanding what's in your bundle and why. Tools like webpack-bundle-analyzer reveal the true cost of your dependencies.",
				}}
				reflectionQuestions={[
					"Keeper Chronos has revealed the burden that eager loading places on users. Think about your own applications - do you import large libraries that are only used in specific features? Do your users download code for admin panels they'll never see?",
					'The journey to performance begins with awareness. What heavy books are your users forced to carry?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 27 (Morning)",
					content:
						"I've arrived at the Lazy Library, a mystical repository where all React knowledge is stored. But something's wrong - the entrance is blocked by an enormous bundle of books! Keeper Chronos explained the Bundle Burden: developers pack every possible library into applications, forcing users to carry this weight with every page load. Each 'book' (chart library 180KB, editor 250KB, maps 300KB) adds to download time, parse time, and execution time. On 3G, each 50KB adds ~1 second! Tools like webpack-bundle-analyzer and source-map-explorer reveal the true cost. This is the curse of eager loading!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;
