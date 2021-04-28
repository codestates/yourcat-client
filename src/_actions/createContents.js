export const CREATE_CONTENT = 'CREATE_CONTENT';

export function createContent(title, category, description, userId) {
  return {
    type: CREATE_CONTENT,
    payload: {
      title,
      category,
      description,
      userId,
    },
  };
}
