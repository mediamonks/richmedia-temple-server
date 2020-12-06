function parseAttribute(model, attribute){
  const p = new Parser(model, attribute);
  console.log(p.parse());
}

class Parser {
  model;
  attribute;

  constructor (model, attribute)
  {
    this.model = model;
    this.attribute = attribute.replace(/[ \t\n]/g, '');

    if(this.attribute.charAt(0) !== '{'){
      this.attribute = `{${this.attribute}}`
    }
  }

  parse(){
    this.ch = ' ';
    this.at = 0;

    let key;
    let bindings = {};
    let sep;
    let ch = this.ch;

    while (ch) {
      key = this.name();
      sep = this.white();

      if (!sep || sep === ',') {
        if (sep) {
          ch = this.next(',');
        } else {
          ch = '';
        }
        // A "bare" binding e.g. "text"; substitute value of 'null'
        // so it becomes "text: null".
        bindings[key] = null;
      } else {
        ch = this.next(':');
        bindings[key] = 'expression';
        this.white();
        if (this.ch) {
          ch = this.next(',');
        } else {
          ch = '';
        }
      }
    }
    return bindings;
  }

  name() {
    // A name of a binding
    let name = '';
    this.white();

    let { ch } = this;

    while (ch) {
      if (ch === ':' || ch <= ' ' || ch === ',') {
        return name;
      }
      name += ch;
      ch = this.next();
    }

    return name;
  }

  error(){}

  next(c) {
    if (c && c !== this.ch) {
      this.error(`Expected '${c}' but got '${this.ch}'`);
    }
    this.ch = this.attribute.charAt(this.at);
    this.at += 1;
    return this.ch;
  }

  white() {
    let { ch } = this;
    while (ch && ch <= ' ') {
      ch = this.next();
    }
    return ch;
  }

  value() {
    this.white();
    let ch = this.ch;
    switch (ch) {
      case '{':
        return this.object();
      case '[':
        return this.array();
      case '"':
      case "'":
        return this.string();
      case '-':
        return this.number();
      default:
        return ch >= '0' && ch <= '9' ? this.number() : this.identifier();
    }
  }
}

export default parseAttribute;
