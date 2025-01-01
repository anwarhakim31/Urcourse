export const splitFullName = (fullname: string) => {
  const split = fullname.split(" ");

  return split.length > 1
    ? split[0].charAt(0).toUpperCase() + split[1].charAt(0).toUpperCase()
    : split[0].charAt(0).toUpperCase();
};
