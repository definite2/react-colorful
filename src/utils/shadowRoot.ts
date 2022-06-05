export const getShadowRoot = (node: any) => {
  let parent = node && node.parentNode;
  while (parent) {
    if (parent.toString() === "[object ShadowRoot]") {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null;
};
