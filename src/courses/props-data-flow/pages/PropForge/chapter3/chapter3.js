import React, { useState } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter3() {
  const [testProps, setTestProps] = useState({
    name: '',
    level: '',
    element: 'fire'
  });
  
  const [validationResults, setValidationResults] = useState([]);

  const propValidations = {
    name: {
      test: (value) => value && value.length >= 3,
      message: 'Name must be at least 3 characters'
    },
    level: {
      test: (value) => !isNaN(value) && value >= 1 && value <= 100,
      message: 'Level must be a number between 1 and 100'
    },
    element: {
      test: (value) => ['fire', 'water', 'earth', 'air'].includes(value),
      message: 'Element must be fire, water, earth, or air'
    }
  };

  const validateProps = () => {
    const results = Object.entries(testProps).map(([key, value]) => {
      const validation = propValidations[key];
      const isValid = validation.test(value);
      return {
        prop: key,
        value,
        isValid,
        message: isValid ? 'Valid!' : validation.message
      };
    });
    setValidationResults(results);
  };

  const updateProp = (key, value) => {
    setTestProps({ ...testProps, [key]: value });
  };

  const resetValidation = () => {
    setTestProps({
      name: '',
      level: '',
      element: 'fire'
    });
    setValidationResults([]);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 3: Master Crafting</h2>

      <div className='story-section'>
        <p className='story-paragraph'>
          On your final day at the Prop Forge, Master Destruct led you to the most sacred chamber: 
          the Validation Vault. Here, glowing runes covered the walls, each one a rule for ensuring 
          prop quality and type safety.
        </p>
        <p className='story-paragraph'>
          "The most dangerous bugs," Destruct intoned seriously, "come from props that aren't what 
          they claim to be. A number pretending to be a string, a missing required prop, or an 
          unexpected null—these can shatter components like poorly forged steel."
        </p>
        <p className='story-paragraph'>
          He gestured to an ancient inscription. "In the old days, we used PropTypes, magical 
          validators that would warn of incorrect props. Now, many use TypeScript, an even more 
          powerful enchantment that prevents bad props from ever being forged."
        </p>
      </div>

      <div className="interactive-section">
        <h3>The Validation Forge</h3>
        <p>Test prop validation by forging a magical item:</p>

        <div className="validation-panel">
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>
              Item Name:
              <input 
                type="text"
                value={testProps.name}
                onChange={(e) => updateProp('name', e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6'
                }}
              />
            </label>
          </div>

          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>
              Power Level:
              <input 
                type="text"
                value={testProps.level}
                onChange={(e) => updateProp('level', e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6'
                }}
              />
            </label>
          </div>

          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>
              Element Type:
              <select 
                value={testProps.element}
                onChange={(e) => updateProp('element', e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6'
                }}
              >
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="air">Air</option>
                <option value="chaos">Chaos (Invalid)</option>
              </select>
            </label>
          </div>

          <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
            <button className="forge-button" onClick={validateProps}>
              Validate Props
            </button>
            <button 
              className="reset-button"
              onClick={resetValidation}
              disabled={testProps.name === '' && testProps.level === '' && testProps.element === 'fire' && validationResults.length === 0}
            >
              Reset Validation
            </button>
          </div>

          {validationResults.length > 0 && (
            <div style={{marginTop: '20px'}}>
              <h4>Validation Results:</h4>
              {validationResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`validation-result ${result.isValid ? 'valid' : 'invalid'}`}
                >
                  <strong>{result.prop}:</strong> {result.message}
                  {result.value && <span> (value: "{result.value}")</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='story-section'>
        <p className='story-paragraph'>
          Master Destruct gathered several perfectly forged props, each gleaming with quality. "Remember 
          these principles," he said. "Always validate your props. Use default values wisely. Never 
          mutate props directly—they are immutable artifacts."
        </p>
        <p className='story-paragraph'>
          "And most importantly," he added with a knowing smile, "document your prop requirements. 
          Future smiths—including your future self—will thank you for clear prop contracts and 
          expectations."
        </p>
      </div>

      <div className="code-example">
        <pre>{`// PropTypes validation (classic approach)
import PropTypes from 'prop-types';

function MagicalItem({ name, level, element, onUse }) {
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>Level: {level}</p>
      <p>Element: {element}</p>
      <button onClick={onUse}>Use Item</button>
    </div>
  );
}

MagicalItem.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  element: PropTypes.oneOf(['fire', 'water', 'earth', 'air']).isRequired,
  onUse: PropTypes.func.isRequired
};

MagicalItem.defaultProps = {
  element: 'fire'
};

// TypeScript approach (modern)
interface MagicalItemProps {
  name: string;
  level: number;
  element: 'fire' | 'water' | 'earth' | 'air';
  onUse: () => void;
  rarity?: 'common' | 'rare' | 'legendary'; // optional prop
}

const MagicalItem: React.FC<MagicalItemProps> = ({ 
  name, 
  level, 
  element = 'fire', 
  onUse,
  rarity = 'common'
}) => {
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>Level: {level}</p>
      <p>Element: {element}</p>
      <p>Rarity: {rarity}</p>
      <button onClick={onUse}>Use Item</button>
    </div>
  );
};

// Runtime validation helper
function validateProps(props, schema) {
  const errors = [];
  
  Object.entries(schema).forEach(([key, validator]) => {
    if (validator.required && !props[key]) {
      errors.push(\`\${key} is required\`);
    }
    if (props[key] && validator.type && typeof props[key] !== validator.type) {
      errors.push(\`\${key} must be of type \${validator.type}\`);
    }
    if (props[key] && validator.validate && !validator.validate(props[key])) {
      errors.push(\`\${key} failed validation\`);
    }
  });
  
  return errors;
}`}</pre>
      </div>

      <div className="interactive-section">
        <h3>Master Smith's Best Practices</h3>
        <div className="forge-controls">
          <h4>The Sacred Rules of Prop Forging:</h4>
          
          <ol style={{lineHeight: '1.8', paddingLeft: '20px'}}>
            <li><strong>Never Mutate Props:</strong> Props are read-only contracts</li>
            <li><strong>Validate Early:</strong> Catch type errors during development</li>
            <li><strong>Provide Defaults:</strong> Handle missing optional props gracefully</li>
            <li><strong>Use Descriptive Names:</strong> <code>isLoading</code> not <code>loading</code></li>
            <li><strong>Keep Props Minimal:</strong> Pass only what's needed</li>
            <li><strong>Document Complex Props:</strong> Add comments for clarity</li>
            <li><strong>Avoid Prop Drilling:</strong> Consider Context for deep trees</li>
            <li><strong>Type Your Props:</strong> Use TypeScript or PropTypes</li>
          </ol>
        </div>
      </div>

      <div className="lesson-insight">
        <h3>The Prop Validation Lesson:</h3>
        <p>
          Prop validation is crucial for preventing runtime errors and improving debugging. Whether using PropTypes for 
          runtime warnings or TypeScript for compile-time safety, validation ensures components receive the correct data 
          types. Default props provide fallbacks for missing data, while well-typed props serve as living documentation, 
          making your components more reliable and easier to maintain.
        </p>
      </div>

      <div className="reflection-section">
        <h3>Reflect on the Story</h3>
        <p>
          How does prop validation improve team collaboration?
        </p>
        <p className='story-paragraph'>
          When should you use runtime vs compile-time validation?
        </p>
        <p className='story-paragraph'>
          What strategies help maintain clean prop interfaces as apps grow?
        </p>
      </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter3;