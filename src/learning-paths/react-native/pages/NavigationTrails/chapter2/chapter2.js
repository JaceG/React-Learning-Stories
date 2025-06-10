import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const [platformMode, setPlatformMode] = useState('ios');
	const [transitionType, setTransitionType] = useState('default');
	const [nestedLevel, setNestedLevel] = useState(0);
	const [authState, setAuthState] = useState('guest');
	const { 
		advanceTrailMastery,
		routesDiscovered,
		setRoutesDiscovered 
	} = useOutletContext();

	const platformConventions = {
		ios: {
			name: 'iOS',
			icon: '🍎',
			backGesture: 'Swipe from left edge',
			headerStyle: 'Large titles, translucent',
			tabPosition: 'Bottom tabs',
			modalStyle: 'Full screen or card',
			transitions: 'Slide horizontally',
			backButton: '< Back or chevron'
		},
		android: {
			name: 'Android',
			icon: '🤖',
			backGesture: 'System back button',
			headerStyle: 'Material Design, solid',
			tabPosition: 'Top or bottom tabs',
			modalStyle: 'Bottom sheet common',
			transitions: 'Fade or scale',
			backButton: '← Arrow'
		}
	};

	const navigationTransitions = [
		{
			name: 'Slide Horizontal',
			type: 'slide',
			description: 'iOS default - slides from right',
			platforms: ['ios'],
			code: "animation: 'slide_from_right'"
		},
		{
			name: 'Fade',
			type: 'fade',
			description: 'Android default - fades in',
			platforms: ['android'],
			code: "animation: 'fade'"
		},
		{
			name: 'Modal',
			type: 'modal',
			description: 'Slides up from bottom',
			platforms: ['ios', 'android'],
			code: "presentation: 'modal'"
		},
		{
			name: 'Custom Spring',
			type: 'spring',
			description: 'Custom spring animation',
			platforms: ['ios', 'android'],
			code: "animation: 'spring', config: { stiffness: 1000 }"
		}
	];

	const nestedNavigators = [
		{
			level: 0,
			name: 'Root Navigator',
			type: 'Stack',
			children: ['Auth', 'Main']
		},
		{
			level: 1,
			name: 'Auth Stack',
			type: 'Stack',
			children: ['Login', 'Register', 'Forgot Password']
		},
		{
			level: 1,
			name: 'Main Tabs',
			type: 'Tab',
			children: ['Home Stack', 'Profile Stack', 'Settings']
		},
		{
			level: 2,
			name: 'Home Stack',
			type: 'Stack',
			children: ['Feed', 'Post Details', 'Comments']
		}
	];

	const authFlowStates = [
		{ state: 'guest', label: 'Guest User', next: 'login', color: '#95a5a6' },
		{ state: 'login', label: 'Login Screen', next: 'authenticating', color: '#3498db' },
		{ state: 'authenticating', label: 'Checking...', next: 'authenticated', color: '#f39c12' },
		{ state: 'authenticated', label: 'Logged In', next: 'guest', color: '#27ae60' }
	];

	const deepLinkExamples = [
		{
			url: 'myapp://product/123',
			screen: 'ProductDetail',
			params: '{ id: 123 }'
		},
		{
			url: 'myapp://profile/john',
			screen: 'UserProfile',
			params: '{ username: "john" }'
		},
		{
			url: 'https://myapp.com/invite/ABC123',
			screen: 'InviteScreen',
			params: '{ code: "ABC123" }'
		}
	];

	const handlePlatformSwitch = (platform) => {
		setPlatformMode(platform);
		setRoutesDiscovered(prev => prev + 1);
	};

	const handleTransition = (type) => {
		setTransitionType(type);
		setRoutesDiscovered(prev => prev + 1);
	};

	const navigateNested = (level) => {
		setNestedLevel(level);
		if (level >= 2) {
			advanceTrailMastery('Trail Master');
		}
	};

	const progressAuth = () => {
		const current = authFlowStates.find(s => s.state === authState);
		if (current) {
			setAuthState(current.next);
			setRoutesDiscovered(prev => prev + 1);
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Platform Paths
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"iOS users expect certain transitions, Android users others," Trail 
					Guide explained. "React Navigation respects these conventions."
				</p>
				
				<p className='story-paragraph'>
					Aria implemented platform-specific navigation. "It automatically adapts!"
				</p>

				<p className='story-paragraph'>
					"That's the power - write once, feel native everywhere."
				</p>

				<p className='story-paragraph'>
					Binary computed transition matrices. "Platform.OS detection enables 
					conditional behavior. Optimization parameters platform-specific!"
				</p>

				<p className='story-paragraph'>
					Debuggora observed the differences. "iOS swipe-back gesture, Android 
					hardware back button. Each platform has deeply ingrained patterns."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Platform-Specific Navigation</h3>
				
				<div className='platform-paths'>
					<div style={{ 
						display: 'flex', 
						justifyContent: 'center', 
						gap: '20px',
						marginBottom: '30px' 
					}}>
						{Object.entries(platformConventions).map(([key, platform]) => (
							<button
								key={key}
								onClick={() => handlePlatformSwitch(key)}
								style={{
									padding: '15px 30px',
									background: platformMode === key ? 
										(key === 'ios' ? 'rgba(0, 122, 255, 0.2)' : 'rgba(61, 220, 132, 0.2)') : 
										'rgba(0, 0, 0, 0.3)',
									border: `2px solid ${key === 'ios' ? '#007AFF' : '#3DDC84'}`,
									borderRadius: '8px',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
									fontSize: '1.1em',
									fontWeight: 'bold',
									color: 'white'
								}}
							>
								<span style={{ fontSize: '1.5em' }}>{platform.icon}</span>
								{platform.name}
							</button>
						))}
					</div>

					<div className='platform-comparison'>
						<div className='platform-panel'>
							<div className='platform-header'>
								{platformConventions[platformMode].icon} {platformConventions[platformMode].name} Conventions
							</div>
							<ul className='platform-features'>
								{Object.entries(platformConventions[platformMode]).map(([key, value]) => {
									if (key !== 'name' && key !== 'icon') {
										return (
											<li key={key}>
												<strong style={{ color: '#5C6BC0' }}>
													{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
												</strong>
												<span>{value}</span>
											</li>
										);
									}
									return null;
								})}
							</ul>
						</div>

						<div className='platform-panel'>
							<div className='platform-header'>
								🎬 Transition Preview
							</div>
							<div style={{ padding: '20px' }}>
								{navigationTransitions.map((transition) => (
									<div 
										key={transition.type}
										onClick={() => handleTransition(transition.type)}
										style={{
											padding: '15px',
											margin: '10px 0',
											background: transitionType === transition.type ? 
												'rgba(92, 107, 192, 0.2)' : 'rgba(0, 0, 0, 0.2)',
											border: `1px solid ${transitionType === transition.type ? '#5C6BC0' : 'rgba(92, 107, 192, 0.3)'}`,
											borderRadius: '8px',
											cursor: 'pointer',
											transition: 'all 0.3s ease'
										}}
									>
										<div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
											{transition.name}
										</div>
										<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
											{transition.description}
										</div>
										<div style={{ fontSize: '0.85em', marginTop: '5px' }}>
											<code>{transition.code}</code>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='navigation-flow'>
					<h4>Nested Navigator Structure</h4>
					<div style={{ marginTop: '20px' }}>
						{nestedNavigators.map((nav, index) => (
							<div 
								key={index}
								onClick={() => navigateNested(nav.level)}
								style={{
									marginLeft: `${nav.level * 40}px`,
									padding: '15px',
									margin: '10px 0',
									background: nestedLevel === nav.level ? 
										'rgba(92, 107, 192, 0.2)' : 'rgba(0, 0, 0, 0.3)',
									border: `1px solid ${nestedLevel === nav.level ? '#5C6BC0' : 'rgba(92, 107, 192, 0.3)'}`,
									borderRadius: '8px',
									cursor: 'pointer',
									transition: 'all 0.3s ease'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
									<span style={{ 
										padding: '5px 10px', 
										background: nav.type === 'Stack' ? '#7986CB' : '#64B5F6',
										borderRadius: '4px',
										fontSize: '0.85em',
										fontWeight: 'bold'
									}}>
										{nav.type}
									</span>
									<strong>{nav.name}</strong>
								</div>
								<div style={{ marginTop: '10px', fontSize: '0.9em' }}>
									Screens: {nav.children.join(' → ')}
								</div>
							</div>
						))}
					</div>
					{nestedLevel >= 2 && (
						<div style={{ 
							marginTop: '20px', 
							padding: '15px',
							background: 'rgba(46, 204, 113, 0.1)',
							border: '1px solid rgba(46, 204, 113, 0.3)',
							borderRadius: '8px',
							textAlign: 'center'
						}}>
							🎯 Nested Navigation Mastery Achieved!
						</div>
					)}
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Authentication Flow</h4>
					<div className='flow-diagram'>
						{authFlowStates.map((state, index) => (
							<>
								<div 
									key={state.state}
									className='flow-screen'
									style={{ 
										borderColor: state.color,
										background: authState === state.state ? 
											`${state.color}20` : 'rgba(0, 0, 0, 0.3)'
									}}
									onClick={progressAuth}
								>
									{state.label}
								</div>
								{index < authFlowStates.length - 1 && (
									<div className='flow-arrow'>→</div>
								)}
							</>
						))}
					</div>
					<p style={{ textAlign: 'center', marginTop: '20px', color: '#bdc3c7' }}>
						Click to progress through authentication flow
					</p>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Deep Linking Examples</h4>
					<div style={{ 
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '8px',
						padding: '20px'
					}}>
						{deepLinkExamples.map((link, index) => (
							<div key={index} style={{
								padding: '15px',
								margin: '10px 0',
								background: 'rgba(255, 255, 255, 0.05)',
								borderRadius: '6px',
								fontFamily: 'monospace',
								fontSize: '0.9em'
							}}>
								<div style={{ color: '#64B5F6' }}>{link.url}</div>
								<div style={{ marginTop: '5px' }}>
									→ {link.screen} {link.params}
								</div>
							</div>
						))}
					</div>
				</div>

				{routesDiscovered >= 15 && (
					<div className='routes-discovered'>
						<h4>Trail Mastery Progress</h4>
						<div className='route-count'>{routesDiscovered}</div>
						<div>Routes Discovered</div>
						<div className='trail-badge'>🗺️ Platform Path Expert</div>
					</div>
				)}
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Platform-Specific Navigation</span>
					<span className='discovered-by'>Trail Guide's platform wisdom</span>
				</div>
				<pre>{`# Platform-Specific Options
// Trail Guide: "Respect platform conventions!"

import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#6200EE',
    },
    headerTintColor: '#fff',
    // Platform-specific animations
    animation: Platform.select({
      ios: 'slide_from_right',
      android: 'fade',
    }),
    // iOS specific
    headerLargeTitle: Platform.OS === 'ios',
    headerTransparent: Platform.OS === 'ios',
    headerBlurEffect: Platform.OS === 'ios' ? 'regular' : undefined,
    // Android specific
    headerPressColorAndroid: '#6200EE',
    headerShadowVisible: Platform.OS === 'android',
  }}
>
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>

# Custom Transitions
// Binary: "Transition matrices computed!"

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const forSlide = ({ current, next, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  };
};

<Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={{
    cardStyleInterpolator: Platform.OS === 'ios' ? forSlide : forFade,
  }}
/>

# Nested Navigators
// Debuggora: "Navigation hierarchy requires careful planning!"

function RootNavigator() {
  const isSignedIn = useAuth();
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Modal" component={ModalScreen} 
            options={{ presentation: 'modal' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}

# Authentication Flow
// Aria: "Conditional navigation based on auth state!"

function Navigation() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <SplashScreen />;
  }
  
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

# Deep Linking Configuration
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Main: {
        screens: {
          HomeTab: {
            screens: {
              Feed: 'feed',
              Post: 'post/:id',
            },
          },
          ProfileTab: {
            screens: {
              Profile: 'user/:username',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

<NavigationContainer linking={linking}>
  <RootNavigator />
</NavigationContainer>

# Platform Navigation Patterns
// iOS Pattern
navigation.setOptions({
  headerLeft: () => (
    <Button onPress={() => navigation.goBack()} title="Cancel" />
  ),
  headerRight: () => (
    <Button onPress={handleSave} title="Save" />
  ),
});

// Android Pattern
navigation.setOptions({
  headerLeft: () => (
    <IconButton icon="close" onPress={() => navigation.goBack()} />
  ),
  headerRight: () => (
    <IconButton icon="check" onPress={handleSave} />
  ),
});`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Platform Path Lesson:</h3>
				<p>
					Platform Paths teach that native feel comes from respecting conventions. 
					Trail Guide Navigator's wisdom: iOS users expect smooth horizontal 
					transitions and swipe gestures, while Android users rely on the system 
					back button and material transitions. Nested navigators create complex 
					app structures, authentication flows control access, and deep linking 
					connects the web and app worlds. Success lies in embracing each 
					platform's strengths while maintaining a consistent experience.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do nested navigators help organize complex app structures?
				</p>
				<p>
					Why is it important to handle authentication state in navigation?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;