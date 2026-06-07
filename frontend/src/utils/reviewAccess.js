const getReviewAccessKey = (user) => {
  const userKey = user?._id || user?.id || user?.email;
  return userKey ? `reviewAccess:${userKey}` : null;
};

export const hasReviewAccess = (user) => {
  if (
    user?.emailVerified !== true &&
    user?.isEmailVerified !== true &&
    user?.id !== "dev-user"
  ) {
    return false;
  }

  const key = getReviewAccessKey(user);
  return key ? localStorage.getItem(key) === "true" : false;
};

export const grantReviewAccess = (user) => {
  const key = getReviewAccessKey(user);

  if (key) {
    localStorage.setItem(key, "true");
  }
};
