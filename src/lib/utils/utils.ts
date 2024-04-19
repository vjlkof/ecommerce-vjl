export default function convertToPath(categories: String[]) {
  return categories.map((category) => {
    return {
      title: String(category),
      path: category.toLowerCase().split(" ").join("-"),
    };
  });
}
