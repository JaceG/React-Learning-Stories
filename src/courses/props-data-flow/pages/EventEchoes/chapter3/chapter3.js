import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter3() {
  const [symphony, setSymphony] = useState([]);
  const [activeInstruments, setActiveInstruments] = useState(new Set());
  const [propagationPath, setPropagationPath] = useState([]);
  // Removed unused noteRefs

  const instruments = [
    { id: 'drums', name: 'Drums', note: '🥁', sound: 'boom' },
    { id: 'flute', name: 'Flute', note: '🎵', sound: 'tweet' },
    { id: 'harp', name: 'Harp', note: '🎶', sound: 'pling' },
    { id: 'bell', name: 'Bell', note: '🔔', sound: 'ding' }
  ];

  const playInstrument = (instrument) => {
    // Add to symphony
    const newNote = {
      id: Date.now(),
      instrument: instrument.id,
      note: instrument.note,
      sound: instrument.sound,
      timestamp: new Date().toLocaleTimeString()
    };
    setSymphony([...symphony, newNote]);

    // Animate instrument
    const newActive = new Set(activeInstruments);
    newActive.add(instrument.id);
    setActiveInstruments(newActive);
    
    setTimeout(() => {
      const updated = new Set(activeInstruments);
      updated.delete(instrument.id);
      setActiveInstruments(updated);
    }, 500);

    // Create floating note
    createFloatingNote(instrument.note);
  };

  const createFloatingNote = (note) => {
    const stage = document.querySelector('.symphony-stage');
    if (stage) {
      const noteEl = document.createElement('div');
      noteEl.className = 'note';
      noteEl.textContent = note;
      noteEl.style.left = `${Math.random() * 80 + 10}%`;
      noteEl.style.bottom = '20px';
      stage.appendChild(noteEl);
      setTimeout(() => noteEl.remove(), 2000);
    }
  };

  const demonstratePropagation = () => {
    const nodes = ['child', 'parent', 'grandparent'];
    setPropagationPath([]);
    
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setPropagationPath(prev => [...prev, node]);
      }, index * 500);
    });

    setTimeout(() => {
      setPropagationPath([]);
    }, 2000);
  };

  const resetSymphony = () => {
    setSymphony([]);
    setActiveInstruments(new Set());
    setPropagationPath([]);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 3: Symphony of Events</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          Your final lesson brought you to the Grand Symphony Hall, where the Echo Keeper conducted 
          a magnificent orchestra of components. "Welcome to the pinnacle of event coordination," 
          she announced, her conductor's baton gleaming.
        </p>
        <p className='story-paragraph'>
          "In complex applications," she explained, "events don't just echo between parent and child. 
          They create symphonies—coordinated patterns where multiple components work in harmony, 
          responding to each other's signals through their shared conductor: the parent component."
        </p>
        <p className='story-paragraph'>
          She raised her baton. "Watch as individual instruments (components) play their parts, 
          but the conductor (parent) orchestrates the entire performance, ensuring every note 
          reaches its intended audience."
        </p>
      </div>

      <div className="interactive-section">
        <h3>The Component Orchestra</h3>
        <p>Click instruments to add notes to the symphony:</p>

        <div className="symphony-stage">
          <h4 style={{color: 'white', textAlign: 'center', marginBottom: '20px'}}>
            Symphony Stage
          </h4>
          
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {instruments.map(instrument => (
              <div 
                key={instrument.id}
                className={`instrument ${activeInstruments.has(instrument.id) ? 'playing' : ''}`}
                onClick={() => playInstrument(instrument)}
              >
                <div style={{fontSize: '30px'}}>{instrument.note}</div>
                <div>{instrument.name}</div>
                <small>{instrument.sound}</small>
              </div>
            ))}
          </div>

          {symphony.length > 0 && (
            <div style={{marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
              <h5 style={{color: 'white', marginBottom: '10px'}}>Symphony Score:</h5>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                {symphony.slice(-20).map(note => (
                  <span key={note.id} className="sound-signal" style={{background: '#a29bfe'}}>
                    {note.note} {note.sound}
                  </span>
                ))}
              </div>
              <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px'}}>
                <button 
                  className="reset-button"
                  onClick={resetSymphony}
                  disabled={symphony.length === 0}
                >
                  Reset Symphony
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          The Echo Keeper demonstrated how events could propagate through component hierarchies. 
          "In the DOM," she explained, "events bubble upward naturally. But in React, we control 
          the flow explicitly through our callback chains."
        </p>
        <p className='story-paragraph'>
          "Sometimes," she continued, "a single action must trigger cascading effects across 
          multiple components. The parent becomes the central hub, receiving events from one 
          child and dispatching updates to others—like a conductor ensuring every section of 
          the orchestra stays in sync."
        </p>
      </div>

      <div className="interactive-section">
        <h3>Propagation Visualizer</h3>
        <p>See how events propagate through component trees:</p>

        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
          <button className="echo-button" onClick={demonstratePropagation}>
            Demonstrate Event Propagation
          </button>
          <button 
            className="reset-button"
            onClick={() => setPropagationPath([])}
            disabled={propagationPath.length === 0}
          >
            Reset Propagation
          </button>
        </div>

        <div className="propagation-visualizer">
          <div className={`propagation-node ${propagationPath.includes('child') ? 'active' : ''}`}>
            <h5>Child</h5>
            <p>Initiates Event</p>
          </div>
          <div className={`propagation-node ${propagationPath.includes('parent') ? 'active' : ''}`}>
            <h5>Parent</h5>
            <p>Processes Event</p>
          </div>
          <div className={`propagation-node ${propagationPath.includes('grandparent') ? 'active' : ''}`}>
            <h5>Grandparent</h5>
            <p>Final Handler</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <pre>{`// Complex event coordination - Symphony pattern
function Orchestra() {
  const [performance, setPerformance] = useState({
    tempo: 120,
    volume: 50,
    playing: false,
    sections: {
      strings: { active: false, notes: [] },
      brass: { active: false, notes: [] },
      percussion: { active: false, notes: [] }
    }
  });
  
  // Conductor methods - coordinate all sections
  const startPerformance = () => {
    setPerformance(prev => ({ ...prev, playing: true }));
    // Notify all sections to prepare
  };
  
  const changeTempo = (newTempo) => {
    setPerformance(prev => ({ ...prev, tempo: newTempo }));
    // All sections adjust to new tempo
  };
  
  // Section callbacks - each section reports to conductor
  const handleSectionPlay = (section, note) => {
    setPerformance(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          active: true,
          notes: [...prev.sections[section].notes, note]
        }
      }
    }));
    
    // Coordinate with other sections
    if (section === 'percussion' && note === 'cymbal') {
      // Trigger brass section to play fanfare
      triggerBrassFantare();
    }
  };
  
  const handleSectionStop = (section) => {
    setPerformance(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: { ...prev.sections[section], active: false }
      }
    }));
  };
  
  return (
    <div>
      <ConductorControls 
        onStart={startPerformance}
        onTempoChange={changeTempo}
        tempo={performance.tempo}
      />
      
      <StringSection 
        tempo={performance.tempo}
        playing={performance.playing}
        onPlay={(note) => handleSectionPlay('strings', note)}
        onStop={() => handleSectionStop('strings')}
      />
      
      <BrassSection 
        tempo={performance.tempo}
        playing={performance.playing}
        onPlay={(note) => handleSectionPlay('brass', note)}
        onStop={() => handleSectionStop('brass')}
      />
      
      <PercussionSection 
        tempo={performance.tempo}
        playing={performance.playing}
        onPlay={(note) => handleSectionPlay('percussion', note)}
        onStop={() => handleSectionStop('percussion')}
      />
    </div>
  );
}

// Event delegation pattern
function ListWithDelegation({ items, onItemAction }) {
  // Single handler for all items
  const handleClick = (event) => {
    const itemId = event.target.dataset.itemId;
    const action = event.target.dataset.action;
    
    if (itemId && action) {
      onItemAction(itemId, action);
    }
  };
  
  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button data-item-id={item.id} data-action="edit">
            Edit
          </button>
          <button data-item-id={item.id} data-action="delete">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}`}</pre>
      </div>

      <div className="lesson-insight">
        <h3>The Event Coordination Lesson:</h3>
        <p>
          Complex applications require sophisticated event coordination, where parent components act as conductors 
          orchestrating communication between sibling components. Event delegation patterns reduce callback proliferation 
          by handling multiple related events through a single handler. Clear event flow patterns and well-structured 
          coordination improve maintainability as applications scale, creating harmonious component symphonies.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          How can event coordination patterns scale with app complexity?
        </p>
        <p className='story-paragraph'>
          When does event handling benefit from state management libraries?
        </p>
        <p className='story-paragraph'>
          What strategies prevent callback prop drilling in deep hierarchies?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter3;