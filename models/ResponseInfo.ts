interface ResponseInfo {
  count: number;
  pages: number;
  next?: string; // next page link
  prev?: string; // prev page link
}
export default ResponseInfo;
