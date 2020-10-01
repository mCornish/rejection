import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import Rejection from './Rejection';

const QUESTION_BUTTON_NAME = 'Add question';
const QUESTION_LIST_NAME = 'questions';
const SCORE_NAME = 'score';

describe('<Rejection />', () => {
  test('renders initial state', async () => {
    // TODO: Use screen (https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)
    const { container, getByRole } = render(
      <Rejection />
    );

    const scoreElement = getByRole('generic', { name: SCORE_NAME });
    expect(scoreElement).toHaveTextContent('Score: 0');

    const addQuestionElement = getByRole('button', { name: QUESTION_BUTTON_NAME });
    expect(addQuestionElement).toBeInTheDocument();

    const questionListElement = getByRole('list', { name: QUESTION_LIST_NAME });
    expect(questionListElement).toBeInTheDocument();

    // Check initial state accessibility
    const accessibility = await axe(container);
    expect(accessibility).toHaveNoViolations();
  });

  test('calls add question', async () => {
    const addQuestion = jest.fn();

    const { container, getByRole } = render(
      <Rejection
        addQuestion={addQuestion}
      />
    );

    //TODO: Use @testing-library/user-event (https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event)
    fireEvent.click(getByRole('button', { name: QUESTION_BUTTON_NAME }));

    const getAddQuestionCalled = () => expect(addQuestion).toHaveBeenCalledTimes(1);
    // TODO: Use screen.findByRole (https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-waitfor-to-wait-for-elements-that-can-be-queried-with-find)
    await waitFor(getAddQuestionCalled);

    const addQuestionElement = getByRole('button', { name: QUESTION_BUTTON_NAME });
    waitForElementToBeRemoved(addQuestionElement);

    // Check accessibility of "adds question" state
    const accessibility = await axe(container);
    expect(accessibility).toHaveNoViolations();
  });

  test('renders correct score', async () => {
    let score = 7;
    const { getByRole } = render(
      <Rejection
        score={score}
      />
    );

    const scoreElement = getByRole('generic', { name: SCORE_NAME });
    expect(scoreElement).toHaveTextContent(`Score: ${score}`);
  });

  test('renders large score', async () => {
    let score = 125477;
    const { getByRole } = render(
      <Rejection
        score={score}
      />
    );

    const scoreElement = getByRole('generic', { name: SCORE_NAME });
    expect(scoreElement).toHaveTextContent(`Score: ${score}`);
  });
});
