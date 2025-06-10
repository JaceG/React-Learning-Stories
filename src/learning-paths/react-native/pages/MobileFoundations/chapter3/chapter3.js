import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const [activeStyleType, setActiveStyleType] = useState('basic');
	const [flexDirection, setFlexDirection] = useState('column');
	const [justifyContent, setJustifyContent] = useState('center');
	const [alignItems, setAlignItems] = useState('center');
	const [animatedValue, setAnimatedValue] = useState(0);
	const { 
		selectedPlatform,
		nativeSkill,
		advanceSkill,
		frontierProgress,
		setFrontierProgress 
	} = useOutletContext();

	const styleComparisons = [
		{
			category: 'Layout',
			web: 'display: flex',
			native: 'flex: 1 (always flex)',
			note: 'All Views use Flexbox by default'
		},
		{
			category: 'Spacing',
			web: 'margin: 20px',
			native: 'margin: 20',
			note: 'No units, always in logical pixels'
		},
		{
			category: 'Colors',
			web: 'color: #333',
			native: 'color: \'#333\'',
			note: 'Colors must be strings'
		},
		{
			category: 'Transform',
			web: 'transform: rotate(45deg)',
			native: 'transform: [{ rotate: \'45deg\' }]',
			note: 'Transform is an array of objects'
		},
		{
			category: 'Shadows',
			web: 'box-shadow: ...',
			native: 'Platform-specific shadow props',
			note: 'iOS: shadow*, Android: elevation'
		}
	];

	const flexProperties = {
		flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
		justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
		alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline']
	};

	const dynamicStyles = [
		{
			name: 'Responsive Width',
			code: `width: screenWidth > 600 ? 400 : '100%'`
		},
		{
			name: 'Theme-based Colors',
			code: `color: isDarkMode ? '#fff' : '#000'`
		},
		{
			name: 'Platform Styles',
			code: `...Platform.select({ ios: {...}, android: {...} })`
		},
		{
			name: 'Conditional Borders',
			code: `borderWidth: isActive ? 2 : 0`
		}
	];

	const animationTypes = [
		{ name: 'Fade In', property: 'opacity', from: 0, to: 1 },
		{ name: 'Slide Up', property: 'translateY', from: 100, to: 0 },
		{ name: 'Scale', property: 'scale', from: 0.5, to: 1 },
		{ name: 'Rotate', property: 'rotate', from: '0deg', to: '360deg' }
	];

	const handleStyleExploration = (type) => {
		setActiveStyleType(type);
		setFrontierProgress(prev => Math.min(100, prev + 10));
		
		if (frontierProgress >= 80) {
			advanceSkill('Style Master');
		}
	};

	const runAnimation = () => {
		// Simulate animation
		setAnimatedValue(0);
		const interval = setInterval(() => {
			setAnimatedValue(prev => {
				if (prev >= 1) {
					clearInterval(interval);
					return 1;
				}
				return prev + 0.1;
			});
		}, 100);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Style Frontier
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Style Frontier challenged Aria's CSS knowledge. "No cascading, no 
					selectors, but Flexbox everywhere!" Marshal Native explained.
				</p>
				
				<p className='story-paragraph'>
					Aria created her first StyleSheet. "It's like inline styles, but 
					optimized?"
				</p>

				<p className='story-paragraph'>
					"And with consistent Flexbox behavior across platforms. Plus, styles 
					are just JavaScript objects - use all your programming power!"
				</p>

				<p className='story-paragraph'>
					Binary computed style calculations. "Dynamic styles based on state, 
					screen size, platform... the possibilities are exponential!"
				</p>

				<p className='story-paragraph'>
					Debuggora noted the differences. "No cascade means no unexpected 
					inheritance. Every component's styles are explicit and predictable."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Style Frontier Workshop</h3>
				
				<div className='style-comparison'>
					<div className='style-panel'>
						<h4>
							<span style={{ color: '#e67e22' }}>🌐</span> Web CSS
						</h4>
						<div className='style-example'>
{`.container {
  display: flex;
  margin: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.container:hover {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}`}
						</div>
					</div>
					
					<div className='style-panel'>
						<h4>
							<span style={{ color: '#00BFA5' }}>📱</span> React Native StyleSheet
						</h4>
						<div className='style-example'>
{`const styles = StyleSheet.create({
  container: {
    // flex: 1, // Takes full space
    margin: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
    })
  }
});`}
						</div>
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Style Property Translations</h4>
					<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
						<thead>
							<tr>
								<th style={{ padding: '10px', borderBottom: '2px solid rgba(0, 191, 165, 0.3)', textAlign: 'left' }}>
									Category
								</th>
								<th style={{ padding: '10px', borderBottom: '2px solid rgba(0, 191, 165, 0.3)' }}>
									Web CSS
								</th>
								<th style={{ padding: '10px', borderBottom: '2px solid rgba(0, 191, 165, 0.3)' }}>
									React Native
								</th>
								<th style={{ padding: '10px', borderBottom: '2px solid rgba(0, 191, 165, 0.3)' }}>
									Note
								</th>
							</tr>
						</thead>
						<tbody>
							{styleComparisons.map((comp, index) => (
								<tr key={index}>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)' }}>
										{comp.category}
									</td>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)', fontFamily: 'monospace', fontSize: '0.9em' }}>
										{comp.web}
									</td>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)', fontFamily: 'monospace', fontSize: '0.9em' }}>
										{comp.native}
									</td>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(0, 191, 165, 0.2)', fontSize: '0.85em', color: '#bdc3c7' }}>
										{comp.note}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='feature-explorer'>
					<h4>Flexbox Playground</h4>
					<div style={{ 
						background: 'rgba(0, 0, 0, 0.3)',
						border: '1px solid rgba(0, 191, 165, 0.3)',
						borderRadius: '8px',
						padding: '20px',
						marginTop: '20px'
					}}>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
							<div>
								<label style={{ display: 'block', marginBottom: '10px', color: '#00BFA5' }}>
									flexDirection:
								</label>
								<select 
									value={flexDirection} 
									onChange={(e) => setFlexDirection(e.target.value)}
									style={{
										width: '100%',
										padding: '8px',
										background: 'rgba(0, 0, 0, 0.5)',
										border: '1px solid rgba(0, 191, 165, 0.3)',
										borderRadius: '4px',
										color: 'white'
									}}
								>
									{flexProperties.flexDirection.map(value => (
										<option key={value} value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label style={{ display: 'block', marginBottom: '10px', color: '#00BFA5' }}>
									justifyContent:
								</label>
								<select 
									value={justifyContent} 
									onChange={(e) => setJustifyContent(e.target.value)}
									style={{
										width: '100%',
										padding: '8px',
										background: 'rgba(0, 0, 0, 0.5)',
										border: '1px solid rgba(0, 191, 165, 0.3)',
										borderRadius: '4px',
										color: 'white'
									}}
								>
									{flexProperties.justifyContent.map(value => (
										<option key={value} value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label style={{ display: 'block', marginBottom: '10px', color: '#00BFA5' }}>
									alignItems:
								</label>
								<select 
									value={alignItems} 
									onChange={(e) => setAlignItems(e.target.value)}
									style={{
										width: '100%',
										padding: '8px',
										background: 'rgba(0, 0, 0, 0.5)',
										border: '1px solid rgba(0, 191, 165, 0.3)',
										borderRadius: '4px',
										color: 'white'
									}}
								>
									{flexProperties.alignItems.map(value => (
										<option key={value} value={value}>{value}</option>
									))}
								</select>
							</div>
						</div>
						
						<div style={{
							height: '200px',
							background: 'rgba(255, 255, 255, 0.05)',
							border: '2px dashed rgba(0, 191, 165, 0.3)',
							borderRadius: '8px',
							display: 'flex',
							flexDirection: flexDirection,
							justifyContent: justifyContent,
							alignItems: alignItems,
							padding: '20px'
						}}>
							{[1, 2, 3].map(num => (
								<div key={num} style={{
									width: '60px',
									height: '60px',
									background: `rgba(0, 191, 165, ${0.3 + num * 0.2})`,
									borderRadius: '8px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									margin: '5px',
									color: 'white',
									fontWeight: 'bold'
								}}>
									{num}
								</div>
							))}
						</div>
						
						<div style={{ marginTop: '15px', padding: '10px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '4px' }}>
							<code style={{ color: '#00BFA5' }}>
								{`{ flexDirection: '${flexDirection}', justifyContent: '${justifyContent}', alignItems: '${alignItems}' }`}
							</code>
						</div>
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Dynamic Styling Patterns</h4>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '15px' }}>
						{dynamicStyles.map((style, index) => (
							<div key={index} style={{
								padding: '15px',
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(0, 191, 165, 0.3)',
								borderRadius: '8px'
							}}>
								<h5 style={{ color: '#00BFA5', marginBottom: '10px' }}>{style.name}</h5>
								<code style={{ fontSize: '0.9em', color: '#bdc3c7' }}>{style.code}</code>
							</div>
						))}
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Animation Basics</h4>
					<button
						onClick={runAnimation}
						style={{
							padding: '10px 20px',
							background: '#FF6E40',
							border: 'none',
							borderRadius: '5px',
							color: 'white',
							cursor: 'pointer',
							marginBottom: '20px'
						}}
					>
						Run Animation Demo
					</button>
					
					<div style={{
						height: '100px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: 'rgba(0, 0, 0, 0.3)',
						borderRadius: '8px',
						marginBottom: '20px'
					}}>
						<div style={{
							width: '80px',
							height: '80px',
							background: '#00BFA5',
							borderRadius: '8px',
							opacity: animatedValue,
							transform: `scale(${0.5 + animatedValue * 0.5}) rotate(${animatedValue * 360}deg)`,
							transition: 'all 0.1s ease'
						}} />
					</div>
				</div>

				{frontierProgress >= 90 && (
					<div className='frontier-progress'>
						<div className='skill-badge'>
							🎨 {nativeSkill} - Style Frontier Master!
						</div>
						<p style={{ marginTop: '15px', color: '#00BFA5' }}>
							You've conquered the Style Frontier! Ready for Navigation Trails?
						</p>
					</div>
				)}
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>StyleSheet Mastery</span>
					<span className='discovered-by'>Style Frontier teachings</span>
				</div>
				<pre>{`# StyleSheet API Fundamentals
// Marshal Native: "Styles are just JavaScript!"

import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Basic styling
  container: {
    flex: 1, // Take all available space
    backgroundColor: '#f5f5f5',
    padding: 20, // No units needed!
  },
  
  // Flexbox is default
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // No percentages for margins/padding (use flex)
  card: {
    flex: 1, // Instead of width: 100%
    marginHorizontal: 10, // margin-left + margin-right
    paddingVertical: 15, // padding-top + padding-bottom
  },
  
  // Text styling
  title: {
    fontSize: 24,
    fontWeight: 'bold', // or '600', '700', etc.
    color: '#333',
    textAlign: 'center',
    // iOS only
    fontFamily: 'System',
    // Android only
    // fontFamily: 'Roboto',
  },
  
  // Borders
  bordered: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    // Individual borders
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  
  // Platform-specific styles
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  
  // Absolute positioning
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
  },
});

# Dynamic Styles
// Binary: "Compute styles on the fly!"

const DynamicComponent = ({ isActive, theme }) => {
  return (
    <View style={[
      styles.base,
      isActive && styles.active,
      { backgroundColor: theme.backgroundColor }
    ]}>
      <Text style={[
        styles.text,
        { color: theme.textColor }
      ]}>
        Dynamic Styling!
      </Text>
    </View>
  );
};

// Responsive design
const responsive = StyleSheet.create({
  container: {
    width: screenWidth > 768 ? 600 : '100%',
    paddingHorizontal: screenWidth > 768 ? 40 : 20,
  },
  
  text: {
    fontSize: screenWidth > 768 ? 18 : 14,
  },
  
  grid: {
    flexDirection: screenWidth > 768 ? 'row' : 'column',
  },
});

# Animation with Animated API
// Debuggora: "Smooth 60fps animations!"

import { Animated } from 'react-native';

const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // Important for performance!
    }).start();
  }, [fadeAnim]);
  
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

// Spring animation
Animated.spring(animatedValue, {
  toValue: 100,
  friction: 7,
  tension: 40,
  useNativeDriver: false, // Can't use with layout props
}).start();

# Style Tips & Tricks
// Aria's collected wisdom:

// 1. Use StyleSheet.create for optimization
const styles = StyleSheet.create({...}); // ✓ Optimized
const styles = {...}; // ✗ Not optimized

// 2. Flatten styles for performance
const flattenedStyle = StyleSheet.flatten([
  styles.base,
  styles.active,
  { margin: 10 }
]);

// 3. Absolute fill shorthand
const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }
});

// 4. Hair line width
const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth, // Thinnest possible line
    backgroundColor: '#ddd',
  }
});`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Style Frontier Lesson:</h3>
				<p>
					The Style Frontier teaches that React Native styling is both simpler and 
					more powerful than web CSS. Without cascade and selectors, styles become 
					predictable and debuggable. Marshal Native's final wisdom: embrace the 
					constraints - no units mean consistent spacing, Flexbox-everywhere means 
					predictable layouts, and JavaScript objects mean dynamic styling power. 
					The frontier rewards those who think in components, not cascades.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the absence of CSS cascade make React Native styling more 
					predictable?
				</p>
				<p>
					Why might platform-specific styling (like shadows) be important for 
					native feel?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;