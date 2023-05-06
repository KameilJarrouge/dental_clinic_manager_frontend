export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const test =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  return {
    left:
      (window.innerWidth || document.documentElement.clientWidth) - rect.right,
    top:
      (window.innerHeight || document.documentElement.clientHeight) -
      rect.bottom,
  };
}
