import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter2() {
  const cargoManifest = {
    text: 'Welcome Traveler',
    count: 42,
    isActive: true,
    colors: ['red', 'blue', 'green'],
    destination: { workshop: 'Button', floor: 3 }
  };

  const [inspectedCargo, setInspectedCargo] = useState(null);

  const resetInspection = () => {
    setInspectedCargo(null);
  };

  const cargoTypes = [
    { key: 'text', label: 'Text Scroll', type: 'string' },
    { key: 'count', label: 'Number Tablet', type: 'number' },
    { key: 'isActive', label: 'Boolean Crystal', type: 'boolean' },
    { key: 'colors', label: 'Array Chest', type: 'array' },
    { key: 'destination', label: 'Object Map', type: 'object' }
  ];

  const inspectCargo = (key) => {
    setInspectedCargo({
      key,
      value: cargoManifest[key],
      type: typeof cargoManifest[key]
    });
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 2: Loading the Cargo</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          The next morning, you arrived at the kingdom's grand loading dock, where caravans were being 
          prepared for their journeys. The Caravan Master was instructing workers on how to properly 
          pack different types of cargo.
        </p>
        <p className='story-paragraph'>
          "Ah, perfect timing!" he exclaimed. "Today's lesson is crucial. You see, our caravans don't 
          just carry one type of cargo. They can transport text scrolls, number tablets, boolean crystals, 
          arrays of items, and even complex object maps—all in a single journey!"
        </p>
        <p className='story-paragraph'>
          He gestured to a large wagon being loaded. "Each piece of cargo must be carefully labeled and 
          secured. In the component world, we call this passing multiple props, and each prop has its own 
          name and type."
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Cargo Manifest Inspector</h3>
        <p>Click on each cargo type to inspect its contents:</p>

        <div className="cargo-selector">
          {cargoTypes.map(cargo => (
            <div 
              key={cargo.key}
              className={`cargo-item ${inspectedCargo?.key === cargo.key ? 'selected' : ''}`}
              onClick={() => inspectCargo(cargo.key)}
            >
              <div>{cargo.label}</div>
              <small style={{fontSize: '12px', opacity: 0.8}}>Type: {cargo.type}</small>
            </div>
          ))}
        </div>

        {inspectedCargo && (
          <div className="caravan-display" style={{textAlign: 'left', padding: '20px'}}>
            <h4>Cargo Inspection Report</h4>
            <p><strong>Name:</strong> {inspectedCargo.key}</p>
            <p><strong>Type:</strong> {inspectedCargo.type}</p>
            <p><strong>Contents:</strong></p>
            <div className="code-example" style={{marginTop: '10px'}}>
              <pre>{JSON.stringify(inspectedCargo.value, null, 2)}</pre>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px'}}>
              <button 
                className="reset-button"
                onClick={resetInspection}
                disabled={!inspectedCargo}
              >
                Reset Inspection
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          The Caravan Master showed you how different workshops expected their cargo to be packed. 
          "The Button Workshop," he explained, "might receive a caravan with text for display, a color 
          specification, a size measurement, and even a special instruction scroll (we call them callbacks) 
          for what to do when someone interacts with the button."
        </p>
        <p className='story-paragraph'>
          "The beauty of our system," he continued, "is that each workshop knows exactly what cargo to 
          expect. They have a manifest—what we call PropTypes or TypeScript interfaces—that describes 
          every piece of cargo they can handle."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// Sending a fully loaded caravan
<ProductCard
  title="Magic Potion"           // string
  price={99.99}                  // number
  inStock={true}                 // boolean
  ingredients={['herbs', 'crystals']} // array
  seller={{ name: 'Wizard Shop', rating: 5 }} // object
  onPurchase={() => handlePurchase()} // function
/>

// The receiving workshop unpacks everything
function ProductCard(props) {
  // Destructuring - unpacking the cargo efficiently
  const { title, price, inStock, ingredients, seller, onPurchase } = props;
  
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>Price: {price} gold coins</p>
      <p>Status: {inStock ? 'Available' : 'Sold Out'}</p>
      <p>Ingredients: {ingredients.join(', ')}</p>
      <p>Sold by: {seller.name} (★{seller.rating})</p>
      <button onClick={onPurchase}>Purchase</button>
    </div>
  );
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Props Flow Visualization</h3>
        <div className="prop-flow-visualizer">
          <div className="flow-component parent">
            <h4>Parent Component</h4>
            <p>Loads cargo</p>
            <small>(App.js)</small>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-component">
            <h4>Child Component</h4>
            <p>Receives cargo</p>
            <small>(ProductCard.js)</small>
          </div>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Props Types Lesson:</h3>
        <p>
          Props can carry any JavaScript type as cargo: strings, numbers, booleans, arrays, objects, and functions. 
          Using descriptive names for props makes their purpose clear, while destructuring helps unpack them cleanly. 
          Functions passed as props enable child components to communicate back to their parents, creating interactive 
          component relationships throughout your application.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          What advantages does destructuring props provide?
        </p>
        <p>
          How do function props enable interaction between components?
        </p>
        <p>
          Why is it important to use consistent prop names across your application?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter2;