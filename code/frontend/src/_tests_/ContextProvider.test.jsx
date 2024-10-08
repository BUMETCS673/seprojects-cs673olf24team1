/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { renderHook, act } from '@testing-library/react-hooks';
import ContextProvider, { Context } from './ContextProvider';
import runChat from '../config/samplegeneraterunchat';

jest.mock('../config/samplegeneraterunchat');

describe('ContextProvider', () => {
  test('updates input and result on sending a message', async () => {
    runChat.mockResolvedValue('Here are your course suggestions');
    const { result } = renderHook(() => ContextProvider());

    act(() => {
      result.current.setInput('Hello chatbot');
    });

    expect(result.current.input).toBe('Hello chatbot');

    await act(async () => {
      await result.current.onSent();
    });

    expect(result.current.resultData).toBe('Here are your course suggestions');
    expect(result.current.showResult).toBe(true);
  });
});
