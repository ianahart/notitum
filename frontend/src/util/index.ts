export const retreiveTokens = () => {
  const storage = localStorage.getItem('tokens');
  let tokens;
  if (storage) {
    tokens = JSON.parse(storage);
  }
  return tokens;
};

export const slugify = (firstName: string, lastName: string) => {
  return (firstName + lastName).toLowerCase();
};

export const abbreviate = (firstName: string, lastName: string) => {
  return firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase();
};

export const capitalize = (value: string) => {
  return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
};
