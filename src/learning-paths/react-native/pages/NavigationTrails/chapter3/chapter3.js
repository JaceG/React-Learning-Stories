import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [customTransition, setCustomTransition] = useState('');
	const [navigationState, setNavigationState] = useState({});
	const [deepLinkTest, setDeepLinkTest] = useState('');
	const [performanceMetrics, setPerformanceMetrics] = useState({
		screenLoad: 150,
		transitionSpeed: 300,
		memoryUsage: 45
	});
	const { 
		trailMastery,
		advanceTrailMastery,
		routesDiscovered 
	} = useOutletContext();

	const advancedPatterns = [
		{
			name: 'Custom Header',
			type: 'header',
			description: 'Animated headers, search bars, custom layouts',
			complexity: 'Medium',
			example: 'Collapsing toolbar, floating action buttons'
		},
		{
			name: 'Shared Element',
			type: 'shared',
			description: 'Smooth transitions between shared elements',
			complexity: 'High',
			example: 'Image galleries, hero animations'
		},
		{
			name: 'Bottom Sheet',
			type: 'sheet',
			description: 'Draggable bottom sheets and modals',
			complexity: 'Medium',
			example: 'Maps UI, filters, quick actions'
		},
		{
			name: 'Custom Gestures',
			type: 'gesture',
			description: 'Swipe actions, pan gestures, custom back',
			complexity: 'High',
			example: 'Swipe to delete, drag to reorder'
		}
	];

	const navigationHooks = [
		{
			hook: 'useFocusEffect',
			purpose: 'Run effects when screen focuses',
			icon: '🎯'
		},
		{
			hook: 'useIsFocused',
			purpose: 'Check if screen is focused',
			icon: '👁️'
		},
		{
			hook: 'useNavigation',
			purpose: 'Access navigation object',
			icon: '🧭'
		},
		{
			hook: 'useRoute',
			purpose: 'Access route params',
			icon: '📍'
		},
		{
			hook: 'useNavigationState',
			purpose: 'Access navigation state',
			icon: '📊'
		}
	];

	const performanceOptimizations = [
		{
			technique: 'Lazy Loading',
			improvement: 'Load screens on demand',
			impact: 30,
			code: 'React.lazy(() => import("./Screen"))'
		},
		{
			technique: 'Screen Preloading',
			improvement: 'Preload next likely screens',
			impact: 25,
			code: 'navigation.preload("NextScreen")'
		},
		{
			technique: 'Optimize Re-renders',
			improvement: 'Prevent unnecessary renders',
			impact: 40,
			code: 'React.memo(Component)'
		},
		{
			technique: 'Native Stack',
			improvement: 'Use native navigation stack',
			impact: 35,
			code: '@react-navigation/native-stack'
		}
	];

	const deepLinkScenarios = [
		{
			scenario: 'Product Link',
			url: 'myapp://product/123',
			result: 'Opens product details for ID 123',
			state: 'Main > Products > Detail'
		},
		{
			scenario: 'User Profile',
			url: 'https://app.com/u/john',
			result: 'Opens John\'s profile',
			state: 'Main > Social > Profile'
		},
		{
			scenario: 'Promo Code',
			url: 'myapp://promo/SAVE20',
			result: 'Applies promo code',
			state: 'Main > Cart > Checkout'
		}
	];

	const masterNavigationTips = [
		{
			tip: 'State Persistence',
			description: 'Save navigation state for app resume',
			icon: '💾'
		},
		{
			tip: 'Analytics Integration',
			description: 'Track screen views and user flow',
			icon: '📈'
		},
		{
			tip: 'Error Boundaries',
			description: 'Handle navigation errors gracefully',
			icon: '🛡️'
		},
		{
			tip: 'Type Safety',
			description: 'Use TypeScript for navigation',
			icon: '📘'
		}
	];

	const handlePatternSelect = (pattern) => {
		setCustomTransition(pattern.type);
		if (pattern.complexity === 'High') {
			advanceTrailMastery('Navigation Sage');
		}
	};

	const testDeepLink = (url) => {
		setDeepLinkTest(url);
		const scenario = deepLinkScenarios.find(s => s.url === url);
		if (scenario) {
			setNavigationState({
				path: scenario.state,
				params: { from: 'deeplink' }
			});
		}
	};

	const applyOptimization = (optimization) => {
		setPerformanceMetrics(prev => ({
			...prev,
			screenLoad: Math.max(50, prev.screenLoad - optimization.impact),
			transitionSpeed: Math.max(100, prev.transitionSpeed - optimization.impact),
			memoryUsage: Math.max(20, prev.memoryUsage - (optimization.impact / 2))
		}));
	};

	const getPerformanceColor = (value, metric) => {
		if (metric === 'memoryUsage') {
			return value < 50 ? '#27ae60' : value < 70 ? '#f39c12' : '#e74c3c';
		}
		return value < 200 ? '#27ae60' : value < 400 ? '#f39c12' : '#e74c3c';
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Connected Routes`}
				bridge={`"You've learned the patterns and the platform ways," Trail Guide Navigator said as they climbed to the highest point of the Navigation Outpost. "Now you must master the advanced techniques - shared element transitions, custom headers, performance optimization, and the deep linking that connects your app to the wider world."`}
			/>

		<StorySection
			paragraphs={[
				`Aria built complex navigation systems - authenticated routes, deep linking, custom transitions. "It's more complex than web routing, but more powerful for mobile UX."`,
				`Trail Guide Navigator approved. "You understand that mobile navigation isn't just about moving between screens - it's about creating intuitive user journeys."`,
				`Binary optimized navigation performance. "Screen preloading reduces transition latency by 47%. Memory footprint optimized through lazy loading protocols."`,
				`Debuggora traced user paths. "Navigation state persistence ensures users never lose their place. Deep links connect web marketing to app experiences."`,
				`"You've mastered the trails," Trail Guide said proudly. "From basic stacks to complex flows, you can guide users anywhere."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Advanced Navigation Mastery</h3>

				<InstructionBox character={`Trail Guide Navigator reveals a crystalline navigation map showing all connected routes.`}>
					{`"Explore the advanced patterns - Custom Headers, Shared Elements, Bottom Sheets, and Custom Gestures. Then optimize performance and test deep links to truly master mobile navigation!"`}
				</InstructionBox>
				
				<div className='pattern-showcase'>
					{advancedPatterns.map((pattern) => (
						<div 
							key={pattern.type}
							className='pattern-card'
							onClick={() => handlePatternSelect(pattern)}
							style={{
								borderColor: customTransition === pattern.type ? '#5C6BC0' : 'rgba(92, 107, 192, 0.3)',
								background: customTransition === pattern.type ? 'rgba(92, 107, 192, 0.1)' : 'rgba(0, 0, 0, 0.3)'
							}}
						>
							<div style={{ 
								display: 'flex', 
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '10px'
							}}>
								<div className='pattern-name'>{pattern.name}</div>
								<span style={{
									padding: '3px 8px',
									borderRadius: '12px',
									fontSize: '0.8em',
									background: pattern.complexity === 'High' ? 
										'rgba(231, 76, 60, 0.2)' : 'rgba(241, 196, 15, 0.2)',
									color: pattern.complexity === 'High' ? '#e74c3c' : '#f1c40f'
								}}>
									{pattern.complexity}
								</span>
							</div>
							<div className='pattern-description'>{pattern.description}</div>
							<div style={{ 
								marginTop: '10px', 
								fontSize: '0.85em', 
								color: '#5C6BC0' 
							}}>
								Example: {pattern.example}
							</div>
						</div>
					))}
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Navigation Hooks Arsenal</h4>
					<div style={{ 
						display: 'grid', 
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '15px',
						marginTop: '20px'
					}}>
						{navigationHooks.map((navHook) => (
							<div key={navHook.hook} style={{
								padding: '15px',
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(92, 107, 192, 0.3)',
								borderRadius: '8px',
								textAlign: 'center'
							}}>
								<div style={{ fontSize: '2em', marginBottom: '10px' }}>
									{navHook.icon}
								</div>
								<div style={{ 
									fontFamily: 'monospace', 
									color: '#64B5F6',
									marginBottom: '5px'
								}}>
									{navHook.hook}
								</div>
								<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
									{navHook.purpose}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='platform-paths' style={{ marginTop: '30px' }}>
					<h4>Performance Optimization Lab</h4>
					<div style={{ 
						display: 'grid', 
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '20px',
						marginBottom: '20px'
					}}>
						<div style={{ textAlign: 'center' }}>
							<div style={{ 
								fontSize: '2.5em', 
								fontWeight: 'bold',
								color: getPerformanceColor(performanceMetrics.screenLoad, 'screenLoad')
							}}>
								{performanceMetrics.screenLoad}ms
							</div>
							<div>Screen Load Time</div>
						</div>
						<div style={{ textAlign: 'center' }}>
							<div style={{ 
								fontSize: '2.5em', 
								fontWeight: 'bold',
								color: getPerformanceColor(performanceMetrics.transitionSpeed, 'transitionSpeed')
							}}>
								{performanceMetrics.transitionSpeed}ms
							</div>
							<div>Transition Speed</div>
						</div>
						<div style={{ textAlign: 'center' }}>
							<div style={{ 
								fontSize: '2.5em', 
								fontWeight: 'bold',
								color: getPerformanceColor(performanceMetrics.memoryUsage, 'memoryUsage')
							}}>
								{performanceMetrics.memoryUsage}MB
							</div>
							<div>Memory Usage</div>
						</div>
					</div>
					
					<div>
						{performanceOptimizations.map((opt) => (
							<div 
								key={opt.technique}
								onClick={() => applyOptimization(opt)}
								style={{
									padding: '15px',
									margin: '10px 0',
									background: 'rgba(46, 204, 113, 0.1)',
									border: '1px solid rgba(46, 204, 113, 0.3)',
									borderRadius: '8px',
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									transition: 'all 0.3s ease'
								}}
							>
								<div>
									<div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
										{opt.technique}
									</div>
									<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
										{opt.improvement}
									</div>
									<code style={{ 
										fontSize: '0.85em', 
										display: 'block',
										marginTop: '5px'
									}}>
										{opt.code}
									</code>
								</div>
								<div style={{ 
									color: '#27ae60', 
									fontWeight: 'bold',
									fontSize: '1.2em'
								}}>
									+{opt.impact}%
								</div>
							</div>
						))}
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Deep Link Testing Ground</h4>
					<div style={{ 
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '8px',
						padding: '20px'
					}}>
						{deepLinkScenarios.map((scenario) => (
							<div 
								key={scenario.url}
								onClick={() => testDeepLink(scenario.url)}
								style={{
									padding: '15px',
									margin: '10px 0',
									background: deepLinkTest === scenario.url ? 
										'rgba(92, 107, 192, 0.2)' : 'rgba(255, 255, 255, 0.05)',
									border: `1px solid ${deepLinkTest === scenario.url ? '#5C6BC0' : 'rgba(92, 107, 192, 0.3)'}`,
									borderRadius: '6px',
									cursor: 'pointer'
								}}
							>
								<div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
									{scenario.scenario}
								</div>
								<div style={{ 
									fontFamily: 'monospace', 
									color: '#64B5F6',
									fontSize: '0.9em'
								}}>
									{scenario.url}
								</div>
								<div style={{ 
									fontSize: '0.85em', 
									color: '#bdc3c7',
									marginTop: '5px'
								}}>
									→ {scenario.result}
								</div>
								{deepLinkTest === scenario.url && (
									<div style={{ 
										marginTop: '10px',
										padding: '10px',
										background: 'rgba(0, 0, 0, 0.3)',
										borderRadius: '4px',
										fontSize: '0.85em'
									}}>
										Navigation State: {scenario.state}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Navigation Mastery Tips</h4>
					<div style={{ 
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '15px'
					}}>
						{masterNavigationTips.map((tip) => (
							<div key={tip.tip} style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(92, 107, 192, 0.3)',
								borderRadius: '8px',
								display: 'flex',
								gap: '15px'
							}}>
								<div style={{ fontSize: '2em' }}>{tip.icon}</div>
								<div>
									<div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
										{tip.tip}
									</div>
									<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
										{tip.description}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{routesDiscovered >= 20 && (
					<div className='routes-discovered'>
						<h4>🎉 Navigation Mastery Complete! 🎉</h4>
						<div className='trail-badge'>
							{trailMastery === 'Navigation Sage' ? '🧙‍♂️' : '🗺️'} {trailMastery}
						</div>
						<p style={{ marginTop: '15px', color: '#5C6BC0' }}>
							You've discovered all navigation patterns and optimizations!
						</p>
					</div>
				)}
			</div>

			<CodeExample
				title={`Advanced Navigation Patterns`}
				discoveredBy={`Trail Guide's master techniques`}
				code={`# Custom Header with Animation
// Trail Guide: "Headers can be works of art!"

import { Animated } from 'react-native';

function AnimatedHeader({ scrollY }) {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 60],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
  
  return (
    <Animated.View style={{
      height: headerHeight,
      opacity: headerOpacity,
      backgroundColor: '#5C6BC0',
    }}>
      <SearchBar />
    </Animated.View>
  );
}

<Stack.Screen
  name="Feed"
  component={FeedScreen}
  options={{
    header: ({ navigation, route, options, back }) => (
      <AnimatedHeader scrollY={scrollY} />
    ),
  }}
/>

# Shared Element Transitions
// Binary: "Element continuity across screens!"

import { SharedElement } from 'react-navigation-shared-element';

// Screen A
<TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
  <SharedElement id={\`item.\${item.id}.photo\`}>
    <Image source={{ uri: item.photo }} style={styles.thumbnail} />
  </SharedElement>
</TouchableOpacity>

// Screen B
<SharedElement id={\`item.\${item.id}.photo\`}>
  <Image source={{ uri: item.photo }} style={styles.fullImage} />
</SharedElement>

// Configure shared element transition
DetailScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [\`item.\${item.id}.photo\`];
};

# Bottom Sheet Modal
// Debuggora: "Draggable sheets for quick actions!"

import BottomSheet from '@gorhom/bottom-sheet';

function MapScreen() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
  return (
    <>
      <MapView style={styles.map} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <PlacesList />
        </View>
      </BottomSheet>
    </>
  );
}

# Advanced Navigation Hooks
// Aria: "Hooks for every navigation need!"

// Focus effect - run when screen comes into focus
useFocusEffect(
  useCallback(() => {
    // Fetch fresh data
    loadData();
    
    // Cleanup
    return () => {
      cancelRequests();
    };
  }, [])
);

// Navigation state
const state = useNavigationState(state => state);
console.log('Current route:', state.routes[state.index].name);

// Prevent going back
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (isSelectionMode) {
        exitSelectionMode();
        return true; // Handled
      }
      return false; // Let default behavior happen
    };
    
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [isSelectionMode])
);

# Deep Linking with Authentication
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      // Public screens
      Welcome: 'welcome',
      SignIn: 'signin',
      // Protected screens
      Main: {
        screens: {
          Home: 'home',
          Profile: 'profile/:id',
          Settings: 'settings',
        },
      },
    },
  },
  // Custom parsing
  getStateFromPath: (path, options) => {
    // Check if user is authenticated for protected routes
    if (path.includes('profile') && !isAuthenticated()) {
      // Redirect to sign in with return URL
      return {
        routes: [
          {
            name: 'SignIn',
            params: { returnUrl: path },
          },
        ],
      };
    }
    
    return getStateFromPath(path, options);
  },
};

# Performance Monitoring
// Trail Guide's final wisdom: "Measure everything!"

const NavigationPerformanceMonitor = ({ children }) => {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        
        if (previousRouteName !== currentRouteName) {
          // Track screen view
          analytics.logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
          
          // Measure transition time
          performance.measure('navigation', previousRouteName, currentRouteName);
        }
        
        routeNameRef.current = currentRouteName;
      }}
    >
      {children}
    </NavigationContainer>
  );
};`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Connected Routes Lesson:`,
					content: `The Connected Routes reveal the true mastery of mobile navigation. Trail Guide Navigator's final teachings show that advanced patterns like shared elements, custom headers, and bottom sheets create delightful experiences. Performance optimization ensures smooth journeys, deep linking connects web and app worlds, and navigation hooks provide fine-grained control. The journey from simple stacks to complex flows completes when navigation becomes invisible - users simply flow through your app naturally.`
				}}
				reflectionQuestions={[
					`How do advanced navigation patterns enhance the mobile user experience beyond basic screen transitions?`,
					`Why is performance optimization crucial for navigation in mobile apps?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 46 (Evening)`,
					content: `What a day at the Navigation Outpost! From basic stacks to advanced mastery, Trail Guide Navigator taught me everything. I learned to create animated headers that shrink on scroll, shared element transitions for seamless image galleries, and bottom sheets like map apps use. The navigation hooks - useFocusEffect, useIsFocused, useNavigation, useRoute, useNavigationState - give fine-grained control over screen lifecycle. Performance optimization through lazy loading and native stacks reduced transition times. Deep linking with authentication handling connects marketing campaigns directly to app screens. Trail Guide's final wisdom: "When navigation becomes invisible, you've achieved mastery - users simply flow through your app naturally."`
				}}
				chapterEnding={[
					`Trail Guide Navigator watched Aria demonstrate a complex navigation flow with smooth transitions. "You've mastered the trails," he said proudly. "From basic stacks to connected routes, you can guide users anywhere."`,
					`Binary computed the achievement. "Navigation patterns: mastered. Performance metrics: optimized. Deep link configurations: complete. Trail Mastery level: Navigation Sage."`,
					`"But the journey isn't over," Trail Guide added, pointing toward the distant Distribution Harbor. "Your app must reach users. The App Distribution awaits - where you'll learn to package, publish, and deliver your creation to the world..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;