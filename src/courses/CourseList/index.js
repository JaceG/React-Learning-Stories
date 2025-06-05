import { useParams } from 'react-router-dom';
import ComponentsBasicsOverview from '../components-basics/ComponentsBasicsOverview';
import StateManagementOverview from '../state-management/StateManagementOverview';
import PropsDataFlowOverview from '../props-data-flow/PropsDataFlowOverview';
import HooksInActionOverview from '../hooks-in-action/HooksInActionOverview';
import FormsEventsOverview from '../forms-events/FormsEventsOverview';
import RoutingNavigationOverview from '../routing-navigation/RoutingNavigationOverview';
import PerformanceOptimizationOverview from '../performance-optimization/PerformanceOptimizationOverview';
import TestingDebuggingOverview from '../testing-debugging/TestingDebuggingOverview';

const courseListMap = {
	'components-basics': <ComponentsBasicsOverview />,
	'state-management': <StateManagementOverview />,
	'props-data-flow': <PropsDataFlowOverview />,
	'hooks-in-action': <HooksInActionOverview />,
	'forms-events': <FormsEventsOverview />,
	'routing-navigation': <RoutingNavigationOverview />,
	'performance-optimization': <PerformanceOptimizationOverview />,
	'testing-debugging': <TestingDebuggingOverview />,
};
const CourseList = () => {
	const { courseId } = useParams();

	return <>{courseListMap[courseId]}</>;
};

export default CourseList;
