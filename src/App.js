import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import CourseIndex from './courses/CourseIndex';
import Hotjar from '@hotjar/browser';
import './App.css';
import CourseList from './courses/CourseList';
import LessonList from './courses/LessonList';
import ChapterInnerList from './courses/ChapterInnerList';
const siteId = 6384868;
const hotjarVersion = 6;

function App() {
	const [activePath, setActivePath] = useState('components-basics');

	useEffect(() => {
		Hotjar.init(siteId, hotjarVersion);
	}, []);

	return (
		<div className='App'>
			<Router>
				<Layout activePath={activePath} onPathChange={setActivePath}>
					<Routes>
						<Route path='/' element={<CourseIndex />} />
						<Route
							path='/courses/:courseId'
							element={<CourseList />}
						/>
						<Route
							path='/courses/:courseId/:lessonId'
							element={<LessonList />}>
							<Route
								index
								element={<Navigate to='chapter1' replace />}
							/>
							<Route
								path=':chapterId'
								element={<ChapterInnerList />}
							/>
						</Route>
						<Route path='*' element={<Navigate replace to='/' />} />
					</Routes>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
