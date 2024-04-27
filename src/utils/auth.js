import Cookies from 'js-cookie'

const TokenKey = 'Auth-Token'
const RolesKey = 'Auth-Roles'
const PermissionsKey = 'Auth-Permissions'

// Token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// Roles
export function getRoles() {
  let roles=  Cookies.get(RolesKey)
  return roles ? roles.split(',') : []
}

export function setRoles(roles) {
  roles = Array.isArray(roles) ? roles.join(',') : "[]"
  return Cookies.set(RolesKey, roles)
}

// Permissions
export function getPermissions() {
  let permissions=  Cookies.get(PermissionsKey)
  return permissions ? permissions.split(',') : []
}

export function setPermissions(permissions) {
  permissions = Array.isArray(permissions) ? permissions.join(',') : "[]"
  return Cookies.set(PermissionsKey, permissions)
}

// Authorities
export function removeAuthorities() {
  Cookies.remove(TokenKey)
  Cookies.remove(RolesKey)
  Cookies.remove(PermissionsKey)
}
