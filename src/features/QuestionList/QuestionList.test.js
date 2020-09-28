import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import QuestionList from './QuestionList';

const QUESTION_LIST_NAME = 'questions';
const QUESTION_NAME = 'question';

describe('<QuestionList />', () => {
  test('renders initial state', async () => {
    const { container, getByRole } = render(
      <QuestionList questions={[]} />
    );

    const questionListElement = getByRole('list', { name: QUESTION_LIST_NAME });
    expect(questionListElement).toBeInTheDocument();

    // Check initial state accessibility
    const accessibility = await axe(container);
    expect(accessibility).toHaveNoViolations();
  });

  test('renders questions', async () => {
    const questions = [{ id: '1', timestamp: Date.now() }];

    const { container, getByRole } = render(
      <QuestionList
        questions={questions}
      />
    );

    const questionElement = getByRole('listitem', { name: QUESTION_NAME });
    expect(questionElement).toBeInTheDocument();

    // Check accessibility of "adds question" state
    const accessibility = await axe(container);
    expect(accessibility).toHaveNoViolations();
  });
});
