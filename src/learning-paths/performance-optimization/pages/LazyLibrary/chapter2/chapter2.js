import { useState, Suspense, lazy } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

// Simulated lazy components
const LazyChart = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				() =>
					resolve({
						default: () => (
							<div className='book loaded'>
								📊 Chart Component Loaded!
							</div>
						),
					}),
				2000
			);
		})
);

const LazyEditor = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(
				() =>
					resolve({
						default: () => (
							<div className='book loaded'>
								📝 Editor Component Loaded!
							</div>
						),
					}),
				1500
			);
		})
);

const ChapterTwo = () => {
	const { loadedModules, loadModule, bundleSize, splitBundle, splitBundles } =
		useOutletContext();

	const [showChart, setShowChart] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
	const [splitApplied, setSplitApplied] = useState(false);
	const [lazyLoadingEnabled, setLazyLoadingEnabled] = useState(false);

	const handleCodeSplit = () => {
		if (!splitApplied) {
			splitBundle('main', [
				{ name: 'charts.chunk.js', size: 180 },
				{ name: 'editor.chunk.js', size: 250 },
				{ name: 'vendor.chunk.js', size: 150 },
			]);
			setSplitApplied(true);
		}
	};

	const handleLazyLoad = (component) => {
		if (component === 'chart') {
			setShowChart(true);
			loadModule('Chart Library', 180);
		} else if (component === 'editor') {
			setShowEditor(true);
			loadModule('Editor Library', 250);
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title='The Art of Lazy Loading'
				bridge='Keeper Chronos led Aria to a special section of the library where books floated in mid-air, appearing only when reached for. "This is the Lazy Wing, where we practice the art of temporal loading with React.lazy() and Suspense."'
			/>

			<StorySection
				paragraphs={[
					<>
						Keeper Chronos led <strong>Aria</strong> to a special
						section of the library where books floated in mid-air,
						appearing only when reached for. "This is the{' '}
						<strong>Lazy Wing</strong>, where we practice the art of
						temporal loading."
					</>,
					<>
						"Watch this," he said, waving his hand. A book
						materialized just as he grasped for it. "With{' '}
						<strong>React.lazy()</strong> and{' '}
						<strong>Suspense</strong>, we can summon components only
						when they're needed, not before."
					</>,
					<>
						"The magic has two parts," Chronos explained. "First,{' '}
						<strong>code splitting</strong> breaks your bundle into
						smaller chunks. Then, <strong>dynamic imports</strong>{' '}
						load these chunks on demand. Your users download only
						what they use."
					</>,
				]}
			/>

			<div className='library-hall'>
				<h3>The Lazy Wing</h3>
				<button
					className='demo-button'
					onClick={() => setLazyLoadingEnabled(!lazyLoadingEnabled)}>
					{lazyLoadingEnabled ? 'Disable' : 'Enable'} Lazy Loading
					Magic
				</button>
				<div
					style={{
						marginTop: '20px',
						color: 'white',
						textAlign: 'center',
					}}>
					{lazyLoadingEnabled
						? '✨ Lazy loading active - components load on demand!'
						: '📦 Traditional loading - everything upfront'}
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Code Splitting in Action
				</h3>
				<InstructionBox character='Keeper Chronos waves his hand, revealing the magic.'>
					First, apply code splitting to break the bundle. Then try
					loading components on demand and watch the bundle size
					decrease!
				</InstructionBox>

				<div className='lazy-demo'>
					<div className='demo-controls'>
						<button
							className='demo-button success'
							onClick={handleCodeSplit}
							disabled={splitApplied}>
							{splitApplied
								? '✅ Code Split Applied'
								: 'Apply Code Splitting'}
						</button>
					</div>

					{splitApplied && (
						<div className='split-visualization'>
							{splitBundles.map((bundle, index) => (
								<div key={index} className='split-card'>
									<div className='split-icon'>📦</div>
									<div className='split-name'>
										{bundle.name}
									</div>
									<div className='chunk-list'>
										{bundle.chunks.map((chunk, i) => (
											<div key={i} className='chunk-item'>
												<span>{chunk.name}</span>
												<span>{chunk.size}KB</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}

					{lazyLoadingEnabled && (
						<div style={{ marginTop: '30px' }}>
							<h4>Load Components On Demand:</h4>
							<div className='demo-controls'>
								<button
									className='demo-button'
									onClick={() => handleLazyLoad('chart')}
									disabled={showChart}>
									Load Chart Component
								</button>
								<button
									className='demo-button'
									onClick={() => handleLazyLoad('editor')}
									disabled={showEditor}>
									Load Editor Component
								</button>
							</div>

							<div
								style={{
									marginTop: '20px',
									minHeight: '100px',
								}}>
								{showChart && (
									<Suspense
										fallback={
											<div
												style={{ textAlign: 'center' }}>
												<div className='loading-spinner'></div>
												<p>
													Loading Chart Component...
												</p>
											</div>
										}>
										<LazyChart />
									</Suspense>
								)}
								{showEditor && (
									<Suspense
										fallback={
											<div
												style={{ textAlign: 'center' }}>
												<div className='loading-spinner'></div>
												<p>
													Loading Editor Component...
												</p>
											</div>
										}>
										<LazyEditor />
									</Suspense>
								)}
							</div>
						</div>
					)}
				</div>

				<div className='bundle-visualizer'>
					<h4>Bundle Size Impact</h4>
					<div className='bundle-meter'>
						<div
							className='bundle-size'
							style={{
								width: `${(bundleSize / 1250) * 100}%`,
								background:
									bundleSize < 700
										? '#10b981'
										: 'linear-gradient(90deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
							}}>
							<span className='bundle-label'>{bundleSize}KB</span>
						</div>
					</div>
					<p style={{ marginTop: '10px' }}>
						Loaded Modules: {loadedModules.join(', ') || 'None yet'}
					</p>
				</div>
			</div>

			<CodeExample
				title='Scroll of Lazy Loading'
				discoveredBy='Dynamic Import Mastery'
				code={`// The Solution: Load on Demand

// 1. Basic React.lazy() usage
import React, { lazy, Suspense } from 'react';

// Instead of static import:
// import HeavyComponent from './HeavyComponent';

// Use dynamic import:
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// 2. Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const Analytics = lazy(() => import('./routes/Analytics'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// 3. Component-based splitting
function FeatureToggle() {
  const [showFeature, setShowFeature] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowFeature(true)}>
        Load Premium Feature
      </button>
      
      {showFeature && (
        <Suspense fallback={<Spinner />}>
          <LazyPremiumFeature />
        </Suspense>
      )}
    </>
  );
}

// 4. Advanced patterns
// Preloading components
const LazyComponent = lazy(() => import('./Heavy'));

// Preload on hover
function PreloadOnHover() {
  const handleMouseEnter = () => {
    // Start loading before user clicks
    import('./Heavy');
  };
  
  return (
    <button 
      onMouseEnter={handleMouseEnter}
      onClick={() => setShow(true)}>
      Show Component
    </button>
  );
}

// 5. Error boundaries with lazy loading
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <h2>Failed to load component</h2>;
    }
    
    return this.props.children;
  }
}

// Use with Suspense
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: "Keeper Chronos's Wisdom:",
					content:
						'React.lazy() and Suspense enable code splitting at the component level. By breaking your application into chunks and loading them on demand, you can significantly reduce initial bundle size and improve Time to Interactive (TTI). The key is finding the right split points - usually routes, modals, and feature-specific components.',
				}}
				reflectionQuestions={[
					'Keeper Chronos has shown you the power of lazy loading. Consider your own applications - which components are used by all users, and which are accessed by only a few?',
					'Every lazy-loaded component is a gift to your users - faster loads, less data usage, and better performance. Where will you apply this magic?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 27 (Afternoon)",
					content:
						"The Lazy Wing of the library is magical! Books float in mid-air, appearing only when reached for. Keeper Chronos taught me React.lazy() and Suspense - the art of temporal loading. Instead of static imports that load everything upfront, dynamic imports load chunks on demand: const HeavyComponent = lazy(() => import('./Heavy')). Wrap with Suspense for loading states! The magic has two parts: code splitting breaks the bundle into chunks, then dynamic imports load them when needed. I implemented route-based splitting for major features and component-based splitting for modals. Users download only what they use!",
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
