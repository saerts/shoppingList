import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { vi } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated-value');
    });

    expect(result.current[0]).toBe('updated-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated-value'));
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10));

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(15);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(15));
  });

  it('should handle objects', () => {
    const testObject = { name: 'Test', count: 42 };
    const { result } = renderHook(() => useLocalStorage('test-key', testObject));

    expect(result.current[0]).toEqual(testObject);

    act(() => {
      result.current[1]({ name: 'Updated', count: 100 });
    });

    expect(result.current[0]).toEqual({ name: 'Updated', count: 100 });
    expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual({ name: 'Updated', count: 100 });
  });

  it('should handle arrays', () => {
    const testArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('test-key', testArray));

    expect(result.current[0]).toEqual(testArray);

    act(() => {
      result.current[1]([4, 5, 6]);
    });

    expect(result.current[0]).toEqual([4, 5, 6]);
    expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual([4, 5, 6]);
  });

  it('should handle invalid JSON gracefully', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('test-key', 'invalid-json{');

    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));

    expect(result.current[0]).toBe('fallback');
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should handle localStorage setItem errors', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  it('should sync changes across storage events', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    // Simulate storage event from another tab
    act(() => {
      const storageEvent = new StorageEvent('storage', {
        key: 'test-key',
        newValue: JSON.stringify('external-update'),
        storageArea: localStorage,
      });
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('external-update');
  });

  it('should handle null values in storage events', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      const storageEvent = new StorageEvent('storage', {
        key: 'test-key',
        newValue: null,
        storageArea: localStorage,
      });
      window.dispatchEvent(storageEvent);
    });

    // Should keep current value when newValue is null
    expect(result.current[0]).toBe('initial');
  });

  it('should ignore storage events for different keys', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      const storageEvent = new StorageEvent('storage', {
        key: 'other-key',
        newValue: JSON.stringify('should-not-update'),
        storageArea: localStorage,
      });
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('initial');
  });

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(true));
  });
});
