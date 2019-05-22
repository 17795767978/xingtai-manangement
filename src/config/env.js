let baseUrl = '/';
const ERR_OK = 0;

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://192.168.10.81:8081/';
  // baseUrl = 'http://117.34.118.30:8089/';
  baseUrl = 'http://192.168.10.241:3000/mock/325/';
} else if (process.env.NODE_ENV === 'production') {
  // baseUrl = 'http://sysapi.hoyo123.com/';
}
export {
  baseUrl,
  ERR_OK
};
