const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  roles: state => state.user.roles,
  roleId: state => state.user.roleId,
  name: state => state.user.name,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  auditMessage: state => state.message.auditMessage,
  tabWrap: state => state.tabWrap
};
export default getters;
