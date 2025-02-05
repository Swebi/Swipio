export const lockScroll = () => {
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
};

export const unlockScroll = () => {
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
};
