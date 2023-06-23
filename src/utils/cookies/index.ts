// Retrieve cookies from the request object

export const getCookie = (req: any, name: string) => {
  const cookie =
    req.headers.cookie
      ?.split(";")
      .find((c: any) => c.trim().startsWith(`${name}=`)) || req.cookies[name];
  if (!cookie) {
    return undefined;
  }
  return cookie.split("=")[1];
};
