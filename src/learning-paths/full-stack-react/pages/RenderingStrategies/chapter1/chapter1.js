import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const [currentScreen, setCurrentScreen] = useState('Home');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('home');
	const { 
		navigationStack,
		pushScreen,
		popScreen,
		activeNavigator,
		switchNavigator,
		advanceTrailMastery,
		setRoutesDiscovered 
	} = useOutletContext();

	const navigationPatterns = [
		{
			type: 'stack',
			name: 'Stack Navigation',
			icon: '📚',
			description: 'Linear flow, back button, drilling down',
			useCase: 'Details screens, forms, wizards',
			gesture: 'Swipe back (iOS)'
		},
		{
			type: 'tab',
			name: 'Tab Navigation',
			icon: '🗂️',
			description: 'Main sections, always visible',
			useCase: 'App main navigation, top-level sections',
			gesture: 'Tap to switch'
		},
		{
			type: 'drawer',
			name: 'Drawer Navigation',
			icon: '☰',
			description: 'Hidden menu, slide from edge',
			useCase: 'Settings, account, secondary options',
			gesture: 'Swipe from edge'
		},
		{
			type: 'modal',
			name: 'Modal Navigation',
			icon: '🪟',
			description: 'Temporary overlay screens',
			useCase: 'Login, alerts, quick actions',
			gesture: 'Swipe down to dismiss'
		}
	];

	const stackScreens = [
		{ name: 'Products', icon: '🛍️', next: ['Product Detail', 'Categories'] },
		{ name: 'Product Detail', icon: '📦', next: ['Reviews', 'Add to Cart'] },
		{ name: 'Reviews', icon: '⭐', next: [] },
		{ name: 'Categories', icon: '📂', next: ['Products'] },
		{ name: 'Cart', icon: '🛒', next: ['Checkout'] },
		{ name: 'Profile', icon: '👤', next: ['Settings', 'Orders'] }
	];

	const tabSections = [
		{ id: 'home', label: 'Home', icon: '🏠', content: 'Welcome to your app!' },
		{ id: 'explore', label: 'Explore', icon: '🔍', content: 'Discover new content' },
		{ id: 'favorites', label: 'Favorites', icon: '❤️', content: 'Your saved items' },
		{ id: 'profile', label: 'Profile', icon: '👤', content: 'Account settings' }
	];

	const drawerItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: '📊' },
		{ id: 'messages', label: 'Messages', icon: '💬' },
		{ id: 'notifications', label: 'Notifications', icon: '🔔' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' },
		{ id: 'help', label: 'Help & Support', icon: '❓' }
	];

	const handleNavigation = (screenName) => {
		if (activeNavigator === 'stack') {
			pushScreen(screenName);
			setCurrentScreen(screenName);
		}
		setRoutesDiscovered(prev => prev + 1);
		
		if (navigationStack.length >= 3) {
			advanceTrailMastery('Navigator');
		}
	};

	const handleBack = () => {
		if (navigationStack.length > 1) {
			popScreen();
			setCurrentScreen(navigationStack[navigationStack.length - 2]);
		}
	};

	const getCurrentScreenOptions = () => {
		const screen = stackScreens.find(s => s.name === currentScreen) || stackScreens[0];
		return screen.next;
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Navigation Outpost`}
			/>

		<StorySection
			paragraphs={[
				<><strong>Trail Guide Navigator</strong> ran the Navigation Outpost. "Forget URLs and browser history. Mobile navigation is about stacks, tabs, and drawers."</>,
				`The guide showed various navigation patterns. "Stack for drilling down, tabs for main sections, drawer for menus. Each platform has its own expectations."`,
				`Aria recognized concepts. "Like my Navigation Compass training, but adapted for mobile!"`,
				`Binary analyzed the patterns. "Stack navigation: LIFO data structure. Tab navigation: indexed access. Drawer: conditional rendering. Efficiency calculations optimal!"`,
				`"Exactly!" Trail Guide Navigator smiled. "Each pattern serves a specific purpose in the mobile journey."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Navigation Pattern Explorer</h3>

				<InstructionBox character={`Trail Guide Navigator hands you a trail map glowing with different colored paths.`}>
					{`"Each navigation pattern serves a specific purpose. Click on the different navigator types to see how Stack, Tab, Drawer, and Modal navigation work in mobile apps!"`}
				</InstructionBox>
				
				<div className='navigation-outpost'>
					<div className='navigator-selector'>
						{navigationPatterns.map((pattern) => (
							<div 
								key={pattern.type}
								className={`navigator-type ${pattern.type} ${activeNavigator === pattern.type ? 'active' : ''}`}
								onClick={() => switchNavigator(pattern.type)}
							>
								<span style={{ fontSize: '1.5em' }}>{pattern.icon}</span>
								<span>{pattern.name}</span>
							</div>
						))}
					</div>

					{activeNavigator === 'stack' && (
						<div className='stack-demo'>
							<div className='stack-header'>
								<button 
									className='back-button'
									onClick={handleBack}
									disabled={navigationStack.length <= 1}
								>
									← Back
								</button>
								<div className='screen-title'>{currentScreen}</div>
							</div>
							
							<div className='screen-content'>
								<p style={{ marginBottom: '20px', color: '#bdc3c7' }}>
									Current Stack: {navigationStack.join(' → ')}
								</p>
								
								<div className='navigation-buttons'>
									{getCurrentScreenOptions().map((screen) => (
										<button
											key={screen}
											className='navigation-demo-button'
											onClick={() => handleNavigation(screen)}
										>
											Navigate to {screen}
										</button>
									))}
								</div>
							</div>
						</div>
					)}

					{activeNavigator === 'tab' && (
						<div className='tab-demo'>
							<div className='tab-bar'>
								{tabSections.map((tab) => (
									<div 
										key={tab.id}
										className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
										onClick={() => setActiveTab(tab.id)}
									>
										<div className='tab-icon'>{tab.icon}</div>
										<div className='tab-label'>{tab.label}</div>
									</div>
								))}
							</div>
							<div className='tab-content'>
								<h4>{tabSections.find(t => t.id === activeTab)?.label}</h4>
								<p>{tabSections.find(t => t.id === activeTab)?.content}</p>
							</div>
						</div>
					)}

					{activeNavigator === 'drawer' && (
						<div className='drawer-demo'>
							<button 
								className='drawer-toggle'
								onClick={() => setDrawerOpen(!drawerOpen)}
							>
								☰
							</button>
							
							<div className='drawer-container'>
								<div className={`drawer-panel ${!drawerOpen ? 'closed' : ''}`}>
									<h4 style={{ marginBottom: '20px', color: '#4DB6AC' }}>Menu</h4>
									{drawerItems.map((item) => (
										<div 
											key={item.id}
											className={`drawer-item ${currentScreen === item.label ? 'active' : ''}`}
											onClick={() => {
												setCurrentScreen(item.label);
												setDrawerOpen(false);
											}}
										>
											<span style={{ fontSize: '1.2em' }}>{item.icon}</span>
											<span>{item.label}</span>
										</div>
									))}
								</div>
								
								<div className='drawer-content' style={{ marginLeft: drawerOpen ? '250px' : '0' }}>
									<h3>{currentScreen}</h3>
									<p style={{ color: '#bdc3c7' }}>
										Drawer navigation provides easy access to secondary features 
										without cluttering the main interface.
									</p>
								</div>
							</div>
						</div>
					)}

					{activeNavigator === 'modal' && (
						<div style={{ 
							padding: '40px',
							background: 'rgba(0, 0, 0, 0.5)',
							borderRadius: '8px',
							textAlign: 'center'
						}}>
							<div style={{ fontSize: '3em', marginBottom: '20px' }}>🪟</div>
							<h4>Modal Navigation</h4>
							<p style={{ color: '#bdc3c7', marginTop: '10px' }}>
								Modals overlay the current screen, perfect for focused tasks 
								like login, forms, or confirmations. They typically slide up 
								from bottom or fade in.
							</p>
							<button 
								style={{
									marginTop: '20px',
									padding: '10px 20px',
									background: '#5C6BC0',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									cursor: 'pointer'
								}}
							>
								Dismiss Modal (Swipe Down)
							</button>
						</div>
					)}
				</div>

				<div className='pattern-showcase'>
					{navigationPatterns.map((pattern) => (
						<div key={pattern.type} className='pattern-card'>
							<div className='pattern-icon'>{pattern.icon}</div>
							<div className='pattern-name'>{pattern.name}</div>
							<div className='pattern-description'>{pattern.description}</div>
							<div style={{ marginTop: '15px', fontSize: '0.85em' }}>
								<div style={{ color: '#5C6BC0', marginBottom: '5px' }}>
									<strong>Best for:</strong>
								</div>
								<div>{pattern.useCase}</div>
								<div style={{ color: '#FF7043', marginTop: '10px' }}>
									<strong>Gesture:</strong> {pattern.gesture}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<CodeExample
				title={`React Navigation Setup`}
				discoveredBy={`Trail Guide's navigation patterns`}
				code={`# React Navigation Installation
// Trail Guide: "React Navigation is the standard for React Native!"

npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context

# Stack Navigator
npm install @react-navigation/stack
// or for native feel:
npm install @react-navigation/native-stack

# Basic App Structure
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

# Navigation in Components
// Binary: "Navigation prop injected automatically!"

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  // Read params
  const { itemId, otherParam } = route.params;
  
  return (
    <View style={styles.container}>
      <Text>Details for item {itemId}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

# Tab Navigator
// Debuggora: "Tabs need different package!"
npm install @react-navigation/bottom-tabs

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

# Drawer Navigator
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

# Navigation Options
// Aria: "Customize everything!"

<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: 'My Profile',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // Platform specific
    headerBackTitle: 'Back', // iOS
    headerBackTitleVisible: false, // iOS
    presentation: 'modal', // iOS modal style
  }}
/>`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Trail Guide Navigator`,
						description: `Master of the Navigation Outpost, where all paths through mobile apps begin. His philosophy: "Mobile navigation isn't about URLs - it's about creating journeys that feel as natural as walking."`
					}
				]}
				lessonInsight={{
					title: `The Navigation Lesson:`,
					content: `The Navigation Outpost reveals that mobile navigation isn't about URLs and routes - it's about gestures, stacks, and user expectations. Trail Guide Navigator teaches that each pattern has its purpose: stacks for drilling down, tabs for main sections, drawers for secondary options, and modals for focused tasks. Success comes from choosing the right pattern for the right purpose, respecting platform conventions while maintaining consistency.`
				}}
				reflectionQuestions={[
					`Why do mobile apps use different navigation patterns than websites?`,
					`How do platform-specific gestures (like swipe-back on iOS) enhance the user experience?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 46 (Morning)`,
					content: `Arrived at the Navigation Outpost where Trail Guide Navigator showed me the four fundamental navigation patterns: Stack (📚), Tab (🗂️), Drawer (☰), and Modal (🪟). Each serves a different purpose - stacks for drilling into details, tabs for main sections always visible, drawers for secondary options, and modals for focused tasks. Binary analyzed it as LIFO structures and conditional rendering. The key insight: mobile navigation is about gestures and user expectations, not URLs. I practiced navigating through stack screens, switching tabs, and opening drawer menus. Trail Guide's wisdom: "Choose the right pattern for the right purpose."`
				}}
			/>
		</div>
	);
};

export default ChapterOne;