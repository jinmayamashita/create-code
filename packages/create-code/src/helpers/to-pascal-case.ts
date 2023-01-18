export function toPascalCase(str: string) {
  // The regular expression /(^|[^a-zA-Z0-9])([a-z])/g matches any lowercase letter
  // that is preceded by the start of the string or a non-alphanumeric character,
  // and replaces it with the uppercase letter.
  return str.replace(/(^|[^a-zA-Z0-9])([a-z])/g, (match, _, first) =>
    // The toUpperCase() method is used to convert the matched letter to uppercase.
    first.toUpperCase()
  );
}
