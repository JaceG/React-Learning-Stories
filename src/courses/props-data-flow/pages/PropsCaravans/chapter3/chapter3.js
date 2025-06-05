import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter3() {
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
      components: ['App', 'ProductCard']
    },
    {
      name: 'Mountain Pass',
      description: 'Parent → Child → Grandchild',
      components: ['App', 'ProductList', 'ProductCard']
    },
    {
      name: 'Valley Trail',
      description: 'Parent → Child → Grandchild → Great-grandchild',
      components: ['App', 'Dashboard', 'ProductSection', 'ProductList', 'ProductCard']
    }
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
          marginBottom: '20px'
        }}
      >
        <h4>{route.name}</h4>
        <p style={{fontSize: '14px', color: '#6c757d'}}>{route.description}</p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {componentsToShow.map((comp, idx) => (
            <React.Fragment key={idx}>
              <div className={`flow-component ${idx === 0 ? 'parent' : ''}`}>
                <h5>{comp}</h5>
                {idx < componentsToShow.length - 1 && (
                  <small style={{fontSize: '11px'}}>passes props ↓</small>
                )}
              </div>
              {idx < componentsToShow.length - 1 && (
                <div className="flow-arrow" style={{fontSize: '20px'}}>→</div>
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
        <h2 className='chapter-title'>Chapter 3: The Trade Routes</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          On your final day with the Caravan Master, he unveiled a great map of the React Kingdom, 
          showing all the trade routes that caravans traveled. "Now comes the most important lesson," 
          he said, his expression serious.
        </p>
        <p className='story-paragraph'>
          "Our caravans can only travel in one direction—from parent workshops to their children. This 
          is the fundamental law of the Props Trade Routes. But sometimes," he traced a long path on 
          the map, "cargo must travel through many workshops to reach its destination."
        </p>
        <p className='story-paragraph'>
          He pointed to a winding route. "We call this 'prop drilling'—when cargo must pass through 
          intermediate workshops that don't need it, just to reach a distant workshop that does. It's 
          like sending a package through multiple trading posts when only the final destination needs it."
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Trade Route Explorer</h3>
        <p>Click on different routes to see how props travel. Adjust the depth to see prop drilling:</p>

        <div style={{marginBottom: '20px'}}>
          <label>
            Prop Drill Depth: {propDrillDepth}
            <input 
              type="range" 
              min="1" 
              max="4" 
              value={propDrillDepth}
              onChange={(e) => setPropDrillDepth(Number(e.target.value))}
              style={{marginLeft: '10px', width: '200px'}}
            />
          </label>
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px'}}>
            <button 
              className="reset-button"
              onClick={resetVisualization}
              disabled={activeRoute === 0 && propDrillDepth === 1}
            >
              Reset Visualization
            </button>
          </div>
        </div>

        {tradeRoutes.map((route, index) => renderTradeRoute(route, index))}
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          The Caravan Master showed you a particularly complex route. "See this path? The cargo travels 
          through five workshops, but only the first and last actually use it. The middle three are just 
          passing it along. This creates problems:"
        </p>
        <p className='story-paragraph'>
          "First, it makes our routes fragile. If any workshop in the middle changes, the whole route 
          breaks. Second, it's inefficient—imagine carrying cargo you'll never open! And third, it makes 
          our map harder to understand."
        </p>
        <p className='story-paragraph'>
          "In future lessons," he winked, "you'll learn about the Context Caravans and the State Management 
          Express—special systems that can teleport cargo directly to where it's needed. But for now, 
          understanding these basic routes is essential."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// Prop drilling example - data passes through multiple levels
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
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Trade Route Best Practices</h3>
        <div className="lesson-insight" style={{background: '#f8f9fa', color: '#495057'}}>
          <h4 style={{color: '#17a2b8'}}>When Prop Drilling is Acceptable:</h4>
          <ul style={{marginBottom: '20px'}}>
            <li>Only 2-3 levels deep</li>
            <li>Clear, logical component hierarchy</li>
            <li>Limited number of props being passed</li>
          </ul>
          
          <h4 style={{color: '#17a2b8'}}>When to Consider Alternatives:</h4>
          <ul>
            <li>Props passing through 4+ levels</li>
            <li>Many components just forwarding props</li>
            <li>Props used by distant relatives in the tree</li>
            <li>Frequent changes to prop structure</li>
          </ul>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Prop Drilling Lesson:</h3>
        <p>
          Prop drilling occurs when data must pass through multiple component levels to reach its destination, even when 
          intermediate components don't need it. While acceptable for 2-3 levels, deeper drilling creates fragile, 
          hard-to-maintain code. Component composition can reduce drilling, and advanced patterns like Context API and 
          state management libraries provide solutions for deeply nested data needs.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          What problems might arise from excessive prop drilling?
        </p>
        <p>
          How would you restructure components to minimize prop drilling?
        </p>
        <p>
          When might prop drilling actually be the simplest solution?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter3;