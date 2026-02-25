import { useState, useEffect, useRef } from 'react';

const cache = {};

/**
 * Fetches chapter or lesson narrative JSON from public/narratives/ at runtime.
 *
 * @param {string} lpFolder      e.g. "components-basics"
 * @param {string} lessonFolder   e.g. "ComponentKingdom"
 * @param {number|null} chapter   1-3 for chapter JSON, null for lesson.json
 * @returns {{ narrative: object|null, loading: boolean, error: string|null }}
 */
export default function useNarrative(lpFolder, lessonFolder, chapter = null) {
	const file = chapter ? `chapter${chapter}.json` : 'lesson.json';
	const url = `${process.env.PUBLIC_URL}/narratives/${lpFolder}/${lessonFolder}/${file}`;

	const [narrative, setNarrative] = useState(() => cache[url] || null);
	const [loading, setLoading] = useState(!cache[url]);
	const [error, setError] = useState(null);
	const abortRef = useRef(null);

	useEffect(() => {
		if (cache[url]) {
			setNarrative(cache[url]);
			setLoading(false);
			return;
		}

		const controller = new AbortController();
		abortRef.current = controller;
		setLoading(true);
		setError(null);

		fetch(url, { signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error(`Failed to load narrative: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				cache[url] = data;
				setNarrative(data);
				setLoading(false);
			})
			.catch((err) => {
				if (err.name !== 'AbortError') {
					setError(err.message);
					setLoading(false);
				}
			});

		return () => controller.abort();
	}, [url]);

	return { narrative, loading, error };
}
