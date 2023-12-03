//RETURNS THE DEPTH (HOW NESTED) A CATEGORY IS
export const getCategoryDepth = (rootCategories, targetId, depth = 0) => {
  for (const category of rootCategories) {
    if (category._id === targetId) {
      return depth;
    }

    if (category.categories && category.categories.length > 0) {
      const subcategoryDepth = getCategoryDepth(
        category.categories,
        targetId,
        depth + 1
      );
      if (subcategoryDepth !== null) {
        return subcategoryDepth;
      }
    }
  }
  return null;
};

//RETURNS THE PADDING OF A CATEGORY BASED ON ITS DEPTH
export const optionPadding = (options, option) => {
  const optionDepth = getCategoryDepth(options, option._id, 0);
  const padding = 12 + Math.min(36, optionDepth * 12);
  return padding;
};

export const optionHasCategories = (option) => option.categories?.length > 0;
