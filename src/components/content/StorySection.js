/**
 * StorySection - A reusable component for narrative story paragraphs.
 *
 * Supports both JSX elements (legacy hardcoded) and HTML strings (runtime JSON).
 * HTML strings containing tags are rendered via dangerouslySetInnerHTML,
 * which is safe here because all narrative content is authored internally.
 *
 * @param {Array<string|React.ReactElement>} paragraphs
 */

const HTML_TAG_RE = /<[a-z][\s\S]*?>/i;

const StorySection = ({ paragraphs }) => {
	if (!paragraphs || paragraphs.length === 0) return null;

	return (
		<div className='story-section'>
			{paragraphs.map((paragraph, index) =>
				typeof paragraph === 'string' && HTML_TAG_RE.test(paragraph) ? (
					<p
						key={index}
						className='story-paragraph'
						dangerouslySetInnerHTML={{ __html: paragraph }}
					/>
				) : (
					<p key={index} className='story-paragraph'>
						{paragraph}
					</p>
				)
			)}
		</div>
	);
};

export default StorySection;
