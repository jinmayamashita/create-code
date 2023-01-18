export function toKebabCase(str: string) {
  return (
    str
      // The regular expression /([a-z])([A-Z])|[\s_]+/g matches any occurrence of a lowercase letter
      // followed by an uppercase letter or whitespace or underscore,
      // and replaces it with a lowercase letter followed by a dash and the uppercase letter,
      // and replaces the whitespace or underscore with single dash
      .replace(/([a-z])([A-Z])|[\s_]+/g, "$1-$2")
      // The toLowerCase() method is used to convert the entire string to lowercase.
      .toLowerCase()
  );
}
