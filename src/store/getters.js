const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.users.user,
  roles: state => state.users.roles
}
export default getters
