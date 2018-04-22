/*
  constructor(props) {
    super(props)
    syncStateStorage(this, { user: null, projects: [] });
  }
*/

class AutosaveStorage {
  constructor(name, blankState) {
    this.key = `autosave:${name}`;
    this.blankJson = JSON.stringify(blankState);
    if (!this.get()) this.reset();
  }

  get() { return localStorage.getItem(this.key); }
  set(json) { localStorage.setItem(this.key, json); }
  reset() { this.set(this.blankJson); }

  dump(object) {
    if (!object) console.warn('Saving falsy state:', object);
    this.set(JSON.stringify(object));
  }

  load() {
    const json = this.get();
    try {
      return JSON.parse(json);
    } catch (_) {
      if (json === this.blankJson) throw new Error('blankJson is not parsable!');
      console.warn('Clearing unparsable state:', json);
      this.reset();
      return this.load();
    }
  }
}

const autosave = (owner, blankState, key = null) => {
  const store = new AutosaveStorage(key || owner.displayName, blankState);
  owner.state = store.load();

  const setStateRaw = owner.setState.bind(owner);
  owner.setState = (updater, callback) => {
    setStateRaw(updater, () => {
      if (callback) callback();
      store.dump(owner.state);
    });
  };
  owner.setState.toBlank = () => owner.setState(blankState);
};

export default autosave;
