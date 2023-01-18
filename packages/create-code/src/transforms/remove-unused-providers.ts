import { Transform, FileInfo, API } from "jscodeshift";

export const parser = "tsx";

const transform: Transform = (
  file: FileInfo,
  { jscodeshift: j }: API,
  options
) => {
  const source = j(file.source);

  (options.unusedModuleNames as [string]).forEach((m) => {
    // Finding all module import declarations
    let ProvidersComponents: string[] = [];

    const moduleImports = source
      .find(j.ImportDeclaration)
      //FIXME: fix it later
      .filter((path) => path.node.source.value === `react-with-${m}`);

    moduleImports.forEach((moduleImport) => {
      if (!moduleImport.node.specifiers) return;

      ProvidersComponents = [
        ...ProvidersComponents,
        ...moduleImport.node.specifiers.map((module) => {
          // type guard
          if (module.type !== "ImportSpecifier") return "";
          return module.imported.name;
        }),
      ];
      // First, remove unused named and default imports
      j(moduleImport).remove();
    });

    // Then, remove unused providers
    ProvidersComponents.forEach((provider) =>
      source.findJSXElements(provider).replaceWith((path) => path.node.children)
    );
  });

  return source.toSource();
};
export default transform;
