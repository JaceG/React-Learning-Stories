import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter1() {
  const [caravans, setCaravans] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState('');

  const cargoOptions = [
    { name: 'Text Messages', value: 'text' },
    { name: 'Number Scrolls', value: 'number' },
    { name: 'Color Crystals', value: 'color' },
    { name: 'Size Specifications', value: 'size' }
  ];

  const addCaravan = () => {
    if (selectedCargo) {
      setCaravans([...caravans, { id: Date.now(), cargo: selectedCargo }]);
      setSelectedCargo('');
    }
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 1: The Caravan Masters</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          As dawn broke over the React Kingdom, a new chapter in our tale began. The Props Messengers, 
          whom we met in our earlier adventures, had evolved their simple message-carrying into something 
          far grander: the Props Caravans.
        </p>
        <p className='story-paragraph'>
          At the kingdom's central trading post, Caravan Master Props stood proudly, organizing wagons 
          filled with precious cargo. "Welcome, young apprentice!" he called out. "Today, you'll learn 
          how we transport not just messages, but entire collections of data across the component realm."
        </p>
        <p className='story-paragraph'>
          Unlike the simple pouches carried by messengers, these caravans could transport multiple items 
          at once: text scrolls, number tablets, color crystals, and even complex objects wrapped in 
          protective containers.
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Build Your First Caravan</h3>
        <p>Select cargo to load into your caravan:</p>

        <div className="cargo-selector">
          {cargoOptions.map(option => (
            <div 
              key={option.value}
              className={`cargo-item ${selectedCargo === option.value ? 'selected' : ''}`}
              onClick={() => setSelectedCargo(option.value)}
            >
              {option.name}
            </div>
          ))}
        </div>

        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <button 
            className="action-button" 
            onClick={addCaravan}
            disabled={!selectedCargo}
          >
            Add to Caravan
          </button>
          <button 
            className="reset-button" 
            onClick={() => {
              setCaravans([]);
              setSelectedCargo('');
            }}
            disabled={caravans.length === 0}
          >
            Reset Caravan
          </button>
        </div>

        <div className="caravan-display">
          {caravans.length === 0 ? (
            <p style={{color: '#6c757d'}}>Your caravan is empty. Select cargo to begin!</p>
          ) : (
            caravans.map(caravan => (
              <div key={caravan.id} className="caravan-wagon">
                <div>📦 Wagon</div>
                <span className="cargo">{caravan.cargo}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          "Props," explained the Caravan Master, "are like the cargo we send from one workshop to another. 
          Just as a caravan carries goods from a supplier to a merchant, props carry data from a parent 
          component to its children."
        </p>
        <p className='story-paragraph'>
          He pointed to a nearby workshop. "See that Button Workshop? When App, our master builder, wants 
          a specific button created, he doesn't just shout 'Make me a button!' Instead, he sends a caravan 
          with detailed specifications: what text to display, what color to use, and what to do when clicked."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// The parent component loads the caravan
<Button 
  text="Click Me"        // Text cargo
  color="blue"          // Color cargo
  onClick={handleClick} // Function cargo
/>

// The child component receives and unpacks the cargo
function Button(props) {
  return (
    <button 
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}`}</pre>
      </div>

      <div className="lesson-insight">
        <h3>The Props Lesson:</h3>
        <p>
          Props in React are like cargo delivered by caravans - they carry data from parent components to their children. 
          Props are read-only and flow in one direction, making components reusable by allowing different data to be 
          passed in. Any JavaScript value can be sent as props, including strings, numbers, arrays, objects, and even 
          functions, enabling flexible component communication.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          Why might sending data through props be better than hardcoding values?
        </p>
        <p>
          What types of "cargo" have you seen being passed as props?
        </p>
        <p>
          How do props make components more flexible?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter1;