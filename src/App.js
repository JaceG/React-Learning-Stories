import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import CourseIndex from './courses/CourseIndex';
import ComponentsBasicsOverview from './courses/components-basics/ComponentsBasicsOverview';
import ComponentKingdom from './courses/components-basics/pages/ComponentKingdom';
import PropsMessengers from './courses/components-basics/pages/PropsMessengers';
import ComponentLifecycle from './courses/components-basics/pages/ComponentLifecycle';
import StateManagementOverview from './courses/state-management/StateManagementOverview';
import StateSorcerers from './courses/state-management/pages/StateSorcerers';
import JsxMagic from './courses/components-basics/pages/JsxMagic';
import Hotjar from '@hotjar/browser';
import './App.css';

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
							path='/courses/components-basics'
							element={<ComponentsBasicsOverview />}
						/>
						<Route
							path='/courses/components-basics/component-kingdom'
							element={<ComponentKingdom />}
						/>
						<Route
							path='/courses/components-basics/props-messengers'
							element={<PropsMessengers />}
						/>
						<Route
							path='/courses/components-basics/jsx-magic'
							element={<JsxMagic />}
						/>
						<Route
							path='/courses/components-basics/component-lifecycle'
							element={<ComponentLifecycle />}
						/>
						<Route
							path='/courses/state-management'
							element={<StateManagementOverview />}
						/>
						<Route
							path='/courses/state-management/state-sorcerers'
							element={<StateSorcerers />}
						/>
						<Route path='*' element={<Navigate replace to='/' />} />
					</Routes>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
