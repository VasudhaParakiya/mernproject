import moment from "moment";

export const formatPostCreatedAt = (timestamp) => {
  if (!timestamp) return ""; // Handle case when timestamp is undefined or null
  const date = new Date(parseInt(timestamp));
  if (isNaN(date.getTime())) return "Invalid Date"; // Handle case when timestamp is invalid
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
