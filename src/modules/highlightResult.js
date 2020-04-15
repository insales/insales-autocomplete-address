export default (result, searchInput) => {
  let replacment = '<strong>$1</strong>';
  let regExpInput = new RegExp(`(${searchInput})`,"gi");

  return result.replace(regExpInput, replacment)
}
