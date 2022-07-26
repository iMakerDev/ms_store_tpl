/** @format */

export const getAppConfigJson = async (url) => {
  const resp = await fetch(url);

  return resp.json();
};
