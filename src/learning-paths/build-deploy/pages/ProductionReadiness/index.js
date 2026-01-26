import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './ProductionReadiness.css';

function ProductionReadiness() {
	const [battleReadiness, setBattleReadiness] = useState(0);
	const [monitoringSystems, setMonitoringSystems] = useState([]);
	const [commanderRank, setCommanderRank] = useState('Recruit');
	const [productionMetrics, setProductionMetrics] = useState({
		uptime: 95,
		errorRate: 5,
		performance: 70,
		userSatisfaction: 80
	});

	// Add monitoring system
	const addMonitoringSystem = (system) => {
		if (!monitoringSystems.find(s => s.id === system.id)) {
			setMonitoringSystems([...monitoringSystems, system]);
			setBattleReadiness(prev => Math.min(100, prev + 20));
		}
	};

	// Improve production metrics
	const improveMetric = (metric, value) => {
		setProductionMetrics(prev => ({
			...prev,
			[metric]: Math.min(100, prev[metric] + value)
		}));
	};

	// Promote rank
	const promoteRank = (newRank) => {
		setCommanderRank(newRank);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Production Readiness`}
				subtitle={`Prepare for battle in the Production War Room with monitoring, performance, and reliability`}
				opener={`The Production War Room hummed with activity as holographic dashboards displayed metrics from across the kingdom. Commander Deployment stood before the central command console. "Building and deploying is only half the battle," she declared. "Now we prepare for production warfare - monitoring, alerting, and rapid response."`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					battleReadiness,
					setBattleReadiness,
					monitoringSystems,
					addMonitoringSystem,
					commanderRank,
					promoteRank,
					productionMetrics,
					improveMetric
				}}
			/>

			<LessonFooter
				courseId={`build-deploy`}
				lessonId={`production-readiness`}
				totalChapters={3}
			/>
		</div>
	);
}

export default ProductionReadiness;