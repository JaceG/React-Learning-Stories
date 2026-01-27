/**
 * StorySection - A reusable component for narrative story paragraphs.
 * 
 * This component wraps consecutive story paragraphs in a consistent structure,
 * making narrative content easy to edit and extract for continuity checking.
 * 
 * @param {string[]} paragraphs - Array of story paragraph strings
 * 
 * @example
 * <StorySection
 *   paragraphs={[
 *     `The morning mist parted as Aria approached the gates...`,
 *     `"Welcome, young apprentice," Aurelius said...`,
 *     `Aurelius pointed to the tallest tower...`
 *   ]}
 * />
 */

const StorySection = ({ paragraphs }) => {
	return (
		<div className='story-section'>
			{paragraphs.map((paragraph, index) => (
				<p key={index} className='story-paragraph'>
					{paragraph}
				</p>
			))}
		</div>
	);
};

export default StorySection;
