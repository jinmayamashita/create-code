import { Transform, FileInfo, API } from "jscodeshift";

export const parser = "tsx";

const transform: Transform = (file: FileInfo, { jscodeshift: j }: API) => {
  const source = j(file.source);

  // Remove module import
  source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "./modules/auth")
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
