import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const [hoveredShip, setHoveredShip] = useState(null);
	const [selectedBuildPhase, setSelectedBuildPhase] = useState(null);
	const { prepareShip, deploymentShips } = useOutletContext();

	const buildPhases = [
		{ 
			id: 'development', 
			icon: '🛠️', 
			name: 'Development Port',
			description: 'Raw code with all dependencies and dev tools'
		},
		{ 
			id: 'bundling', 
			icon: '📦', 
			name: 'Bundling Dock',
			description: 'Combining modules into optimized packages'
		},
		{ 
			id: 'optimization', 
			icon: '⚡', 
			name: 'Optimization Bay',
			description: 'Minifying, tree-shaking, and compressing'
		},
		{ 
			id: 'deployment', 
			icon: '🚀', 
			name: 'Launch Platform',
			description: 'Production-ready code for deployment'
		}
	];

	const deploymentVessels = [
		{
			name: 'SS Bundle Explorer',
			type: 'Analysis Frigate',
			cargo: 'Bundle size analyzer',
			icon: '🔍'
		},
		{
			name: 'HMS Code Splitter',
			type: 'Optimization Cruiser',
			cargo: 'Dynamic imports handler',
			icon: '✂️'
		},
		{
			name: 'Tree Shaker',
			type: 'Cleanup Vessel',
			cargo: 'Dead code eliminator',
			icon: '🌳'
		}
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Deployment Armada Docks`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Ambassador Aria!" the Admiral boomed. "Your applications are powerful, but they're 
					still in the kingdom. Time to learn the art of deployment - transforming development 
					code into production-ready vessels."
				</p>

				<p className='story-paragraph'>
					Binary scanned the ships. "Each one is optimized differently, Aria. Minified code, 
					bundled assets, tree-shaken dependencies..."
				</p>

				<p className='story-paragraph'>
					Debuggora perched on a mast. "And each journey has its own perils - failed builds, 
					missing dependencies, environment mismatches."
				</p>

				<p className='story-paragraph'>
					Admiral Webpack handed Aria a captain's hat. "Today, you become a deployment captain. 
					First lesson: understanding how we transform your code for the journey."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Build Pipeline Visualizer</h3>
				
				<InstructionBox character={`Admiral Webpack hands you a captain's compass. "Every deployment captain must understand the build pipeline."`}>
					Click on each build phase to learn what happens at each stage. Then prepare your deployment fleet by clicking on the vessels below.
				</InstructionBox>

				<div style={{ 
					background: 'rgba(52, 152, 219, 0.1)', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<div style={{ display: 'flex', gap: '30px' }}>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Ships Prepared: </span>
							<span style={{ color: '#3498db', fontWeight: 'bold' }}>{deploymentShips.length}/3</span>
						</div>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Build Phase: </span>
							<span style={{ color: '#e67e22', fontWeight: 'bold' }}>
								{selectedBuildPhase ? buildPhases.find(p => p.id === selectedBuildPhase).name : 'Not Started'}
							</span>
						</div>
					</div>
				</div>
				
				<div className='build-pipeline'>
					<h4>The Journey from Development to Production</h4>
					<div className='pipeline-stages'>
						{buildPhases.map((phase, index) => (
							<>
								<div 
									key={phase.id}
									className={`pipeline-stage ${selectedBuildPhase === phase.id ? 'active' : ''}`}
									onClick={() => setSelectedBuildPhase(phase.id)}
									style={{ cursor: 'pointer' }}
								>
									<div className='stage-icon'>{phase.icon}</div>
									<div className='stage-name'>{phase.name}</div>
								</div>
								{index < buildPhases.length - 1 && (
									<div className='stage-arrow'>→</div>
								)}
							</>
						))}
					</div>

					{selectedBuildPhase && (
						<div className='phase-details'>
							<h5>{buildPhases.find(p => p.id === selectedBuildPhase).name}</h5>
							<p>{buildPhases.find(p => p.id === selectedBuildPhase).description}</p>
						</div>
					)}
				</div>

				<div className='ship-manifest'>
					<div className='manifest-header'>⚓ Deployment Fleet Registry ⚓</div>
					<div className='optimization-grid'>
						{deploymentVessels.map((vessel, index) => (
							<div 
								key={index}
								className={`ship-card ${hoveredShip === index ? 'active' : ''}`}
								onMouseEnter={() => setHoveredShip(index)}
								onMouseLeave={() => setHoveredShip(null)}
								onClick={() => prepareShip(vessel)}
							>
								<div className='ship-header'>
									<span className='ship-icon'>{vessel.icon}</span>
									<span className='ship-name'>{vessel.name}</span>
								</div>
								<div className='ship-class'>{vessel.type}</div>
								<p style={{ marginTop: '10px', fontSize: '0.9em' }}>
									Cargo: {vessel.cargo}
								</p>
								{deploymentShips.find(s => s.name === vessel.name) && (
									<div style={{ color: '#27ae60', marginTop: '10px' }}>
										✓ Prepared for deployment
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			<CodeExample
				title="Admiral Webpack's Build Configuration Scroll"
				discoveredBy="First lesson in deployment mastery"
				code={`// The Admiral's Basic Webpack Configuration
const path = require('path');

module.exports = {
  // Entry point - where your journey begins
  entry: './src/index.js',
  
  // Output - your production-ready vessel
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true // Clear old ships before building new ones
  },
  
  // Build mode - determines optimization level
  mode: 'production', // Admiral: "Always optimize for the journey!"
  
  // Module rules - how to process different cargo types
  module: {
    rules: [
      {
        test: /\\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  
  // Optimization - making ships faster and lighter
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        }
      }
    }
  }
};

// Aria's notes: "Each configuration option prepares the code 
// for its journey differently. The Admiral says understanding 
// these options is key to successful deployments!"`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Admiral Webpack`,
						description: `Commander of the Deployment Armada who transforms development code into production-ready vessels. His philosophy: "Every byte saved is a faster journey to the user."`
					}
				]}
				lessonInsight={{
					title: `The Build Lesson:`,
					content: `Building for production is like preparing a ship for ocean voyage - every unnecessary item adds weight, every optimization speeds the journey. Admiral Webpack teaches that understanding your build process is as important as writing the code itself. Modern build tools transform your development code into efficient, production-ready bundles that load quickly and run smoothly.`
				}}
				reflectionQuestions={[
					`How does thinking of builds as 'preparing ships' help visualize the optimization process?`,
					`Why is it important to understand what happens during the build process?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 33 (Morning)`,
					content: `The Deployment Armada Docks are magnificent! Admiral Webpack commands a fleet of optimization vessels, each designed for a specific aspect of the build process. I learned about the build pipeline: from Development Port where raw code lives, through Bundling Dock where modules combine, to Optimization Bay where tree-shaking and minification occur, and finally to the Launch Platform. The Admiral's wisdom: "Understanding your build process is as important as writing the code itself." I prepared three ships today - the Bundle Explorer, Code Splitter, and Tree Shaker. Each transforms code differently for its production journey.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;