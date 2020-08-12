import rejection, {
  addQuestion,
  defaultQuestion,
  initialState,
  name,
  removeQuestion,
  selectQuestions,
  updateQuestion
} from './rejectionSlice';

describe('rejection reducer', () => {
  it('has initial state', () => {
    const actual = rejection(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('should use default question for ADD QUESTION with no arguments', () => {
    const nextState = rejection(initialState, addQuestion());
    const rootState = { [name]: nextState };

    const actual = selectQuestions(rootState);
    const expected = [defaultQuestion];
    expect(actual.text).toEqual(expected.text);
  });

  it('should add given question for ADD QUESTION with argument', () => {
    const nextState = rejection(initialState, addQuestion({ text: 'Can I have a car?'}));
    const rootState = { [name]: nextState };

    const actual = selectQuestions(rootState);
    const expected = [{ text: 'Can I have a car?' }];
    expect(actual.text).toEqual(expected.text);
  });

  it('should handle UPDATE QUESTION', () => {
    const initial = rejection(initialState, addQuestion());
    const rootState = { [name]: initial };

    const question = selectQuestions(rootState)[0];
    const updatedQuestion = { ...question, askee: 'Mom' };

    const nextState = rejection(initial, updateQuestion(updatedQuestion));
    const testState = { [name]: nextState };

    const actual = selectQuestions(testState);
    const expected = [updatedQuestion];
    expect(actual).toEqual(expected);
  });

  it('should handle REMOVE QUESTION', () => {
    const initial = rejection(initialState, addQuestion());
    const rootState = { [name]: initial };

    const question = selectQuestions(rootState)[0];

    const nextState = rejection(initial, removeQuestion(question));
    const testState = { [name]: nextState };

    const actual = selectQuestions(testState);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
