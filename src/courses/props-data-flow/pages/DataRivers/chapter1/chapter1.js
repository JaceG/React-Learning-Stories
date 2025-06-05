import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter1() {
  const [riverFlowing, setRiverFlowing] = useState(false);
  const [dataDrops, setDataDrops] = useState([]);
  
  const startRiverFlow = () => {
    setRiverFlowing(true);
    const drops = ['name: "River"', 'depth: 10', 'speed: "fast"', 'clear: true'];
    setDataDrops(drops);
  };

  const resetRiverFlow = () => {
    setRiverFlowing(false);
    setDataDrops([]);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 1: The Data Rivers</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          After mastering the caravan routes, you journeyed to the Great Data Rivers of the React Kingdom. 
          Here, a wise River Guide named Flow awaited you at the riverbank, her blue robes rippling like 
          water in the breeze.
        </p>
        <p className='story-paragraph'>
          "Welcome, young developer," Flow said, gesturing to the magnificent river before you. "The 
          caravans taught you about transporting props, but the rivers will teach you about the flow 
          of data itself."
        </p>
        <p className='story-paragraph'>
          She pointed upstream. "In our kingdom, data flows like water—always from the mountain peaks 
          (parent components) down to the valleys (child components). This is the sacred law of 
          unidirectional data flow, and it can never be reversed."
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>The River's Source</h3>
        <p>Click to release data from the mountain source:</p>

        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
          <button 
            className="action-button" 
            onClick={startRiverFlow}
          >
            Open the Source
          </button>
          <button 
            className="reset-button"
            onClick={resetRiverFlow}
            disabled={!riverFlowing}
          >
            Reset River
          </button>
        </div>

        <div className="river-visualization">
          <div className="river-source">
            Parent Component
            <div style={{fontSize: '12px', marginTop: '5px'}}>
              (Mountain Source)
            </div>
          </div>

          {riverFlowing && (
            <>
              <div className="river-flow"></div>
              
              <div className="river-branch left level-1">
                <h4>Child A</h4>
                {dataDrops.slice(0, 2).map((drop, idx) => (
                  <div key={idx} className="water-drop">{drop}</div>
                ))}
              </div>

              <div className="river-branch right level-1">
                <h4>Child B</h4>
                {dataDrops.slice(2, 4).map((drop, idx) => (
                  <div key={idx} className="water-drop">{drop}</div>
                ))}
              </div>

              <div className="river-branch left level-2">
                <h4>Grandchild A1</h4>
                {dataDrops.slice(0, 1).map((drop, idx) => (
                  <div key={idx} className="water-drop">{drop}</div>
                ))}
              </div>

              <div className="river-branch right level-2">
                <h4>Grandchild B1</h4>
                {dataDrops.slice(2, 3).map((drop, idx) => (
                  <div key={idx} className="water-drop">{drop}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          Flow walked along the riverbank, explaining the ancient principles. "Just as water cannot 
          flow uphill without magical intervention, data in React cannot flow from child to parent 
          through props. This one-way flow ensures predictability and clarity."
        </p>
        <p className='story-paragraph'>
          "When the source changes," she demonstrated by adjusting a lever, "the entire river adjusts 
          accordingly. Every component downstream receives the fresh data, maintaining perfect 
          synchronization throughout the kingdom."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// Data flows downward like a river
function MountainSource() {
  // The source of our data river
  const [waterLevel, setWaterLevel] = useState(100);
  const [temperature, setTemperature] = useState(15);
  
  return (
    <>
      <ValleyComponent 
        waterLevel={waterLevel}      // Flows down
        temperature={temperature}    // Flows down
      />
      <StreamComponent 
        waterLevel={waterLevel}      // Same data, different branch
      />
    </>
  );
}

function ValleyComponent({ waterLevel, temperature }) {
  // Receives data from upstream
  // Cannot send data back up through props!
  return (
    <div>
      <p>Water Level: {waterLevel}m</p>
      <p>Temperature: {temperature}°C</p>
      <PondComponent waterLevel={waterLevel} />
    </div>
  );
}

function PondComponent({ waterLevel }) {
  // Even further downstream
  return <p>Pond depth: {waterLevel / 10}m</p>;
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Flow Direction Visualizer</h3>
        <div className="data-packet">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{textAlign: 'center'}}>
              <div className="flow-component parent" style={{position: 'static', marginBottom: '10px'}}>
                <strong>Parent</strong>
                <div style={{fontSize: '12px'}}>Has State</div>
              </div>
            </div>
            
            <div className="flow-indicator">↓</div>
            
            <div style={{textAlign: 'center'}}>
              <div className="flow-component" style={{position: 'static', marginBottom: '10px'}}>
                <strong>Child</strong>
                <div style={{fontSize: '12px'}}>Receives Props</div>
              </div>
            </div>
            
            <div className="flow-indicator">↓</div>
            
            <div style={{textAlign: 'center'}}>
              <div className="flow-component" style={{position: 'static', marginBottom: '10px'}}>
                <strong>Grandchild</strong>
                <div style={{fontSize: '12px'}}>Inherits Props</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Data Flow Lesson:</h3>
        <p>
          React's unidirectional data flow ensures that data moves in one direction only—from parent components down to 
          their children through props. This one-way flow, where props are read-only at each level, creates predictable 
          and debuggable applications. When data changes at the source, all downstream components automatically receive 
          the updates, maintaining perfect synchronization throughout the component tree.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          Why is unidirectional data flow important for application stability?
        </p>
        <p>
          How does this pattern help with debugging React applications?
        </p>
        <p>
          What would happen if data could flow in multiple directions?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter1;