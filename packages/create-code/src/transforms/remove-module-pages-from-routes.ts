import { Transform, FileInfo, API } from "jscodeshift";
import { toPascalCase } from "../helpers/to-pascal-case";
export const parser = "tsx";

const transform: Transform = (
  file: FileInfo,
  { jscodeshift: j }: API,
  options
) => {
  const source = j(file.source);

  (options.unusedPages as [string]).forEach((unusedPageName) => {
    const PageComponent = toPascalCase(unusedPageName);

    // Remove lazy import
    source.findVariableDeclarators(PageComponent).remove();

    // Remove page routes
    source
      .findJSXElements("Route")
      .filter((path) => {
        if (!path.node.children) return false;

        return path?.node?.children?.some((x) => {
          // Type guards
          if (x.type !== "JSXElement") return;
          if (x.openingElement.name.type !== "JSXIdentifier") return;

          return x.openingElement.name.name === PageComponent;
        });
      })
      .remove();
  });

  return source.toSource();
};
export default transform;
