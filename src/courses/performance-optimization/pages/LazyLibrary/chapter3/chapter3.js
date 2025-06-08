import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		loadedModules,
		bundleSize,
		routeStrategy,
		applyStrategy,
		calculateMetrics
	} = useOutletContext();

	const [optimizationLevel, setOptimizationLevel] = useState(0);
	const [masteryCertificate, setMasteryCertificate] = useState(false);
	const [selectedStrategies, setSelectedStrategies] = useState({
		routeSplitting: false,
		vendorSplitting: false,
		preloading: false,
		prefetching: false
	});

	const routes = [
		{ path: '/', name: 'Home', size: 50, frequency: 'always' },
		{ path: '/dashboard', name: 'Dashboard', size: 200, frequency: 'common' },
		{ path: '/analytics', name: 'Analytics', size: 300, frequency: 'rare' },
		{ path: '/settings', name: 'Settings', size: 100, frequency: 'common' },
		{ path: '/admin', name: 'Admin Panel', size: 400, frequency: 'rare' }
	];

	const strategies = [
		{
			id: 'routeSplitting',
			name: 'Route-Based Splitting',
			description: 'Split code by routes - the most effective strategy',
			icon: '🛤️'
		},
		{
			id: 'vendorSplitting',
			name: 'Vendor Chunking',
			description: 'Separate third-party libraries for better caching',
			icon: '📚'
		},
		{
			id: 'preloading',
			name: 'Smart Preloading',
			description: 'Load components when users are likely to need them',
			icon: '🔮'
		},
		{
			id: 'prefetching',
			name: 'Resource Prefetching',
			description: 'Fetch resources during idle time',
			icon: '🎯'
		}
	];

	const applyOptimization = (strategyId) => {
		setSelectedStrategies({ ...selectedStrategies, [strategyId]: true });
		setOptimizationLevel(optimizationLevel + 1);
		applyStrategy(strategyId);
	};

	useEffect(() => {
		if (optimizationLevel >= 4) {
			setMasteryCertificate(true);
		}
	}, [optimizationLevel]);

	const metrics = calculateMetrics();

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Grand Library Architecture
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Now for the final lesson," Keeper Chronos said, leading <strong>Aria</strong> 
					to the Library's architectural plans. "Lazy loading is powerful, but without 
					proper <strong>strategy</strong>, it becomes chaos."
				</p>

				<p className='story-paragraph'>
					The plans revealed intricate pathways and loading patterns. "The secret is in 
					the <strong>splitting strategy</strong>. Route-based splitting for major sections, 
					vendor chunking for libraries, and intelligent preloading for predicted paths."
				</p>

				<p className='story-paragraph'>
					"Master these four strategies," Chronos continued, "and you'll achieve the 
					perfect balance between performance and user experience. The Library will 
					recognize you as a <strong>Performance Architect</strong>."
				</p>

				<div className='library-hall'>
					<h3>Architectural Strategies</h3>
					<div style={{ color: 'white', textAlign: 'center' }}>
						Applied Optimizations: {optimizationLevel}/4
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Master the Four Strategies
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Apply each optimization strategy to see how they work together to create 
							the ultimate performance architecture.
						</strong>
					</p>
				</div>

				<div className='strategy-selector'>
					<h4>Choose Your Optimization Strategy:</h4>
					<div className='strategy-options'>
						{strategies.map(strategy => (
							<div 
								key={strategy.id}
								className={`strategy-option ${selectedStrategies[strategy.id] ? 'active' : ''}`}
								onClick={() => !selectedStrategies[strategy.id] && applyOptimization(strategy.id)}
								style={{ cursor: selectedStrategies[strategy.id] ? 'default' : 'pointer' }}>
								<div style={{ fontSize: '2em' }}>{strategy.icon}</div>
								<h5>{strategy.name}</h5>
								<p style={{ fontSize: '0.9em', color: '#6b7280' }}>
									{strategy.description}
								</p>
								{selectedStrategies[strategy.id] && (
									<div style={{ color: '#10b981', marginTop: '10px' }}>
										✅ Applied
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{selectedStrategies.routeSplitting && (
					<div className='route-tree'>
						<h4>Route-Based Code Splitting</h4>
						{routes.map(route => (
							<div 
								key={route.path} 
								className={`route-node ${route.frequency === 'rare' ? 'lazy' : ''}`}>
								<span className='route-name'>{route.name}</span>
								<span className='route-status'>
									{route.size}KB - {route.frequency === 'rare' ? 'Lazy Loaded' : 'Eager Loaded'}
								</span>
							</div>
						))}
					</div>
				)}

				{optimizationLevel > 0 && (
					<div className='performance-dashboard'>
						<h4>Performance Impact</h4>
						<div className='metrics-grid'>
							<div className='metric-box'>
								<div className='metric-label'>Initial Bundle</div>
								<div className='metric-value'>
									{Math.max(400, bundleSize - (optimizationLevel * 200))}
									<span className='metric-unit'>KB</span>
								</div>
							</div>
							<div className='metric-box'>
								<div className='metric-label'>Load Time</div>
								<div className='metric-value'>
									{Math.max(1.2, 8 - (optimizationLevel * 1.5)).toFixed(1)}
									<span className='metric-unit'>sec</span>
								</div>
							</div>
							<div className='metric-box'>
								<div className='metric-label'>Cache Hit Rate</div>
								<div className='metric-value'>
									{20 + (optimizationLevel * 20)}
									<span className='metric-unit'>%</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className='code-example'>
				<div className='lazy-scroll'>
					<div className='scroll-header'>
						<span>The Master Scroll of Optimization</span>
						<span className='discovered-by'>Complete Splitting Strategy</span>
					</div>
					<pre>{`// The Complete Performance Architecture

// 1. Route-Based Splitting Strategy
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home /> // Small, always loaded
      },
      {
        path: 'dashboard',
        lazy: () => import('./pages/Dashboard') // Common, lazy
      },
      {
        path: 'analytics',
        lazy: () => import('./pages/Analytics') // Heavy, lazy
      },
      {
        path: 'admin',
        lazy: () => import('./pages/Admin') // Rare, lazy
      }
    ]
  }
];

// 2. Vendor Chunking Configuration
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10
      },
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react-vendor',
        priority: 20
      },
      charts: {
        test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
        name: 'charts-vendor',
        priority: 15
      }
    }
  }
}

// 3. Smart Preloading Strategy
function NavigationWithPreload() {
  const preloadAnalytics = () => {
    // Start loading before navigation
    import('./pages/Analytics');
  };
  
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link 
        to="/analytics"
        onMouseEnter={preloadAnalytics}
        onFocus={preloadAnalytics}>
        Analytics
      </Link>
    </nav>
  );
}

// 4. Resource Hints and Prefetching
function OptimizedApp() {
  useEffect(() => {
    // Prefetch likely next routes
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Prefetch based on user role
        if (user.isAdmin) {
          import('./pages/Admin');
        }
        // Prefetch common next steps
        import('./components/UserProfile');
      });
    }
  }, []);
  
  return <App />;
}

// 5. Progressive Enhancement Pattern
const ProgressiveFeature = lazy(() => 
  import(/* webpackPreload: true */ './CriticalFeature')
);

const OptionalFeature = lazy(() => 
  import(/* webpackPrefetch: true */ './OptionalFeature')
);

// 6. Bundle Analysis Script
// package.json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
  "bundle-report": "webpack-bundle-analyzer build/stats.json"
}

// 7. Performance Budget
// bundle-budget.js
module.exports = {
  bundles: [
    {
      name: 'main',
      maxSize: '200KB'
    },
    {
      name: 'vendor',
      maxSize: '150KB'
    }
  ]
};`}</pre>
				</div>
			</div>

			{masteryCertificate && (
				<div className='librarian-card' style={{ 
					background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
					color: '#1f2937',
					marginTop: '30px' 
				}}>
					<h3>🏆 Performance Architect Achieved!</h3>
					<p>
						"Magnificent!" Keeper Chronos exclaimed. "You have mastered all four 
						optimization strategies. The Lazy Library recognizes you as a 
						<strong> Performance Architect</strong>!"
					</p>
					<div style={{ marginTop: '20px' }}>
						<h4>Your Achievements:</h4>
						<ul style={{ paddingLeft: '20px' }}>
							<li>Reduced initial bundle by {((1250 - 400) / 1250 * 100).toFixed(0)}%</li>
							<li>Improved load time by {((8 - 1.2) / 8 * 100).toFixed(0)}%</li>
							<li>Mastered lazy loading patterns</li>
							<li>Optimized user experience</li>
						</ul>
					</div>
				</div>
			)}

			<div className='lesson-insight'>
				<h3>The Architecture Lesson:</h3>
				<p>
					True performance optimization requires a comprehensive strategy. Route-based 
					splitting provides the foundation, vendor chunking improves caching, smart 
					preloading anticipates user needs, and prefetching utilizes idle time. Together, 
					these strategies create applications that are not just fast, but intelligently 
					fast - loading the right code at the right time.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Aria has become a Performance Architect, mastering the art of strategic code 
					splitting. But Keeper Chronos's final wisdom resonates: "Performance is not a 
					feature, it's a fundamental requirement. Every millisecond counts."
				</p>
				<p>
					As you build your applications, remember the Lazy Library's teachings. Split 
					wisely, load intelligently, and always measure the impact. Your users will 
					thank you with their engagement.
				</p>
			</div>

			{masteryCertificate && (
				<div className='chapter-ending'>
					<h3>Chapter Complete!</h3>
					<p>
						With the secrets of the Lazy Library mastered, applications across the React 
						Kingdom loaded with unprecedented speed. Aria had transformed from a student 
						to an architect of performance. But one final challenge remained - the 
						Virtualization Vault, where the secrets of handling infinite data awaited...
					</p>
				</div>
			)}
		</div>
	);
};

export default ChapterThree;