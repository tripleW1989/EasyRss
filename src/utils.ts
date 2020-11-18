export const parseCData = (value: string) => {
  const array = value.match(/\!\[CDATA\[(.*)\]\]/);
  return array ? array[1] : value;
};
