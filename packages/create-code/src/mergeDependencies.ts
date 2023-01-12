export function mergeDependencies(
  x: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  }[]
) {
  let deps = {};
  let devDeps = {};

  x.forEach(({ dependencies, devDependencies }) => {
    deps = { ...deps, ...dependencies };
    devDeps = { ...devDeps, ...devDependencies };
  });

  return {
    dependencies: deps,
    devDependencies: devDeps,
  };
}
