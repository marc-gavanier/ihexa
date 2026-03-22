export const avatarGradients = [
  'bg-gradient-to-br from-rose-400 to-orange-500',
  'bg-gradient-to-br from-pink-500 to-rose-400',
  'bg-gradient-to-br from-fuchsia-500 to-pink-500',
  'bg-gradient-to-br from-purple-500 to-fuchsia-500',
  'bg-gradient-to-br from-violet-500 to-purple-500',
  'bg-gradient-to-br from-indigo-500 to-violet-500',
  'bg-gradient-to-br from-blue-500 to-indigo-500',
  'bg-gradient-to-br from-sky-400 to-blue-500',
  'bg-gradient-to-br from-cyan-400 to-sky-500',
  'bg-gradient-to-br from-teal-400 to-cyan-500',
  'bg-gradient-to-br from-emerald-400 to-teal-500',
  'bg-gradient-to-br from-green-400 to-emerald-500',
  'bg-gradient-to-br from-lime-400 to-green-500',
  'bg-gradient-to-br from-amber-400 to-orange-500',
  'bg-gradient-to-br from-orange-400 to-rose-500',
  'bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500',
  'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
  'bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500',
  'bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500',
  'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500',
  'bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500'
] as const;

export type AvatarGradient = (typeof avatarGradients)[number];

export const getAvatarGradient = (text: string): AvatarGradient => {
  const hash = [...text].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarGradients[hash % avatarGradients.length] as AvatarGradient;
};
