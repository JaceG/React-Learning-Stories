import React from 'react';

/**
 * InteractiveExercise - A reusable wrapper for interactive exercise sections
 *
 * @param {Object} props
 * @param {string} props.title - The exercise title (displayed in section-title)
 * @param {string|React.ReactNode} [props.instructions] - Optional instruction text or JSX
 * @param {boolean} [props.useInstructionBox=false] - If true, wraps instructions in instruction-box div
 * @param {React.ReactNode} props.children - The interactive content
 */
const InteractiveExercise = ({
	title,
	instructions,
	useInstructionBox = false,
	children,
}) => {
	const renderInstructions = () => {
		if (!instructions) return null;

		if (useInstructionBox) {
			return (
				<div className='instruction-box'>
					{typeof instructions === 'string' ? (
						<p>{instructions}</p>
					) : (
						instructions
					)}
				</div>
			);
		}

		// Default: render as paragraph with instruction class
		return typeof instructions === 'string' ? (
			<p className='instruction'>{instructions}</p>
		) : (
			instructions
		);
	};

	return (
		<div className='interactive-section'>
			<h3 className='section-title'>{title}</h3>
			{renderInstructions()}
			{children}
		</div>
	);
};

export default InteractiveExercise;
