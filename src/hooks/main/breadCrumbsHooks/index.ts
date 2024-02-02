import type { ILoginUserMenuResponseDataElement } from "@/service/modules/login/type";
import type { IBreadCrumb } from "./type";
// 面包屑组件的hooks

/**
 * 根据当前的url地址去组装面包屑需要用到的导航
 * @param path: 当前的url地址
 * @param menu: 当前用户的菜单栏数据
 */
export const useBreadCrumbsNavMenu = (
  path: string,
  menus: ILoginUserMenuResponseDataElement[]
) => {
  const breadCrumb: IBreadCrumb[] = [];
  /**
   * 树型结构：
   *    某个分支下有符合我们的要求，我们要把整个分支符合我们的都存起来。
   *
   */
  const deepCollectBreadCrumb = (
    menuArr: ILoginUserMenuResponseDataElement[],
    parentMenu?: ILoginUserMenuResponseDataElement
  ) => {
    menuArr.forEach((menu) => {
      if (menu.url === path) {
        parentMenu &&
          breadCrumb.push({
            name: parentMenu.name,
            url: parentMenu.url
          });
        breadCrumb.push({
          name: menu.name,
          url: menu.url
        });
      }
      if (menu.children && menu.children.length > 0) {
        deepCollectBreadCrumb(menu.children, menu);
      }
    });
  };
  deepCollectBreadCrumb(menus);

  return breadCrumb;
};
