
export default function getConfig() {
  let storageConfig = localStorage.getItem('config');
  let config = null;
  if(storageConfig) {
    try {
      config = JSON.parse(storageConfig);
    }
    catch(e) {}
  }
  return config;
}