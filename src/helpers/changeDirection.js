export default function changeDirection(keyEvent, change) {
  // if (keyEvent.altKey) {
  if (keyEvent.code === "ShiftLeft") change("ltr");
  if (keyEvent.code === "ShiftRight") change("rtl");
  // }
}
