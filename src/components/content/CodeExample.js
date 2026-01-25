import React from 'react';

/**
 * CodeExample - A reusable code example component with header
 *
 * @param {Object} props
 * @param {string} props.title - The title of the code example
 * @param {string} [props.discoveredBy] - Attribution text (e.g., "Transcribed by Aria")
 * @param {string} props.code - The code content to display
 * @param {React.ReactNode} [props.children] - Alternative to code prop for more complex content
 */
const CodeExample = ({ title, discoveredBy, code, children }) => {
	return (
		<div className='code-example'>
			<div className='scroll-header'>
				<span>{title}</span>
				{discoveredBy && (
					<span className='discovered-by'>{discoveredBy}</span>
				)}
			</div>
			{code ? <pre>{code}</pre> : children}
		</div>
	);
};

export default CodeExample;
