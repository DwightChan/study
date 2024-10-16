export default class Utils {
  static checkFavorite(item, keys = []) {
    if (!keys || keys.length === 0) return false;
    for (let i = 0, len = keys.length; i < len; i++) {
      // const element = array[i];
      let id = item.id ? item.id : item.fullName;
      if (id.toString() === keys[i]) {
        return true;
      }
    }
    return false;
  }

 /**
   * 检查key是否存在于keys中
   * @param keys
   * @param key
   */
  static checkKeyIsExist(keys, key) {
    console.log("keys:", keys, "\nkey:", key);
    for (let i = 0, l = keys.length; i < l; i++) {
      if (key.toLowerCase() === keys[i].name.toLowerCase()) return true;
    }
    return false;
  }
}