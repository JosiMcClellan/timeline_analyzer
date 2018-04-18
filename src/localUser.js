const localUser = {

  save(user) {
    if (user) return this._set(JSON.stringify(user));
    console.warn('tried to save falsy user:', user);
    return this._delete();
  },

  load() {
    const got = this._get();
    try {
      return JSON.parse(got); // null is fine
    } catch (_) {
      console.warn('tried to load unparsable user:', got);
      return this._delete();
    }
  },

  destroy() {
    const loaded = this.load();
    this._delete();
    return loaded;
  },


  _key: 'timeline_analyzer:user',

  _get() {
    return localStorage.getItem(this._key) || null;
  },

  _set(item) {
    return localStorage.setItem(this._key, item) || item;
  },

  _delete() {
    return localStorage.removeItem(this._key) || null;
  },

};

export default localUser;
