import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ZnaiQuiz  from './Quizzes'

// Mock the Quiz component
vi.mock('react-quiz-component', () => ({
    default: () => <div data-testid="quiz-component">Quiz Component</div>
}))

describe('ZnaiQuiz Function', () => {
    it('returns a div element containing a Quiz element when passed quiz data', () => {
        const multilineString = `{
    "quizTitle": "Sample Quiz",
    "questions": [
        {
            "question": "Test question?",
            "answers": ["Answer 1", "Answer 2"],
            "correctAnswer": "Answer 1"
        }
    ]
}`
        const mockProps = {
            quiz : multilineString
        }

        const { container } = render(<ZnaiQuiz {...mockProps} />)

        // Check that the root element is a div
        const rootDiv = container.firstChild
        expect(rootDiv).toBeInstanceOf(HTMLDivElement)

        // Check that it contains a Quiz component
        const quizComponent = container.querySelector('[data-testid="quiz-component"]')
        expect(quizComponent).toBeInTheDocument()
    })

    it('returns a div element when quiz attribute is present but empty', () => {
        const mockProps = {
            quiz: {}
        }

        const { container } = render(<ZnaiQuiz {...mockProps} />)

        const rootDiv = container.firstChild
        expect(rootDiv).toBeInstanceOf(HTMLDivElement)

        const quizComponent = container.querySelector('[data-testid="quiz-component"]')
        expect(quizComponent).toBeInTheDocument()
    })
})