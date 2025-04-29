import { useParams } from 'react-router-dom';
import ComponentsBasicsOverview from '../components-basics/ComponentsBasicsOverview';
import StateManagementOverview from '../state-management/StateManagementOverview';

const courseListMap = {
	'components-basics': <ComponentsBasicsOverview />,
	'state-management': <StateManagementOverview />,
};
const CourseList = () => {
	const { courseId } = useParams();

	return <>{courseListMap[courseId]}</>;
};

export default CourseList;
