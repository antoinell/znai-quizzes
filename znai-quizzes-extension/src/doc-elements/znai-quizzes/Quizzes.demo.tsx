import ZnaiQuiz from './Quizzes';
import { quiz } from './quiz';

export default function QuizzesDemo() {
    return <ZnaiQuiz quiz={JSON.stringify(quiz)} />;
}

export const demoConfig = {
    component: ZnaiQuiz,
    props: { quiz },
}