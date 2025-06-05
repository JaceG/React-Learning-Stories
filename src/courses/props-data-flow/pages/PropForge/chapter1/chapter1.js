import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter1() {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [forgedProps, setForgedProps] = useState({});
  const [isForging, setIsForging] = useState(false);

  const materials = [
    { id: 'title', name: 'Title Iron', value: '"Master Sword"' },
    { id: 'damage', name: 'Damage Crystal', value: '100' },
    { id: 'element', name: 'Element Gem', value: '"fire"' },
    { id: 'durability', name: 'Durability Stone', value: '500' }
  ];

  const toggleMaterial = (material) => {
    if (selectedMaterials.find(m => m.id === material.id)) {
      setSelectedMaterials(selectedMaterials.filter(m => m.id !== material.id));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const forgeProp = () => {
    setIsForging(true);
    setTimeout(() => {
      const newProps = {};
      selectedMaterials.forEach(material => {
        newProps[material.id] = material.value;
      });
      setForgedProps(newProps);
      setIsForging(false);
      setSelectedMaterials([]);
    }, 1500);
  };

  const resetForge = () => {
    setSelectedMaterials([]);
    setForgedProps({});
    setIsForging(false);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 1: The Prop Forge</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          Deep beneath the React Kingdom, in the volcanic caverns where data is forged into props, 
          you met Master Smith Destruct. His workshop glowed with the heat of a thousand forges, 
          where raw materials were transformed into the props that powered the entire kingdom.
        </p>
        <p className='story-paragraph'>
          "Welcome to the Prop Forge!" boomed Destruct, his beard singed from years of smithing. 
          "Here, we don't just pass props—we craft them, shape them, and extract their essence 
          through the ancient art of destructuring."
        </p>
        <p className='story-paragraph'>
          He gestured to various glowing materials. "Each prop begins as raw material. We combine 
          them, forge them together, and then—most importantly—we learn to destructure them, 
          extracting exactly what we need with precision and elegance."
        </p>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>The Forging Chamber</h3>
        <p>Select materials to forge into props:</p>

        <div className="material-selector">
          {materials.map(material => (
            <div 
              key={material.id}
              className={`prop-material ${selectedMaterials.find(m => m.id === material.id) ? 'selected' : ''}`}
              onClick={() => toggleMaterial(material)}
            >
              <strong>{material.name}</strong>
              <div style={{fontSize: '14px', marginTop: '5px'}}>
                {material.id}: {material.value}
              </div>
            </div>
          ))}
        </div>

        <div className="forge-workshop">
          <div className="anvil">
            <div className="hammer" onClick={forgeProp}>🔨</div>
            <p>{isForging ? 'Forging...' : 'Click hammer to forge!'}</p>
          </div>

          {Object.keys(forgedProps).length > 0 && !isForging && (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <h4 style={{color: 'white'}}>Forged Props:</h4>
              <div className="forged-prop">
                {JSON.stringify(forgedProps, null, 2)}
              </div>
            </div>
          )}
          
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px'}}>
            <button 
              className="reset-button"
              onClick={resetForge}
              disabled={selectedMaterials.length === 0 && Object.keys(forgedProps).length === 0}
            >
              Reset Forge
            </button>
          </div>
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          "Now," Destruct explained, pulling out a glowing prop object, "the real skill isn't in 
          forging props—it's in destructuring them. Watch as I extract individual properties with 
          a single incantation."
        </p>
        <p className='story-paragraph'>
          He demonstrated the ancient technique, showing how a complex prop object could be elegantly 
          unpacked into individual variables. "This is the difference between a novice who writes 
          'props.title, props.damage, props.element' and a master who writes a single destructuring 
          spell."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// The old way - accessing props repeatedly
function WeaponCard(props) {
  return (
    <div className="weapon">
      <h3>{props.title}</h3>
      <p>Damage: {props.damage}</p>
      <p>Element: {props.element}</p>
      <p>Durability: {props.durability}</p>
    </div>
  );
}

// The master smith's way - destructuring
function WeaponCard({ title, damage, element, durability }) {
  return (
    <div className="weapon">
      <h3>{title}</h3>
      <p>Damage: {damage}</p>
      <p>Element: {element}</p>
      <p>Durability: {durability}</p>
    </div>
  );
}

// Advanced destructuring with defaults
function WeaponCard({ 
  title = "Unknown Weapon",
  damage = 0,
  element = "normal",
  durability = 100 
}) {
  return (
    <div className="weapon">
      <h3>{title}</h3>
      <p>Damage: {damage}</p>
      <p>Element: {element}</p>
      <p>Durability: {durability}/{100}</p>
    </div>
  );
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3 className='section-title'>Destructuring Demonstration</h3>
        <div className="prop-inspector">
          <p style={{color: '#ffd43b', marginBottom: '15px'}}>{'// Original props object:'}</p>
          <pre>{`const props = {
  title: "Master Sword",
  damage: 100,
  element: "fire",
  durability: 500,
  owner: "Link"
}`}</pre>
          
          <p style={{color: '#ffd43b', margin: '15px 0'}}>{'// Destructuring magic:'}</p>
          <pre>{`const { title, damage, element, durability, owner } = props;

// Now each property is its own variable!
console.log(title);     // "Master Sword"
console.log(damage);    // 100
console.log(element);   // "fire"`}</pre>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Destructuring Lesson:</h3>
        <p>
          Destructuring is a powerful technique that extracts properties from props objects, making code cleaner and 
          more readable. By destructuring in function parameters, you can extract only the props you need while providing 
          default values for missing props. This ancient art transforms verbose prop access patterns into elegant, 
          maintainable code that clearly shows which props a component uses.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          How does destructuring improve code maintainability?
        </p>
        <p className='story-paragraph'>
          When should you provide default values for props?
        </p>
        <p className='story-paragraph'>
          What are the benefits of destructuring in function parameters?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter1;