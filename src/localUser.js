const localUser = {

  key: 'timeline_analyzer:user',

  save(user) {
    if (user) {
      localStorage.setItem(this._key, JSON.stringify(user));
      return this.load(this._key);
    }
    console.warn('tried to save falsy user:', user);
    return this._delete();
  },

  load() {
    const stored = localStorage.getItem(this._key);
    try {
      return JSON.parse(stored);
    } catch (_) {
      console.warn('tried to load unparsable user:', stored);
      return this._delete();
    }
  },

  destroy() {
    const stored = this.load();
    this._delete();
    return stored;
  },


  _delete() {
    localStorage.removeItem(this._key);
    return null;
  },

};

export default localUser;
