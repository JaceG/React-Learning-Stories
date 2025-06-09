import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const [selectedBuildTarget, setSelectedBuildTarget] = useState(null);
	const [moduleFederationActive, setModuleFederationActive] = useState(false);
	const { promoteRank, fleetReadiness } = useOutletContext();

	const buildTargets = [
		{
			id: 'modern',
			name: 'Modern Browsers',
			icon: '🚀',
			description: 'ES2020+ with latest features',
			config: {
				target: 'es2020',
				browsers: 'last 2 versions',
				polyfills: 'minimal'
			}
		},
		{
			id: 'legacy',
			name: 'Legacy Support',
			icon: '🏛️',
			description: 'ES5 with full polyfills',
			config: {
				target: 'es5',
				browsers: '>0.5%, not dead',
				polyfills: 'full'
			}
		},
		{
			id: 'mobile',
			name: 'Mobile Optimized',
			icon: '📱',
			description: 'Optimized for mobile devices',
			config: {
				target: 'es2015',
				browsers: 'last 4 iOS versions, last 4 Android versions',
				polyfills: 'targeted'
			}
		},
		{
			id: 'edge',
			name: 'Edge Computing',
			icon: '🌐',
			description: 'Serverless and edge functions',
			config: {
				target: 'esnext',
				browsers: 'maintained node versions',
				polyfills: 'none'
			}
		}
	];

	const handleTargetSelection = (target) => {
		setSelectedBuildTarget(target);
		if (fleetReadiness >= 80) {
			promoteRank('Admiral');
		}
	};

	const toggleModuleFederation = () => {
		setModuleFederationActive(!moduleFederationActive);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Build Fleet
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Different destinations need different ships," Admiral Webpack explained, gesturing 
					to a vast harbor filled with specialized vessels. "Modern browsers, legacy support, 
					mobile platforms - each needs its own build configuration."
				</p>
				
				<p className='story-paragraph'>
					Aria studied the fleet manifest. "So we create multiple builds for different environments?"
				</p>

				<p className='story-paragraph'>
					"Exactly! And with module federation," the Admiral's eyes gleamed, "ships can share 
					cargo during the journey. No need to carry duplicate supplies."
				</p>

				<p className='story-paragraph'>
					Binary's processors whirred with excitement. "Like the React Native frontier, but for 
					different web environments! Calculating optimal distribution patterns..."
				</p>

				<p className='story-paragraph'>
					Debuggora examined the module federation setup. "Ships communicating mid-voyage? 
					The debugging possibilities are fascinating!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Build Target Selection</h3>
				
				<div style={{ 
					textAlign: 'center',
					padding: '20px',
					background: 'rgba(46, 204, 113, 0.1)',
					borderRadius: '8px',
					marginBottom: '20px'
				}}>
					<div style={{ fontSize: '1.2em', marginBottom: '10px' }}>
						🎉 <strong>Fleet Admiral Achievement</strong> 🎉
					</div>
					<p style={{ color: '#27ae60' }}>
						Select different build targets below to complete your fleet mastery and earn the rank of Admiral!
					</p>
				</div>
				
				<div className='optimization-grid'>
					{buildTargets.map((target) => (
						<div 
							key={target.id}
							className={`ship-card ${selectedBuildTarget?.id === target.id ? 'selected' : ''}`}
							onClick={() => handleTargetSelection(target)}
						>
							<div className='ship-header'>
								<span className='ship-icon'>{target.icon}</span>
								<span className='ship-name'>{target.name}</span>
							</div>
							<p style={{ margin: '10px 0', fontSize: '0.9em' }}>{target.description}</p>
							{selectedBuildTarget?.id === target.id && (
								<div className='code-example' style={{ marginTop: '10px' }}>
									<h5>Configuration:</h5>
									<pre>{JSON.stringify(target.config, null, 2)}</pre>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='ship-manifest' style={{ marginTop: '30px' }}>
					<h4>Module Federation Control Panel</h4>
					<div 
						className={`optimization-card ${moduleFederationActive ? 'selected' : ''}`}
						onClick={toggleModuleFederation}
						style={{ cursor: 'pointer', padding: '20px' }}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
							<span style={{ fontSize: '2em' }}>🔗</span>
							<div>
								<h5>Module Federation</h5>
								<p>Enable cargo sharing between application ships</p>
								<div style={{ marginTop: '10px', color: moduleFederationActive ? '#27ae60' : '#7f8c8d' }}>
									Status: {moduleFederationActive ? 'Active' : 'Inactive'}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Advanced Fleet Configuration</span>
					<span className='discovered-by'>Admiral Webpack's master strategy</span>
				</div>
				<pre>{`// Multiple Build Targets
// Aria: "One codebase, many destinations!"
module.exports = [
  // Modern browsers build
  {
    name: 'modern',
    target: 'web',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/modern'),
      filename: '[name].[contenthash].modern.js'
    },
    module: {
      rules: [{
        test: /\\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: { esmodules: true },
                modules: false
              }]
            ]
          }
        }
      }]
    }
  },
  
  // Legacy browsers build
  {
    name: 'legacy',
    target: ['web', 'es5'],
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/legacy'),
      filename: '[name].[contenthash].legacy.js'
    },
    module: {
      rules: [{
        test: /\\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.5%, last 2 versions, not dead',
                modules: false
              }]
            ]
          }
        }
      }]
    }
  }
];

// Module Federation Configuration
// Binary: "Shared module efficiency: 87.3%!"
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js',
        footer: 'footer@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: deps.react 
        },
        'react-dom': { 
          singleton: true,
          requiredVersion: deps['react-dom']
        }
      }
    })
  ]
};

// Differential Serving
// Debuggora: "Smart loading for every browser!"
<!-- In your HTML -->
<script type="module" src="/dist/modern/app.js"></script>
<script nomodule src="/dist/legacy/app.js"></script>`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Fleet Lesson:</h3>
				<p>
					Building for multiple targets ensures your application reaches every user 
					optimally. Modern browsers get cutting-edge features, legacy browsers get 
					compatibility, and mobile devices get optimized bundles. Admiral Webpack's 
					fleet strategy teaches us that one size doesn't fit all - tailor your 
					builds to your audience's needs while sharing resources efficiently through 
					module federation.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does building multiple targets improve the user experience across different platforms?
				</p>
				<p>
					What are the benefits and challenges of implementing module federation in your applications?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;