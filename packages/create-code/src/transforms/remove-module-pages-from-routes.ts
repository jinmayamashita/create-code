import { Transform, FileInfo, API } from "jscodeshift";

export const parser = "tsx";

const transform: Transform = (
  file: FileInfo,
  { jscodeshift: j }: API,
  options
) => {
  const source = j(file.source);

  (options.notUsedPages as [string]).forEach((m) => {
    const [PageComponent] = (m.charAt(0).toUpperCase() + m.slice(1)).split(".");

    // Remove lazy import
    source.findVariableDeclarators(PageComponent).remove();

    // Remove page routes
    source
      .findJSXElements("Route")
      .filter((path) => {
        if (!path.node.openingElement.attributes) return false;

        return path?.node?.openingElement?.attributes?.some((attribute) => {
          // type guards
          if (attribute.type !== "JSXAttribute") return;
          if (attribute.value?.type !== "JSXExpressionContainer") return;
          if (attribute.value?.expression.type !== "Identifier") return;

          return (
            attribute.name.name === "component" &&
            attribute.value.expression.name == PageComponent
          );
        });
      })
      .remove();
  });

  return source.toSource();
};
export default transform;
