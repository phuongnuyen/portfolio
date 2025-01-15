
Array.prototype.first = () => {
  if (this.length == 0) {
    return null;
  }
  return this[0];
};