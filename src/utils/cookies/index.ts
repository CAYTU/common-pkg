/**
 * Retrieves a cookie value from the request object.
 * @param {Object} req - The request object.
 * @param {string} name - The name of the cookie.
 * @returns {string|undefined} The cookie value, or undefined if the cookie is not found.
 */
export const getCookie = (req: any, name: string) => {
  /**
   * The cookies object containing the cookies from the request headers or cookies.
   * @type {string}
   */
  const cookies = req?.headers?.cookie || req?.cookies;

  if (!cookies) {
    return undefined;
  }

  /**
   * The cookie value matching the provided name.
   * @type {string|undefined}
   */
  const cookie = cookies
    .split(";")
    .find((c: any) => c.trim().startsWith(`${name}=`));

  if (!cookie) {
    return undefined;
  }

  /**
   * The extracted value from the cookie.
   * @type {string}
   */
  const [, value] = cookie.split("=");

  return value;
};
