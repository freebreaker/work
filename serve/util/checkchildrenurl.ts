
export const checkChildrenUrl = (baseUrl: string, childrenUrl: String, menus: any[]) => {
    const menusResult = menus.filter((item) => {
        return item.menuUrl === baseUrl
    })
    const menuChilrenResult = menusResult[0].menuChildren.filter((item) => {
        return item.action === childrenUrl
    })
    return menuChilrenResult.length > 0
}
