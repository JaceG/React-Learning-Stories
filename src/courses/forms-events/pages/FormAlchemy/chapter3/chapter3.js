import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const { 
		validationRunes,
		activateValidationRune,
		portalActive,
		openPortal
	} = useOutletContext();

	const [masterForm, setMasterForm] = useState({
		wizardName: '',
		spellLevel: '',
		ingredients: '',
		incantation: '',
		purpose: ''
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validationSpells = [
		{ name: 'Required', rune: '✦', check: (value) => value.trim() !== '' },
		{ name: 'MinLength', rune: '⟡', check: (value) => value.length >= 5 },
		{ name: 'Email', rune: '@', check: (value) => /\S+@\S+\.\S+/.test(value) },
		{ name: 'Number', rune: '#', check: (value) => !isNaN(value) && value !== '' }
	];

	const validateField = (name, value) => {
		let error = '';

		switch (name) {
			case 'wizardName':
				if (!value.trim()) error = 'Every wizard must have a name';
				else if (value.length < 3) error = 'Name must be at least 3 characters';
				break;
			case 'spellLevel':
				if (!value) error = 'Spell level is required';
				else if (isNaN(value) || value < 1 || value > 10) error = 'Level must be between 1-10';
				break;
			case 'ingredients':
				if (!value.trim()) error = 'Spells need ingredients';
				else if (value.split(',').length < 2) error = 'At least 2 ingredients required';
				break;
			case 'incantation':
				if (!value.trim()) error = 'No spell works without words';
				else if (value.length < 10) error = 'Incantation too short';
				break;
			default:
				break;
		}

		return error;
	};

	const handleFieldChange = (e) => {
		const { name, value } = e.target;
		setMasterForm({ ...masterForm, [name]: value });

		const error = validateField(name, value);
		setErrors({ ...errors, [name]: error });

		if (!error && value) {
			activateValidationRune(name);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const newErrors = {};
		Object.keys(masterForm).forEach(key => {
			const error = validateField(key, masterForm[key]);
			if (error) newErrors[key] = error;
		});

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsSubmitting(true);
		openPortal();

		setTimeout(() => {
			alert('Your spell has been cast successfully! 🎉');
			setIsSubmitting(false);
			setMasterForm({
				wizardName: '',
				spellLevel: '',
				ingredients: '',
				incantation: '',
				purpose: ''
			});
			setErrors({});
		}, 3000);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Grand Transmutation
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					The time had come for Aria's final test. She must combine all 
					her knowledge - controlled components, state management, and 
					validation spells - to create the Grand Transmutation Form, 
					capable of turning user intentions into powerful React magic.
				</p>

				<div className='validation-runes'>
					<h3>Validation Runes</h3>
					<p>Each rune lights up when its validation passes:</p>
					<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
						{Object.keys(masterForm).map((field) => (
							<div 
								key={field}
								className={`validation-rune ${validationRunes[field] ? 'active' : ''} ${errors[field] ? 'error' : ''}`}>
								{field.charAt(0).toUpperCase()}
							</div>
						))}
					</div>
				</div>

				<div className={`submission-portal ${portalActive ? 'active' : ''}`}>
					<div className='portal-energy'></div>
					<div style={{ color: 'white', fontWeight: 'bold' }}>
						{portalActive ? 'Casting...' : 'Portal Ready'}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					The Grand Transmutation Form
				</h3>

				<div className='form-preview'>
					<form onSubmit={handleSubmit}>
						<h4>Spell Creation Form</h4>
						
						<div>
							<label>Wizard Name: ✦</label>
							<input
								type='text'
								name='wizardName'
								value={masterForm.wizardName}
								onChange={handleFieldChange}
								placeholder='Enter your wizard name'
							/>
							{errors.wizardName && <p style={{ color: '#f56565' }}>{errors.wizardName}</p>}
						</div>

						<div>
							<label>Spell Level (1-10): #</label>
							<input
								type='number'
								name='spellLevel'
								value={masterForm.spellLevel}
								onChange={handleFieldChange}
								placeholder='1-10'
								min='1'
								max='10'
							/>
							{errors.spellLevel && <p style={{ color: '#f56565' }}>{errors.spellLevel}</p>}
						</div>

						<div>
							<label>Ingredients (comma-separated): ⟡</label>
							<input
								type='text'
								name='ingredients'
								value={masterForm.ingredients}
								onChange={handleFieldChange}
								placeholder='eye of newt, dragon scale, moonstone'
							/>
							{errors.ingredients && <p style={{ color: '#f56565' }}>{errors.ingredients}</p>}
						</div>

						<div>
							<label>Incantation: ✦</label>
							<textarea
								name='incantation'
								value={masterForm.incantation}
								onChange={handleFieldChange}
								placeholder='The magical words of your spell...'
								rows='3'
							/>
							{errors.incantation && <p style={{ color: '#f56565' }}>{errors.incantation}</p>}
						</div>

						<div>
							<label>Purpose:</label>
							<select
								name='purpose'
								value={masterForm.purpose}
								onChange={handleFieldChange}>
								<option value=''>Select purpose...</option>
								<option value='healing'>Healing</option>
								<option value='protection'>Protection</option>
								<option value='transformation'>Transformation</option>
								<option value='divination'>Divination</option>
							</select>
						</div>

						<button 
							type='submit' 
							disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}>
							{isSubmitting ? 'Casting Spell...' : 'Cast Spell'}
						</button>
					</form>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// The Complete Form Alchemy Pattern
function MasterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validate = (name, value) => {
    switch (name) {
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) 
          ? 'Invalid email' : '';
      case 'name':
        return value.length < 2 
          ? 'Name too short' : '';
      default:
        return '';
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitToAPI(formData);
      alert('Success!');
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Master's Secret:</h3>
				<p>
					A complete form combines controlled components for predictability, 
					comprehensive state management for organization, real-time validation 
					for user feedback, and proper submission handling for reliability. 
					This is the true alchemy of React forms - transforming simple inputs 
					into powerful, user-friendly experiences.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do validation "runes" protect your forms like magical 
					wards protect a spell?
				</p>
				<p>
					What parallels exist between casting a spell and submitting 
					a form in a web application?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;