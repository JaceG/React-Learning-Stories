import React, { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterThree() {
	const [activeRoute, setActiveRoute] = useState(0);
	const [propDrillDepth, setPropDrillDepth] = useState(1);

	const resetVisualization = () => {
		setActiveRoute(0);
		setPropDrillDepth(1);
	};

	const tradeRoutes = [
		{
			name: 'Direct Route',
			description: 'Parent → Child',
			components: ['App', 'ProductCard'],
		},
		{
			name: 'Mountain Pass',
			description: 'Parent → Child → Grandchild',
			components: ['App', 'ProductList', 'ProductCard'],
		},
		{
			name: 'Valley Trail',
			description: 'Parent → Child → Grandchild → Great-grandchild',
			components: [
				'App',
				'Dashboard',
				'ProductSection',
				'ProductList',
				'ProductCard',
			],
		},
	];

	const renderTradeRoute = (route, index) => {
		const isActive = activeRoute === index;
		const componentsToShow = route.components.slice(0, propDrillDepth + 1);

		return (
			<div
				key={index}
				className={`trade-route-map ${isActive ? 'active' : ''}`}
				onClick={() => setActiveRoute(index)}
				style={{
					cursor: 'pointer',
					opacity: isActive ? 1 : 0.6,
					marginBottom: '20px',
				}}>
				<h4>{route.name}</h4>
				<p style={{ fontSize: '14px', color: '#6c757d' }}>
					{route.description}
				</p>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						marginTop: '20px',
						flexWrap: 'wrap',
						gap: '10px',
					}}>
					{componentsToShow.map((comp, idx) => (
						<React.Fragment key={idx}>
							<div
								className={`flow-component ${
									idx === 0 ? 'parent' : ''
								}`}>
								<h5>{comp}</h5>
								{idx < componentsToShow.length - 1 && (
									<small style={{ fontSize: '11px' }}>
										passes props ↓
									</small>
								)}
							</div>
							{idx < componentsToShow.length - 1 && (
								<div
									className='flow-arrow'
									style={{ fontSize: '20px' }}>
									→
								</div>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		);
	};

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={3}
					title="The Trade Routes"
					bridge="On Aria's final day at the Trade Quarter, Propius led her to the Map Room - a circular chamber with walls covered in intricate route diagrams showing every caravan path in React Kingdom."
				/>

			<StorySection
				paragraphs={[
					`"This," Propius said with reverence, "is where we plan every delivery route. But I must warn you about a challenge every trader faces."`,
					`He pointed to a particularly convoluted path on the map. "See this? The cargo starts at the App Workshop and needs to reach ProductCard, five levels down. But our caravans can only travel parent-to-child, never skipping generations."`,
					`Binary computed quickly. "So the cargo must pass through Dashboard, ShopSection, and ProductList, even if they don't need it?"`,
					`"Exactly!" Propius nodded grimly. "We call it 'prop drilling' - boring tunnels through components just to pass data. Each intermediate workshop must receive and forward cargo they'll never use."`,
					`Aria frowned. "That seems inefficient. What if one workshop forgets to pass it along?"`,
					`"Precisely the problem! The entire route breaks. It's like a game of telephone where every player must perfectly repeat the message, even if they don't understand it."`
				]}
			/>

				<div className='interactive-section'>
					<h3 className='section-title'>Trade Route Explorer</h3>
					<p>
						Click on different routes to see how props travel.
						Adjust the depth to see prop drilling:
					</p>

					<div style={{ marginBottom: '20px' }}>
						<label>
							Prop Drill Depth: {propDrillDepth}
							<input
								type='range'
								min='1'
								max='4'
								value={propDrillDepth}
								onChange={(e) =>
									setPropDrillDepth(Number(e.target.value))
								}
								style={{ marginLeft: '10px', width: '200px' }}
							/>
						</label>
						<div
							style={{
								display: 'flex',
								gap: '10px',
								justifyContent: 'center',
								marginTop: '10px',
							}}>
							<button
								className='reset-button'
								onClick={resetVisualization}
								disabled={
									activeRoute === 0 && propDrillDepth === 1
								}>
								Reset Visualization
							</button>
						</div>
					</div>

					{tradeRoutes.map((route, index) =>
						renderTradeRoute(route, index)
					)}
				</div>

			<StorySection
				paragraphs={[
					`After exploring the routes, Propius showed Aria the consequences of deep prop drilling. "Watch what happens when we need to change something," he said, adjusting a pin on the map.`,
					`Instantly, red warning lights appeared along the entire route. "Every workshop in the chain must be updated! It's maintenance nightmare. Plus, each workshop carries cargo it doesn't need, slowing everything down."`,
					`"Is there a better way?" Aria asked, studying the tangled paths.`,
					`Propius smiled mysteriously. "Indeed there is. You've already learned about Context from Contextus Magnus - it can teleport data directly to where it's needed. And there are other solutions you'll discover. But first, you must understand these fundamental routes."`,
					`"Remember," he added, "prop drilling isn't always bad. For shallow routes of 2-3 levels, it's often the simplest solution. The key is knowing when the route has become too deep and recognizing when to use more advanced patterns."`
				]}
			/>

				<CodeExample
					title="Prop Drilling Example"
					code={`// Prop drilling example - data passes through multiple levels
// App (has the data)
function App() {
  const [user, setUser] = useState({ name: 'Wizard', gold: 100 });
  
  return <Dashboard user={user} onPurchase={handlePurchase} />;
}

// Dashboard (doesn't need user, just passes it)
function Dashboard({ user, onPurchase }) {
  return <ShopSection user={user} onPurchase={onPurchase} />;
}

// ShopSection (doesn't need user, just passes it)
function ShopSection({ user, onPurchase }) {
  return <ProductList user={user} onPurchase={onPurchase} />;
}

// ProductList (doesn't need user, just passes it)
function ProductList({ user, onPurchase }) {
  return products.map(product => 
    <ProductCard 
      key={product.id}
      product={product}
      user={user}           // Finally used here!
      onPurchase={onPurchase}
    />
  );
}

// ProductCard (actually uses the user data)
function ProductCard({ product, user, onPurchase }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Your gold: {user.gold}</p>
      <button onClick={() => onPurchase(product)}>Buy</button>
    </div>
  );
}`}
				/>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Trade Route Best Practices
					</h3>
					<div
						className='lesson-insight'
						style={{ background: '#f8f9fa', color: '#495057' }}>
						<h4 style={{ color: '#17a2b8' }}>
							When Prop Drilling is Acceptable:
						</h4>
						<ul style={{ marginBottom: '20px' }}>
							<li>Only 2-3 levels deep</li>
							<li>Clear, logical component hierarchy</li>
							<li>Limited number of props being passed</li>
						</ul>

						<h4 style={{ color: '#17a2b8' }}>
							When to Consider Alternatives:
						</h4>
						<ul>
							<li>Props passing through 4+ levels</li>
							<li>Many components just forwarding props</li>
							<li>Props used by distant relatives in the tree</li>
							<li>Frequent changes to prop structure</li>
						</ul>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: "Propius's Route Planning Wisdom:",
						content: "Prop drilling - passing data through components that don't use it - becomes problematic beyond 2-3 levels. It creates fragile dependencies, maintenance headaches, and unclear data flow. While acceptable for shallow hierarchies, deep drilling signals the need for alternative patterns. Component composition, Context API, or state management libraries can eliminate unnecessary prop forwarding. Remember: good architecture minimizes the distance data must travel to reach its destination."
					}}
					reflectionQuestions={[
						"How does the trade route metaphor help you visualize prop drilling?",
						"What strategies could you use to identify when prop drilling has gone too deep?",
						"In what scenarios might prop drilling be preferable to more complex solutions?"
					]}
					journalEntry={{
						title: "Aria's Journal - Day 12 (Evening)",
						content: "Today's lesson was eye-opening! Prop drilling - passing data through components that don't need it - is like forcing caravans through unnecessary checkpoints. While it's fine for short routes (2-3 levels), deeper drilling creates fragile, inefficient systems. Propius showed me how Context (which I already know!) can teleport data directly where needed. The Trade Quarter has taught me that props are powerful, but knowing their limitations is equally important. Sometimes the simplest path isn't a straight line!"
					}}
					lessonEnding={[
						"As the sun set over the Trade Quarter, Aria felt she truly understood the caravan system. Props were more than simple messages - they were the lifeblood of React Kingdom's commerce, flowing through carefully planned routes.",
						"\"You've learned well,\" Propius said proudly. \"You understand not just how to send cargo, but when routes become too complex. This wisdom will serve you well in your future adventures.\"",
						"Binary chimed happily. \"From simple props to complex routes to the perils of drilling - we've seen it all!\"",
						"\"Indeed,\" Aria smiled. \"Now I'm curious about these data rivers you mentioned. Where do they flow?\"",
						"Propius pointed toward the sound of rushing water in the distance. \"Follow that sound tomorrow, and you'll find River Master Flux. He'll teach you about the one-way flow of data through React Kingdom. Safe travels, Aria!\""
					]}
				/>
			</div>
		</>
	);

	return content;
}

export default ChapterThree;
