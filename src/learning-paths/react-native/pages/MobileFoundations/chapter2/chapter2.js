import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [tradedComponents, setTradedComponents] = useState([]);
	const [selectedComponent, setSelectedComponent] = useState(null);
	const [listType, setListType] = useState('scroll');
	const { 
		selectedPlatform,
		advanceSkill,
		frontierProgress,
		setFrontierProgress 
	} = useOutletContext();

	const componentTrades = [
		{
			id: 'view',
			web: { name: 'div', example: '<div className="container">' },
			native: { name: 'View', example: '<View style={styles.container}>' },
			icon: '📦',
			description: 'The fundamental building block'
		},
		{
			id: 'text',
			web: { name: 'p/span/h1', example: '<p>Hello World</p>' },
			native: { name: 'Text', example: '<Text>Hello World</Text>' },
			icon: '📝',
			description: 'All text must be wrapped'
		},
		{
			id: 'scroll',
			web: { name: 'div + CSS', example: 'overflow: scroll' },
			native: { name: 'ScrollView', example: '<ScrollView>' },
			icon: '📜',
			description: 'Explicitly scrollable containers'
		},
		{
			id: 'list',
			web: { name: 'ul/ol + map', example: 'items.map(item => ...)' },
			native: { name: 'FlatList', example: '<FlatList data={items} />' },
			icon: '📋',
			description: 'Optimized for long lists'
		},
		{
			id: 'touch',
			web: { name: 'button/a', example: '<button onClick={...}>' },
			native: { name: 'TouchableOpacity', example: '<TouchableOpacity onPress={...}>' },
			icon: '👆',
			description: 'Touchable with visual feedback'
		},
		{
			id: 'input',
			web: { name: 'input', example: '<input onChange={...} />' },
			native: { name: 'TextInput', example: '<TextInput onChangeText={...} />' },
			icon: '⌨️',
			description: 'Text input handling'
		}
	];

	const touchableVariants = [
		{ 
			name: 'TouchableOpacity', 
			effect: 'Fades on press',
			use: 'Most common choice',
			activeOpacity: 0.6
		},
		{ 
			name: 'TouchableHighlight', 
			effect: 'Color highlight',
			use: 'iOS-style feedback',
			underlayColor: '#ddd'
		},
		{ 
			name: 'TouchableWithoutFeedback', 
			effect: 'No visual feedback',
			use: 'Custom feedback',
			note: 'Use sparingly'
		},
		{ 
			name: 'Pressable', 
			effect: 'Customizable',
			use: 'Modern, flexible API',
			ripple: true
		}
	];

	const scrollData = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		title: `Item ${i + 1}`,
		icon: ['🎯', '🚀', '⭐', '🌟', '💎'][i % 5]
	}));

	const performTrade = (component) => {
		if (!tradedComponents.find(t => t.id === component.id)) {
			setTradedComponents([...tradedComponents, component]);
			setSelectedComponent(component);
			setFrontierProgress(prev => Math.min(100, prev + 15));
			
			if (tradedComponents.length >= 3) {
				advanceSkill('Trader');
			}
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Component Trading Post`}
				bridge={`Marshal Native led Aria deeper into the Mobile Frontier, past the border checkpoint to a bustling marketplace. "Now that you understand the basics, it's time to learn the language of trade. Here, web components exchange for their native equivalents - and you must understand exactly what you're getting."`}
			/>

		<StorySection
			paragraphs={[
				`Marshal Native led Aria to the Component Trading Post. "Here, web components trade for their native equivalents. View for div, ScrollView for scrollable containers, FlatList for efficient lists."`,
				`Aria experimented with translations. "The concepts are the same, but the implementation feels more... direct?"`,
				`"Exactly! You're not rendering to a browser engine, but to native UI elements. More performant, more platform-authentic."`,
				`Binary analyzed the components. "No virtual DOM intermediary. Direct native rendering. Processing efficiency increased by 40%!"`,
				`"But what about platform differences?" Aria asked. "Ah, the Platform API - your bridge between iOS and Android. Write once, adapt where needed."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Component Trading Post</h3>
				
				<InstructionBox character={`Marshal Native gestures to the trading boards.`}>
					{`"Click each web component to trade it for its native equivalent. Watch how the concepts translate - same ideas, different implementations!"`}
				</InstructionBox>
				
				<div className='trading-post'>
					<h4>Trade Your Web Components</h4>
					<div className='trade-grid'>
						{componentTrades.map((trade) => (
							<div 
								key={trade.id}
								className={`trade-card ${tradedComponents.find(t => t.id === trade.id) ? 'traded' : ''}`}
								onClick={() => performTrade(trade)}
							>
								{tradedComponents.find(t => t.id === trade.id) && (
									<div className='trade-badge'>✓</div>
								)}
								<div style={{ fontSize: '2em', marginBottom: '10px' }}>{trade.icon}</div>
								<div style={{ marginBottom: '10px' }}>
									<div style={{ color: '#e67e22' }}>Web: {trade.web.name}</div>
									<div style={{ color: '#00BFA5' }}>Native: {trade.native.name}</div>
								</div>
								<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
									{trade.description}
								</div>
							</div>
						))}
					</div>

					{selectedComponent && (
						<div style={{ 
							marginTop: '30px',
							padding: '20px',
							background: 'rgba(0, 0, 0, 0.3)',
							borderRadius: '8px',
							border: '1px solid rgba(0, 191, 165, 0.3)'
						}}>
							<h5 style={{ color: '#00BFA5', marginBottom: '15px' }}>
								Component Details: {selectedComponent.native.name}
							</h5>
							<div className='style-comparison'>
								<div className='style-panel'>
									<h4>
										<span style={{ color: '#e67e22' }}>🌐</span> Web Version
									</h4>
									<div className='style-example'>
										{selectedComponent.web.example}
									</div>
								</div>
								<div className='style-panel'>
									<h4>
										<span style={{ color: '#00BFA5' }}>📱</span> Native Version
									</h4>
									<div className='style-example'>
										{selectedComponent.native.example}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className='feature-explorer'>
					<h4>Touchable Components Showcase</h4>
					<div style={{ 
						display: 'grid', 
						gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
						gap: '20px',
						marginTop: '20px'
					}}>
						{touchableVariants.map((variant, index) => (
							<div key={index} style={{
								padding: '20px',
								background: 'rgba(0, 0, 0, 0.3)',
								borderRadius: '8px',
								border: '1px solid rgba(0, 191, 165, 0.3)',
								cursor: 'pointer',
								transition: 'all 0.3s ease'
							}}>
								<h5 style={{ color: '#00BFA5', marginBottom: '10px' }}>
									{variant.name}
								</h5>
								<div style={{ marginBottom: '10px' }}>
									<strong>Effect:</strong> {variant.effect}
								</div>
								<div style={{ marginBottom: '10px' }}>
									<strong>Use Case:</strong> {variant.use}
								</div>
								{variant.activeOpacity && (
									<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
										activeOpacity: {variant.activeOpacity}
									</div>
								)}
								{variant.underlayColor && (
									<div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
										underlayColor: "{variant.underlayColor}"
									</div>
								)}
								{variant.note && (
									<div style={{ fontSize: '0.85em', color: '#f39c12', marginTop: '5px' }}>
										⚠️ {variant.note}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>ScrollView vs FlatList</h4>
					<div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
						<button
							onClick={() => setListType('scroll')}
							style={{
								padding: '10px 20px',
								background: listType === 'scroll' ? '#00BFA5' : 'rgba(0, 0, 0, 0.3)',
								border: '1px solid #00BFA5',
								borderRadius: '5px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							ScrollView Demo
						</button>
						<button
							onClick={() => setListType('flat')}
							style={{
								padding: '10px 20px',
								background: listType === 'flat' ? '#00BFA5' : 'rgba(0, 0, 0, 0.3)',
								border: '1px solid #00BFA5',
								borderRadius: '5px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							FlatList Demo
						</button>
					</div>
					
					<div className='scroll-demo'>
						{listType === 'scroll' ? (
							<div>
								<p style={{ color: '#f39c12', marginBottom: '15px' }}>
									⚠️ ScrollView renders all children at once
								</p>
								{scrollData.map((item) => (
									<div key={item.id} className='scroll-item'>
										<span style={{ fontSize: '1.5em' }}>{item.icon}</span>
										<span>{item.title}</span>
									</div>
								))}
							</div>
						) : (
							<div>
								<p style={{ color: '#27ae60', marginBottom: '15px' }}>
									✓ FlatList renders only visible items (virtualized)
								</p>
								{scrollData.slice(0, 5).map((item) => (
									<div key={item.id} className='scroll-item'>
										<span style={{ fontSize: '1.5em' }}>{item.icon}</span>
										<span>{item.title}</span>
										<span style={{ fontSize: '0.8em', color: '#bdc3c7' }}>
											(+ {scrollData.length - 5} more items loaded on demand)
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{frontierProgress >= 60 && (
					<div className='frontier-progress'>
						<div className='skill-badge'>
							🏪 Component Trader Achieved!
						</div>
						<p style={{ marginTop: '15px', color: '#00BFA5' }}>
							You've mastered the art of component translation!
						</p>
					</div>
				)}
			</div>

			<CodeExample
				title={`Core Components in Action`}
				discoveredBy={`Trading Post examples`}
				code={`# Component Translation Guide
// Marshal Native: "Each trade has its purpose!"

// 1. View - The Universal Container
// Web: <div className="card">
// Native:
<View style={styles.card}>
  {/* All your content */}
</View>

// 2. Text - Required for ALL Text
// Web: <h1>Title</h1><p>Content</p>
// Native:
<Text style={styles.title}>Title</Text>
<Text style={styles.paragraph}>Content</Text>

// Binary: "Text components can be nested!"
<Text>
  Regular text with <Text style={{ fontWeight: 'bold' }}>bold</Text> inside
</Text>

// 3. ScrollView - Explicit Scrolling
<ScrollView 
  horizontal={false}
  showsVerticalScrollIndicator={true}
  contentContainerStyle={styles.scrollContent}
>
  {/* Good for forms, small lists */}
  {items.map(item => <ItemComponent key={item.id} {...item} />)}
</ScrollView>

// 4. FlatList - Optimized Lists
// Debuggora: "Use for any list with more than 50 items!"
<FlatList
  data={hugeDataArray}
  renderItem={({ item, index }) => (
    <View style={styles.listItem}>
      <Text>{item.title}</Text>
    </View>
  )}
  keyExtractor={item => item.id}
  // Performance optimizations
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  removeClippedSubviews={true}
  // Pull to refresh
  refreshing={isRefreshing}
  onRefresh={handleRefresh}
  // Infinite scroll
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
/>

// 5. Image - Network and Local
// Network image
<Image 
  source={{ uri: 'https://example.com/image.jpg' }}
  style={styles.image}
  resizeMode="cover"
/>

// Local image (automatically sized)
<Image 
  source={require('./assets/logo.png')}
  style={styles.logo}
/>

// With loading state
<Image 
  source={{ uri: imageUrl }}
  style={styles.image}
  onLoadStart={() => setLoading(true)}
  onLoadEnd={() => setLoading(false)}
  onError={(error) => console.log('Image failed', error)}
/>

// 6. TextInput - Form Inputs
<TextInput
  style={styles.input}
  value={text}
  onChangeText={setText} // Note: not onChange!
  placeholder="Enter text..."
  placeholderTextColor="#999"
  // Platform-specific props
  autoCapitalize="none"
  autoCorrect={false}
  keyboardType="email-address" // or 'numeric', 'phone-pad', etc
  returnKeyType="done" // or 'go', 'next', 'search'
  onSubmitEditing={handleSubmit}
  // Multiline
  multiline={true}
  numberOfLines={4}
/>

// 7. Touchable Components Best Practices
// TouchableOpacity - Most common
<TouchableOpacity 
  onPress={handlePress}
  activeOpacity={0.7}
  disabled={isDisabled}
  style={styles.button}
>
  <Text style={styles.buttonText}>Press Me</Text>
</TouchableOpacity>

// Pressable - Modern API (RN 0.63+)
<Pressable
  onPress={handlePress}
  onLongPress={handleLongPress}
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed
  ]}
>
  {({ pressed }) => (
    <Text style={[styles.text, pressed && styles.textPressed]}>
      {pressed ? 'Pressed!' : 'Press Me'}
    </Text>
  )}
</Pressable>

// Platform-Specific Components
import { Platform } from 'react-native';

// Conditional rendering
{Platform.OS === 'ios' ? (
  <DatePickerIOS date={date} onDateChange={setDate} />
) : (
  <DatePickerAndroid date={date} onDateChange={setDate} />
)}

// Aria's tip: "Always test on both platforms!"`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Trading Post Lesson:`,
					content: `The Component Trading Post reveals that React Native components aren't just renamed web elements - they're purpose-built for mobile interfaces. Marshal Native's wisdom: embrace explicit components like ScrollView and FlatList instead of fighting for web-like behavior. Each native component is optimized for touch interaction, performance, and platform conventions. Success comes from understanding not just what components to use, but why the mobile frontier demands different approaches.`
				}}
				reflectionQuestions={[
					`Why do you think React Native requires explicit components like ScrollView instead of CSS overflow?`,
					`How does having different Touchable components improve the mobile user experience?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 37 (Afternoon)`,
					content: `The Component Trading Post is remarkable! I traded my web components for native equivalents: View for div, Text for spans, FlatList for optimized lists. Binary noted a 40% processing efficiency increase - no virtual DOM intermediary! The key insight: these aren't just renamed elements, they're purpose-built for mobile. ScrollView makes scrolling explicit (no CSS overflow here!), and TouchableOpacity provides proper touch feedback. Marshal Native's advice: "Embrace explicit components instead of fighting for web-like behavior." Each trade taught me why mobile demands different approaches.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;