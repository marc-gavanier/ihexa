import { describe, expect, it } from 'vitest';
import { avatarGradients, getAvatarGradient } from './avatar-gradients';

describe('avatarGradients', () => {
  it('should have 21 gradients', () => {
    expect(avatarGradients).toHaveLength(21);
  });

  it.each([
    ['bg-gradient-to-br from-rose-400 to-orange-500'],
    ['bg-gradient-to-br from-pink-500 to-rose-400'],
    ['bg-gradient-to-br from-fuchsia-500 to-pink-500'],
    ['bg-gradient-to-br from-purple-500 to-fuchsia-500'],
    ['bg-gradient-to-br from-violet-500 to-purple-500'],
    ['bg-gradient-to-br from-indigo-500 to-violet-500'],
    ['bg-gradient-to-br from-blue-500 to-indigo-500'],
    ['bg-gradient-to-br from-sky-400 to-blue-500'],
    ['bg-gradient-to-br from-cyan-400 to-sky-500'],
    ['bg-gradient-to-br from-teal-400 to-cyan-500'],
    ['bg-gradient-to-br from-emerald-400 to-teal-500'],
    ['bg-gradient-to-br from-green-400 to-emerald-500'],
    ['bg-gradient-to-br from-lime-400 to-green-500'],
    ['bg-gradient-to-br from-amber-400 to-orange-500'],
    ['bg-gradient-to-br from-orange-400 to-rose-500'],
    ['bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500'],
    ['bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500'],
    ['bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500'],
    ['bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500'],
    ['bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500'],
    ['bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500']
  ])('should contain gradient %s', (expectedGradient) => {
    expect(avatarGradients).toContain(expectedGradient);
  });
});

describe('getAvatarGradient', () => {
  it('should return consistent gradient for the same input', () => {
    const input = 'john.doe@example.com';

    const firstCall = getAvatarGradient(input);
    const secondCall = getAvatarGradient(input);

    expect(firstCall).toBe(secondCall);
  });

  it.each([
    ['alice', 'bg-gradient-to-br from-blue-500 to-indigo-500'],
    ['bob', 'bg-gradient-to-br from-amber-400 to-orange-500'],
    ['', 'bg-gradient-to-br from-rose-400 to-orange-500'],
    ['日本語', 'bg-gradient-to-br from-orange-400 to-rose-500'],
    ['a', 'bg-gradient-to-br from-amber-400 to-orange-500']
  ])('should return expected gradient for input "%s"', (input, expectedGradient) => {
    const result = getAvatarGradient(input);

    expect(result).toBe(expectedGradient);
  });

  it.each([
    ['alice', 'bob'],
    ['user1', 'user2'],
    ['hello', 'world']
  ])('should return different gradients for "%s" and "%s"', (input1, input2) => {
    const gradient1 = getAvatarGradient(input1);
    const gradient2 = getAvatarGradient(input2);

    expect(gradient1).not.toBe(gradient2);
  });
});
