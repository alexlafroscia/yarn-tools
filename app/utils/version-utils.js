export function assembleVersion(name, version) {
  return `${name}@${version}`;
}

export function parseVersion(dependency) {
  const versionSeperator = dependency.lastIndexOf("@");

  return [
    dependency.substr(0, versionSeperator),
    dependency.substr(versionSeperator + 1)
  ];
}
