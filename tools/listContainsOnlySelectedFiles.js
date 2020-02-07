const listContainsOnlySelectedFiles = (list, selectedFiles) =>
  list.every(file =>
    selectedFiles.some(selectedFile => file.endsWith(selectedFile))
  );

module.exports = listContainsOnlySelectedFiles;
