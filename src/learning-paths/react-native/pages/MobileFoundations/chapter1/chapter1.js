import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const [activeFeature, setActiveFeature] = useState(null);
	const [platformView, setPlatformView] = useState('both');
	const { 
		translateComponent, 
		selectedPlatform, 
		switchPlatform,
		advanceSkill,
		setFrontierProgress 
	} = useOutletContext();

	const webToNativeComponents = [
		{ web: '<div>', native: '<View>', icon: '📦', description: 'Container component' },
		{ web: '<span>', native: '<Text>', icon: '📝', description: 'Text display' },
		{ web: '<img>', native: '<Image>', icon: '🖼️', description: 'Image display' },
		{ web: '<button>', native: '<TouchableOpacity>', icon: '👆', description: 'Touchable element' },
		{ web: '<input>', native: '<TextInput>', icon: '⌨️', description: 'Text input field' },
		{ web: 'overflow: scroll', native: '<ScrollView>', icon: '📜', description: 'Scrollable container' }
	];

	const nativeFeatures = [
		{ id: 'accelerometer', name: 'Accelerometer', icon: '📐', status: 'Available' },
		{ id: 'camera', name: 'Camera', icon: '📸', status: 'Permission Required' },
		{ id: 'gps', name: 'GPS Location', icon: '📍', status: 'Permission Required' },
		{ id: 'contacts', name: 'Contacts', icon: '👥', status: 'Permission Required' },
		{ id: 'biometric', name: 'Biometric Auth', icon: '👆', status: 'Device Dependent' },
		{ id: 'push', name: 'Push Notifications', icon: '🔔', status: 'Setup Required' }
	];

	const platformDifferences = [
		{ 
			feature: 'Navigation Bar', 
			ios: 'Large titles, translucent', 
			android: 'Material Design, solid'
		},
		{ 
			feature: 'Shadows', 
			ios: 'shadowColor, shadowOffset', 
			android: 'elevation property'
		},
		{ 
			feature: 'Date Picker', 
			ios: 'Wheel picker', 
			android: 'Calendar dialog'
		},
		{ 
			feature: 'Fonts', 
			ios: 'San Francisco', 
			android: 'Roboto'
		}
	];

	const handleTranslation = (component) => {
		translateComponent(component);
		setFrontierProgress(prev => Math.min(100, prev + 15));
		
		// Check if user has translated enough components
		if (setFrontierProgress >= 60) {
			advanceSkill('Explorer');
		}
	};

	const exploreFeature = (featureId) => {
		setActiveFeature(featureId);
		setFrontierProgress(prev => Math.min(100, prev + 10));
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Mobile Frontier`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					Beyond the Web Kingdom's borders lay the Mobile Frontier - a vast territory 
					where applications lived not in browsers but in the very devices people 
					carried. <strong>Frontier Marshal Native</strong> met Aria at the border 
					checkpoint.
				</p>
				
				<p className='story-paragraph'>
					"Welcome to a familiar yet different world, Captain Aria," the Marshal 
					greeted. "Here, React's principles govern, but the land itself has 
					different rules. No DOM, no CSS as you know it, but native performance 
					and device capabilities."
				</p>

				<p className='story-paragraph'>
					Binary's circuits sparked with new modules. "I'm detecting accelerometers, 
					cameras, GPS sensors... so many new inputs!"
				</p>

				<p className='story-paragraph'>
					Debuggora ruffled her feathers. "And new types of bugs. Platform-specific 
					issues, device fragmentation, native crashes."
				</p>

				<p className='story-paragraph'>
					Marshal Native handed Aria a device. "Your React knowledge is your 
					foundation, but you'll need to adapt. Components are still components, 
					but View replaces div, Text replaces spans. Ready to go native?"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Platform Comparison Lab</h3>
				
				<InstructionBox character={`Marshal Native hands you a dual-screen device.`}>
					{`"This device displays both platforms side by side. Click on web components to see their native equivalents, and explore the device features that browsers can't access!"`}
				</InstructionBox>
				
				<div className='platform-lab'>
					<div className='platform-switcher'>
						<button
							className={`platform-button ios ${selectedPlatform === 'ios' ? 'active' : ''}`}
							onClick={() => switchPlatform('ios')}
						>
							<span>🍎</span> iOS
						</button>
						<button
							className={`platform-button android ${selectedPlatform === 'android' ? 'active' : ''}`}
							onClick={() => switchPlatform('android')}
						>
							<span>🤖</span> Android
						</button>
					</div>

					<div className='component-translator'>
						<div>
							<h4 style={{ color: '#e67e22', marginBottom: '20px' }}>Web Components</h4>
							{webToNativeComponents.map((comp, index) => (
								<div 
									key={index}
									className='translation-card'
									onClick={() => handleTranslation(comp)}
								>
									<div className='component-icon'>{comp.icon}</div>
									<div className='component-name'>{comp.web}</div>
									<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
										{comp.description}
									</div>
								</div>
							))}
						</div>
						
						<div className='translation-arrow'>→</div>
						
						<div>
							<h4 style={{ color: '#00BFA5', marginBottom: '20px' }}>Native Components</h4>
							{webToNativeComponents.map((comp, index) => (
								<div key={index} className='translation-card'>
									<div className='component-icon'>{comp.icon}</div>
									<div className='component-name'>{comp.native}</div>
									<div className={`translation-badge badge-${selectedPlatform}`}>
										{selectedPlatform.toUpperCase()}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='feature-explorer'>
						<h4>Native Feature Explorer</h4>
						<div className='feature-grid'>
							{nativeFeatures.map((feature) => (
								<div 
									key={feature.id}
									className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
									onClick={() => exploreFeature(feature.id)}
								>
									<div className='feature-icon'>{feature.icon}</div>
									<div className='feature-name'>{feature.name}</div>
									<div className='feature-status'>{feature.status}</div>
								</div>
							))}
						</div>
						
						{activeFeature && (
							<div style={{ 
								marginTop: '20px', 
								padding: '15px',
								background: 'rgba(0, 191, 165, 0.1)',
								borderRadius: '8px',
								border: '1px solid rgba(0, 191, 165, 0.3)'
							}}>
								<p style={{ color: '#00BFA5' }}>
									<strong>{nativeFeatures.find(f => f.id === activeFeature)?.name}</strong> - 
									This feature provides direct access to device hardware. Unlike web apps, 
									React Native can interface directly with native APIs!
								</p>
							</div>
						)}
					</div>

					<div style={{ marginTop: '30px' }}>
						<h4>Platform-Specific Differences</h4>
						<div style={{ overflowX: 'auto' }}>
							<table style={{ width: '100%', borderCollapse: 'collapse' }}>
								<thead>
									<tr>
										<th style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.3)' }}>
											Feature
										</th>
										<th style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.3)' }}>
											<span className='platform-indicator ios'>iOS</span>
										</th>
										<th style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.3)' }}>
											<span className='platform-indicator android'>Android</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{platformDifferences.map((diff, index) => (
										<tr key={index}>
											<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)' }}>
												{diff.feature}
											</td>
											<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)' }}>
												{diff.ios}
											</td>
											<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)' }}>
												{diff.android}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<CodeExample
				title={`React Native Foundations`}
				discoveredBy={`Marshal Native's introduction`}
				code={`# Your First React Native Component
// Marshal Native: "Familiar syntax, different components!"

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to the Mobile Frontier!
      </Text>
      <Text style={styles.subtitle}>
        Platform: {Platform.OS === 'ios' ? '🍎 iOS' : '🤖 Android'}
      </Text>
      
      {/* Binary: "No className, use style prop!" */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          React principles still apply:
          • Components and Props ✓
          • State and Lifecycle ✓
          • Hooks and Context ✓
        </Text>
      </View>
    </View>
  );
};

// Debuggora: "Styles are JavaScript objects!"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // Platform-specific shadows
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444'
  }
});

# Core Components Reference
// Aria: "So these replace HTML elements?"

// Layout
<View>        {/* <div> */}
<SafeAreaView> {/* Respects device safe areas */}

// Text
<Text>        {/* <span>, <p>, <h1> etc */}

// Images
<Image source={{ uri: 'https://...' }} />
<Image source={require('./local-image.png')} />

// Touchables
<TouchableOpacity>    {/* Custom opacity feedback */}
<TouchableHighlight>  {/* Highlight on press */}
<TouchableWithoutFeedback> {/* No visual feedback */}

// Input
<TextInput
  placeholder="Enter text"
  onChangeText={setText}
  value={text}
/>

// Lists
<ScrollView>  {/* For small lists */}
<FlatList     {/* For large, optimized lists */}
  data={items}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id}
/>

# Platform-Specific Code
// Marshal Native: "Embrace the differences!"

import { Platform } from 'react-native';

// Method 1: Platform.select
const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 40,
        fontFamily: 'System'
      },
      android: {
        paddingTop: 20,
        fontFamily: 'Roboto'
      }
    })
  }
});

// Method 2: Platform.OS
if (Platform.OS === 'ios') {
  // iOS specific code
} else {
  // Android specific code
}

// Method 3: Platform-specific files
// Button.ios.js
// Button.android.js
// React Native automatically picks the right one!`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Frontier Marshal Native`,
						description: `Guardian of the Mobile Frontier and bridge between web and native worlds. His philosophy: "React's principles govern here, but the land has different rules - embrace them, don't fight them."`
					}
				]}
				lessonInsight={{
					title: `The Native Lesson:`,
					content: `React Native is like speaking React with a native accent - the core language remains the same, but pronunciation and idioms change. Marshal Native teaches that success comes from embracing platform differences, not fighting them. The Mobile Frontier rewards those who adapt their web knowledge to native constraints while leveraging device capabilities that browsers can't access.`
				}}
				reflectionQuestions={[
					`How does thinking of React Native as "React with an accent" help understand the relationship?`,
					`Why might platform-specific considerations be important for user experience?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 37 (Morning)`,
					content: `I've crossed into the Mobile Frontier! Frontier Marshal Native met me at the border checkpoint - a weathered veteran who speaks both web and native fluently. Binary's circuits are sparking with new inputs: accelerometers, cameras, GPS! The core revelation: React's principles still apply, but components change. View replaces div, Text replaces span, and there's no CSS cascade. Marshal Native's wisdom: "Your React knowledge is your foundation, but you'll need to adapt." I translated my first web components to native equivalents and explored device features browsers can only dream of accessing.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;