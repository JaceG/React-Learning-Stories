import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter2() {
  const [damGates, setDamGates] = useState({
    gate1: false,
    gate2: false,
    gate3: false
  });
  
  const [flowRate, setFlowRate] = useState(0);

  const toggleGate = (gate) => {
    const newGates = { ...damGates, [gate]: !damGates[gate] };
    setDamGates(newGates);
    
    const openGates = Object.values(newGates).filter(isOpen => isOpen).length;
    setFlowRate(openGates * 33);
  };

  const resetGates = () => {
    setDamGates({
      gate1: false,
      gate2: false,
      gate3: false
    });
    setFlowRate(0);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 2: Dams and Bridges</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          The next day, Flow led you to a massive dam built across the data river. A sturdy dwarf 
          named Damian greeted you, his beard wet with river spray. "Ah, another apprentice to learn 
          the art of flow control!"
        </p>
        <p className='story-paragraph'>
          He gestured to the complex system of gates and channels. "While we cannot reverse the river's 
          flow, we can control it. These dams represent conditional rendering and data transformation—
          deciding what data flows through and how it's shaped along the way."
        </p>
        <p className='story-paragraph'>
          "Sometimes," Damian explained, adjusting a valve, "you need to filter the water, letting only 
          certain properties through. Other times, you transform it, adding minerals or changing its 
          temperature before it continues downstream."
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Dam Control System</h3>
        <p>Open gates to control data flow (current flow: {flowRate}%)</p>

        <div className="dam-control">
          <h4>Data Flow Gates</h4>
          <div>
            <div 
              className={`dam-gate ${damGates.gate1 ? 'open' : ''}`}
              onClick={() => toggleGate('gate1')}
            >
              User Data Gate {damGates.gate1 ? '(Open)' : '(Closed)'}
            </div>
            <div 
              className={`dam-gate ${damGates.gate2 ? 'open' : ''}`}
              onClick={() => toggleGate('gate2')}
            >
              Settings Gate {damGates.gate2 ? '(Open)' : '(Closed)'}
            </div>
            <div 
              className={`dam-gate ${damGates.gate3 ? 'open' : ''}`}
              onClick={() => toggleGate('gate3')}
            >
              Permissions Gate {damGates.gate3 ? '(Open)' : '(Closed)'}
            </div>
          </div>
          
          <div style={{marginTop: '20px', fontSize: '14px', color: '#5d4037'}}>
            Flow Rate: {flowRate > 0 ? `${flowRate}% - River is flowing!` : 'No flow - All gates closed'}
          </div>
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px'}}>
            <button 
              className="reset-button"
              onClick={resetGates}
              disabled={flowRate === 0}
            >
              Reset All Gates
            </button>
          </div>
        </div>

        <div className="data-packet" style={{marginTop: '20px'}}>
          <h4>Downstream Components Receive:</h4>
          {flowRate === 0 && <p style={{color: '#999'}}>No data flowing...</p>}
          {damGates.gate1 && <div className="water-drop">User: {`{ name, email, role }`}</div>}
          {damGates.gate2 && <div className="water-drop">Settings: {`{ theme, language }`}</div>}
          {damGates.gate3 && <div className="water-drop">Permissions: {`{ canEdit, canDelete }`}</div>}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          Further along the river, you encountered the Bridge Builders—components that allowed data to 
          cross from one branch to another, but always maintaining the downward flow. "These bridges," 
          Flow explained, "represent shared parent components that distribute data to multiple children."
        </p>
        <p className='story-paragraph'>
          "The key to good architecture," she continued, "is placing your data source high enough that 
          it can flow to all components that need it, like positioning a water tower to serve an entire 
          village."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// Controlling data flow with conditional rendering
function DataDam({ userData, settings, permissions, userRole }) {
  // Gate 1: Filter user data based on permissions
  const filteredUserData = permissions.canViewUsers 
    ? userData 
    : { name: userData.name }; // Only basic info
  
  // Gate 2: Transform settings based on user role
  const userSettings = {
    ...settings,
    advancedOptions: userRole === 'admin' ? settings.advanced : null
  };
  
  // Gate 3: Conditional rendering - some components only for certain roles
  return (
    <div>
      <UserProfile data={filteredUserData} />
      <SettingsPanel settings={userSettings} />
      
      {permissions.canEdit && (
        <EditControls />  // This component only renders if gate is open
      )}
      
      {permissions.canDelete && (
        <DeleteButton />  // Another conditional gate
      )}
    </div>
  );
}

// Transforming data as it flows
function DataTransformer({ rawData }) {
  // Transform the data before passing it down
  const processedData = {
    ...rawData,
    displayName: rawData.firstName + ' ' + rawData.lastName,
    formattedDate: new Date(rawData.timestamp).toLocaleDateString(),
    isActive: rawData.status === 'active'
  };
  
  return <DisplayComponent data={processedData} />;
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Data Transformation Pipeline</h3>
        <div style={{background: '#f5f5f5', padding: '20px', borderRadius: '8px'}}>
          <div className="flow-control-panel">
            <h4>Raw Data from Source:</h4>
            <code style={{display: 'block', background: '#fff', padding: '10px', borderRadius: '4px'}}>
              {`{ firstName: "River", lastName: "Guide", timestamp: 1234567890, status: "active" }`}
            </code>
          </div>
          
          <div style={{textAlign: 'center', fontSize: '24px', color: '#0288d1', margin: '10px 0'}}>
            ↓ Transform ↓
          </div>
          
          <div className="flow-control-panel">
            <h4>Processed Data to Children:</h4>
            <code style={{display: 'block', background: '#e3f2fd', padding: '10px', borderRadius: '4px'}}>
              {`{ displayName: "River Guide", formattedDate: "1/15/2009", isActive: true, ... }`}
            </code>
          </div>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Flow Control Lesson:</h3>
        <p>
          Controlling data flow involves using conditional rendering to determine which components receive data, and 
          transforming props to match child component needs. Like dams and bridges on a river, you can filter sensitive 
          data before passing it downstream and must place data sources high enough in the component tree to reach all 
          consumers. This ensures efficient, secure, and maintainable data distribution.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          When should you transform data vs. passing it raw?
        </p>
        <p>
          How do you decide where to place your "data dams"?
        </p>
        <p>
          What are the trade-offs of filtering data at different levels?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter2;