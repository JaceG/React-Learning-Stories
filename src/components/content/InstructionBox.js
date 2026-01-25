import React from 'react';

/**
 * InstructionBox - Displays styled instruction text for interactive exercises
 * 
 * @param {string} character - Optional character intro (e.g., "Chronos hands you a magical hourglass.")
 * @param {string} secondaryText - Optional secondary instruction text (for multi-paragraph instructions)
 * @param {ReactNode} children - The main instruction content
 */
const InstructionBox = ({ character, secondaryText, children }) => {
	return (
		<div className='instruction-box'>
			<p>
				{character && <strong>👉 {character}</strong>}
				{character && ' '}
				{children}
			</p>
			{secondaryText && <p>{secondaryText}</p>}
		</div>
	);
};

export default InstructionBox;
