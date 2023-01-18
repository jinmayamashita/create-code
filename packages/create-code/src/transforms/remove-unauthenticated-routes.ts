import { Transform, FileInfo, API } from "jscodeshift";

export const parser = "tsx";

const transform: Transform = (
  file: FileInfo,
  { jscodeshift: j }: API,
  options
) => {
  const source = j(file.source);
  const moduleName = options.authenticationModuleName;

  // Remove module import
  source
    .find(j.ImportDeclaration)
    //FIXME: fix it later
    .filter((path) => path.node.source.value === `react-with-${moduleName}`)
    .remove();

  // Remove unused components
  const componentsToBeRemoved = ["Routes", "UnauthenticatedRoutes"];

  componentsToBeRemoved.forEach((c) =>
    source.findVariableDeclarators(c).remove()
  );
  source.findVariableDeclarators("AuthenticatedRoutes").renameTo("Routes");

  return source.toSource();
};

export default transform;
