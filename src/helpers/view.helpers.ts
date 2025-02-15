
const viewHelpers: any = {
    section: function(name: string, options: { fn: (context: any) => string }) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    contains: function(str: string, match: string) {
      return str.includes(match);
    },
    times: function(n: number, block: { fn: (index: number) => string }) {
      let accum = '';
      for(let i = 0; i < n; ++i) {
        accum += block.fn(i);
      }
      return accum;
    },
    omit: function(obj: any, ...keys: string[]) {
      return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key))
      );
    }
}

export default viewHelpers;