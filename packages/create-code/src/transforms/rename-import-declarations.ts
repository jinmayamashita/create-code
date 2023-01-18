import { Transform, FileInfo, API } from "jscodeshift";

export const parser = "tsx";

const transform: Transform = (
  file: FileInfo,
  { jscodeshift: j }: API,
  options
) => {
  const source = j(file.source);

  const library = "react";

  (options.moduleNames as [string]).forEach((module) => {
    const moduleImports = source
      // Find all nodes that match a type of `ImportDeclaration`
      .find(j.ImportDeclaration)
      // Filter imports by source equal to the target ie module
      .filter((path) => path.node.source.value === `${library}-with-${module}`);

    moduleImports.forEach(
      (
        moduleImport // Iterate over module imports
      ) =>
        // Replace the existing node with a new one
        j(moduleImport).replaceWith(
          // Build a new import declaration node based on the existing one
          j.importDeclaration(
            moduleImport.node.specifiers, // copy over the existing import specificers
            j.stringLiteral(`@/modules/${module}`) // Replace the source with our new source
          )
        )
    );
  });
  return source.toSource();
};

export default transform;
