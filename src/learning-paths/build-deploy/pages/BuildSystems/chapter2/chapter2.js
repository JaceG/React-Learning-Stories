import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
	const [activeOptimization, setActiveOptimization] = useState(null);
	const [bundleSize, setBundleSize] = useState(2500);
	const { fleetReadiness, setFleetReadiness, promoteRank } = useOutletContext();

	const optimizationTechniques = [
		{
			id: 'tree-shaking',
			name: 'Tree Shaking',
			icon: '🌳',
			description: 'Remove unused code like shaking dead branches from a tree',
			sizeReduction: 35,
			example: 'import { debounce } from "lodash" // Only imports what you use'
		},
		{
			id: 'code-splitting',
			name: 'Code Splitting',
			icon: '✂️',
			description: 'Split code into smaller chunks loaded on demand',
			sizeReduction: 40,
			example: 'const LazyComponent = React.lazy(() => import("./Component"))'
		},
		{
			id: 'minification',
			name: 'Minification',
			icon: '🔬',
			description: 'Compress code by removing whitespace and shortening names',
			sizeReduction: 25,
			example: 'function calculateTotal(items) → function c(i)'
		},
		{
			id: 'compression',
			name: 'Gzip Compression',
			icon: '🗜️',
			description: 'Compress files for smaller transfer sizes',
			sizeReduction: 70,
			example: 'Enable gzip/brotli on your server'
		}
	];

	const applyOptimization = (technique) => {
		setActiveOptimization(technique.id);
		const reduction = (bundleSize * technique.sizeReduction) / 100;
		setBundleSize(prev => Math.max(100, prev - reduction));
		setFleetReadiness(prev => Math.min(100, prev + 20));
		
		if (fleetReadiness >= 60) {
			promoteRank('Commander');
		}
	};

	const getBundleSizeColor = () => {
		if (bundleSize > 2000) return '#e74c3c';
		if (bundleSize > 1000) return '#f39c12';
		return '#27ae60';
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Optimization Shipyard`}
				bridge={`Admiral Webpack led Aria deeper into the docks, to the Optimization Shipyard where massive vessels were being stripped of unnecessary cargo. "Understanding the build pipeline is just the beginning," he explained. "Now we make ships faster and lighter. Code splitting, lazy loading, tree shaking - each technique serves a purpose."`}
			/>

			<div className='story-section'>
				
				<p className='story-paragraph'>
					"Tree shaking?" Aria asked, examining a massive vessel being stripped of unnecessary cargo.
				</p>

				<p className='story-paragraph'>
					"Removing dead code - like shaking a tree to remove dead branches. Your bundle should 
					only include what's actually used." The Admiral pointed to workers removing unused exports.
				</p>

				<p className='story-paragraph'>
					Aria watched as unused exports disappeared from bundles. "It's like the performance 
					optimizations, but at build time!"
				</p>

				<p className='story-paragraph'>
					Binary calculated rapidly. "Optimization efficiency increasing! Bundle size decreasing 
					by 67.3%!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Optimization Workshop</h3>
				
				<InstructionBox character={`Admiral Webpack gestures to the optimization stations. "Each technique reduces bundle size differently."`}>
					Click on each optimization technique to apply it and watch your bundle shrink. Try to get your fleet readiness above 60% to earn a promotion!
				</InstructionBox>

				<div className='bundle-analyzer'>
					<h4>Bundle Size Analyzer</h4>
					<div className='build-metrics'>
						<div className='metric-card'>
							<div className='metric-value' style={{ color: getBundleSizeColor() }}>
								{bundleSize.toFixed(0)} KB
							</div>
							<div className='metric-label'>Current Bundle Size</div>
							<div className={`metric-trend ${bundleSize < 2500 ? 'positive' : ''}`}>
								{bundleSize < 2500 ? '↓' : ''} {((2500 - bundleSize) / 2500 * 100).toFixed(1)}% reduced
							</div>
						</div>
						<div className='metric-card'>
							<div className='metric-value'>{fleetReadiness}%</div>
							<div className='metric-label'>Fleet Readiness</div>
						</div>
					</div>
				</div>

				<div className='optimization-grid'>
					{optimizationTechniques.map((technique) => (
						<div 
							key={technique.id}
							className={`optimization-card ${activeOptimization === technique.id ? 'selected' : ''}`}
							onClick={() => applyOptimization(technique)}
						>
							<div className='optimization-icon'>{technique.icon}</div>
							<div className='optimization-title'>{technique.name}</div>
							<div className='optimization-description'>{technique.description}</div>
							<div style={{ marginTop: '10px', fontSize: '0.85em', color: '#3498db' }}>
								Reduces size by ~{technique.sizeReduction}%
							</div>
							{activeOptimization === technique.id && (
								<div style={{ marginTop: '10px', color: '#27ae60' }}>✓ Applied</div>
							)}
						</div>
					))}
				</div>

				{activeOptimization && (
					<div className='code-example' style={{ marginTop: '20px' }}>
						<h4>Example: {optimizationTechniques.find(t => t.id === activeOptimization).name}</h4>
						<pre>{optimizationTechniques.find(t => t.id === activeOptimization).example}</pre>
					</div>
				)}
			</div>

			<CodeExample
				title="Optimization Techniques Manual"
				discoveredBy="From the Shipyard's master builders"
				code={`// Code Splitting with React.lazy
// Admiral: "Load only what you need, when you need it!"
const HeavyCargo = React.lazy(() => 
  import(/* webpackChunkName: "heavy-cargo" */ './HeavyCargo')
);

function App() {
  return (
    <Suspense fallback={<div>Loading cargo...</div>}>
      <HeavyCargo />
    </Suspense>
  );
}

// Tree Shaking with ES6 Modules
// Binary: "Import precision increases efficiency by 78.4%!"
import { debounce } from 'lodash-es'; // ✓ Tree-shakeable
// NOT: import _ from 'lodash'; // ✗ Imports entire library

// Production Build Configuration
// Aria's optimization notes
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // Enable tree shaking
    minimize: true,
    sideEffects: false, // Mark code as side-effect free
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Separate vendor bundles
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        // Common shared modules
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};

// Bundle Analysis Command
// Debuggora: "Visualize to optimize!"
"scripts": {
  "analyze": "webpack-bundle-analyzer dist/stats.json"
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Optimization Lesson:`,
					content: `Build optimization is about making smart decisions. Every byte matters when crossing the digital seas. Tree shaking removes unused code, code splitting loads features on demand, and compression reduces transfer sizes. Admiral Webpack's shipyard teaches us that smaller, faster bundles lead to happier users and more successful deployments.`
				}}
				reflectionQuestions={[
					`How do optimization techniques work together to create efficient bundles?`,
					`Why is it important to analyze and understand your bundle composition?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 33 (Afternoon)`,
					content: `The Optimization Shipyard is incredible! I watched workers apply tree shaking to remove dead code - like pruning branches from a tree. Binary calculated a 67.3% bundle size reduction! I learned four key techniques: Tree Shaking (removes unused code), Code Splitting (loads features on demand with React.lazy), Minification (compresses variable names), and Gzip Compression (shrinks transfer size). The Admiral promoted me to Commander after reaching 60% fleet readiness. His wisdom: "Every byte saved is a faster journey to the user."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;