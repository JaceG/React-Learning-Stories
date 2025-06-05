import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter2() {
  const baseProps = {
    name: 'Flame Blade',
    damage: 50,
    element: 'fire'
  };
  
  const additionalProps = {
    rarity: 'legendary',
    enchantment: 'burning',
    damage: 75  // This will override the base damage
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
        <h2 className='chapter-title'>Chapter 2: Advanced Forging</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          The next day, Master Destruct revealed a more advanced technique. "You've learned to forge 
          and destructure individual props," he said, "but what if you need to combine multiple prop 
          objects or transform them?"
        </p>
        <p className='story-paragraph'>
          He showed you three glowing dots arranged in a triangle. "Behold the Spread Operator—three 
          dots of immense power! With this enchantment, you can spread one object's properties into 
          another, merge prop objects, and even transform them as they pass through components."
        </p>
        <p className='story-paragraph'>
          "Watch carefully," he continued, placing two prop crystals on the anvil. "When I apply the 
          spread enchantment, their properties merge, with later values overwriting earlier ones. It's 
          like pouring molten metals together—they blend but the last one poured determines the final color."
        </p>
      </div>

      <div className="interactive-section">
        <h3>The Spread Forge</h3>
        <p>Witness the power of the spread operator:</p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div className="blueprint">
            <h4>Base Props Crystal</h4>
            <pre>{JSON.stringify(baseProps, null, 2)}</pre>
          </div>
          <div className="blueprint" style={{background: '#c92a2a'}}>
            <h4>Enhancement Crystal</h4>
            <pre>{JSON.stringify(additionalProps, null, 2)}</pre>
          </div>
        </div>

        <div className="spread-operator-visual">
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
            <button className="forge-button" onClick={performSpread}>
              Apply Spread Enchantment
            </button>
            <button 
              className="reset-button"
              onClick={resetSpread}
              disabled={!showSpread}
            >
              Reset Spread
            </button>
          </div>
          
          {showSpread && (
            <>
              <div className="spread-dots">...</div>
              <div className="transform-arrow">↓</div>
              <div className="forged-prop" style={{display: 'block', maxWidth: '300px', margin: '0 auto'}}>
                <h4>Merged Result:</h4>
                <pre style={{textAlign: 'left'}}>{JSON.stringify(spreadResult, null, 2)}</pre>
              </div>
              <p style={{fontSize: '14px', color: '#6c757d', marginTop: '10px'}}>
                Notice: damage was overwritten from 50 → 75
              </p>
            </>
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          Master Destruct led you to a series of transformation chambers. "Props often need to be 
          reshaped as they travel through components," he explained. "A parent might send raw ore, 
          but the child needs refined metal. This is where prop transformation comes in."
        </p>
        <p className='story-paragraph'>
          "The spread operator," he demonstrated, "allows us to keep most properties while selectively 
          transforming others. It's like taking a sword, keeping its blade and handle, but replacing 
          just the pommel."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// The Spread Operator in action
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
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3>Transformation Workshop</h3>
        <div className="forge-controls">
          <h4>Common Spread Patterns:</h4>
          
          <div style={{marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <strong>1. Prop Forwarding with Extras:</strong>
            <pre style={{background: '#e9ecef', padding: '10px', borderRadius: '4px', marginTop: '5px'}}>
{`<Component {...props} extraProp="value" />`}
            </pre>
          </div>
          
          <div style={{marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <strong>2. Selective Prop Passing:</strong>
            <pre style={{background: '#e9ecef', padding: '10px', borderRadius: '4px', marginTop: '5px'}}>
{`const { unwanted, ...restProps } = props;
<Component {...restProps} />`}
            </pre>
          </div>
          
          <div style={{marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <strong>3. Prop Merging:</strong>
            <pre style={{background: '#e9ecef', padding: '10px', borderRadius: '4px', marginTop: '5px'}}>
{`const merged = { ...defaultProps, ...userProps, ...overrides };`}
            </pre>
          </div>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Spread Operator Lesson:</h3>
        <p>
          The spread operator (...) is a powerful enchantment that copies all enumerable properties from one object to 
          another, with later spreads overriding earlier ones. This technique enables efficient prop forwarding, merging, 
          and transformation. By combining spread with destructuring, you can selectively pass props, add new ones, or 
          transform existing properties as they flow through your component hierarchy.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          When is prop transformation preferable to passing raw data?
        </p>
        <p className='story-paragraph'>
          How can spread operator help with prop forwarding?
        </p>
        <p className='story-paragraph'>
          What are the performance implications of spreading large objects?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter2;