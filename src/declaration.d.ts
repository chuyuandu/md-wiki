

interface store {
  repositoryUrl: string;
  token: string;
  selectFileUrl: string;
  selectFilePath: string;
  selectFile: (node) => Promise
}