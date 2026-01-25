import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterTwo() {
	const baseProps = {
		name: 'Flame Blade',
		damage: 50,
		element: 'fire',
	};

	const additionalProps = {
		rarity: 'legendary',
		enchantment: 'burning',
		damage: 75, // This will override the base damage
	};

	const [spreadResult, setSpreadResult] = useState({});
	const [showSpread, setShowSpread] = useState(false);

	const performSpread = () => {
		setShowSpread(true);
		const result = { ...baseProps, ...additionalProps };
		setSpreadResult(result);
	};

	const resetSpread = () => {
		setShowSpread(false);
		setSpreadResult({});
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title="The Spread Enchantment"
					bridge="The next morning, Aria found Destructo working with multiple glowing crystals, each pulsing with different data properties. The forge's heat seemed even more intense as he prepared for advanced techniques."
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Ah, right on time!" Destructo called out. "Today, we
						move beyond simple destructuring to the art of
						combination and transformation!"
					</p>
					<p className='story-paragraph'>
						He held up three glowing dots that floated in formation.
						"These three dots are the
						<strong>Spread Operator</strong> - one of the most
						powerful enchantments in our forge. They can merge
						objects, copy properties, and transform data as it
						flows!"
					</p>
					<p className='story-paragraph'>
						Binary's processors whirred. "Three dots? That seems...
						simple?"
					</p>
					<p className='story-paragraph'>
						Destructo laughed heartily. "Simple in form, profound in
						power! Watch this." He placed two prop crystals on the
						anvil. "When I spread these together, their properties
						merge. But here's the key - later properties override
						earlier ones, like pouring different metals into the
						same mold."
					</p>
					<p className='story-paragraph'>
						Aria leaned in, fascinated. "So you can combine multiple
						prop sources?"
					</p>
					<p className='story-paragraph'>
						"Combine, override, extend!" Destructo's eyes gleamed.
						"The spread operator is the ultimate tool for prop
						manipulation. Let me show you!"
					</p>
				</div>

				<div className='interactive-section'>
					<h3>The Spread Forge</h3>
					<p>Witness the power of the spread operator:</p>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '20px',
							marginBottom: '20px',
						}}>
						<div className='blueprint'>
							<h4>Base Props Crystal</h4>
							<pre>{JSON.stringify(baseProps, null, 2)}</pre>
						</div>
						<div
							className='blueprint'
							style={{ background: '#c92a2a' }}>
							<h4>Enhancement Crystal</h4>
							<pre>
								{JSON.stringify(additionalProps, null, 2)}
							</pre>
						</div>
					</div>

					<div className='spread-operator-visual'>
						<div
							style={{
								display: 'flex',
								gap: '10px',
								justifyContent: 'center',
								marginBottom: '20px',
							}}>
							<button
								className='forge-button'
								onClick={performSpread}>
								Apply Spread Enchantment
							</button>
							<button
								className='reset-button'
								onClick={resetSpread}
								disabled={!showSpread}>
								Reset Spread
							</button>
						</div>

						{showSpread && (
							<>
								<div className='spread-dots'>...</div>
								<div className='transform-arrow'>↓</div>
								<div
									className='forged-prop'
									style={{
										display: 'block',
										maxWidth: '300px',
										margin: '0 auto',
									}}>
									<h4>Merged Result:</h4>
									<pre style={{ textAlign: 'left' }}>
										{JSON.stringify(spreadResult, null, 2)}
									</pre>
								</div>
								<p
									style={{
										fontSize: '14px',
										color: '#6c757d',
										marginTop: '10px',
									}}>
									Notice: damage was overwritten from 50 → 75
								</p>
							</>
						)}
					</div>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						After the merging demonstration, Destructo led them to a
						series of transformation chambers, each glowing with
						different energies. "Now for the real magic -
						transformation!"
					</p>
					<p className='story-paragraph'>
						"Sometimes," he explained, "a parent component sends raw
						materials, but the child needs refined props. The spread
						operator lets us transform on the fly."
					</p>
					<p className='story-paragraph'>
						He demonstrated with a weapon prop. "Watch - I spread
						all the original properties, then override just the ones
						I want to change. It's like keeping a sword's blade and
						handle while swapping the pommel!"
					</p>
					<p className='story-paragraph'>
						Aria practiced the technique, spreading props and
						selectively transforming them. "This is incredible! I
						can forward most props unchanged while customizing
						specific ones!"
					</p>
					<p className='story-paragraph'>
						"Exactly!" Destructo beamed. "And here's a smith's
						secret - you can use destructuring with spread to
						exclude certain props before passing them on. Perfect
						for removing props that shouldn't travel further
						downstream!"
					</p>
				</div>

				<CodeExample
					title="The Spread Operator in Action"
					code={`// The Spread Operator in action
const weaponProps = {
  name: 'Flame Blade',
  damage: 50,
  element: 'fire',
  weight: 5
};

// Spreading into a new object with modifications
const enhancedWeapon = {
  ...weaponProps,           // Spread all existing properties
  damage: weaponProps.damage * 1.5,  // Transform damage
  enchantment: 'burning',   // Add new property
  blessed: true            // Add another property
};

// Spreading in component props
function WeaponShop({ weapons }) {
  return weapons.map(weapon => (
    <WeaponCard 
      key={weapon.id}
      {...weapon}           // Spread all weapon properties as props
      onBuy={() => buyWeapon(weapon.id)}  // Add additional prop
    />
  ));
}

// Combining multiple prop sources
function EnhancedWeaponCard(props) {
  const defaultProps = {
    rarity: 'common',
    durability: 100,
    price: 50
  };
  
  // Merge defaults with passed props
  const finalProps = { ...defaultProps, ...props };
  
  return <WeaponDisplay {...finalProps} />;
}

// Prop transformation pattern
function ItemTransformer({ item, userLevel }) {
  // Transform props based on user level
  const transformedItem = {
    ...item,
    damage: item.damage * (1 + userLevel * 0.1),
    price: item.price * (userLevel > 10 ? 0.8 : 1),
    available: userLevel >= item.requiredLevel
  };
  
  return <ItemCard {...transformedItem} />;
}`}
				/>

				<div className='interactive-section'>
					<h3>Transformation Workshop</h3>
					<div className='forge-controls'>
						<h4>Common Spread Patterns:</h4>

						<div
							style={{
								marginTop: '20px',
								padding: '15px',
								background: '#f8f9fa',
								borderRadius: '8px',
							}}>
							<strong>1. Prop Forwarding with Extras:</strong>
							<pre
								style={{
									background: '#e9ecef',
									padding: '10px',
									borderRadius: '4px',
									marginTop: '5px',
								}}>
								{`<Component {...props} extraProp="value" />`}
							</pre>
						</div>

						<div
							style={{
								marginTop: '20px',
								padding: '15px',
								background: '#f8f9fa',
								borderRadius: '8px',
							}}>
							<strong>2. Selective Prop Passing:</strong>
							<pre
								style={{
									background: '#e9ecef',
									padding: '10px',
									borderRadius: '4px',
									marginTop: '5px',
								}}>
								{`const { unwanted, ...restProps } = props;
<Component {...restProps} />`}
							</pre>
						</div>

						<div
							style={{
								marginTop: '20px',
								padding: '15px',
								background: '#f8f9fa',
								borderRadius: '8px',
							}}>
							<strong>3. Prop Merging:</strong>
							<pre
								style={{
									background: '#e9ecef',
									padding: '10px',
									borderRadius: '4px',
									marginTop: '5px',
								}}>
								{`const merged = { ...defaultProps, ...userProps, ...overrides };`}
							</pre>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Master Destructo's Spread Wisdom:",
						content: "The spread operator (...) merges objects with surgical precision - later spreads override earlier ones, enabling powerful patterns. Master prop forwarding by spreading incoming props while adding new ones. Transform selectively by spreading most properties unchanged while overriding specific values. Combine with destructuring to filter unwanted props before spreading the rest. Remember: spread is shallow - nested objects need special handling. This enchantment turns rigid prop passing into flexible, maintainable data flow."
					}}
					reflectionQuestions={[
						"How does the metal-merging metaphor help you understand spread operator behavior?",
						"When might you combine destructuring with spread for selective prop passing?",
						"What are the advantages of transforming props as they flow versus at their source?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 14 (Afternoon)",
						content: "The spread operator is like magical metalworking! Three dots (...) that can merge objects, with later properties overriding earlier ones - perfect for combining default props with user props. Destructo showed me how to spread props when passing them to children, adding or transforming properties along the way. The real power comes from combining spread with destructuring - I can extract props I don't want to pass, then spread the rest! It's elegant prop forwarding that keeps components flexible. This isn't just copying - it's intelligent prop transformation!"
					}}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterTwo;
