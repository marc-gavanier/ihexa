export const parseJsonSafely = async <T>(
  response: Response,
): Promise<T | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};
