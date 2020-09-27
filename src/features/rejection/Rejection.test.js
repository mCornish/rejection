import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Rejection from './Rejection';

const QUESTION_BUTTON_NAME = 'Add question';
const QUESTION_LIST_NAME = 'questions';
const QUESTION_NAME = 'question';
const SCORE_NAME = 'score';

describe('Rejection', () => {
  test('renders initial state', () => {
    const { getByRole } = render(
      <Rejection />
    );

    const scoreElement = getByRole('generic', { name: SCORE_NAME });
    expect(scoreElement).toHaveTextContent('Score: 0');

    const addQuestionElement = getByRole('button', { name: QUESTION_BUTTON_NAME });
    expect(addQuestionElement).toBeInTheDocument();

    const questionListElement = getByRole('list', { name: QUESTION_LIST_NAME });
    expect(questionListElement).toBeInTheDocument();
  });

  test('adds question', async () => {
    const questions = [{ id: '1', timestamp: Date.now() }];
    const addQuestion = jest.fn(() => questions.push({}));

    const { getByRole } = render(
      <Rejection
        questions={questions}
        addQuestion={addQuestion}
      />
    );

    fireEvent.click(getByRole('button', { name: QUESTION_BUTTON_NAME }));
    const getQuestionElement = () => getByRole('listitem', { name: QUESTION_NAME });

    await waitFor(getQuestionElement);

    expect(addQuestion).toHaveBeenCalledTimes(1);

    const addQuestionElement = getByRole('button', { name: QUESTION_BUTTON_NAME });
    waitForElementToBeRemoved(addQuestionElement);
  });
});
