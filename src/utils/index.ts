// MenuIcon利用动态组件是不区分组件名称大小写的，所以这个工具函数可以不用
export const formatMenuIconName = (iconName: string) => {
  let iconNameStr = iconName.split("-icon-")[1].replace(/(-[a-zA-z])/g, ($) => {
    return `${$.replace(/-/g, "").toUpperCase()}`;
  });
  iconNameStr = iconNameStr.split("").reduce((newStr, current, index) => {
    if (index === 0) current = current.toUpperCase();
    newStr += current;
    return newStr;
  }, "");
  return iconNameStr;
};
