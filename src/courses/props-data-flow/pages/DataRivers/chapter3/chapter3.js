import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
	// Removed unused state - waterfallData was not being used in this component

	const [cascadeLevel, setCascadeLevel] = useState(1);

	const showNextLevel = () => {
		if (cascadeLevel < 4) {
			setCascadeLevel(cascadeLevel + 1);
		}
	};

	const resetCascade = () => {
		setCascadeLevel(1);
	};

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 3: Waterfalls and Cascades
				</h2>

				<div className='chapter-bridge'>
					<p>
						On the final morning at the Cascade District, Flux led
						Aria to a breathtaking sight - the Great Data Waterfall,
						where information cascaded through seven majestic tiers,
						each pool glowing with transmitted data.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Behold the most complex flow pattern in React Kingdom,"
						Flux said, her voice filled with awe. "This waterfall
						demonstrates how data cascades through deeply nested
						components."
					</p>
					<p className='story-paragraph'>
						Aria watched in fascination as data drops fell from pool
						to pool. "It's beautiful, but it seems... complicated."
					</p>
					<p className='story-paragraph'>
						"Ah, you perceive the challenge!" Flux smiled. "Each
						tier represents a component level. The water - our data
						- must flow through every level to reach the bottom.
						Watch how it splits and transforms along the way."
					</p>
					<p className='story-paragraph'>
						Binary calculated rapidly. "Seven levels of cascade...
						that's a lot of prop passing!"
					</p>
					<p className='story-paragraph'>
						"Indeed. This is both the beauty and the burden of
						nested components," Flux explained. "Each pool can
						filter what it passes down, split streams to different
						children, or transform the data. But too many levels
						create maintenance waterfalls - I mean, nightmares!"
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>The Cascading Waterfall</h3>
					<p>Watch how data cascades through nested components:</p>

					<div
						style={{
							display: 'flex',
							gap: '10px',
							justifyContent: 'center',
							marginBottom: '20px',
						}}>
						<button
							className='action-button'
							onClick={showNextLevel}
							disabled={cascadeLevel >= 4}>
							Show Next Level
						</button>
						<button
							className='reset-button'
							onClick={resetCascade}
							disabled={cascadeLevel === 1}>
							Reset Cascade
						</button>
					</div>

					<div className='waterfall-container'>
						{cascadeLevel >= 1 && (
							<div
								className='waterfall-level'
								style={{ marginTop: '0' }}>
								<h4>App (Source Pool)</h4>
								<div className='water-drop'>
									user: "River Master"
								</div>
								<div className='water-drop'>theme: "blue"</div>
								<div className='water-drop'>
									permissions: [...]
								</div>
								{cascadeLevel > 1 && (
									<div className='waterfall-cascade'></div>
								)}
							</div>
						)}

						{cascadeLevel >= 2 && (
							<div className='waterfall-level'>
								<h4>Dashboard (Second Tier)</h4>
								<div className='water-drop'>
									user: "River Master"
								</div>
								<div className='water-drop'>theme: "blue"</div>
								<small>
									Filtered: permissions not needed here
								</small>
								{cascadeLevel > 2 && (
									<div className='waterfall-cascade'></div>
								)}
							</div>
						)}

						{cascadeLevel >= 3 && (
							<div className='waterfall-level'>
								<h4>UserPanel & ThemeSelector (Third Tier)</h4>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-around',
									}}>
									<div>
										<strong>UserPanel receives:</strong>
										<div className='water-drop'>
											user: "River Master"
										</div>
									</div>
									<div>
										<strong>ThemeSelector receives:</strong>
										<div className='water-drop'>
											theme: "blue"
										</div>
									</div>
								</div>
								{cascadeLevel > 3 && (
									<div className='waterfall-cascade'></div>
								)}
							</div>
						)}

						{cascadeLevel >= 4 && (
							<div className='waterfall-level'>
								<h4>Avatar & ThemePreview (Bottom Pools)</h4>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-around',
									}}>
									<div>
										<strong>Avatar:</strong>
										<div className='water-drop'>
											name: "River Master"
										</div>
									</div>
									<div>
										<strong>ThemePreview:</strong>
										<div className='water-drop'>
											color: "blue"
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						After observing the cascade patterns, Flux grew serious.
						"Beautiful as they are, deep waterfalls have a dark
						side. Change something at the source, and every pool
						below must adapt. It's fragile."
					</p>
					<p className='story-paragraph'>
						She pointed to a series of elevated aqueducts in the
						distance. "See those? They're Context channels - they
						can teleport water directly to deep pools, bypassing all
						the intermediate levels. You've already learned about
						these from Contextus Magnus!"
					</p>
					<p className='story-paragraph'>
						Aria's eyes lit up. "So when cascades get too deep..."
					</p>
					<p className='story-paragraph'>
						"Exactly! You already know the solution. Context, Redux,
						or other state management can create direct channels.
						The art is knowing when a beautiful cascade has become
						an unmaintainable waterfall."
					</p>
					<p className='story-paragraph'>
						"Remember," Flux concluded, "3-4 levels of cascade is
						natural and manageable. Beyond that, consider
						alternative flows. The goal is clarity, not complexity."
					</p>
				</div>

				<div className='code-example'>
					<pre>{`// The waterfall cascade pattern
function App() {
  const userData = { name: 'River Master', role: 'guide', id: 123 };
  const theme = { primary: 'blue', mode: 'light' };
  const permissions = ['read', 'write', 'admin'];
  
  return (
    <Dashboard 
      userData={userData}
      theme={theme}
      permissions={permissions}
    />
  );
}

function Dashboard({ userData, theme, permissions }) {
  // Dashboard doesn't need permissions, so doesn't pass them down
  return (
    <div style={{ background: theme.primary }}>
      <Header userData={userData} theme={theme} />
      <MainContent userData={userData} />
    </div>
  );
}

function Header({ userData, theme }) {
  // Split the flow - different data to different children
  return (
    <header>
      <UserInfo user={userData} />
      <ThemeToggle currentTheme={theme} />
    </header>
  );
}

function UserInfo({ user }) {
  // Further nesting - extract only what's needed
  return (
    <div>
      <Avatar userName={user.name} />
      <span>Welcome, {user.name}!</span>
    </div>
  );
}

function Avatar({ userName }) {
  // The bottom of our waterfall - receiving filtered data
  const initial = userName.charAt(0).toUpperCase();
  return <div className="avatar">{initial}</div>;
}`}</pre>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>Cascade Patterns</h3>
					<div className='flow-control-panel'>
						<h4>Common Waterfall Patterns:</h4>

						<div style={{ marginTop: '15px' }}>
							<strong>1. Full Cascade:</strong>
							<p>
								All props flow through every level (can cause
								prop drilling)
							</p>
						</div>

						<div style={{ marginTop: '15px' }}>
							<strong>2. Filtered Cascade:</strong>
							<p>
								Each level takes what it needs and passes
								specific subsets down
							</p>
						</div>

						<div style={{ marginTop: '15px' }}>
							<strong>3. Transformed Cascade:</strong>
							<p>Data is processed and reshaped at each level</p>
						</div>

						<div style={{ marginTop: '15px' }}>
							<strong>4. Split Cascade:</strong>
							<p>
								Data branches into different streams for
								different child components
							</p>
						</div>
					</div>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 13 (Evening)</h4>
						<p>
							The Great Waterfall was both inspiring and
							cautionary! I saw how data cascades through nested
							components, splitting and filtering at each level.
							But Flux warned about the dangers of deep waterfalls
							- beyond 3-4 levels, they become hard to maintain.
							The key patterns: filter data at each tier (pass
							only what's needed), split streams for different
							children, and know when to use Context or state
							management instead of endless cascading. Sometimes
							the most elegant solution isn't the most beautiful
							waterfall, but a simple, direct aqueduct!
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>River Master Flux's Cascade Wisdom:</h3>
					<p>
						Data cascades through component trees like waterfalls,
						with each level receiving from above and choosing what
						to pass below. Master four patterns: Full Cascade
						(everything flows through), Filtered Cascade (each level
						extracts what it needs), Transformed Cascade (data
						reshapes at each tier), and Split Cascade (different
						streams for different children). While beautiful,
						cascades beyond 3-4 levels signal the need for Context
						or state management. Remember: the most maintainable
						waterfall is often the shortest one.
					</p>
				</div>

				<div className='chapter-finale'>
					<p className='story-paragraph'>
						As they prepared to leave the Cascade District, Flux
						placed a hand on Aria's shoulder. "You've learned well.
						You understand not just how data flows, but when flows
						become floods."
					</p>
					<p className='story-paragraph'>
						"The rivers taught me so much," Aria reflected. "One-way
						flow, controlled gates, and the perils of deep cascades.
						But where do I go next?"
					</p>
					<p className='story-paragraph'>
						Flux pointed toward smoke rising from distant chimneys.
						"The Prop Forge awaits. Master Smith Destructo will
						teach you the art of transforming props - breaking them
						apart and reshaping them for maximum efficiency."
					</p>
					<p className='story-paragraph'>
						Binary beeped excitedly. "From water to fire! This
						journey keeps getting more interesting!"
					</p>
					<p className='story-paragraph'>
						"Thank you, River Master Flux," Aria bowed. "I'll never
						look at data flow the same way again."
					</p>
					<p className='story-paragraph'>
						"May your data streams run clear and your cascades stay
						shallow," Flux blessed them as they departed. "And
						remember - respect the flow!"
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does the waterfall metaphor help you recognize when
						components are too deeply nested?
					</p>
					<p className='story-paragraph'>
						What signs in your code indicate that a cascade has
						become unmaintainable?
					</p>
					<p className='story-paragraph'>
						When might you choose to let data cascade versus using
						Context or state management?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
