import rejection, {
  addQuestion,
  defaultQuestion,
  initialState,
  name,
  selectQuestions
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
    expect(actual).toEqual(expected);
  });

  it('should add given question for ADD QUESTION with argument', () => {
    const nextState = rejection(initialState, addQuestion({ text: 'Can I have a car?'}));
    const rootState = { [name]: nextState };

    const actual = selectQuestions(rootState);
    const expected = [{ text: 'Can I have a car?' }];
    expect(actual).toEqual(expected);
  });
});
