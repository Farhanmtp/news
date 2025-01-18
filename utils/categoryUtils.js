export const categoryMapping = {
  News: ["News", "Briefing", "General", "World", "New York"],
  Sports: ["Sport"],
  Entertainment: ["Culture", "Entertainment", "Theater", "Style", "Arts"],
  Opinion: ["Opinion", "Times Insider"],
  Politics: ["Politics","U.S."],
  Tech: ["Technology", "Tech"],
  Business: ["Business", "Business Day"],
  Health: ["Health"],
  Science: ["Science"],
  Other: []
};

export const categories = [
  'News',
  'Sports',
  'Entertainment',
  'Opinion',
  'Politics',
  'Tech',
  'Business',
  'Health',
  'Other',
];

/**
 * Standardize the category names across all APIs.
 * @param {string} category The original category name.
 * @returns {string} The standardized category name.
 */
export const standardizeCategory = (category) => {
  for (const [standardized, aliases] of Object.entries(categoryMapping)) {
    if (aliases.includes(category)) {
      return standardized;
    }
  }
  return "Other"; 
};