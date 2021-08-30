import initUserMethods from './userMethods';

export default class {
  constructor(henta) {
    this.henta = henta;
  }

  async init(henta) {
    this.roles = await henta.util.loadSettings('pex.json');
    this.fromSlug = {};
    this.roles.forEach(v => { this.fromSlug[v.slug] = v; });

    initUserMethods(this);
  }

  get(slug) {
    return this.fromSlug[slug];
  }

  isAllow(roleSlug, right) {
    return this.isRoleAllow(this.fromSlug[roleSlug], right);
  }

  isRoleAllow(role, right) {
    if (role.data.disallow && role.data.disallow.includes(right)) {
      return false;
    }

    // Allow all
    if (role.data.allow === true) {
      return true;
    }

    if (role.data.allow && role.data.allow.includes(right)) {
      return true;
    }

    if (role.includes) {
      return role.includes.find(v => this.isAllow(v, right));
    }

    return false;
  }
}
