(function() {
  var DEPS_GRAPH = {
    'enablermodule': [],
    'configurablemodule': ['enablermodule'],
    'gdnmodule': ['enablermodule'],
    'layoutsmodule': ['enablermodule'],
    'videomodule': ['enablermodule'],
    'configurablefillermodule': ['configurablemodule'],
    'layoutsfillermodule': ['layoutsmodule'],
    'rad_ui_videomodule': ['videomodule'],
    '$weak$': ['configurablefillermodule', 'configurablemodule', 'enablermodule', 'gdnmodule', 'layoutsfillermodule', 'layoutsmodule', 'rad_ui_videomodule', 'videomodule'],
  };
  window.STUDIO_SDK_START = +new Date();/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var g, aa = function(a) {
    var b = 0;
    return function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }, ba = 'function' == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype)
    {
      return a;
    }
    a[b] = c.value;
    return a;
  }, ca = function(a) {
    a = ['object' == typeof globalThis && globalThis, a, 'object' == typeof window && window, 'object' == typeof self && self, 'object' == typeof global && global];
    for (var b = 0; b < a.length; ++b)
    {
      var c = a[b];
      if (c && c.Math == Math)
      {
        return c;
      }
    }
    throw Error('Cannot find global object');
  }, da = ca(this), ea = function(a, b) {
    if (b)
    {
      a:{
        var c = da;
        a = a.split('.');
        for (var d = 0; d < a.length - 1; d++)
        {
          var e = a[d];
          if (!(e in c))
          {
            break a;
          }
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && ba(c, a, { configurable: !0, writable: !0, value: b });
      }
    }
  };
  ea('Symbol', function(a) {
    if (a)
    {
      return a;
    }
    var b = function(e, f) {
      this.a = e;
      ba(this, 'description', { configurable: !0, writable: !0, value: f });
    };
    b.prototype.toString = function() {
      return this.a;
    };
    var c = 0, d = function(e) {
      if (this instanceof d)
      {
        throw new TypeError('Symbol is not a constructor');
      }
      return new b('jscomp_symbol_' + (e || '') + '_' + c++, e);
    };
    return d;
  });
  ea('Symbol.iterator', function(a) {
    if (a)
    {
      return a;
    }
    a = Symbol('Symbol.iterator');
    for (var b = 'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(' '), c = 0; c < b.length; c++)
    {
      var d = da[b[c]];
      'function' === typeof d && 'function' != typeof d.prototype[a] && ba(d.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return fa(aa(this));
        },
      });
    }
    return a;
  });
  var fa = function(a) {
    a = { next: a };
    a[Symbol.iterator] = function() {
      return this;
    };
    return a;
  }, ha = function(a) {
    var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : { next: aa(a) };
  }, ia = 'function' == typeof Object.create ? Object.create : function(a) {
    var b = function() {
    };
    b.prototype = a;
    return new b;
  }, ja;
  if ('function' == typeof Object.setPrototypeOf)
  {
    ja = Object.setPrototypeOf;
  }
  else
  {
    var ka;
    a:{
      var la = { gd: !0 }, ma = {};
      try
      {
        ma.__proto__ = la;
        ka = ma.gd;
        break a;
      } catch (a)
      {
      }
      ka = !1;
    }
    ja = ka ? function(a, b) {
      a.__proto__ = b;
      if (a.__proto__ !== b)
      {
        throw new TypeError(a + ' is not extensible');
      }
      return a;
    } : null;
  }
  var na = ja, h = function(a, b) {
    a.prototype = ia(b.prototype);
    a.prototype.constructor = a;
    if (na)
    {
      na(a, b);
    }
    else
    {
      for (var c in b) if ('prototype' != c)
      {
        if (Object.defineProperties)
        {
          var d = Object.getOwnPropertyDescriptor(b, c);
          d && Object.defineProperty(a, c, d);
        }
        else
        {
          a[c] = b[c];
        }
      }
    }
    a.H = b.prototype;
  }, oa = function() {
    this.g = !1;
    this.b = null;
    this.h = void 0;
    this.a = 1;
    this.l = this.s = 0;
    this.f = null;
  }, pa = function(a) {
    if (a.g)
    {
      throw new TypeError('Generator is already running');
    }
    a.g = !0;
  };
  oa.prototype.j = function(a) {
    this.h = a;
  };
  var qa = function(a, b) {
    a.f = { wd: b, me: !0 };
    a.a = a.s || a.l;
  };
  oa.prototype.return = function(a) {
    this.f = { return: a };
    this.a = this.l;
  };
  var ra = function(a) {
    this.a = new oa;
    this.b = a;
  }, ua = function(a, b) {
    pa(a.a);
    var c = a.a.b;
    if (c)
    {
      return sa(a, 'return' in c ? c['return'] : function(d) {
        return { value: d, done: !0 };
      }, b, a.a.return);
    }
    a.a.return(b);
    return ta(a);
  }, sa = function(a, b, c, d) {
    try
    {
      var e = b.call(a.a.b, c);
      if (!(e instanceof Object))
      {
        throw new TypeError('Iterator result ' + e + ' is not an object');
      }
      if (!e.done)
      {
        return a.a.g = !1, e;
      }
      var f = e.value;
    } catch (k)
    {
      return a.a.b = null, qa(a.a, k), ta(a);
    }
    a.a.b = null;
    d.call(a.a, f);
    return ta(a);
  }, ta = function(a) {
    for (; a.a.a;) try
    {
      var b = a.b(a.a);
      if (b)
      {
        return a.a.g = !1, { value: b.value, done: !1 };
      }
    } catch (c)
    {
      a.a.h = void 0, qa(a.a, c);
    }
    a.a.g = !1;
    if (a.a.f)
    {
      b = a.a.f;
      a.a.f = null;
      if (b.me)
      {
        throw b.wd;
      }
      return { value: b.return, done: !0 };
    }
    return { value: void 0, done: !0 };
  }, va = function(a) {
    this.next = function(b) {
      pa(a.a);
      a.a.b ? b = sa(a, a.a.b.next, b, a.a.j) : (a.a.j(b), b = ta(a));
      return b;
    };
    this.throw = function(b) {
      pa(a.a);
      a.a.b ? b = sa(a, a.a.b['throw'], b, a.a.j) : (qa(a.a, b), b = ta(a));
      return b;
    };
    this.return = function(b) {
      return ua(a, b);
    };
    this[Symbol.iterator] = function() {
      return this;
    };
  }, wa = function(a,
                   b) {
    b = new va(new ra(b));
    na && a.prototype && na(b, a.prototype);
    return b;
  };
  ea('Promise', function(a) {
    function b ()
    {
      this.a = null;
    }

    function c (k)
    {
      return k instanceof e ? k : new e(function(l) {
        l(k);
      });
    }

    if (a)
    {
      return a;
    }
    b.prototype.b = function(k) {
      if (null == this.a)
      {
        this.a = [];
        var l = this;
        this.f(function() {
          l.s();
        });
      }
      this.a.push(k);
    };
    var d = da.setTimeout;
    b.prototype.f = function(k) {
      d(k, 0);
    };
    b.prototype.s = function() {
      for (; this.a && this.a.length;)
      {
        var k = this.a;
        this.a = [];
        for (var l = 0; l < k.length; ++l)
        {
          var m = k[l];
          k[l] = null;
          try
          {
            m();
          } catch (p)
          {
            this.g(p);
          }
        }
      }
      this.a = null;
    };
    b.prototype.g = function(k) {
      this.f(function() {
        throw k;
      });
    };
    var e = function(k) {
      this.b = 0;
      this.f = void 0;
      this.a = [];
      var l = this.g();
      try
      {
        k(l.resolve, l.reject);
      } catch (m)
      {
        l.reject(m);
      }
    };
    e.prototype.g = function() {
      function k (p)
      {
        return function(r) {
          m || (m = !0, p.call(l, r));
        };
      }

      var l = this, m = !1;
      return { resolve: k(this.v), reject: k(this.s) };
    };
    e.prototype.v = function(k) {
      if (k === this)
      {
        this.s(new TypeError('A Promise cannot resolve to itself'));
      }
      else if (k instanceof e)
      {
        this.Y(k);
      }
      else
      {
        a:switch (typeof k)
        {
          case 'object':
            var l = null != k;
            break a;
          case 'function':
            l = !0;
            break a;
          default:
            l = !1;
        }
        l ? this.o(k) :
          this.h(k);
      }
    };
    e.prototype.o = function(k) {
      var l = void 0;
      try
      {
        l = k.then;
      } catch (m)
      {
        this.s(m);
        return;
      }
      'function' == typeof l ? this.B(l, k) : this.h(k);
    };
    e.prototype.s = function(k) {
      this.j(2, k);
    };
    e.prototype.h = function(k) {
      this.j(1, k);
    };
    e.prototype.j = function(k, l) {
      if (0 != this.b)
      {
        throw Error('Cannot settle(' + k + ', ' + l + '): Promise already settled in state' + this.b);
      }
      this.b = k;
      this.f = l;
      this.l();
    };
    e.prototype.l = function() {
      if (null != this.a)
      {
        for (var k = 0; k < this.a.length; ++k) f.b(this.a[k]);
        this.a = null;
      }
    };
    var f = new b;
    e.prototype.Y = function(k) {
      var l =
        this.g();
      k.bb(l.resolve, l.reject);
    };
    e.prototype.B = function(k, l) {
      var m = this.g();
      try
      {
        k.call(l, m.resolve, m.reject);
      } catch (p)
      {
        m.reject(p);
      }
    };
    e.prototype.then = function(k, l) {
      function m (N, Y)
      {
        return 'function' == typeof N ? function(hb) {
          try
          {
            p(N(hb));
          } catch (Ha)
          {
            r(Ha);
          }
        } : Y;
      }

      var p, r, G = new e(function(N, Y) {
        p = N;
        r = Y;
      });
      this.bb(m(k, p), m(l, r));
      return G;
    };
    e.prototype.catch = function(k) {
      return this.then(void 0, k);
    };
    e.prototype.bb = function(k, l) {
      function m ()
      {
        switch (p.b)
        {
          case 1:
            k(p.f);
            break;
          case 2:
            l(p.f);
            break;
          default:
            throw Error('Unexpected state: ' +
              p.b);
        }
      }

      var p = this;
      null == this.a ? f.b(m) : this.a.push(m);
    };
    e.resolve = c;
    e.reject = function(k) {
      return new e(function(l, m) {
        m(k);
      });
    };
    e.race = function(k) {
      return new e(function(l, m) {
        for (var p = ha(k), r = p.next(); !r.done; r = p.next()) c(r.value).bb(l, m);
      });
    };
    e.all = function(k) {
      var l = ha(k), m = l.next();
      return m.done ? c([]) : new e(function(p, r) {
        function G (hb)
        {
          return function(Ha) {
            N[hb] = Ha;
            Y--;
            0 == Y && p(N);
          };
        }

        var N = [], Y = 0;
        do N.push(void 0), Y++, c(m.value).bb(G(N.length - 1), r), m = l.next(); while (!m.done);
      });
    };
    return e;
  });
  var xa = function(a, b, c) {
    if (null == a)
    {
      throw new TypeError('The \'this\' value for String.prototype.' + c + ' must not be null or undefined');
    }
    if (b instanceof RegExp)
    {
      throw new TypeError('First argument to String.prototype.' + c + ' must not be a regular expression');
    }
    return a + '';
  };
  ea('String.prototype.endsWith', function(a) {
    return a ? a : function(b, c) {
      var d = xa(this, b, 'endsWith');
      b += '';
      void 0 === c && (c = d.length);
      c = Math.max(0, Math.min(c | 0, d.length));
      for (var e = b.length; 0 < e && 0 < c;) if (d[--c] != b[--e])
      {
        return !1;
      }
      return 0 >= e;
    };
  });
  ea('String.prototype.startsWith', function(a) {
    return a ? a : function(b, c) {
      var d = xa(this, b, 'startsWith');
      b += '';
      var e = d.length, f = b.length;
      c = Math.max(0, Math.min(c | 0, d.length));
      for (var k = 0; k < f && c < e;) if (d[c++] != b[k++])
      {
        return !1;
      }
      return k >= f;
    };
  });
  var ya = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  ea('WeakMap', function(a) {
    function b ()
    {
    }

    function c (m)
    {
      var p = typeof m;
      return 'object' === p && null !== m || 'function' === p;
    }

    function d (m)
    {
      if (!ya(m, f))
      {
        var p = new b;
        ba(m, f, { value: p });
      }
    }

    function e (m)
    {
      var p = Object[m];
      p && (Object[m] = function(r) {
        if (r instanceof b)
        {
          return r;
        }
        Object.isExtensible(r) && d(r);
        return p(r);
      });
    }

    if (function() {
      if (!a || !Object.seal)
      {
        return !1;
      }
      try
      {
        var m = Object.seal({}), p = Object.seal({}), r = new a([[m, 2], [p, 3]]);
        if (2 != r.get(m) || 3 != r.get(p))
        {
          return !1;
        }
        r.delete(m);
        r.set(p, 4);
        return !r.has(m) && 4 == r.get(p);
      } catch (G)
      {
        return !1;
      }
    }())
    {
      return a;
    }
    var f = '$jscomp_hidden_' + Math.random();
    e('freeze');
    e('preventExtensions');
    e('seal');
    var k = 0, l = function(m) {
      this.a = (k += Math.random() + 1).toString();
      if (m)
      {
        m = ha(m);
        for (var p; !(p = m.next()).done;) p = p.value, this.set(p[0], p[1]);
      }
    };
    l.prototype.set = function(m, p) {
      if (!c(m))
      {
        throw Error('Invalid WeakMap key');
      }
      d(m);
      if (!ya(m, f))
      {
        throw Error('WeakMap key fail: ' + m);
      }
      m[f][this.a] = p;
      return this;
    };
    l.prototype.get = function(m) {
      return c(m) && ya(m, f) ? m[f][this.a] : void 0;
    };
    l.prototype.has = function(m) {
      return c(m) && ya(m, f) && ya(m[f],
        this.a);
    };
    l.prototype.delete = function(m) {
      return c(m) && ya(m, f) && ya(m[f], this.a) ? delete m[f][this.a] : !1;
    };
    return l;
  });
  ea('Map', function(a) {
    if (function() {
      if (!a || 'function' != typeof a || !a.prototype.entries || 'function' != typeof Object.seal)
      {
        return !1;
      }
      try
      {
        var l = Object.seal({ x: 4 }), m = new a(ha([[l, 's']]));
        if ('s' != m.get(l) || 1 != m.size || m.get({ x: 4 }) || m.set({ x: 4 }, 't') != m || 2 != m.size)
        {
          return !1;
        }
        var p = m.entries(), r = p.next();
        if (r.done || r.value[0] != l || 's' != r.value[1])
        {
          return !1;
        }
        r = p.next();
        return r.done || 4 != r.value[0].x || 't' != r.value[1] || !p.next().done ? !1 : !0;
      } catch (G)
      {
        return !1;
      }
    }())
    {
      return a;
    }
    var b = new WeakMap, c = function(l) {
      this.b = {};
      this.a =
        f();
      this.size = 0;
      if (l)
      {
        l = ha(l);
        for (var m; !(m = l.next()).done;) m = m.value, this.set(m[0], m[1]);
      }
    };
    c.prototype.set = function(l, m) {
      l = 0 === l ? 0 : l;
      var p = d(this, l);
      p.list || (p.list = this.b[p.id] = []);
      p.X ? p.X.value = m : (p.X = {
        next: this.a,
        ra: this.a.ra,
        head: this.a,
        key: l,
        value: m,
      }, p.list.push(p.X), this.a.ra.next = p.X, this.a.ra = p.X, this.size++);
      return this;
    };
    c.prototype.delete = function(l) {
      l = d(this, l);
      return l.X && l.list ? (l.list.splice(l.index, 1), l.list.length || delete this.b[l.id], l.X.ra.next = l.X.next, l.X.next.ra = l.X.ra, l.X.head =
        null, this.size--, !0) : !1;
    };
    c.prototype.clear = function() {
      this.b = {};
      this.a = this.a.ra = f();
      this.size = 0;
    };
    c.prototype.has = function(l) {
      return !!d(this, l).X;
    };
    c.prototype.get = function(l) {
      return (l = d(this, l).X) && l.value;
    };
    c.prototype.entries = function() {
      return e(this, function(l) {
        return [l.key, l.value];
      });
    };
    c.prototype.keys = function() {
      return e(this, function(l) {
        return l.key;
      });
    };
    c.prototype.values = function() {
      return e(this, function(l) {
        return l.value;
      });
    };
    c.prototype.forEach = function(l, m) {
      for (var p = this.entries(), r; !(r = p.next()).done;) r =
        r.value, l.call(m, r[1], r[0], this);
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function(l, m) {
      var p = m && typeof m;
      'object' == p || 'function' == p ? b.has(m) ? p = b.get(m) : (p = '' + ++k, b.set(m, p)) : p = 'p_' + m;
      var r = l.b[p];
      if (r && ya(l.b, p))
      {
        for (l = 0; l < r.length; l++)
        {
          var G = r[l];
          if (m !== m && G.key !== G.key || m === G.key)
          {
            return { id: p, list: r, index: l, X: G };
          }
        }
      }
      return { id: p, list: r, index: -1, X: void 0 };
    }, e = function(l, m) {
      var p = l.a;
      return fa(function() {
        if (p)
        {
          for (; p.head != l.a;) p = p.ra;
          for (; p.next != p.head;) return p = p.next, { done: !1, value: m(p) };
          p = null;
        }
        return { done: !0, value: void 0 };
      });
    }, f = function() {
      var l = {};
      return l.ra = l.next = l.head = l;
    }, k = 0;
    return c;
  });
  ea('Object.is', function(a) {
    return a ? a : function(b, c) {
      return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
    };
  });
  ea('Array.prototype.includes', function(a) {
    return a ? a : function(b, c) {
      var d = this;
      d instanceof String && (d = String(d));
      var e = d.length;
      c = c || 0;
      for (0 > c && (c = Math.max(c + e, 0)); c < e; c++)
      {
        var f = d[c];
        if (f === b || Object.is(f, b))
        {
          return !0;
        }
      }
      return !1;
    };
  });
  ea('String.prototype.includes', function(a) {
    return a ? a : function(b, c) {
      return -1 !== xa(this, b, 'includes').indexOf(b, c || 0);
    };
  });
  var n = this || self, q = function(a, b, c) {
    a = a.split('.');
    c = c || n;
    a[0] in c || 'undefined' == typeof c.execScript || c.execScript('var ' + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
  }, za = /^[\w+/_-]+[=]{0,2}$/, Aa = null, Ba = function(a) {
    return (a = a.querySelector && a.querySelector('script[nonce]')) && (a = a.nonce || a.getAttribute('nonce')) && za.test(a) ? a : '';
  }, Ca = function(a, b) {
    a = a.split('.');
    b = b || n;
    for (var c = 0; c < a.length; c++) if (b = b[a[c]], null == b)
    {
      return null;
    }
    return b;
  }, Da = function() {
  }, Ea = function() {
    throw Error('unimplemented abstract method');
  }, Fa = function(a) {
    a.Db = void 0;
    a.Ea = function() {
      return a.Db ? a.Db : a.Db = new a;
    };
  }, Ga = function(a) {
    var b = typeof a;
    return 'object' != b ? b : a ? Array.isArray(a) ? 'array' : b : 'null';
  }, Ia = function(a) {
    var b = Ga(a);
    return 'array' == b || 'object' == b && 'number' == typeof a.length;
  }, Ja = function(a) {
    return 'function' == Ga(a);
  }, t = function(a) {
    var b = typeof a;
    return 'object' == b && null != a || 'function' == b;
  }, Ma = function(a) {
    return Object.prototype.hasOwnProperty.call(a,
      Ka) && a[Ka] || (a[Ka] = ++La);
  }, Ka = 'closure_uid_' + (1E9 * Math.random() >>> 0), La = 0, Na = function(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }, Oa = function(a, b, c) {
    if (!a)
    {
      throw Error();
    }
    if (2 < arguments.length)
    {
      var d = Array.prototype.slice.call(arguments, 2);
      return function() {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function() {
      return a.apply(b, arguments);
    };
  }, u = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code') ?
      u = Na : u = Oa;
    return u.apply(null, arguments);
  }, Pa = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }, Qa = Date.now, v = function(a, b) {
    function c ()
    {
    }

    c.prototype = b.prototype;
    a.H = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
  }, Ra = function(a) {
    return a;
  };
  var Sa = function(a, b) {
    this.h = Math.random() < a;
    this.j = b;
    this.g = null;
    this.s = '';
  };
  Sa.prototype.b = function() {
    return this.h && null !== this.g ? (this.j + '//pagead2.googlesyndication.com/pagead/gen_204/?id=' + this.g + this.s).substring(0, 2E3) : '';
  };
  var Ta = function() {
  };
  q('studio.common.Environment', Ta, void 0);
  Ta.Type = {
    LIVE: 1,
    LOCAL: 2,
    BROWSER: 4,
    IN_APP: 8,
    LAYOUTS_PREVIEW: 16,
    CREATIVE_TOOLSET: 32,
    RENDERING_STUDIO: 64,
    RENDERING_TEST: 128,
    PREVIEW: 256,
  };
  var Ua = 6;
  Ta.addType = function(a) {
    Ua |= a;
    Va(a);
  };
  var Wa = function(a) {
    Ua = a | 6;
    Va(Ua);
  };
  Ta.setType = Wa;
  var w = function(a) {
    return (Ua & a) == a;
  };
  Ta.hasType = w;
  Ta.getValue = function() {
    return Ua;
  };
  var Va = function(a) {
    Xa(a, 2, 1);
    Xa(a, 1, 2);
    Xa(a, 4, 8);
    Xa(a, 8, 4);
    Xa(a, 128, 64);
    Xa(a, 64, 128);
    Xa(a, 256, 2);
  }, Xa = function(a, b, c) {
    (a & b) == b && (Ua |= b, Ua &= ~c);
  };
  var Ya = function(a, b) {
    Sa.call(this, a, b);
    this.f = this.a = null;
    this.g = 'rmad_mod';
  };
  v(Ya, Sa);
  Ya.prototype.b = function() {
    return null !== this.a && null !== this.f ? (this.s = '&status=' + this.a + '&type=' + this.f, Ya.H.b.call(this)) : '';
  };
  var x = function(a) {
    if (Error.captureStackTrace)
    {
      Error.captureStackTrace(this, x);
    }
    else
    {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  };
  v(x, Error);
  x.prototype.name = 'CustomError';
  var Za;
  var $a = function(a, b) {
    a = a.split('%s');
    for (var c = '', d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : '%s');
    x.call(this, c + a[d]);
  };
  v($a, x);
  $a.prototype.name = 'AssertionError';
  var ab = function(a, b, c, d) {
    var e = 'Assertion failed';
    if (c)
    {
      e += ': ' + c;
      var f = d;
    }
    else
    {
      a && (e += ': ' + a, f = b);
    }
    throw new $a('' + e, f || []);
  }, y = function(a, b, c) {
    a || ab('', null, b, Array.prototype.slice.call(arguments, 2));
    return a;
  }, bb = function(a, b) {
    throw new $a('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1));
  }, cb = function(a, b, c) {
    'number' !== typeof a && ab('Expected number but got %s: %s.', [Ga(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
  }, db = function(a, b, c) {
    'string' !== typeof a && ab('Expected string but got %s: %s.',
      [Ga(a), a], b, Array.prototype.slice.call(arguments, 2));
  }, eb = function(a, b, c) {
    Ja(a) || ab('Expected function but got %s: %s.', [Ga(a), a], b, Array.prototype.slice.call(arguments, 2));
  }, fb = function(a, b, c) {
    Array.isArray(a) || ab('Expected array but got %s: %s.', [Ga(a), a], b, Array.prototype.slice.call(arguments, 2));
  }, ib = function(a, b, c, d) {
    a instanceof b || ab('Expected instanceof %s but got %s.', [gb(b), gb(a)], c, Array.prototype.slice.call(arguments, 3));
  }, gb = function(a) {
    return a instanceof Function ? a.displayName || a.name ||
      'unknown type name' : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? 'null' : typeof a;
  };
  var jb = Array.prototype.indexOf ? function(a, b) {
    y(null != a.length);
    return Array.prototype.indexOf.call(a, b, void 0);
  } : function(a, b) {
    if ('string' === typeof a)
    {
      return 'string' !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
    }
    for (var c = 0; c < a.length; c++) if (c in a && a[c] === b)
    {
      return c;
    }
    return -1;
  }, z = Array.prototype.forEach ? function(a, b, c) {
    y(null != a.length);
    Array.prototype.forEach.call(a, b, c);
  } : function(a, b, c) {
    for (var d = a.length, e = 'string' === typeof a ? a.split('') : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
  }, kb = Array.prototype.filter ?
    function(a, b, c) {
      y(null != a.length);
      return Array.prototype.filter.call(a, b, c);
    } : function(a, b, c) {
      for (var d = a.length, e = [], f = 0, k = 'string' === typeof a ? a.split('') : a, l = 0; l < d; l++) if (l in k)
      {
        var m = k[l];
        b.call(c, m, l, a) && (e[f++] = m);
      }
      return e;
    }, lb = Array.prototype.map ? function(a, b) {
    y(null != a.length);
    return Array.prototype.map.call(a, b, void 0);
  } : function(a, b) {
    for (var c = a.length, d = Array(c), e = 'string' === typeof a ? a.split('') : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
    return d;
  }, mb = Array.prototype.some ? function(a,
                                          b, c) {
    y(null != a.length);
    return Array.prototype.some.call(a, b, c);
  } : function(a, b, c) {
    for (var d = a.length, e = 'string' === typeof a ? a.split('') : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a))
    {
      return !0;
    }
    return !1;
  }, nb = Array.prototype.every ? function(a, b, c) {
    y(null != a.length);
    return Array.prototype.every.call(a, b, c);
  } : function(a, b, c) {
    for (var d = a.length, e = 'string' === typeof a ? a.split('') : a, f = 0; f < d; f++) if (f in e && !b.call(c, e[f], f, a))
    {
      return !1;
    }
    return !0;
  }, pb = function(a) {
    var b = n.performance.getEntriesByType('resource');
    a = ob(b,
      a, void 0);
    return 0 > a ? null : 'string' === typeof b ? b.charAt(a) : b[a];
  }, ob = function(a, b, c) {
    for (var d = a.length, e = 'string' === typeof a ? a.split('') : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a))
    {
      return f;
    }
    return -1;
  }, rb = function(a, b) {
    b = jb(a, b);
    var c;
    (c = 0 <= b) && qb(a, b);
    return c;
  }, qb = function(a, b) {
    y(null != a.length);
    Array.prototype.splice.call(a, b, 1);
  }, sb = function(a) {
    return Array.prototype.concat.apply([], arguments);
  }, tb = function(a) {
    var b = a.length;
    if (0 < b)
    {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }, ub = function(a,
                   b) {
    for (var c = 1; c < arguments.length; c++)
    {
      var d = arguments[c];
      if (Ia(d))
      {
        var e = a.length || 0, f = d.length || 0;
        a.length = e + f;
        for (var k = 0; k < f; k++) a[e + k] = d[k];
      }
      else
      {
        a.push(d);
      }
    }
  }, wb = function(a, b, c, d) {
    y(null != a.length);
    Array.prototype.splice.apply(a, vb(arguments, 1));
  }, vb = function(a, b, c) {
    y(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
  }, yb = function(a, b) {
    a.sort(b || xb);
  }, zb = function(a, b) {
    for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = { index: d, value: a[d] };
    var e = b || xb;
    yb(c, function(f, k) {
      return e(f.value, k.value) || f.index - k.index;
    });
    for (d = 0; d < a.length; d++) a[d] = c[d].value;
  }, xb = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  };
  var Ab = function(a, b) {
      return 0 == a.lastIndexOf(b, 0);
    }, Bb = function(a) {
      return /^[\s\xa0]*$/.test(a);
    }, Cb = String.prototype.trim ? function(a) {
      return a.trim();
    } : function(a) {
      return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
    }, Db = /&/g, Eb = /</g, Fb = />/g, Gb = /"/g, Hb = /'/g, Ib = /\x00/g, Jb = /[\x00&<>"']/,
    Kb = function(a, b) {
      return -1 != a.indexOf(b);
    }, Mb = function(a, b) {
      var c = 0;
      a = Cb(String(a)).split('.');
      b = Cb(String(b)).split('.');
      for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++)
      {
        var f = a[e] || '', k = b[e] || '';
        do
        {
          f = /(\d*)(\D*)(.*)/.exec(f) ||
            ['', '', '', ''];
          k = /(\d*)(\D*)(.*)/.exec(k) || ['', '', '', ''];
          if (0 == f[0].length && 0 == k[0].length)
          {
            break;
          }
          c = Lb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == k[1].length ? 0 : parseInt(k[1], 10)) || Lb(0 == f[2].length, 0 == k[2].length) || Lb(f[2], k[2]);
          f = f[3];
          k = k[3];
        } while (0 == c);
      }
      return c;
    }, Lb = function(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  var Nb;
  a:{
    var Ob = n.navigator;
    if (Ob)
    {
      var Pb = Ob.userAgent;
      if (Pb)
      {
        Nb = Pb;
        break a;
      }
    }
    Nb = '';
  }
  var A = function(a) {
    return Kb(Nb, a);
  };
  var Qb = function(a, b, c) {
      for (var d in a) b.call(c, a[d], d, a);
    }, Rb = function(a, b) {
      var c = {}, d;
      for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
      return c;
    }, Sb = function(a, b) {
      for (var c in a) if (b.call(void 0, a[c], c, a))
      {
        return !0;
      }
      return !1;
    }, Tb = function(a) {
      var b = [], c = 0, d;
      for (d in a) b[c++] = a[d];
      return b;
    }, Ub = function(a, b) {
      var c = Ia(b), d = c ? b : arguments;
      for (c = c ? 0 : 1; c < d.length; c++)
      {
        if (null == a)
        {
          return;
        }
        a = a[d[c]];
      }
      return a;
    }, Vb = function(a, b) {
      return null !== a && b in a;
    }, Wb = function(a, b) {
      for (var c in a) if (a[c] == b)
      {
        return !0;
      }
      return !1;
    }, Xb =
      function(a, b) {
        return null !== a && b in a ? a[b] : void 0;
      }, Yb = function(a, b, c) {
      b in a || (a[b] = c);
    }, Zb = function(a) {
      var b = {}, c;
      for (c in a) b[c] = a[c];
      return b;
    },
    $b = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(' '),
    ac = function(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++)
      {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < $b.length; f++) c = $b[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    };
  var bc = function() {
    return A('Firefox') || A('FxiOS');
  }, cc = function() {
    return (A('Chrome') || A('CriOS')) && !A('Edge');
  };
  var dc = function(a, b) {
    a:{
      try
      {
        var c = a && a.ownerDocument, d = c && (c.defaultView || c.parentWindow);
        d = d || n;
        if (d.Element && d.Location)
        {
          var e = d;
          break a;
        }
      } catch (k)
      {
      }
      e = null;
    }
    if (e && 'undefined' != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element)))
    {
      if (t(a))
      {
        try
        {
          var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a);
        } catch (k)
        {
          f = '<object could not be stringified>';
        }
      }
      else
      {
        f = void 0 === a ? 'undefined' : null === a ? 'null' : typeof a;
      }
      bb('Argument is not a %s (or a non-Element, non-Location mock); got: %s',
        b, f);
    }
  };
  var ec = function() {
    return null;
  };
  var fc, gc = function() {
    if (void 0 === fc)
    {
      var a = null, b = n.trustedTypes;
      if (b && b.createPolicy)
      {
        try
        {
          a = b.createPolicy('goog#html', { createHTML: Ra, createScript: Ra, createScriptURL: Ra });
        } catch (c)
        {
          n.console && n.console.error(c.message);
        }
        fc = a;
      }
      else
      {
        fc = a;
      }
    }
    return fc;
  };
  var jc = function(a, b) {
    this.a = a === hc && b || '';
    this.b = ic;
  };
  jc.prototype.ua = !0;
  jc.prototype.qa = function() {
    return this.a;
  };
  jc.prototype.toString = function() {
    return 'Const{' + this.a + '}';
  };
  var kc = function(a) {
    if (a instanceof jc && a.constructor === jc && a.b === ic)
    {
      return a.a;
    }
    bb('expected object of type Const, got \'' + a + '\'');
    return 'type_error:Const';
  }, ic = {}, hc = {};
  var nc = function(a, b) {
    this.a = a === lc && b || '';
    this.b = mc;
  };
  nc.prototype.ua = !0;
  nc.prototype.qa = function() {
    return this.a.toString();
  };
  nc.prototype.toString = function() {
    return 'TrustedResourceUrl{' + this.a + '}';
  };
  var oc = function(a) {
      if (a instanceof nc && a.constructor === nc && a.b === mc)
      {
        return a.a;
      }
      bb('expected object of type TrustedResourceUrl, got \'' + a + '\' of type ' + Ga(a));
      return 'type_error:TrustedResourceUrl';
    }, tc = function(a) {
      var b = kc(pc);
      if (!qc.test(b))
      {
        throw Error('Invalid TrustedResourceUrl format: ' + b);
      }
      var c = b.replace(rc, function(d, e) {
        if (!Object.prototype.hasOwnProperty.call(a, e))
        {
          throw Error('Found marker, "' + e + '", in format string, "' + b + '", but no valid label mapping found in args: ' + JSON.stringify(a));
        }
        d = a[e];
        return d instanceof jc ? kc(d) : encodeURIComponent(String(d));
      });
      return sc(c);
    }, rc = /%{(\w+)}/g,
    qc = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
    mc = {}, sc = function(a) {
      var b = gc();
      a = b ? b.createScriptURL(a) : a;
      return new nc(lc, a);
    }, lc = {};
  var wc = function(a, b) {
    this.a = a === uc && b || '';
    this.b = vc;
  };
  wc.prototype.ua = !0;
  wc.prototype.qa = function() {
    return this.a.toString();
  };
  wc.prototype.toString = function() {
    return 'SafeUrl{' + this.a + '}';
  };
  var xc = function(a) {
    if (a instanceof wc && a.constructor === wc && a.b === vc)
    {
      return a.a;
    }
    bb('expected object of type SafeUrl, got \'' + a + '\' of type ' + Ga(a));
    return 'type_error:SafeUrl';
  }, yc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i, zc = function(a) {
    if (a instanceof wc)
    {
      return a;
    }
    a = 'object' == typeof a && a.ua ? a.qa() : String(a);
    return yc.test(a) ? new wc(uc, a) : null;
  }, Ac = function(a) {
    if (a instanceof wc)
    {
      return a;
    }
    a = 'object' == typeof a && a.ua ? a.qa() : String(a);
    y(yc.test(a), '%s does not match the safe URL pattern', a) || (a = 'about:invalid#zClosurez');
    return new wc(uc, a);
  }, vc = {}, Bc = new wc(uc, 'about:invalid#zClosurez'), uc = {};
  var Dc = function() {
    this.a = '';
    this.b = Cc;
  };
  Dc.prototype.ua = !0;
  var Cc = {};
  Dc.prototype.qa = function() {
    return this.a;
  };
  Dc.prototype.toString = function() {
    return 'SafeStyle{' + this.a + '}';
  };
  var Ec = function(a) {
      var b = new Dc;
      b.a = a;
      return b;
    }, Fc = Ec(''), Hc = function(a) {
      if (a instanceof wc)
      {
        return 'url("' + xc(a).replace(/</g, '%3c').replace(/[\\"]/g, '\\$&') + '")';
      }
      a = a instanceof jc ? kc(a) : Gc(String(a));
      if (/[{;}]/.test(a))
      {
        throw new $a('Value does not allow [{;}], got: %s.', [a]);
      }
      return a;
    }, Gc = function(a) {
      var b = a.replace(Ic, '$1').replace(Ic, '$1').replace(Jc, 'url');
      if (Kc.test(b))
      {
        if (Lc.test(a))
        {
          return bb('String value disallows comments, got: ' + a), 'zClosurez';
        }
        for (var c = b = !0, d = 0; d < a.length; d++)
        {
          var e = a.charAt(d);
          '\'' == e && c ? b = !b : '"' == e && b && (c = !c);
        }
        if (!b || !c)
        {
          return bb('String value requires balanced quotes, got: ' + a), 'zClosurez';
        }
        if (!Mc(a))
        {
          return bb('String value requires balanced square brackets and one identifier per pair of brackets, got: ' + a), 'zClosurez';
        }
      }
      else
      {
        return bb('String value allows only [-,."\'%_!# a-zA-Z0-9\\[\\]] and simple functions, got: ' + a), 'zClosurez';
      }
      return Nc(a);
    }, Mc = function(a) {
      for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++)
      {
        var e = a.charAt(d);
        if (']' == e)
        {
          if (b)
          {
            return !1;
          }
          b = !0;
        }
        else if ('[' ==
          e)
        {
          if (!b)
          {
            return !1;
          }
          b = !1;
        }
        else if (!b && !c.test(e))
        {
          return !1;
        }
      }
      return b;
    }, Kc = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/,
    Jc = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g,
    Ic = /\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g,
    Lc = /\/\*/, Nc = function(a) {
      return a.replace(Jc, function(b, c, d, e) {
        var f = '';
        d = d.replace(/^(['"])(.*)\1$/, function(k, l, m) {
          f = l;
          return m;
        });
        b = (zc(d) || Bc).qa();
        return c +
          f + b + f + e;
      });
    };
  var Pc = function() {
    this.a = '';
    this.b = Oc;
  };
  Pc.prototype.ua = !0;
  var Oc = {}, Rc = function(a, b) {
    if (Kb(a, '<'))
    {
      throw Error('Selector does not allow \'<\', got: ' + a);
    }
    var c = a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, '');
    if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c))
    {
      throw Error('Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: ' + a);
    }
    a:{
      for (var d = { '(': ')', '[': ']' }, e = [], f = 0; f < c.length; f++)
      {
        var k = c[f];
        if (d[k])
        {
          e.push(d[k]);
        }
        else if (Wb(d, k) && e.pop() != k)
        {
          c = !1;
          break a;
        }
      }
      c = 0 == e.length;
    }
    if (!c)
    {
      throw Error('() and [] in selector must be balanced, got: ' + a);
    }
    if (!(b instanceof Dc))
    {
      c = '';
      for (var l in b) if (Object.prototype.hasOwnProperty.call(b, l))
      {
        if (!/^[-_a-zA-Z0-9]+$/.test(l))
        {
          throw Error('Name allows only [-_a-zA-Z0-9], got: ' + l);
        }
        d = b[l];
        null != d && (d = Array.isArray(d) ? lb(d, Hc).join(' ') : Hc(d), c += l + ':' + d + ';');
      }
      b = c ? Ec(c) : Fc;
    }
    b instanceof Dc && b.constructor === Dc && b.b === Cc ? l = b.a : (bb('expected object of type SafeStyle, got \'' + b + '\' of type ' + Ga(b)), l = 'type_error:SafeStyle');
    a = a + '{' + l.replace(/</g, '\\3C ') + '}';
    return Qc(a);
  };
  Pc.prototype.qa = function() {
    return this.a;
  };
  Pc.prototype.toString = function() {
    return 'SafeStyleSheet{' + this.a + '}';
  };
  var Qc = function(a) {
    var b = new Pc;
    b.a = a;
    return b;
  };
  Qc('');
  var Tc = function() {
    this.a = '';
    this.b = Sc;
  };
  Tc.prototype.ua = !0;
  Tc.prototype.qa = function() {
    return this.a.toString();
  };
  Tc.prototype.toString = function() {
    return 'SafeHtml{' + this.a + '}';
  };
  var Uc = function(a) {
    if (a instanceof Tc && a.constructor === Tc && a.b === Sc)
    {
      return a.a;
    }
    bb('expected object of type SafeHtml, got \'' + a + '\' of type ' + Ga(a));
    return 'type_error:SafeHtml';
  }, Sc = {};
  var Vc = function(a, b) {
    dc(a, 'HTMLScriptElement');
    a.src = oc(b);
    (b = a.ownerDocument && a.ownerDocument.defaultView) && b != n ? b = Ba(b.document) : (null === Aa && (Aa = Ba(n.document)), b = Aa);
    b && a.setAttribute('nonce', b);
  }, Wc = function(a, b, c, d) {
    a = a instanceof wc ? a : Ac(a);
    b = b || n;
    c = c instanceof jc ? kc(c) : c || '';
    return b.open(xc(a), c, d, void 0);
  };
  var Xc = function(a) {
    return decodeURIComponent(a.replace(/\+/g, ' '));
  }, Yc = function(a) {
    Jb.test(a) && (-1 != a.indexOf('&') && (a = a.replace(Db, '&amp;')), -1 != a.indexOf('<') && (a = a.replace(Eb, '&lt;')), -1 != a.indexOf('>') && (a = a.replace(Fb, '&gt;')), -1 != a.indexOf('"') && (a = a.replace(Gb, '&quot;')), -1 != a.indexOf('\'') && (a = a.replace(Hb, '&#39;')), -1 != a.indexOf('\x00') && (a = a.replace(Ib, '&#0;')));
    return a;
  }, Zc = function(a, b) {
    var c = a;
    0 < a.length && 0 < b && (c = a.substr(0, 0) + a.substr(0 + b, a.length - 0 - b));
    return c;
  }, $c = function(a) {
    return null ==
    a ? '' : String(a);
  }, ad = function(a) {
    return Array.prototype.join.call(arguments, '');
  }, bd = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    return b;
  }, cd = function(a) {
    return String(a).replace(/\-([a-z])/g, function(b, c) {
      return c.toUpperCase();
    });
  }, dd = function(a) {
    return a.replace(/(^|[\s]+)([a-z])/g, function(b, c, d) {
      return c + d.toUpperCase();
    });
  };
  var ed = function() {
    return A('iPhone') && !A('iPod') && !A('iPad');
  }, fd = function() {
    return ed() || A('iPad') || A('iPod');
  };
  var gd = function(a) {
    gd[' '](a);
    return a;
  };
  gd[' '] = Da;
  var id = function(a, b) {
    var c = hd;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a);
  };
  var jd = A('Opera'), kd = A('Trident') || A('MSIE'), ld = A('Edge'), md = ld || kd,
    nd = A('Gecko') && !(Kb(Nb.toLowerCase(), 'webkit') && !A('Edge')) && !(A('Trident') || A('MSIE')) && !A('Edge'),
    od = Kb(Nb.toLowerCase(), 'webkit') && !A('Edge'), pd = function() {
      var a = n.document;
      return a ? a.documentMode : void 0;
    }, qd;
  a:{
    var rd = '', sd = function() {
      var a = Nb;
      if (nd)
      {
        return /rv:([^\);]+)(\)|;)/.exec(a);
      }
      if (ld)
      {
        return /Edge\/([\d\.]+)/.exec(a);
      }
      if (kd)
      {
        return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      }
      if (od)
      {
        return /WebKit\/(\S+)/.exec(a);
      }
      if (jd)
      {
        return /(?:Version)[ \/]?(\S+)/.exec(a);
      }
    }();
    sd && (rd = sd ? sd[1] : '');
    if (kd)
    {
      var td = pd();
      if (null != td && td > parseFloat(rd))
      {
        qd = String(td);
        break a;
      }
    }
    qd = rd;
  }
  var ud = qd, hd = {}, vd = function(a) {
    return id(a, function() {
      return 0 <= Mb(ud, a);
    });
  }, wd;
  if (n.document && kd)
  {
    var xd = pd();
    wd = xd ? xd : parseInt(ud, 10) || void 0;
  }
  else
  {
    wd = void 0;
  }
  var yd = wd;
  var zd = !kd || 9 <= Number(yd);
  var Ad = function(a, b) {
    this.width = a;
    this.height = b;
  };
  g = Ad.prototype;
  g.toString = function() {
    return '(' + this.width + ' x ' + this.height + ')';
  };
  g.aspectRatio = function() {
    return this.width / this.height;
  };
  g.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  g.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  g.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  var Dd = function(a) {
    return a ? new Bd(Cd(a)) : Za || (Za = new Bd);
  }, Fd = function(a, b) {
    Qb(b, function(c, d) {
      c && 'object' == typeof c && c.ua && (c = c.qa());
      'style' == d ? a.style.cssText = c : 'class' == d ? a.className = c : 'for' == d ? a.htmlFor = c : Ed.hasOwnProperty(d) ? a.setAttribute(Ed[d], c) : Ab(d, 'aria-') || Ab(d, 'data-') ? a.setAttribute(d, c) : a[d] = c;
    });
  }, Ed = {
    cellpadding: 'cellPadding',
    cellspacing: 'cellSpacing',
    colspan: 'colSpan',
    frameborder: 'frameBorder',
    height: 'height',
    maxlength: 'maxLength',
    nonce: 'nonce',
    role: 'role',
    rowspan: 'rowSpan',
    type: 'type',
    usemap: 'useMap',
    valign: 'vAlign',
    width: 'width',
  }, Gd = function() {
    var a = window.document;
    a = 'CSS1Compat' == a.compatMode ? a.documentElement : a.body;
    return new Ad(a.clientWidth, a.clientHeight);
  }, Hd = function(a) {
    return a.parentWindow || a.defaultView;
  }, B = function(a, b, c) {
    return Id(document, arguments);
  }, Id = function(a, b) {
    var c = String(b[0]), d = b[1];
    if (!zd && d && (d.name || d.type))
    {
      c = ['<', c];
      d.name && c.push(' name="', Yc(d.name), '"');
      if (d.type)
      {
        c.push(' type="', Yc(d.type), '"');
        var e = {};
        ac(e, d);
        delete e.type;
        d = e;
      }
      c.push('>');
      c = c.join('');
    }
    c =
      Jd(a, c);
    d && ('string' === typeof d ? c.className = d : Array.isArray(d) ? c.className = d.join(' ') : Fd(c, d));
    2 < b.length && Kd(a, c, b, 2);
    return c;
  }, Kd = function(a, b, c, d) {
    function e (l)
    {
      l && b.appendChild('string' === typeof l ? a.createTextNode(l) : l);
    }

    for (; d < c.length; d++)
    {
      var f = c[d];
      if (!Ia(f) || t(f) && 0 < f.nodeType)
      {
        e(f);
      }
      else
      {
        a:{
          if (f && 'number' == typeof f.length)
          {
            if (t(f))
            {
              var k = 'function' == typeof f.item || 'string' == typeof f.item;
              break a;
            }
            if (Ja(f))
            {
              k = 'function' == typeof f.item;
              break a;
            }
          }
          k = !1;
        }
        z(k ? tb(f) : f, e);
      }
    }
  }, Jd = function(a, b) {
    b = String(b);
    'application/xhtml+xml' === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }, Ld = function(a, b) {
    y(null != a && null != b, 'goog.dom.appendChild expects non-null arguments');
    a.appendChild(b);
  }, Md = function(a, b) {
    Kd(Cd(a), a, arguments, 1);
  }, Nd = function(a) {
    for (var b; b = a.firstChild;) a.removeChild(b);
  }, Od = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null;
  }, Cd = function(a) {
    y(a, 'Node cannot be null or undefined.');
    return 9 == a.nodeType ? a : a.ownerDocument || a.document;
  }, Pd = function(a, b) {
    a && (a = a.parentNode);
    for (var c = 0; a;)
    {
      y('parentNode' != a.name);
      if (b(a))
      {
        return a;
      }
      a = a.parentNode;
      c++;
    }
    return null;
  }, Bd = function(a) {
    this.a = a || n.document || document;
  };
  Bd.prototype.getElement = function(a) {
    return 'string' === typeof a ? this.a.getElementById(a) : a;
  };
  var Qd = function(a, b) {
    a = a.a;
    b = b && '*' != b ? String(b).toUpperCase() : '';
    a.querySelectorAll && a.querySelector && b ? b = a.querySelectorAll(b + '') : b = a.getElementsByTagName(b || '*');
    return b;
  };
  Bd.prototype.b = function(a, b, c) {
    return Id(this.a, arguments);
  };
  var Rd = function(a, b) {
    return Jd(a.a, b);
  };
  Bd.prototype.f = Ld;
  Bd.prototype.contains = function(a, b) {
    if (!a || !b)
    {
      return !1;
    }
    if (a.contains && 1 == b.nodeType)
    {
      return a == b || a.contains(b);
    }
    if ('undefined' != typeof a.compareDocumentPosition)
    {
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    }
    for (; b && a != b;) b = b.parentNode;
    return b == a;
  };
  var Sd = { Af: 'dcm', ag: 'studio' };
  var Td = Object.freeze || function(a) {
    return a;
  };
  var Ud = function(a, b, c) {
    this.reset(a, b, c, void 0, void 0);
  };
  Ud.prototype.a = null;
  var Vd = 0;
  Ud.prototype.reset = function(a, b, c, d, e) {
    'number' == typeof e || Vd++;
    this.f = d || Qa();
    this.g = a;
    this.s = b;
    this.b = c;
    delete this.a;
  };
  var Wd = function(a) {
    this.h = a;
    this.a = this.g = this.s = this.f = null;
  }, Xd = function(a, b) {
    this.name = a;
    this.value = b;
  };
  Xd.prototype.toString = function() {
    return this.name;
  };
  var Yd = new Xd('OFF', Infinity), Zd = new Xd('SHOUT', 1200), $d = new Xd('SEVERE', 1E3),
    ae = new Xd('WARNING', 900), be = new Xd('INFO', 800), ce = new Xd('CONFIG', 700),
    de = new Xd('FINE', 500), ee = new Xd('FINER', 400), fe = new Xd('FINEST', 300),
    ge = new Xd('ALL', 0), he = [Yd, Zd, $d, ae, be, ce, de, ee, fe, ge], ie = null;
  Wd.prototype.b = function(a) {
    this.s = a;
  };
  var je = function(a) {
    if (a.s)
    {
      return a.s;
    }
    if (a.f)
    {
      return je(a.f);
    }
    bb('Root logger has no level set.');
    return null;
  };
  g = Wd.prototype;
  g.log = function(a, b, c) {
    if (a.value >= je(this).value)
    {
      for (Ja(b) && (b = b()), a = new Ud(a, String(b), this.h), c && (a.a = c), c = this; c;)
      {
        var d = c, e = a;
        if (d.a)
        {
          for (var f = 0; b = d.a[f]; f++) b(e);
        }
        c = c.f;
      }
    }
  };
  g.Ze = function(a, b) {
    this.log(Zd, a, b);
  };
  g.Vc = function(a, b) {
    this.log($d, a, b);
  };
  g.nb = function(a, b) {
    this.log(ae, a, b);
  };
  g.info = function(a, b) {
    this.log(be, a, b);
  };
  g.nd = function(a, b) {
    this.log(ce, a, b);
  };
  g.zb = function(a, b) {
    this.log(de, a, b);
  };
  g.xd = function(a, b) {
    this.log(ee, a, b);
  };
  g.yd = function(a, b) {
    this.log(fe, a, b);
  };
  var ke = {}, le = null, me = function() {
    le || (le = new Wd(''), ke[''] = le, le.b(ce));
  }, ne = function() {
    me();
    return le;
  }, C = function(a) {
    me();
    var b;
    if (!(b = ke[a]))
    {
      b = new Wd(a);
      var c = a.lastIndexOf('.'), d = a.substr(c + 1);
      c = C(a.substr(0, c));
      c.g || (c.g = {});
      c.g[d] = b;
      b.f = c;
      ke[a] = b;
    }
    return b;
  };
  var oe = function(a, b) {
    a && a.Vc(b, void 0);
  }, D = function(a, b, c) {
    a && a.nb(b, c);
  }, E = function(a, b) {
    a && a.info(b, void 0);
  }, pe = function(a, b) {
    a && a.zb(b, void 0);
  };
  var F = C('studio.sdk');
  q('studio.sdk.logger', F, void 0);
  q('studio.sdk.logger.setLevel', F.b, void 0);
  q('studio.sdk.logger.Level.OFF', Yd, void 0);
  q('studio.sdk.logger.Level.SHOUT', Zd, void 0);
  q('studio.sdk.logger.Level.SEVERE', $d, void 0);
  q('studio.sdk.logger.Level.WARNING', ae, void 0);
  q('studio.sdk.logger.Level.INFO', be, void 0);
  q('studio.sdk.logger.Level.CONFIG', ce, void 0);
  q('studio.sdk.logger.Level.FINE', de, void 0);
  q('studio.sdk.logger.Level.FINER', ee, void 0);
  q('studio.sdk.logger.Level.FINEST', fe, void 0);
  q('studio.sdk.logger.Level.ALL', ge, void 0);
  q('studio.sdk.logger.shout', F.Ze, void 0);
  q('studio.sdk.logger.severe', F.Vc, void 0);
  q('studio.sdk.logger.warning', F.nb, void 0);
  q('studio.sdk.logger.info', F.info, void 0);
  q('studio.sdk.logger.config', F.nd, void 0);
  q('studio.sdk.logger.fine', F.zb, void 0);
  q('studio.sdk.logger.finer', F.xd, void 0);
  q('studio.sdk.logger.finest', F.yd, void 0);
  var qe = {
    ENABLER: 'enabler',
    DCM_ENABLER: 'dcmenabler',
    SSR_ENABLER: 'ssrenabler',
    VIDEO: 'video',
    CONFIGURABLE: 'configurable',
    CONFIGURABLE_FILLER: 'configurablefiller',
    LAYOUTS: 'layouts',
    FILLER: 'layoutsfiller',
    RAD_VIDEO: 'rad_ui_video',
    GDN: 'gdn',
  };
  q('studio.module.ModuleId', qe, void 0);
  var se = function(a) {
    re();
    return sc(a);
  }, re = Da;
  var te = function(a, b) {
    this.f = a;
    this.g = b;
    this.b = 0;
    this.a = null;
  };
  te.prototype.get = function() {
    if (0 < this.b)
    {
      this.b--;
      var a = this.a;
      this.a = a.next;
      a.next = null;
    }
    else
    {
      a = this.f();
    }
    return a;
  };
  var ue = function(a, b) {
    a.g(b);
    100 > a.b && (a.b++, b.next = a.a, a.a = b);
  };
  var ve = function(a) {
    n.setTimeout(function() {
      throw a;
    }, 0);
  }, we, xe = function() {
    var a = n.MessageChannel;
    'undefined' === typeof a && 'undefined' !== typeof window && window.postMessage && window.addEventListener && !A('Presto') && (a = function() {
      var e = Jd(document, 'IFRAME');
      e.style.display = 'none';
      document.documentElement.appendChild(e);
      var f = e.contentWindow;
      e = f.document;
      e.open();
      e.close();
      var k = 'callImmediate' + Math.random(),
        l = 'file:' == f.location.protocol ? '*' : f.location.protocol + '//' + f.location.host;
      e = u(function(m) {
        if (('*' ==
          l || m.origin == l) && m.data == k)
        {
          this.port1.onmessage();
        }
      }, this);
      f.addEventListener('message', e, !1);
      this.port1 = {};
      this.port2 = {
        postMessage: function() {
          f.postMessage(k, l);
        },
      };
    });
    if ('undefined' !== typeof a && !A('Trident') && !A('MSIE'))
    {
      var b = new a, c = {}, d = c;
      b.port1.onmessage = function() {
        if (void 0 !== c.next)
        {
          c = c.next;
          var e = c.Yb;
          c.Yb = null;
          e();
        }
      };
      return function(e) {
        d.next = { Yb: e };
        d = d.next;
        b.port2.postMessage(0);
      };
    }
    return function(e) {
      n.setTimeout(e, 0);
    };
  };
  var ye = function() {
    this.b = this.a = null;
  }, Ae = new te(function() {
    return new ze;
  }, function(a) {
    a.reset();
  });
  ye.prototype.add = function(a, b) {
    var c = Ae.get();
    c.set(a, b);
    this.b ? this.b.next = c : (y(!this.a), this.a = c);
    this.b = c;
  };
  var Ce = function() {
    var a = Be, b = null;
    a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null);
    return b;
  }, ze = function() {
    this.next = this.scope = this.a = null;
  };
  ze.prototype.set = function(a, b) {
    this.a = a;
    this.scope = b;
    this.next = null;
  };
  ze.prototype.reset = function() {
    this.next = this.scope = this.a = null;
  };
  var Ge = function(a, b) {
    De || Ee();
    Fe || (De(), Fe = !0);
    Be.add(a, b);
  }, De, Ee = function() {
    if (n.Promise && n.Promise.resolve)
    {
      var a = n.Promise.resolve(void 0);
      De = function() {
        a.then(He);
      };
    }
    else
    {
      De = function() {
        var b = He;
        !Ja(n.setImmediate) || n.Window && n.Window.prototype && !A('Edge') && n.Window.prototype.setImmediate == n.setImmediate ? (we || (we = xe()), we(b)) : n.setImmediate(b);
      };
    }
  }, Fe = !1, Be = new ye, He = function() {
    for (var a; a = Ce();)
    {
      try
      {
        a.a.call(a.scope);
      } catch (b)
      {
        ve(b);
      }
      ue(Ae, a);
    }
    Fe = !1;
  };
  var Ie = function(a) {
    if (!a)
    {
      return !1;
    }
    try
    {
      return !!a.$goog_Thenable;
    } catch (b)
    {
      return !1;
    }
  };
  var Le = function(a) {
    this.a = 0;
    this.j = void 0;
    this.g = this.b = this.f = null;
    this.s = this.h = !1;
    if (a != Da)
    {
      try
      {
        var b = this;
        a.call(void 0, function(c) {
          Je(b, 2, c);
        }, function(c) {
          if (!(c instanceof Ke))
          {
            try
            {
              if (c instanceof Error)
              {
                throw c;
              }
              throw Error('Promise rejected.');
            } catch (d)
            {
            }
          }
          Je(b, 3, c);
        });
      } catch (c)
      {
        Je(this, 3, c);
      }
    }
  }, Me = function() {
    this.next = this.context = this.f = this.b = this.a = null;
    this.g = !1;
  };
  Me.prototype.reset = function() {
    this.context = this.f = this.b = this.a = null;
    this.g = !1;
  };
  var Ne = new te(function() {
    return new Me;
  }, function(a) {
    a.reset();
  }), Oe = function(a, b, c) {
    var d = Ne.get();
    d.b = a;
    d.f = b;
    d.context = c;
    return d;
  }, Pe = function(a) {
    if (a instanceof Le)
    {
      return a;
    }
    var b = new Le(Da);
    Je(b, 2, a);
    return b;
  }, Qe = function(a) {
    return new Le(function(b, c) {
      c(a);
    });
  }, Se = function(a, b, c) {
    Re(a, b, c, null) || Ge(Pa(b, a));
  }, Te = function(a) {
    return new Le(function(b, c) {
      var d = a.length, e = [];
      if (d)
      {
        for (var f = function(p, r) {
          d--;
          e[p] = r;
          0 == d && b(e);
        }, k = function(p) {
          c(p);
        }, l = 0, m; l < a.length; l++) m = a[l], Se(m, Pa(f, l), k);
      }
      else
      {
        b(e);
      }
    });
  };
  Le.prototype.then = function(a, b, c) {
    null != a && eb(a, 'opt_onFulfilled should be a function.');
    null != b && eb(b, 'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?');
    return Ue(this, Ja(a) ? a : null, Ja(b) ? b : null, c);
  };
  Le.prototype.$goog_Thenable = !0;
  var Ve = function(a, b) {
    return Ue(a, null, b, void 0);
  };
  Le.prototype.cancel = function(a) {
    if (0 == this.a)
    {
      var b = new Ke(a);
      Ge(function() {
        We(this, b);
      }, this);
    }
  };
  var We = function(a, b) {
    if (0 == a.a)
    {
      if (a.f)
      {
        var c = a.f;
        if (c.b)
        {
          for (var d = 0, e = null, f = null, k = c.b; k && (k.g || (d++, k.a == a && (e = k), !(e && 1 < d))); k = k.next) e || (f = k);
          e && (0 == c.a && 1 == d ? We(c, b) : (f ? (d = f, y(c.b), y(null != d), d.next == c.g && (c.g = d), d.next = d.next.next) : Xe(c), Ye(c, e, 3, b)));
        }
        a.f = null;
      }
      else
      {
        Je(a, 3, b);
      }
    }
  }, $e = function(a, b) {
    a.b || 2 != a.a && 3 != a.a || Ze(a);
    y(null != b.b);
    a.g ? a.g.next = b : a.b = b;
    a.g = b;
  }, Ue = function(a, b, c, d) {
    var e = Oe(null, null, null);
    e.a = new Le(function(f, k) {
      e.b = b ? function(l) {
          try
          {
            var m = b.call(d, l);
            f(m);
          } catch (p)
          {
            k(p);
          }
        } :
        f;
      e.f = c ? function(l) {
        try
        {
          var m = c.call(d, l);
          void 0 === m && l instanceof Ke ? k(l) : f(m);
        } catch (p)
        {
          k(p);
        }
      } : k;
    });
    e.a.f = a;
    $e(a, e);
    return e.a;
  };
  Le.prototype.o = function(a) {
    y(1 == this.a);
    this.a = 0;
    Je(this, 2, a);
  };
  Le.prototype.v = function(a) {
    y(1 == this.a);
    this.a = 0;
    Je(this, 3, a);
  };
  var Je = function(a, b, c) {
    0 == a.a && (a === c && (b = 3, c = new TypeError('Promise cannot resolve to itself')), a.a = 1, Re(c, a.o, a.v, a) || (a.j = c, a.a = b, a.f = null, Ze(a), 3 != b || c instanceof Ke || af(a, c)));
  }, Re = function(a, b, c, d) {
    if (a instanceof Le)
    {
      return null != b && eb(b, 'opt_onFulfilled should be a function.'), null != c && eb(c, 'opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?'), $e(a, Oe(b || Da, c || null, d)), !0;
    }
    if (Ie(a))
    {
      return a.then(b, c, d), !0;
    }
    if (t(a))
    {
      try
      {
        var e = a.then;
        if (Ja(e))
        {
          return bf(a,
            e, b, c, d), !0;
        }
      } catch (f)
      {
        return c.call(d, f), !0;
      }
    }
    return !1;
  }, bf = function(a, b, c, d, e) {
    var f = !1, k = function(m) {
      f || (f = !0, c.call(e, m));
    }, l = function(m) {
      f || (f = !0, d.call(e, m));
    };
    try
    {
      b.call(a, k, l);
    } catch (m)
    {
      l(m);
    }
  }, Ze = function(a) {
    a.h || (a.h = !0, Ge(a.l, a));
  }, Xe = function(a) {
    var b = null;
    a.b && (b = a.b, a.b = b.next, b.next = null);
    a.b || (a.g = null);
    null != b && y(null != b.b);
    return b;
  };
  Le.prototype.l = function() {
    for (var a; a = Xe(this);) Ye(this, a, this.a, this.j);
    this.h = !1;
  };
  var Ye = function(a, b, c, d) {
    if (3 == c && b.f && !b.g)
    {
      for (; a && a.s; a = a.f) a.s = !1;
    }
    if (b.a)
    {
      b.a.f = null, cf(b, c, d);
    }
    else
    {
      try
      {
        b.g ? b.b.call(b.context) : cf(b, c, d);
      } catch (e)
      {
        df.call(null, e);
      }
    }
    ue(Ne, b);
  }, cf = function(a, b, c) {
    2 == b ? a.b.call(a.context, c) : a.f && a.f.call(a.context, c);
  }, af = function(a, b) {
    a.s = !0;
    Ge(function() {
      a.s && df.call(null, b);
    });
  }, df = ve, Ke = function(a) {
    x.call(this, a);
  };
  v(Ke, x);
  Ke.prototype.name = 'cancel';/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
  var H = function(a, b) {
    this.j = [];
    this.G = a;
    this.C = b || null;
    this.g = this.a = !1;
    this.f = void 0;
    this.v = this.Y = this.o = !1;
    this.l = 0;
    this.b = null;
    this.s = 0;
  };
  H.prototype.cancel = function(a) {
    if (this.a)
    {
      this.f instanceof H && this.f.cancel();
    }
    else
    {
      if (this.b)
      {
        var b = this.b;
        delete this.b;
        a ? b.cancel(a) : (b.s--, 0 >= b.s && b.cancel());
      }
      this.G ? this.G.call(this.C, this) : this.v = !0;
      this.a || this.h(new ef(this));
    }
  };
  H.prototype.B = function(a, b) {
    this.o = !1;
    ff(this, a, b);
  };
  var ff = function(a, b, c) {
    a.a = !0;
    a.f = c;
    a.g = !b;
    gf(a);
  }, jf = function(a) {
    if (a.a)
    {
      if (!a.v)
      {
        throw new hf(a);
      }
      a.v = !1;
    }
  };
  H.prototype.I = function(a) {
    jf(this);
    kf(a);
    ff(this, !0, a);
  };
  H.prototype.h = function(a) {
    jf(this);
    kf(a);
    ff(this, !1, a);
  };
  var kf = function(a) {
    y(!(a instanceof H), 'An execution sequence may not be initiated with a blocking Deferred.');
  }, mf = function(a, b, c) {
    lf(a, b, null, c);
  }, lf = function(a, b, c, d) {
    y(!a.Y, 'Blocking Deferreds can not be re-used');
    a.j.push([b, c, d]);
    a.a && gf(a);
  };
  H.prototype.then = function(a, b, c) {
    var d, e, f = new Le(function(k, l) {
      d = k;
      e = l;
    });
    lf(this, d, function(k) {
      k instanceof ef ? f.cancel() : e(k);
    });
    return f.then(a, b, c);
  };
  H.prototype.$goog_Thenable = !0;
  var nf = function(a, b) {
    b instanceof H ? mf(a, u(b.D, b)) : mf(a, function() {
      return b;
    });
  };
  H.prototype.D = function(a) {
    var b = new H;
    lf(this, b.I, b.h, b);
    a && (b.b = this, this.s++);
    return b;
  };
  var of = function(a) {
    return mb(a.j, function(b) {
      return Ja(b[1]);
    });
  }, gf = function(a) {
    if (a.l && a.a && of(a))
    {
      var b = a.l, c = pf[b];
      c && (n.clearTimeout(c.a), delete pf[b]);
      a.l = 0;
    }
    a.b && (a.b.s--, delete a.b);
    b = a.f;
    for (var d = c = !1; a.j.length && !a.o;)
    {
      var e = a.j.shift(), f = e[0], k = e[1];
      e = e[2];
      if (f = a.g ? k : f)
      {
        try
        {
          var l = f.call(e || a.C, b);
          void 0 !== l && (a.g = a.g && (l == b || l instanceof Error), a.f = b = l);
          if (Ie(b) || 'function' === typeof n.Promise && b instanceof n.Promise)
          {
            d = !0, a.o = !0;
          }
        } catch (m)
        {
          b = m, a.g = !0, of(a) || (c = !0);
        }
      }
    }
    a.f = b;
    d && (l = u(a.B, a, !0), d =
      u(a.B, a, !1), b instanceof H ? (lf(b, l, d), b.Y = !0) : b.then(l, d));
    c && (b = new qf(b), pf[b.a] = b, a.l = b.a);
  }, hf = function() {
    x.call(this);
  };
  v(hf, x);
  hf.prototype.message = 'Deferred has already fired';
  hf.prototype.name = 'AlreadyCalledError';
  var ef = function() {
    x.call(this);
  };
  v(ef, x);
  ef.prototype.message = 'Deferred was canceled';
  ef.prototype.name = 'CanceledError';
  var qf = function(a) {
    this.a = n.setTimeout(u(this.f, this), 0);
    this.b = a;
  };
  qf.prototype.f = function() {
    y(pf[this.a], 'Cannot throw an error that is not scheduled.');
    delete pf[this.a];
    throw this.b;
  };
  var pf = {};
  var vf = function(a) {
    var b = {}, c = b.document || document, d = oc(a).toString(), e = Jd(document, 'SCRIPT'),
      f = { Rc: e, bd: void 0 }, k = new H(rf, f), l = null,
      m = null != b.timeout ? b.timeout : 5E3;
    0 < m && (l = window.setTimeout(function() {
      sf(e, !0);
      k.h(new tf(1, 'Timeout reached for loading script ' + d));
    }, m), f.bd = l);
    e.onload = e.onreadystatechange = function() {
      e.readyState && 'loaded' != e.readyState && 'complete' != e.readyState || (sf(e, b.dg || !1, l), k.I(null));
    };
    e.onerror = function() {
      sf(e, !0, l);
      k.h(new tf(0, 'Error while loading script ' + d));
    };
    f = b.attributes ||
      {};
    ac(f, { type: 'text/javascript', charset: 'UTF-8' });
    Fd(e, f);
    Vc(e, a);
    uf(c).appendChild(e);
    return k;
  }, uf = function(a) {
    var b;
    return (b = (a || document).getElementsByTagName('HEAD')) && 0 != b.length ? b[0] : a.documentElement;
  }, rf = function() {
    if (this && this.Rc)
    {
      var a = this.Rc;
      a && 'SCRIPT' == a.tagName && sf(a, !0, this.bd);
    }
  }, sf = function(a, b, c) {
    null != c && n.clearTimeout(c);
    a.onload = Da;
    a.onerror = Da;
    a.onreadystatechange = Da;
    b && window.setTimeout(function() {
      Od(a);
    }, 0);
  }, tf = function(a, b) {
    var c = 'Jsloader error (code #' + a + ')';
    b && (c += ': ' +
      b);
    x.call(this, c);
    this.code = a;
  };
  v(tf, x);
  var I = function(a, b) {
    this.b = {};
    this.a = [];
    this.f = 0;
    var c = arguments.length;
    if (1 < c)
    {
      if (c % 2)
      {
        throw Error('Uneven number of arguments');
      }
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    }
    else if (a)
    {
      if (a instanceof I)
      {
        for (c = a.R(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
      }
      else
      {
        for (d in a) this.set(d, a[d]);
      }
    }
  };
  g = I.prototype;
  g.aa = function() {
    return this.f;
  };
  g.N = function() {
    wf(this);
    for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
    return a;
  };
  g.R = function() {
    wf(this);
    return this.a.concat();
  };
  g.T = function(a) {
    return xf(this.b, a);
  };
  g.Na = function(a) {
    for (var b = 0; b < this.a.length; b++)
    {
      var c = this.a[b];
      if (xf(this.b, c) && this.b[c] == a)
      {
        return !0;
      }
    }
    return !1;
  };
  var yf = function(a) {
    a.b = {};
    a.a.length = 0;
    a.f = 0;
  }, zf = function(a, b) {
    xf(a.b, b) && (delete a.b[b], a.f--, a.a.length > 2 * a.f && wf(a));
  }, wf = function(a) {
    if (a.f != a.a.length)
    {
      for (var b = 0, c = 0; b < a.a.length;)
      {
        var d = a.a[b];
        xf(a.b, d) && (a.a[c++] = d);
        b++;
      }
      a.a.length = c;
    }
    if (a.f != a.a.length)
    {
      var e = {};
      for (c = b = 0; b < a.a.length;) d = a.a[b], xf(e, d) || (a.a[c++] = d, e[d] = 1), b++;
      a.a.length = c;
    }
  };
  I.prototype.get = function(a, b) {
    return xf(this.b, a) ? this.b[a] : b;
  };
  I.prototype.set = function(a, b) {
    xf(this.b, a) || (this.f++, this.a.push(a));
    this.b[a] = b;
  };
  I.prototype.forEach = function(a, b) {
    for (var c = this.R(), d = 0; d < c.length; d++)
    {
      var e = c[d], f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  var xf = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  var J = function() {
    this.s = this.s;
    this.Y = this.Y;
  };
  J.prototype.s = !1;
  J.prototype.dispose = function() {
    this.s || (this.s = !0, this.A());
  };
  var Bf = function(a, b) {
    b = Pa(Af, b);
    a.s ? b() : (a.Y || (a.Y = []), a.Y.push(b));
  };
  J.prototype.A = function() {
    if (this.Y)
    {
      for (; this.Y.length;) this.Y.shift()();
    }
  };
  var Af = function(a) {
    a && 'function' == typeof a.dispose && a.dispose();
  }, Cf = function(a) {
    for (var b = 0, c = arguments.length; b < c; ++b)
    {
      var d = arguments[b];
      Ia(d) ? Cf.apply(null, d) : Af(d);
    }
  };
  var Df = function(a, b) {
    this.type = a;
    this.a = this.target = b;
    this.defaultPrevented = this.b = !1;
  };
  Df.prototype.stopPropagation = function() {
    this.b = !0;
  };
  Df.prototype.f = function() {
    this.defaultPrevented = !0;
  };
  var Ef = function(a) {
    a.f();
  };
  var Ff = !kd || 9 <= Number(yd), Gf = kd && !vd('9'), Hf = function() {
    if (!n.addEventListener || !Object.defineProperty)
    {
      return !1;
    }
    var a = !1, b = Object.defineProperty({}, 'passive', {
      get: function() {
        a = !0;
      },
    });
    try
    {
      n.addEventListener('test', Da, b), n.removeEventListener('test', Da, b);
    } catch (c)
    {
    }
    return a;
  }();
  var Jf = function(a, b) {
    Df.call(this, a ? a.type : '');
    this.relatedTarget = this.a = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = '';
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.pointerId = 0;
    this.pointerType = '';
    this.$ = null;
    if (a)
    {
      var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.a = b;
      if (b = a.relatedTarget)
      {
        if (nd)
        {
          a:{
            try
            {
              gd(b.nodeName);
              var e = !0;
              break a;
            } catch (f)
            {
            }
            e = !1;
          }
          e || (b =
            null);
        }
      }
      else
      {
        'mouseover' == c ? b = a.fromElement : 'mouseout' == c && (b = a.toElement);
      }
      this.relatedTarget = b;
      d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
      this.button = a.button;
      this.key = a.key || '';
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey =
        a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = 'string' === typeof a.pointerType ? a.pointerType : If[a.pointerType] || '';
      this.$ = a;
      a.defaultPrevented && this.f();
    }
  };
  v(Jf, Df);
  var If = Td({ 2: 'touch', 3: 'pen', 4: 'mouse' });
  Jf.prototype.stopPropagation = function() {
    Jf.H.stopPropagation.call(this);
    this.$.stopPropagation ? this.$.stopPropagation() : this.$.cancelBubble = !0;
  };
  Jf.prototype.f = function() {
    Jf.H.f.call(this);
    var a = this.$;
    if (a.preventDefault)
    {
      a.preventDefault();
    }
    else if (a.returnValue = !1, Gf)
    {
      try
      {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
        {
          a.keyCode = -1;
        }
      } catch (b)
      {
      }
    }
  };
  Jf.prototype.Cd = function() {
    return this.$;
  };
  var Kf = 'closure_listenable_' + (1E6 * Math.random() | 0), Lf = function(a) {
    return !(!a || !a[Kf]);
  }, Mf = 0;
  var Nf = function(a, b, c, d, e) {
    this.listener = a;
    this.a = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.Ia = e;
    this.key = ++Mf;
    this.Ja = this.ab = !1;
  }, Of = function(a) {
    a.Ja = !0;
    a.listener = null;
    a.a = null;
    a.src = null;
    a.Ia = null;
  };
  var Pf = function(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  };
  Pf.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.a[f];
    a || (a = this.a[f] = [], this.b++);
    var k = Qf(a, b, d, e);
    -1 < k ? (b = a[k], c || (b.ab = !1)) : (b = new Nf(b, this.src, f, !!d, e), b.ab = c, a.push(b));
    return b;
  };
  var Rf = function(a, b) {
    var c = b.type;
    if (!(c in a.a))
    {
      return !1;
    }
    var d = rb(a.a[c], b);
    d && (Of(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
    return d;
  }, Sf = function(a, b) {
    b = b && b.toString();
    var c = 0, d;
    for (d in a.a) if (!b || d == b)
    {
      for (var e = a.a[d], f = 0; f < e.length; f++) ++c, Of(e[f]);
      delete a.a[d];
      a.b--;
    }
  }, Tf = function(a, b, c, d, e) {
    a = a.a[b.toString()];
    b = -1;
    a && (b = Qf(a, c, d, e));
    return -1 < b ? a[b] : null;
  }, Uf = function(a, b) {
    var c = void 0 !== b, d = c ? b.toString() : '';
    return Sb(a.a, function(e) {
      for (var f = 0; f < e.length; ++f) if (!c || e[f].type == d)
      {
        return !0;
      }
      return !1;
    });
  }, Qf = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e)
    {
      var f = a[e];
      if (!f.Ja && f.listener == b && f.capture == !!c && f.Ia == d)
      {
        return e;
      }
    }
    return -1;
  };
  var Vf = 'closure_lm_' + (1E6 * Math.random() | 0), Wf = {}, Xf = 0,
    Zf = function(a, b, c, d, e) {
      if (d && d.once)
      {
        return Yf(a, b, c, d, e);
      }
      if (Array.isArray(b))
      {
        for (var f = 0; f < b.length; f++) Zf(a, b[f], c, d, e);
        return null;
      }
      c = $f(c);
      return Lf(a) ? a.Ga(b, c, t(d) ? !!d.capture : !!d, e) : ag(a, b, c, !1, d, e);
    }, ag = function(a, b, c, d, e, f) {
      if (!b)
      {
        throw Error('Invalid event type');
      }
      var k = t(e) ? !!e.capture : !!e, l = bg(a);
      l || (a[Vf] = l = new Pf(a));
      c = l.add(b, c, d, k, f);
      if (c.a)
      {
        return c;
      }
      d = cg();
      c.a = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
      {
        Hf || (e = k), void 0 === e && (e = !1),
          a.addEventListener(b.toString(), d, e);
      }
      else if (a.attachEvent)
      {
        a.attachEvent(dg(b.toString()), d);
      }
      else if (a.addListener && a.removeListener)
      {
        y('change' === b, 'MediaQueryList only has a change event'), a.addListener(d);
      }
      else
      {
        throw Error('addEventListener and attachEvent are unavailable.');
      }
      Xf++;
      return c;
    }, cg = function() {
      var a = eg, b = Ff ? function(c) {
        return a.call(b.src, b.listener, c);
      } : function(c) {
        c = a.call(b.src, b.listener, c);
        if (!c)
        {
          return c;
        }
      };
      return b;
    }, Yf = function(a, b, c, d, e) {
      if (Array.isArray(b))
      {
        for (var f = 0; f < b.length; f++) Yf(a,
          b[f], c, d, e);
        return null;
      }
      c = $f(c);
      return Lf(a) ? a.g.add(String(b), c, !0, t(d) ? !!d.capture : !!d, e) : ag(a, b, c, !0, d, e);
    }, fg = function(a, b, c, d, e) {
      if (Array.isArray(b))
      {
        for (var f = 0; f < b.length; f++) fg(a, b[f], c, d, e);
      }
      else
      {
        d = t(d) ? !!d.capture : !!d, c = $f(c), Lf(a) ? a.Pa(b, c, d, e) : a && (a = bg(a)) && (b = Tf(a, b, c, d, e)) && gg(b);
      }
    }, gg = function(a) {
      if ('number' === typeof a || !a || a.Ja)
      {
        return !1;
      }
      var b = a.src;
      if (Lf(b))
      {
        return Rf(b.g, a);
      }
      var c = a.type, d = a.a;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(dg(c), d) :
        b.addListener && b.removeListener && b.removeListener(d);
      Xf--;
      (c = bg(b)) ? (Rf(c, a), 0 == c.b && (c.src = null, b[Vf] = null)) : Of(a);
      return !0;
    }, hg = function(a, b, c, d, e) {
      c = $f(c);
      d = !!d;
      return Lf(a) ? Tf(a.g, String(b), c, d, e) : a ? (a = bg(a)) ? Tf(a, b, c, d, e) : null : null;
    }, ig = function(a, b) {
      if (Lf(a))
      {
        return Uf(a.g, void 0 !== b ? String(b) : void 0);
      }
      a = bg(a);
      return !!a && Uf(a, b);
    }, dg = function(a) {
      return a in Wf ? Wf[a] : Wf[a] = 'on' + a;
    }, kg = function(a, b, c, d) {
      var e = !0;
      if (a = bg(a))
      {
        if (b = a.a[b.toString()])
        {
          for (b = b.concat(), a = 0; a < b.length; a++)
          {
            var f = b[a];
            f && f.capture ==
            c && !f.Ja && (f = jg(f, d), e = e && !1 !== f);
          }
        }
      }
      return e;
    }, jg = function(a, b) {
      var c = a.listener, d = a.Ia || a.src;
      a.ab && gg(a);
      return c.call(d, b);
    }, eg = function(a, b) {
      if (a.Ja)
      {
        return !0;
      }
      if (!Ff)
      {
        var c = b || Ca('window.event');
        b = new Jf(c, this);
        var d = !0;
        if (!(0 > c.keyCode || void 0 != c.returnValue))
        {
          a:{
            var e = !1;
            if (0 == c.keyCode)
            {
              try
              {
                c.keyCode = -1;
                break a;
              } catch (k)
              {
                e = !0;
              }
            }
            if (e || void 0 == c.returnValue)
            {
              c.returnValue = !0;
            }
          }
          c = [];
          for (e = b.a; e; e = e.parentNode) c.push(e);
          a = a.type;
          for (e = c.length - 1; !b.b && 0 <= e; e--)
          {
            b.a = c[e];
            var f = kg(c[e], a, !0, b);
            d = d && f;
          }
          for (e =
                 0; !b.b && e < c.length; e++) b.a = c[e], f = kg(c[e], a, !1, b), d = d && f;
        }
        return d;
      }
      return jg(a, new Jf(b, this));
    }, bg = function(a) {
      a = a[Vf];
      return a instanceof Pf ? a : null;
    }, lg = '__closure_events_fn_' + (1E9 * Math.random() >>> 0), $f = function(a) {
      y(a, 'Listener can not be null.');
      if (Ja(a))
      {
        return a;
      }
      y(a.handleEvent, 'An object listener must have handleEvent method.');
      a[lg] || (a[lg] = function(b) {
        return a.handleEvent(b);
      });
      return a[lg];
    };
  var K = function() {
    J.call(this);
    this.g = new Pf(this);
    this.re = this;
    this.Ya = null;
  };
  v(K, J);
  K.prototype[Kf] = !0;
  g = K.prototype;
  g.Ib = function(a) {
    this.Ya = a;
  };
  g.addEventListener = function(a, b, c, d) {
    Zf(this, a, b, c, d);
  };
  g.removeEventListener = function(a, b, c, d) {
    fg(this, a, b, c, d);
  };
  g.dispatchEvent = function(a) {
    mg(this);
    var b = this.Ya;
    if (b)
    {
      var c = [];
      for (var d = 1; b; b = b.Ya) c.push(b), y(1E3 > ++d, 'infinite loop');
    }
    b = this.re;
    d = a.type || a;
    if ('string' === typeof a)
    {
      a = new Df(a, b);
    }
    else if (a instanceof Df)
    {
      a.target = a.target || b;
    }
    else
    {
      var e = a;
      a = new Df(d, b);
      ac(a, e);
    }
    e = !0;
    if (c)
    {
      for (var f = c.length - 1; !a.b && 0 <= f; f--)
      {
        var k = a.a = c[f];
        e = ng(k, d, !0, a) && e;
      }
    }
    a.b || (k = a.a = b, e = ng(k, d, !0, a) && e, a.b || (e = ng(k, d, !1, a) && e));
    if (c)
    {
      for (f = 0; !a.b && f < c.length; f++) k = a.a = c[f], e = ng(k, d, !1, a) && e;
    }
    return e;
  };
  g.A = function() {
    K.H.A.call(this);
    this.g && Sf(this.g, void 0);
    this.Ya = null;
  };
  g.Ga = function(a, b, c, d) {
    mg(this);
    return this.g.add(String(a), b, !1, c, d);
  };
  g.Pa = function(a, b, c, d) {
    var e = this.g;
    a = String(a).toString();
    if (a in e.a)
    {
      var f = e.a[a];
      b = Qf(f, b, c, d);
      -1 < b ? (Of(f[b]), qb(f, b), 0 == f.length && (delete e.a[a], e.b--), e = !0) : e = !1;
    }
    else
    {
      e = !1;
    }
    return e;
  };
  var ng = function(a, b, c, d) {
    b = a.g.a[String(b)];
    if (!b)
    {
      return !0;
    }
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f)
    {
      var k = b[f];
      if (k && !k.Ja && k.capture == c)
      {
        var l = k.listener, m = k.Ia || k.src;
        k.ab && Rf(a.g, k);
        e = !1 !== l.call(m, d) && e;
      }
    }
    return e && !d.defaultPrevented;
  }, mg = function(a) {
    y(a.g, 'Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?');
  };
  var og = function(a, b) {
    K.call(this);
    this.b = a || 1;
    this.a = b || n;
    this.f = u(this.hf, this);
    this.h = Qa();
  };
  v(og, K);
  g = og.prototype;
  g.Fa = !1;
  g.ia = null;
  g.setInterval = function(a) {
    this.b = a;
    this.ia && this.Fa ? (this.stop(), this.start()) : this.ia && this.stop();
  };
  g.hf = function() {
    if (this.Fa)
    {
      var a = Qa() - this.h;
      0 < a && a < .8 * this.b ? this.ia = this.a.setTimeout(this.f, this.b - a) : (this.ia && (this.a.clearTimeout(this.ia), this.ia = null), this.dispatchEvent('tick'), this.Fa && (this.stop(), this.start()));
    }
  };
  g.start = function() {
    this.Fa = !0;
    this.ia || (this.ia = this.a.setTimeout(this.f, this.b), this.h = Qa());
  };
  g.stop = function() {
    this.Fa = !1;
    this.ia && (this.a.clearTimeout(this.ia), this.ia = null);
  };
  g.A = function() {
    og.H.A.call(this);
    this.stop();
    delete this.a;
  };
  var pg = function(a, b, c) {
    if (Ja(a))
    {
      c && (a = u(a, c));
    }
    else if (a && 'function' == typeof a.handleEvent)
    {
      a = u(a.handleEvent, a);
    }
    else
    {
      throw Error('Invalid listener argument');
    }
    return 2147483647 < Number(b) ? -1 : n.setTimeout(a, b || 0);
  };
  var qg = {}, rg = {}, sg = new Ya(.001, '');
  sg.a = 'load';
  var tg = new Ya(.1, '');
  tg.a = 'fail';
  var ug = new I;
  ug.set('enabler', 'enabler');
  ug.set('dcmenabler', 'dcm');
  ug.set('video', 'vid');
  ug.set('configurable', 'cfg');
  ug.set('configurablefiller', 'cfg_fill');
  ug.set('layouts', 'lay');
  ug.set('layoutsfiller', 'lay_fill');
  ug.set('gdn', 'gdn');
  ug.set('rad_ui_video', 'rad');
  var vg = function() {
    for (var a = document.getElementsByTagName('script'), b = 0; b < a.length; b++)
    {
      var c = a[b];
      if (c.src || c.getAttribute('src'))
      {
        if (c = c.src || c.getAttribute('src'), /Enabler/.test(c))
        {
          return c.substring(0, c.lastIndexOf('/') + 1);
        }
      }
    }
    return '';
  }, wg = function(a) {
    a = qg[a];
    return void 0 !== a && 1 <= a;
  }, xg = function(a) {
    return [vg(), 'dev_studio_latest_', [a, 'module'].join(''), '.js'].join('');
  };
  q('goog.exportSymbol', function(a, b, c) {
    q(a, b, c);
  }, this);
  var yg = function(a) {
    a += 'goog.exportSymbol(\'studioLoader.context.evalInContext\', ' + yg.toString() + ');';
    eval(a);
  }, zg = function(a, b) {
    b = ug.get(b) || 'unknown';
    a.f = b;
    a = a.b();
    !Bb(a) && w(1) && (Jd(document, 'IMG').src = a);
  }, Ag = function(a, b) {
    qg[a] = 2;
    zg(sg, a);
    b = 'number' === typeof b ? b : 2;
    for (var c = xg(a), d = vf(se(c)), e = 0; e < b; ++e) d = d.then(void 0, function() {
      return vf(se(c));
    });
    return d.then(function() {
      qg[a] = 3;
    }, function() {
      zg(tg, a);
      return Qe();
    });
  }, Bg = function(a) {
    if (wg(a))
    {
      return rg[a];
    }
    qg[a] = 1;
    for (var b = [], c = DEPS_GRAPH ? DEPS_GRAPH[[a,
      'module'].join('')] : [], d = c.length - 1; 0 <= d; d--)
    {
      var e = c[d].replace(/module$/, '');
      if (e == a)
      {
        break;
      }
      wg(e) ? b.push(rg[e]) : b.push(Bg(e));
    }
    b = Te(b).then(Pa(Ag, a, 2));
    return rg[a] = b;
  }, Cg = function(a, b) {
    a = Bg(a);
    'function' === typeof b && (a = a.then(b));
    Ve(a, Da);
  };
  q('studioLoader.context.evalInContext', yg, void 0);
  var L = function(a) {
    J.call(this);
    this.l = a;
    this.f = {};
  };
  v(L, J);
  var Dg = [], M = function(a, b, c, d, e, f) {
    Array.isArray(c) || (c && (Dg[0] = c.toString()), c = Dg);
    for (var k = 0; k < c.length; k++)
    {
      var l = Zf(b, c[k], d || a.handleEvent, e || !1, f || a.l || a);
      if (!l)
      {
        break;
      }
      a.f[l.key] = l;
    }
  }, Eg = function(a, b, c, d, e, f) {
    if (Array.isArray(c))
    {
      for (var k = 0; k < c.length; k++) Eg(a, b, c[k], d, e, f);
    }
    else
    {
      (b = Yf(b, c, d || a.handleEvent, e, f || a.l || a)) && (a.f[b.key] = b);
    }
  }, Fg = function(a, b, c, d, e, f) {
    if (Array.isArray(c))
    {
      for (var k = 0; k < c.length; k++) Fg(a, b, c[k], d, e, f);
    }
    else if (b = hg(b, c, d || a.handleEvent, t(e) ? !!e.capture : !!e, f || a.l || a))
    {
      gg(b),
        delete a.f[b.key];
    }
  }, Gg = function(a) {
    Qb(a.f, function(b, c) {
      this.f.hasOwnProperty(c) && gg(b);
    }, a);
    a.f = {};
  };
  L.prototype.A = function() {
    L.H.A.call(this);
    Gg(this);
  };
  L.prototype.handleEvent = function() {
    throw Error('EventHandler.handleEvent not implemented');
  };
  var Hg = function(a, b) {
    var c = void 0;
    return new (c || (c = Promise))(function(d, e) {
      function f (m)
      {
        try
        {
          l(b.next(m));
        } catch (p)
        {
          e(p);
        }
      }

      function k (m)
      {
        try
        {
          l(b['throw'](m));
        } catch (p)
        {
          e(p);
        }
      }

      function l (m)
      {
        m.done ? d(m.value) : (new c(function(p) {
          p(m.value);
        })).then(f, k);
      }

      l((b = b.apply(a, void 0)).next());
    });
  };
  var pc = new jc(hc, 'https://tpc.googlesyndication.com/sodar/%{basename}.js');
  var Ig = function(a, b) {
    a.addEventListener && a.addEventListener('load', b, !1);
  };

  function Jg (a)
  {
    var b = window, c = !0;
    c = void 0 === c ? !1 : c;
    new Promise(function(d, e) {
      function f ()
      {
        k.onload = null;
        k.onerror = null;
        b.document.body.removeChild(k);
      }

      var k = b.document.createElement('script');
      k.onload = function() {
        f();
        d();
      };
      k.onerror = function() {
        f();
        e(void 0);
      };
      k.type = 'text/javascript';
      Vc(k, a);
      c && 'complete' !== b.document.readyState ? Ig(b, function() {
        b.document.body.appendChild(k);
      }) : b.document.body.appendChild(k);
    });
  };

  function Kg (a)
  {
    return Hg(this, function c () {
      var d, e, f;
      return wa(c, function(k) {
        switch (k.a)
        {
          case 1:
            d = 'https://pagead2.googlesyndication.com/getconfig/sodar?sv=200&tid=' + a.a + ('&tv=' + a.b + '&st=') + a.za;
            e = void 0;
            k.s = 2;
            var l = Lg(d);
            k.a = 4;
            return { value: l };
          case 4:
            e = k.h;
            k.a = 3;
            k.s = 0;
            break;
          case 2:
            k.s = 0, k.f = null;
          case 3:
            return e ? (f = a.hb || e.sodar_query_id) && e.bg_hash_basename && e.bg_binary ? k.return({
              context: a.f,
              kd: e.bg_hash_basename,
              jd: e.bg_binary,
              ue: a.a + '_' + a.b,
              hb: f,
              za: a.za,
            }) : k.return(void 0) : k.return(void 0);
        }
      });
    });
  }

  var Lg = function(a) {
    return new Promise(function(b, c) {
      var d = new XMLHttpRequest;
      d.onreadystatechange = function() {
        d.readyState === d.DONE && (200 <= d.status && 300 > d.status ? b(JSON.parse(d.responseText)) : c());
      };
      d.open('GET', a, !0);
      d.send();
    });
  };

  function Mg ()
  {
    var a = Ng();
    Hg(this, function c () {
      var d;
      return wa(c, function(e) {
        if (1 == e.a)
        {
          var f = Kg(a);
          e.a = 2;
          return { value: f };
        }
        if (d = e.h)
        {
          f = 'sodar2';
          f = void 0 === f ? 'sodar2' : f;
          var k = window, l = k.GoogleGcLKhOms;
          l && 'function' === typeof l.push || (l = k.GoogleGcLKhOms = []);
          var m = {};
          l.push((m._ctx_ = d.context, m._bgv_ = d.kd, m._bgp_ = d.jd, m._li_ = d.ue, m._jk_ = d.hb, m._st_ = d.za, m));
          if (l = k.GoogleDX5YKUSk)
          {
            k.GoogleDX5YKUSk = void 0, l[1]();
          }
          f = tc({ basename: f });
          Jg(f);
        }
        return e.return(d);
      });
    });
  };var Og = function(a) {
    this.a = a.a;
    this.b = a.b;
    this.f = a.f;
    this.hb = a.hb;
    this.za = a.za;
  }, Pg = function() {
    this.a = 'xfad';
    this.b = 'latest';
    this.f = 'cr';
    this.za = 'env';
  }, Ng = function() {
    var a = new Pg;
    a.za = 'int';
    return new Og(a);
  };
  var Qg = bc(), Rg = ed() || A('iPod'), Sg = A('iPad'),
    Tg = A('Android') && !(cc() || bc() || A('Opera') || A('Silk')), Ug = cc(),
    Vg = A('Safari') && !(cc() || A('Coast') || A('Opera') || A('Edge') || A('Edg/') || A('OPR') || bc() || A('Silk') || A('Android')) && !fd();
  var Wg = function() {
  }, Xg = 'function' == typeof Uint8Array, Yg = function(a, b) {
    a.f = null;
    b || (b = []);
    a.j = void 0;
    a.g = -1;
    a.a = b;
    a:{
      if (b = a.a.length)
      {
        --b;
        var c = a.a[b];
        if (!(null === c || 'object' != typeof c || Array.isArray(c) || Xg && c instanceof Uint8Array))
        {
          a.s = b - a.g;
          a.b = c;
          break a;
        }
      }
      a.s = Number.MAX_VALUE;
    }
    a.h = {};
  }, Zg = Object.freeze ? Object.freeze([]) : [], $g = function(a, b) {
    if (b < a.s)
    {
      b += a.g;
      var c = a.a[b];
      return c === Zg ? a.a[b] = [] : c;
    }
    if (a.b)
    {
      return c = a.b[b], c === Zg ? a.b[b] = [] : c;
    }
  }, ah = function(a, b) {
    a.f || (a.f = {});
    if (!a.f[1])
    {
      var c = $g(a, 1);
      c &&
      (a.f[1] = new b(c));
    }
    return a.f[1];
  };
  Wg.prototype.toString = function() {
    return this.a.toString();
  };
  var bh = function(a) {
    Yg(this, a);
  };
  v(bh, Wg);
  var ch = function(a) {
    Yg(this, a);
  };
  v(ch, Wg);
  var dh = function(a) {
    if (a.N && 'function' == typeof a.N)
    {
      return a.N();
    }
    if ('string' === typeof a)
    {
      return a.split('');
    }
    if (Ia(a))
    {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
      return b;
    }
    return Tb(a);
  }, eh = function(a, b) {
    return a.contains && 'function' == typeof a.contains ? a.contains(b) : a.Na && 'function' == typeof a.Na ? a.Na(b) : Ia(a) || 'string' === typeof a ? 0 <= jb(a, b) : Wb(a, b);
  };
  var fh = function() {
    this.a = new I;
  }, gh = function(a) {
    var b = typeof a;
    return 'object' == b && a || 'function' == b ? 'o' + Ma(a) : b.substr(0, 1) + a;
  };
  fh.prototype.aa = function() {
    return this.a.aa();
  };
  fh.prototype.add = function(a) {
    this.a.set(gh(a), a);
  };
  var ih = function(a) {
    var b = hh;
    a = dh(a);
    for (var c = a.length, d = 0; d < c; d++) b.add(a[d]);
  };
  fh.prototype.contains = function(a) {
    return this.a.T(gh(a));
  };
  fh.prototype.N = function() {
    return this.a.N();
  };
  q('studio.common.Feature.Type', { Vf: 1, SDK_EVENT_FORWARDER: 2, RL_EVENT_FORWARDER: 3 }, void 0);
  var hh = new fh;
  q('studio.common.Feature.hasFeature', function(a) {
    return hh.contains(a);
  }, void 0);
  q('studio.common.Feature.hasFeatures', function(a) {
    var b = hh;
    a:{
      var c = b.contains;
      if ('function' == typeof a.every)
      {
        a = a.every(c, b);
      }
      else if (Ia(a) || 'string' === typeof a)
      {
        a = nb(a, c, b);
      }
      else
      {
        if (a.R && 'function' == typeof a.R)
        {
          var d = a.R();
        }
        else if (a.N && 'function' == typeof a.N)
        {
          d = void 0;
        }
        else if (Ia(a) || 'string' === typeof a)
        {
          d = [];
          for (var e = a.length, f = 0; f < e; f++) d.push(f);
        }
        else
        {
          for (f in d = [], e = 0, a) d[e++] = f;
        }
        e = dh(a);
        f = e.length;
        for (var k = 0; k < f; k++) if (!c.call(b, e[k], d && d[k], a))
        {
          a = !1;
          break a;
        }
        a = !0;
      }
    }
    return a;
  }, void 0);
  var jh = function(a, b) {
    this.b = a;
    this.a = null != b ? b : 0;
  };
  q('studio.common.Orientation', jh, void 0);
  var kh = function() {
    var a = window;
    return a.innerWidth > a.innerHeight ? 'landscape' : 'portrait';
  }, lh = function() {
    return 'onorientationchange' in window;
  };
  jh.Mode = { PORTRAIT: 'portrait', LANDSCAPE: 'landscape' };
  jh.prototype.Kd = function() {
    return this.b;
  };
  jh.prototype.getMode = jh.prototype.Kd;
  jh.prototype.Jd = function() {
    return this.a;
  };
  jh.prototype.getDegrees = jh.prototype.Jd;
  jh.prototype.toString = function() {
    return this.b;
  };
  var mh = function(a, b, c, d, e, f, k) {
      var l = '';
      a && (l += a + ':');
      c && (l += '//', b && (l += b + '@'), l += c, d && (l += ':' + d));
      e && (l += e);
      f && (l += '?' + f);
      k && (l += '#' + k);
      return l;
    },
    nh = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    oh = function(a) {
      var b = a.indexOf('#');
      return 0 > b ? null : a.substr(b + 1);
    }, ph = function(a) {
      a = a.match(nh);
      return mh(a[1], a[2], a[3], a[4]);
    }, qh = function(a, b) {
      if (a)
      {
        a = a.split('&');
        for (var c = 0; c < a.length; c++)
        {
          var d = a[c].indexOf('='), e = null;
          if (0 <= d)
          {
            var f = a[c].substring(0, d);
            e = a[c].substring(d + 1);
          }
          else
          {
            f = a[c];
          }
          b(f, e ? Xc(e) : '');
        }
      }
    }, rh = function(a, b) {
      if (!b)
      {
        return a;
      }
      var c = a.indexOf('#');
      0 > c && (c = a.length);
      var d = a.indexOf('?');
      if (0 > d || d > c)
      {
        d = c;
        var e = '';
      }
      else
      {
        e = a.substring(d + 1, c);
      }
      a = [a.substr(0, d), e, a.substr(c)];
      c = a[1];
      a[1] = b ? c ? c + '&' + b : b : c;
      return a[0] + (a[1] ? '?' + a[1] : '') + a[2];
    }, sh = function(a, b, c) {
      db(a);
      if (Array.isArray(b))
      {
        fb(b);
        for (var d = 0; d < b.length; d++) sh(a, String(b[d]), c);
      }
      else
      {
        null != b && c.push(a + ('' === b ? '' : '=' + encodeURIComponent(String(b))));
      }
    }, th =
      /#|$/, uh = function(a, b) {
      var c = a.search(th);
      a:{
        var d = 0;
        for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;)
        {
          var f = a.charCodeAt(d - 1);
          if (38 == f || 63 == f)
          {
            if (f = a.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f)
            {
              break a;
            }
          }
          d += e + 1;
        }
        d = -1;
      }
      if (0 > d)
      {
        return null;
      }
      e = a.indexOf('&', d);
      if (0 > e || e > c)
      {
        e = c;
      }
      d += b.length + 1;
      return Xc(a.substr(d, e - d));
    };
  var vh = function(a, b) {
    return b ? a.replace('[rm_exit_id]', b) : a;
  }, wh = function(a) {
    Bb($c(a)) || 'market' != (a.match(nh)[1] || null) || (a = a.match(nh), a = 'https://play.google.com/store/apps/details' + mh(null, null, null, null, a[5], a[6], a[7]));
    return a;
  };
  var xh = {
    CREATIVETOOLSET_CONFIG: 'creativeToolsetConfig',
    CREATIVETOOLSET_INTERNALS: 'creativeToolsetInternals',
    CREATIVETOOLSET_INTERNALS_GEN204: 'creativeToolsetInternalsGen204',
    CREATIVE_REPORTER: 'creativeReporter',
    CREATIVE_INNOVATION: 'gcreativeinnovation',
    GOOGLE_AFMA_SUPPORT: 'googleAfmaSupport',
  };
  q('studio.common.WhitelistedExternalObject', xh, void 0);
  var yh = {};
  var zh = { 1: 'NativeMessagingTransport', 2: 'DirectTransport' },
    Ah = ['pu', 'lru', 'pru', 'lpu', 'ppu'], Ch = function() {
      for (var a = 10, b = Bh, c = b.length, d = ''; 0 < a--;) d += b.charAt(Math.floor(Math.random() * c));
      return d;
    }, Bh = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', O = C('goog.net.xpc');
  var Dh = function(a) {
    J.call(this);
    this.V = a || Dd();
  };
  v(Dh, J);
  Dh.prototype.Ma = 0;
  var Eh = function(a) {
    return Hd(a.V.a);
  };
  var Fh = function(a, b) {
    Dh.call(this, b);
    this.a = a;
    this.v = new L(this);
    Bf(this, this.v);
    this.j = new og(100, Eh(this));
    Bf(this, this.j);
    this.g = new H;
    this.h = new H;
    this.b = new H;
    this.o = Ch();
    this.l = null;
    this.f = {};
    this.C = this.a.name;
    this.a.Ba(this.a.name + '_' + this.a.U());
    this.B = !1;
    nf(this.b, this.g);
    nf(this.b, this.h);
    mf(this.b, this.af, this);
    this.b.I(!0);
    M(this.v, this.j, 'tick', this.$c, void 0);
    E(O, 'DirectTransport created. role=' + this.a.U());
  };
  h(Fh, Dh);
  var Ih = function(a) {
    var b = new Gh(a.channelName, a.service, a.payload);
    a = b.a;
    var c = b.f;
    b = b.b;
    pe(O, 'messageReceived: channel=' + a + ', service=' + c + ', payload=' + b);
    var d = yh[a];
    if (d)
    {
      return d.ja(c, b), !0;
    }
    d = Hh(b)[0];
    for (var e in yh)
    {
      var f = yh[e];
      if (1 == f.U() && !f.isConnected() && 'tp' == c && 'SETUP' == d)
      {
        return f.Ba(a), f.ja(c, b), !0;
      }
    }
    E(O, 'channel name mismatch; message ignored.');
    return !1;
  };
  g = Fh.prototype;
  g.Va = function(a) {
    a = Hh(a);
    var b = a[1];
    switch (a[0])
    {
      case 'SETUP_ACK':
        this.g.a || this.g.I(!0);
        break;
      case 'SETUP':
        this.P('tp', 'SETUP_ACK'), this.h.a || this.h.I(!0), null != this.l && this.l != b && (E(O, 'Sending SETUP and changing peer ID to: ' + b), this.P('tp', 'SETUP,' + this.o)), this.l = b;
    }
  };
  g.connect = function() {
    var a = Eh(this);
    if (a)
    {
      var b = Ma(a);
      0 == (Jh[b] || 0) && null == Ca('crosswindowmessaging.channel', a) && q('crosswindowmessaging.channel', Ih, a);
      Jh[b]++;
      this.B = !0;
      this.$c();
    }
    else
    {
      pe(O, 'connect(): no window to initialize.');
    }
  };
  g.$c = function() {
    this.a.isConnected() ? this.j.stop() : (this.j.start(), this.P('tp', 'SETUP,' + this.o));
  };
  g.P = function(a, b) {
    this.a.ca ? (a = new Gh(this.C + '_' + (0 == this.a.U() ? 1 : 0), a, b), this.a.a.directSyncMode ? this.Zc(a) : this.f[Ma(a)] = pg(u(this.Zc, this, a), 0)) : pe(O, 'send(): window not ready');
  };
  g.Zc = function(a) {
    var b = Ma(a);
    this.f[b] && delete this.f[b];
    try
    {
      var c = Ca('crosswindowmessaging.channel', this.a.ca);
    } catch (d)
    {
      D(O, 'Can\'t access other window, ignoring.', d);
      return;
    }
    if (null === c)
    {
      D(O, 'Peer window had no global function.');
    }
    else
    {
      try
      {
        c({
          channelName: a.a,
          service: a.f,
          payload: a.b,
        }), E(O, 'send(): channelName=' + a.a + ' service=' + a.f + ' payload=' + a.b);
      } catch (d)
      {
        D(O, 'Error performing call, ignoring.', d);
      }
    }
  };
  g.af = function() {
    Kh(this.a, 0);
  };
  g.A = function() {
    if (this.B)
    {
      var a = Eh(this), b = Ma(a);
      1 == --Jh[b] && q('crosswindowmessaging.channel', null, a);
    }
    this.f && (Qb(this.f, function(c) {
      n.clearTimeout(c);
    }), this.f = null);
    this.g && (this.g.cancel(), delete this.g);
    this.h && (this.h.cancel(), delete this.h);
    this.b && (this.b.cancel(), delete this.b);
    Dh.prototype.A.call(this);
  };
  var Hh = function(a) {
    a = a.split(',');
    a[1] = a[1] || null;
    return a;
  }, Jh = {};
  Fh.prototype.Ma = 2;
  var Gh = function(a, b, c) {
    this.a = a;
    this.f = b;
    this.b = c;
  };
  var Lh = function(a, b, c, d, e) {
    Dh.call(this, c);
    this.f = a;
    this.b = e || 2;
    y(1 <= this.b);
    y(2 >= this.b);
    this.G = b || '*';
    this.C = new L(this);
    this.l = new og(100, Eh(this));
    this.v = !!d;
    this.h = new H;
    this.j = new H;
    this.g = new H;
    this.sa = Ch();
    this.B = null;
    this.v ? 1 == this.f.U() ? nf(this.g, this.h) : nf(this.g, this.j) : (nf(this.g, this.h), 2 == this.b && nf(this.g, this.j));
    mf(this.g, this.ka, this);
    this.g.I(!0);
    this.W = kd && !vd('11');
    M(this.C, this.l, 'tick', this.J, void 0);
    E(O, 'NativeMessagingTransport created.  protocolVersion=' + this.b + ', oneSidedHandshake=' +
      this.v + ', role=' + this.f.U());
  };
  h(Lh, Dh);
  var Nh = function(a) {
    var b = a.$.data;
    if ('string' !== typeof b)
    {
      return !1;
    }
    var c = b.indexOf('|'), d = b.indexOf(':');
    if (-1 == c || -1 == d)
    {
      return !1;
    }
    var e = b.substring(0, c);
    c = b.substring(c + 1, d);
    b = b.substring(d + 1);
    pe(O, 'messageReceived: channel=' + e + ', service=' + c + ', payload=' + b);
    if (d = yh[e])
    {
      return d.ja(c, b, a.$.origin), !0;
    }
    d = Mh(b)[0];
    for (var f in yh)
    {
      var k = yh[f];
      if (1 == k.U() && !k.isConnected() && 'tp' == c && ('SETUP' == d || 'SETUP_NTPV2' == d) && k.Sa(a.$.origin))
      {
        return k.Ba(e), k.ja(c, b), !0;
      }
    }
    E(O, 'channel name mismatch; message ignored"');
    return !1;
  };
  Lh.prototype.Va = function(a) {
    var b = Mh(a);
    a = b[1];
    switch (b[0])
    {
      case 'SETUP_ACK':
        Oh(this, 1);
        this.h.a || this.h.I(!0);
        break;
      case 'SETUP_ACK_NTPV2':
        2 == this.b && (Oh(this, 2), this.h.a || this.h.I(!0));
        break;
      case 'SETUP':
        Oh(this, 1);
        Ph(this, 1);
        break;
      case 'SETUP_NTPV2':
        2 == this.b && (b = this.a, Oh(this, 2), Ph(this, 2), 1 != b && null == this.B || this.B == a || (E(O, 'Sending SETUP and changing peer ID to: ' + a), Qh(this)), this.B = a);
    }
  };
  var Qh = function(a) {
    y(!(1 == a.b && 2 == a.a));
    2 != a.b || null != a.a && 2 != a.a || a.P('tp', 'SETUP_NTPV2,' + a.sa);
    null != a.a && 1 != a.a || a.P('tp', 'SETUP');
  }, Ph = function(a, b) {
    y(1 != a.b || 2 != b, 'Shouldn\'t try to send a v2 setup ack in v1 mode.');
    if (2 != a.b || null != a.a && 2 != a.a || 2 != b)
    {
      if (null != a.a && 1 != a.a || 1 != b)
      {
        return;
      }
      a.P('tp', 'SETUP_ACK');
    }
    else
    {
      a.P('tp', 'SETUP_ACK_NTPV2');
    }
    a.j.a || a.j.I(!0);
  }, Oh = function(a, b) {
    b > a.a && (a.a = b);
    1 == a.a && (a.j.a || a.v || a.j.I(!0), a.B = null);
  };
  Lh.prototype.connect = function() {
    var a = Eh(this), b = Ma(a), c = Rh[b];
    'number' !== typeof c && (c = 0);
    0 == c && Zf(a.postMessage ? a : a.document, 'message', Nh, !1, Lh);
    Rh[b] = c + 1;
    this.D = !0;
    this.J();
  };
  Lh.prototype.J = function() {
    var a = 0 == this.f.U();
    this.v && a || this.f.isConnected() || this.s ? this.l.stop() : (this.l.start(), Qh(this));
  };
  var Sh = function(a, b, c) {
    var d = a.f.ca, e = a.f.name;
    a.o = 0;
    try
    {
      var f = d.postMessage ? d : d.document;
      f.postMessage ? (f.postMessage(e + '|' + b + ':' + c, a.G), pe(O, 'send(): service=' + b + ' payload=' + c + ' to hostname=' + a.G)) : D(O, 'Peer window had no postMessage function.');
    } catch (k)
    {
      D(O, 'Error performing postMessage, ignoring.', k);
    }
  };
  Lh.prototype.P = function(a, b) {
    var c = this;
    this.f.ca ? this.W ? this.o = pg(function() {
      return void Sh(c, a, b);
    }, 0) : Sh(this, a, b) : pe(O, 'send(): window not ready');
  };
  Lh.prototype.ka = function() {
    Kh(this.f, 1 == this.b || 1 == this.a ? 200 : void 0);
  };
  Lh.prototype.A = function() {
    if (this.D)
    {
      var a = Eh(this), b = Ma(a), c = Rh[b];
      Rh[b] = c - 1;
      1 == c && fg(a.postMessage ? a : a.document, 'message', Nh, !1, Lh);
    }
    this.o && (n.clearTimeout(this.o), this.o = 0);
    Af(this.C);
    delete this.C;
    Af(this.l);
    delete this.l;
    this.h.cancel();
    delete this.h;
    this.j.cancel();
    delete this.j;
    this.g.cancel();
    delete this.g;
    delete this.P;
    Dh.prototype.A.call(this);
  };
  var Mh = function(a) {
    a = a.split(',');
    a[1] = a[1] || null;
    return a;
  };
  Lh.prototype.a = null;
  Lh.prototype.D = !1;
  Lh.prototype.Ma = 1;
  var Rh = {};
  Lh.prototype.o = 0;
  var Th = function(a, b, c) {
    J.call(this);
    this.a = a;
    this.g = b || 0;
    this.b = c;
    this.f = u(this.ud, this);
  };
  v(Th, J);
  g = Th.prototype;
  g.xa = 0;
  g.A = function() {
    Th.H.A.call(this);
    this.stop();
    delete this.a;
    delete this.b;
  };
  g.start = function(a) {
    this.stop();
    this.xa = pg(this.f, void 0 !== a ? a : this.g);
  };
  g.stop = function() {
    0 != this.xa && n.clearTimeout(this.xa);
    this.xa = 0;
  };
  g.ud = function() {
    this.xa = 0;
    this.a && this.a.call(this.b);
  };
  var Wh = function(a) {
      var b = [];
      Uh(new Vh, a, b);
      return b.join('');
    }, Vh = function() {
    }, Uh = function(a, b, c) {
      if (null == b)
      {
        c.push('null');
      }
      else
      {
        if ('object' == typeof b)
        {
          if (Array.isArray(b))
          {
            var d = b;
            b = d.length;
            c.push('[');
            for (var e = '', f = 0; f < b; f++) c.push(e), Uh(a, d[f], c), e = ',';
            c.push(']');
            return;
          }
          if (b instanceof String || b instanceof Number || b instanceof Boolean)
          {
            b = b.valueOf();
          }
          else
          {
            c.push('{');
            e = '';
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], 'function' != typeof f && (c.push(e), Xh(d, c), c.push(':'), Uh(a, f, c),
              e = ','));
            c.push('}');
            return;
          }
        }
        switch (typeof b)
        {
          case 'string':
            Xh(b, c);
            break;
          case 'number':
            c.push(isFinite(b) && !isNaN(b) ? String(b) : 'null');
            break;
          case 'boolean':
            c.push(String(b));
            break;
          case 'function':
            c.push('null');
            break;
          default:
            throw Error('Unknown type: ' + typeof b);
        }
      }
    }, Yh = {
      '"': '\\"',
      '\\': '\\\\',
      '/': '\\/',
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\x0B': '\\u000b',
    }, Zh = /\uffff/.test('\uffff') ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g,
    Xh = function(a, b) {
      b.push('"', a.replace(Zh,
        function(c) {
          var d = Yh[c];
          d || (d = '\\u' + (c.charCodeAt(0) | 65536).toString(16).substr(1), Yh[c] = d);
          return d;
        }), '"');
    };
  var $h = function() {
    J.call(this);
    this.l = {};
  };
  v($h, J);
  g = $h.prototype;
  g.qc = C('goog.messaging.AbstractChannel');
  g.connect = function(a) {
    a && a();
  };
  g.isConnected = function() {
    return !0;
  };
  g.Qa = function(a, b, c) {
    this.l[a] = { I: b, Fc: !!c };
  };
  g.Nc = function(a) {
    this.h = a;
  };
  var ai = function(a, b, c) {
    var d = a.l[b];
    d || (a.h ? d = {
      I: Pa(a.h, b),
      Fc: t(c),
    } : (D(a.qc, 'Unknown service name "' + b + '"'), d = null));
    if (d)
    {
      a:{
        var e = d.Fc;
        if (e && 'string' === typeof c)
        {
          try
          {
            var f = JSON.parse(c);
            break a;
          } catch (k)
          {
            D(a.qc, 'Expected JSON payload for ' + b + ', was "' + c + '"');
            f = null;
            break a;
          }
        }
        else if (!e && 'string' !== typeof c)
        {
          f = Wh(c);
          break a;
        }
        f = c;
      }
      null != f && d.I(f);
    }
  };
  $h.prototype.A = function() {
    $h.H.A.call(this);
    delete this.l;
    delete this.h;
  };
  var bi = function(a) {
    this.b = this.j = this.g = '';
    this.l = null;
    this.s = this.a = '';
    this.h = !1;
    var b;
    a instanceof bi ? (this.h = a.h, ci(this, a.g), this.j = a.j, this.b = a.b, di(this, a.l), this.a = a.a, ei(this, fi(a.f)), this.s = a.s) : a && (b = String(a).match(nh)) ? (this.h = !1, ci(this, b[1] || '', !0), this.j = gi(b[2] || ''), this.b = gi(b[3] || '', !0), di(this, b[4]), this.a = gi(b[5] || '', !0), ei(this, b[6] || '', !0), this.s = gi(b[7] || '')) : (this.h = !1, this.f = new hi(null, this.h));
  };
  bi.prototype.toString = function() {
    var a = [], b = this.g;
    b && a.push(ii(b, ji, !0), ':');
    var c = this.b;
    if (c || 'file' == b)
    {
      a.push('//'), (b = this.j) && a.push(ii(b, ji, !0), '@'), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')), c = this.l, null != c && a.push(':', String(c));
    }
    if (c = this.a)
    {
      this.b && '/' != c.charAt(0) && a.push('/'), a.push(ii(c, '/' == c.charAt(0) ? ki : li, !0));
    }
    (c = this.f.toString()) && a.push('?', c);
    (c = this.s) && a.push('#', ii(c, mi));
    return a.join('');
  };
  bi.prototype.resolve = function(a) {
    var b = new bi(this), c = !!a.g;
    c ? ci(b, a.g) : c = !!a.j;
    c ? b.j = a.j : c = !!a.b;
    c ? b.b = a.b : c = null != a.l;
    var d = a.a;
    if (c)
    {
      di(b, a.l);
    }
    else if (c = !!a.a)
    {
      if ('/' != d.charAt(0))
      {
        if (this.b && !this.a)
        {
          d = '/' + d;
        }
        else
        {
          var e = b.a.lastIndexOf('/');
          -1 != e && (d = b.a.substr(0, e + 1) + d);
        }
      }
      e = d;
      if ('..' == e || '.' == e)
      {
        d = '';
      }
      else if (Kb(e, './') || Kb(e, '/.'))
      {
        d = Ab(e, '/');
        e = e.split('/');
        for (var f = [], k = 0; k < e.length;)
        {
          var l = e[k++];
          '.' == l ? d && k == e.length && f.push('') : '..' == l ? ((1 < f.length || 1 == f.length && '' != f[0]) && f.pop(), d && k == e.length &&
          f.push('')) : (f.push(l), d = !0);
        }
        d = f.join('/');
      }
      else
      {
        d = e;
      }
    }
    c ? b.a = d : c = '' !== a.f.toString();
    c ? ei(b, fi(a.f)) : c = !!a.s;
    c && (b.s = a.s);
    return b;
  };
  var ci = function(a, b, c) {
      a.g = c ? gi(b, !0) : b;
      a.g && (a.g = a.g.replace(/:$/, ''));
    }, di = function(a, b) {
      if (b)
      {
        b = Number(b);
        if (isNaN(b) || 0 > b)
        {
          throw Error('Bad port number ' + b);
        }
        a.l = b;
      }
      else
      {
        a.l = null;
      }
    }, ei = function(a, b, c) {
      b instanceof hi ? (a.f = b, ni(a.f, a.h)) : (c || (b = ii(b, oi)), a.f = new hi(b, a.h));
    }, gi = function(a, b) {
      return a ? b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a) : '';
    }, ii = function(a, b, c) {
      return 'string' === typeof a ? (a = encodeURI(a).replace(b, pi), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), a) : null;
    }, pi = function(a) {
      a =
        a.charCodeAt(0);
      return '%' + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
    }, ji = /[#\/\?@]/g, li = /[#\?:]/g, ki = /[#\?]/g, oi = /[#\?@]/g, mi = /#/g,
    hi = function(a, b) {
      this.b = this.a = null;
      this.f = a || null;
      this.g = !!b;
    }, qi = function(a) {
      a.a || (a.a = new I, a.b = 0, a.f && qh(a.f, function(b, c) {
        a.add(Xc(b), c);
      }));
    };
  hi.prototype.aa = function() {
    qi(this);
    return this.b;
  };
  hi.prototype.add = function(a, b) {
    qi(this);
    this.f = null;
    a = ri(this, a);
    var c = this.a.get(a);
    c || this.a.set(a, c = []);
    c.push(b);
    this.b = cb(this.b) + 1;
    return this;
  };
  var si = function(a, b) {
    qi(a);
    b = ri(a, b);
    a.a.T(b) && (a.f = null, a.b = cb(a.b) - a.a.get(b).length, zf(a.a, b));
  };
  g = hi.prototype;
  g.T = function(a) {
    qi(this);
    a = ri(this, a);
    return this.a.T(a);
  };
  g.Na = function(a) {
    var b = this.N();
    return 0 <= jb(b, a);
  };
  g.forEach = function(a, b) {
    qi(this);
    this.a.forEach(function(c, d) {
      z(c, function(e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  g.R = function() {
    qi(this);
    for (var a = this.a.N(), b = this.a.R(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  g.N = function(a) {
    qi(this);
    var b = [];
    if ('string' === typeof a)
    {
      this.T(a) && (b = sb(b, this.a.get(ri(this, a))));
    }
    else
    {
      a = this.a.N();
      for (var c = 0; c < a.length; c++) b = sb(b, a[c]);
    }
    return b;
  };
  g.set = function(a, b) {
    qi(this);
    this.f = null;
    a = ri(this, a);
    this.T(a) && (this.b = cb(this.b) - this.a.get(a).length);
    this.a.set(a, [b]);
    this.b = cb(this.b) + 1;
    return this;
  };
  g.get = function(a, b) {
    if (!a)
    {
      return b;
    }
    a = this.N(a);
    return 0 < a.length ? String(a[0]) : b;
  };
  g.toString = function() {
    if (this.f)
    {
      return this.f;
    }
    if (!this.a)
    {
      return '';
    }
    for (var a = [], b = this.a.R(), c = 0; c < b.length; c++)
    {
      var d = b[c], e = encodeURIComponent(String(d));
      d = this.N(d);
      for (var f = 0; f < d.length; f++)
      {
        var k = e;
        '' !== d[f] && (k += '=' + encodeURIComponent(String(d[f])));
        a.push(k);
      }
    }
    return this.f = a.join('&');
  };
  var fi = function(a) {
    var b = new hi;
    b.f = a.f;
    a.a && (b.a = new I(a.a), b.b = a.b);
    return b;
  }, ri = function(a, b) {
    b = String(b);
    a.g && (b = b.toLowerCase());
    return b;
  }, ni = function(a, b) {
    b && !a.g && (qi(a), a.f = null, a.a.forEach(function(c, d) {
      var e = d.toLowerCase();
      d != e && (si(this, d), si(this, e), 0 < c.length && (this.f = null, this.a.set(ri(this, e), tb(c)), this.b = cb(this.b) + c.length));
    }, a));
    a.g = b;
  };
  var ui = function(a, b) {
    $h.call(this);
    for (var c = 0, d; d = Ah[c]; c++) if (d in a && !/^https?:\/\//.test(a[d]))
    {
      throw Error('URI ' + a[d] + ' is invalid for field ' + d);
    }
    this.a = a;
    this.name = this.a.cn || Ch();
    this.f = b || Dd();
    this.g = [];
    this.j = new L(this);
    a.lpu = a.lpu || ph(Hd(this.f.a).location.href) + '/robots.txt';
    a.ppu = a.ppu || ph(a.pu || '') + '/robots.txt';
    yh[this.name] = this;
    hg(window, 'unload', ti) || Yf(window, 'unload', ti);
    E(O, 'CrossPageChannel created: ' + this.name);
  };
  h(ui, $h);
  ui.prototype.isConnected = function() {
    return 2 == this.La;
  };
  ui.prototype.connect = function(a) {
    this.b = a || Da;
    3 == this.La && (this.La = 1);
    this.Aa ? mf(this.Aa, this.o) : this.o();
  };
  ui.prototype.o = function() {
    E(O, 'continueConnection_()');
    this.Aa = null;
    this.a.ifrid && (this.mb = this.f.getElement(this.a.ifrid));
    if (this.mb)
    {
      var a = this.mb.contentWindow;
      a || (a = window.frames[this.a.ifrid]);
      this.ca = a;
    }
    if (!this.ca)
    {
      if (window == window.top)
      {
        throw Error('CrossPageChannel: Can\'t connect, peer window-object not set.');
      }
      this.ca = window.parent;
    }
    if (!this.ha)
    {
      this.a.tp || (this.a.tp = 'function' === typeof document.postMessage || 'function' === typeof window.postMessage || kd && window.postMessage ? 1 : 0);
      if ('function' ===
        typeof this.a.tp)
      {
        this.ha = new this.a.tp(this, this.f);
      }
      else
      {
        switch (this.a.tp)
        {
          case 1:
            this.ha = new Lh(this, this.a.ph, this.f, !!this.a.osh, this.a.nativeProtocolVersion || 2);
            break;
          case 2:
            if (a = this.ca)
            {
              try
              {
                a = window.document.domain == this.ca.document.domain;
              } catch (b)
              {
                a = !1;
              }
            }
            a ? this.ha = new Fh(this, this.f) : E(O, 'DirectTransport not supported for this window, peer window in different security context or not set yet.');
        }
      }
      if (this.ha)
      {
        E(O, 'Transport created: ' + (zh[String(this.ha.Ma)] || ''));
      }
      else
      {
        throw Error('CrossPageChannel: No suitable transport found! You may try injecting a Transport constructor directly via the channel config object.');
      }
    }
    for (this.ha.connect(); 0 < this.g.length;) this.g.shift()();
  };
  ui.prototype.close = function() {
    this.Aa && (this.Aa.cancel(), this.Aa = null);
    this.g.length = 0;
    Gg(this.j);
    this.La = 3;
    Af(this.ha);
    this.b = this.ha = null;
    Af(this.va);
    this.va = null;
    E(O, 'Channel "' + this.name + '" closed');
  };
  var Kh = function(a, b) {
    a.isConnected() || a.va && 0 != a.va.xa || (a.La = 2, E(O, 'Channel "' + a.name + '" connected'), Af(a.va), void 0 !== b ? (a.va = new Th(a.b, b), a.va.start()) : (a.va = null, a.b()));
  };
  ui.prototype.Ra = function(a, b) {
    if (this.isConnected())
    {
      try
      {
        var c = !!this.ca && !this.ca.closed;
      } catch (d)
      {
        c = !1;
      }
      c ? (t(b) && (b = Wh(b)), this.ha.P(vi(a), b)) : (oe(O, 'Peer has disappeared.'), this.close());
    }
    else
    {
      oe(O, 'Can\'t send. Channel not connected.');
    }
  };
  ui.prototype.ja = function(a, b, c) {
    this.Aa ? this.g.push(u(this.ja, this, a, b, c)) : this.Sa(c) ? this.s || 3 == this.La ? D(O, 'CrossPageChannel::xpcDeliver(): Channel closed.') : a && 'tp' != a ? this.isConnected() ? (a = a.replace(/%[0-9a-f]{2}/gi, decodeURIComponent), a = wi.test(a) ? a.substring(1) : a, ai(this, a, b)) : E(O, 'CrossPageChannel::xpcDeliver(): Not connected.') : this.ha.Va(b) : D(O, 'Message received from unapproved origin "' + c + '" - rejected.');
  };
  var vi = function(a) {
    xi.test(a) && (a = '%' + a);
    return a.replace(/[%:|]/g, encodeURIComponent);
  };
  ui.prototype.U = function() {
    var a = this.a.role;
    return 'number' === typeof a ? a : window.parent == this.ca ? 1 : 0;
  };
  ui.prototype.Ba = function(a) {
    pe(O, 'changing channel name to ' + a);
    delete yh[this.name];
    this.name = a;
    yh[a] = this;
  };
  ui.prototype.Sa = function(a) {
    var b = this.a.ph;
    return Bb($c(a)) || Bb($c(b)) || a == this.a.ph;
  };
  ui.prototype.A = function() {
    this.close();
    this.mb = this.ca = null;
    delete yh[this.name];
    Af(this.j);
    delete this.j;
    $h.prototype.A.call(this);
  };
  var ti = function() {
    for (var a in yh) Af(yh[a]);
  }, xi = /^%*tp$/, wi = /^%+tp$/;
  g = ui.prototype;
  g.va = null;
  g.Aa = null;
  g.ha = null;
  g.La = 1;
  g.ca = null;
  g.mb = null;
  var yi = {
    Bf: 'devicemotion',
    Cf: 'deviceorientation',
    Rf: 'hostpageScroll',
    Gf: 'enterViewport',
    Hf: 'exitViewport',
    vf: 'adLocation',
  }, zi = {}, Ai;
  for (Ai in yi) zi[yi[Ai]] = !0;
  var P = function(a) {
    Df.call(this, a);
  };
  h(P, Df);
  P.prototype.da = function(a, b) {
    this[a] = b;
    return this;
  };
  q('studio.events.StudioEvent', P, void 0);
  P.prototype.addProperty = P.prototype.da;
  P.INIT = 'init';
  P.VISIBLE = 'visible';
  P.HIDDEN = 'hidden';
  P.VISIBILITY_CHANGE = 'visibilityChange';
  P.VISIBILITY_CHANGE_WITH_INFO = 'visibilityChangeWithInfo';
  P.EXIT = 'exit';
  P.INTERACTION = 'interaction';
  P.PAGE_LOADED = 'pageLoaded';
  P.ORIENTATION = 'orientation';
  P.ABOUT_TO_EXPAND = 'aboutToExpand';
  P.EXPAND_START = 'expandStart';
  P.EXPAND_FAILED = 'expandFailed';
  P.EXPAND_FINISH = 'expandFinish';
  P.COLLAPSE_START = 'collapseStart';
  P.COLLAPSE_FINISH = 'collapseFinish';
  P.COLLAPSE = 'collapse';
  P.FULLSCREEN_SUPPORT = 'fullscreenSupport';
  P.HOSTPAGE_FEATURES_LOADED = 'hostpageFeaturesLoaded';
  P.FULLSCREEN_DIMENSIONS = 'fullscreenDimensions';
  P.FULLSCREEN_EXPAND_START = 'fullscreenExpandStart';
  P.FULLSCREEN_EXPAND_FINISH = 'fullscreenExpandFinish';
  P.FULLSCREEN_COLLAPSE_START = 'fullscreenCollapseStart';
  P.FULLSCREEN_COLLAPSE_FINISH = 'fullscreenCollapseFinish';
  P.HOSTPAGE_SCROLL = 'hostpageScroll';
  P.OPTIONAL_HOSTPAGE_SCROLL = 'optHostpageScroll';
  P.SCROLL_INTERACTION = 'scrollInteraction';
  P.ENTER_VIEWPORT = 'enterViewport';
  P.OPTIONAL_ENTER_VIEWPORT = 'optEnterViewport';
  P.EXIT_VIEWPORT = 'exitViewport';
  P.OPTIONAL_EXIT_VIEWPORT = 'optExitViewport';
  P.VIDEO_START = 'videoStart';
  var Bi = {},
    Ci = (Bi.optHostpageScroll = 'hostpageScroll', Bi.optEnterViewport = 'enterViewport', Bi.optExitViewport = 'exitViewport', Bi);
  var Di = function(a) {
    this.a = a;
  };
  q('studio.common.mde.Direction', Di, void 0);
  Di.Corner = { bg: 0, cg: 1, wf: 2, xf: 3 };
  Di.prototype.toString = function() {
    return (this.a & 2 ? 'b' : 't') + (this.a & 1 ? 'r' : 'l');
  };
  var Ei = { TL: new Di(0), TR: new Di(1), BL: new Di(2), BR: new Di(3) }, Fi = Tb(Ei);
  var Gi = {
    $f: 'startExpandInternal',
    Zf: 'startCollapseInternal',
    Jf: 'finishCollapseInternal',
    uf: 'aboutToExpandInternal',
    Wf: 'setAdVisibleInternal',
    Xf: 'setAdParameters',
    Df: 'dispatchEvent',
    Yf: 'setParameter',
    Qf: 'getParameter',
    Pf: 'fullscreenSupportInternal',
    Mf: 'fullscreenDimensionsInternal',
    Of: 'fullscreenExpandStartInternal',
    Nf: 'fullscreenExpandFinishInternal',
    Lf: 'fullscreenCollapseStartInternal',
    Kf: 'fullscreenCollapseFinishInternal',
    Sf: 'invokeOnAllVideos',
    Tf: 'livePreviewChannel',
    Ef: 'dispatchPageLoaded',
  }, Hi =
    {}, Ii;
  for (Ii in Gi) Hi[Gi[Ii]] = !0;
  var Ji = [/s0(qa)?\.2mdn\.net/, /^.*\.(prod|corp)\.google\.com/, /localhost/, /tpc\.googlesyndication\.com/, /secureframe\.doubleclick\.net/, /imasdk\.googleapis\.com/, /^.*dot-expandable-ad-tool\.appspot\.com/],
    Ki = function() {
      var a = location.hostname;
      return w(2) && !w(16) ? !1 : mb(Ji, function(b) {
        return b.test(a);
      });
    };
  var Li = function(a) {
    J.call(this);
    this.b = a;
    this.a = {};
    this.b.Nc(u(this.g, this));
  };
  v(Li, J);
  Li.prototype.f = C('goog.messaging.MultiChannel');
  var Ni = function(a, b) {
    if (-1 != b.indexOf(':'))
    {
      throw Error('Virtual channel name "' + b + '" should not contain colons');
    }
    if (b in a.a)
    {
      throw Error('Virtual channel "' + b + '" was already created for this multichannel.');
    }
    var c = new Mi(a, b);
    return a.a[b] = c;
  };
  Li.prototype.g = function(a, b) {
    var c = a.match(/^([^:]*):(.*)/);
    if (c)
    {
      var d = c[1];
      a = c[2];
      d in this.a ? (c = this.a[d]) ? c.f ? c.f(a, b) : D(this.f, 'Service "' + a + '" is not registered on virtual channel "' + d + '"') : D(this.f, 'Virtual channel "' + d + ' has been disposed, but a message was received for it: "' + a + '"') : D(this.f, 'Virtual channel "' + d + ' does not exist, but a message was received for it: "' + a + '"');
    }
    else
    {
      D(this.f, 'Invalid service name "' + a + '": no virtual channel specified');
    }
  };
  Li.prototype.A = function() {
    Qb(this.a, function(a) {
      Af(a);
    });
    Af(this.b);
    delete this.a;
    delete this.b;
  };
  var Mi = function(a, b) {
    J.call(this);
    this.b = a;
    this.a = b;
  };
  v(Mi, J);
  g = Mi.prototype;
  g.Td = C('goog.messaging.MultiChannel.VirtualChannel');
  g.connect = function(a) {
    a && a();
  };
  g.isConnected = function() {
    return !0;
  };
  g.Qa = function(a, b, c) {
    this.b.b.Qa(this.a + ':' + a, u(this.cc, this, b), c);
  };
  g.Nc = function(a) {
    this.f = u(this.cc, this, a);
  };
  g.Ra = function(a, b) {
    if (this.s)
    {
      throw Error('#send called for disposed VirtualChannel.');
    }
    this.b.b.Ra(this.a + ':' + a, b);
  };
  g.cc = function(a, b) {
    this.s ? D(this.Td, 'Virtual channel "' + this.a + '" received  a message after being disposed.') : a.apply({}, Array.prototype.slice.call(arguments, 1));
  };
  g.A = function() {
    this.b = this.b.a[this.a] = null;
  };
  var Oi = function(a) {
    J.call(this);
    this.b = new Li(a);
    this.h = {};
    this.f = Ni(this.b, 'private');
    this.g = Ni(this.b, 'public');
    this.f.Qa('mics', u(this.C, this), !0);
  };
  v(Oi, J);
  Oi.prototype.J = 0;
  Oi.prototype.G = C('goog.messaging.RespondingChannel');
  Oi.prototype.A = function() {
    Af(this.b);
    delete this.b;
    delete this.g;
    delete this.f;
  };
  var Pi = function(a, b, c, d) {
    var e = a.J++;
    a.h[e] = d;
    d = {};
    d.signature = e;
    d.data = c;
    a.g.Ra(b, d);
  };
  Oi.prototype.C = function(a) {
    var b = a.signature;
    a = a.data;
    b in this.h ? ((0, this.h[b])(a), delete this.h[b]) : D(this.G, 'Received signature is invalid');
  };
  Oi.prototype.o = function(a, b) {
    a = a(b.data);
    var c = b.signature;
    Pe(a).then(u(function(d) {
      var e = {};
      e.data = d;
      e.signature = c;
      this.f && this.f.Ra('mics', e);
    }, this));
  };
  var Qi = function(a, b) {
    this.a = this.j = this.v = null;
    this.B = !1;
    var c = {}, d = 1, e = window.parent;
    if (null != b)
    {
      switch (b)
      {
        case 3:
          e = window;
        case 2:
          d = 2;
          c.directSyncMode = !0;
          break;
        case 4:
          e = window.parent.frames['goog-messaging-iframe'];
      }
    }
    c.tp = d;
    c.role = 1;
    c.nativeProtocolVersion = 2;
    a && (c.cn = a);
    C('goog.net.xpc').b(Yd);
    this.l = new ui(c);
    this.l.ca = e;
    Oi.call(this, this.l);
    a = u(this.D, this);
    this.g.Qa('general', u(this.o, this, a), !0);
  };
  v(Qi, Oi);
  Qi.prototype.connect = function(a) {
    this.B || Ki() ? this.j ? (this.v = Qa(), this.l.connect(u(this.V, this, a))) : oe(F, 'You must call setAssetUrl before connecting.') : pe(F, 'This class should only listen to messages when served by the rendering libraries.');
  };
  Qi.prototype.V = function(a) {
    Q(this, 'conduitInitialized', [this.j, hh.N()]);
    var b = { version: 'latest' };
    b.x = window.STUDIO_SDK_START || null;
    b.c = this.v;
    b.t = Qa();
    Q(this, 'recordTimings', [b]);
    a && a();
  };
  Qi.prototype.D = function(a) {
    a:{
      var b = a.methodName;
      a = a.args;
      if (b in Hi)
      {
        if (this.a)
        {
          pe(F, ['Invoking method: ', b, ' with args: ', a.join(', ')].join(''));
          var c = this.a[b];
          'function' !== typeof c && (c = this.a.defaultMessageHandler, a = [b, a]);
          if ('function' === typeof c)
          {
            b = c.apply(this.a, a);
            break a;
          }
        }
        b = null;
      }
      else
      {
        b = void 0;
      }
    }
    return b;
  };
  var Q = function(a, b, c, d) {
    var e = {};
    e.methodName = b;
    e.args = c && Array.isArray(c) ? c : [];
    Pi(a, 'general', e, d || Da);
  };
  q('studio.sdk.ContainerState', {
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed',
    EXPANDING: 'expanding',
    EXPANDED: 'expanded',
    FS_COLLAPSING: 'fs_collapsing',
    FS_EXPANDING: 'fs_expanding',
    FS_EXPANDED: 'fs_expanded',
  }, void 0);
  var Ri = function() {
    L.call(this);
    this.a = new Map;
    this.g = this.j = !1;
    this.b = this.h = null;
    this.a.set('nx', null);
    this.a.set('ny', null);
    this.a.set('dim', null);
  };
  h(Ri, L);
  Ri.prototype.o = function(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return 2040 > b.reduce(function(d, e) {
      return d + e.length;
    }, 0);
  };
  Ri.prototype.v = function(a) {
    var b = a.clientX, c = a.clientY;
    a.changedTouches && a.changedTouches[0] && (b = a.changedTouches[0].clientX, c = a.changedTouches[0].clientY);
    this.a.set('nx', Math.round(b));
    this.a.set('ny', Math.round(c));
    this.g && (this.b || (this.b = window.GoogleA13IjpGc), this.h = this.b && Ja(this.b.snapshotSync) ? this.b.snapshotSync() : null);
  };
  Ri.prototype.A = function() {
    this.j = !1;
    L.prototype.A.call(this);
  };
  var Si = { NONE: 0, LOG_ONLY: 1 };
  q('studio.sdk.ExitFlag', Si, void 0);
  Si.NONE = 0;
  Si.LOG_ONLY = 1;
  var Ti = {
    GET_CURRENT_POSITION: 'getCurrentPosition',
    GET_DEFAULT_POSITION: 'getDefaultPosition',
    GET_SCREEN_SIZE: 'getScreenSize',
    CREATE_CALENDAR_EVENT: 'createCalendarEvent',
    GET_MAX_SIZE: 'getMaxSize',
    PLAY_VIDEO: 'playVideo',
    STORE_PICTURE: 'storePicture',
    SUPPORTS: 'supports',
    USE_CUSTOM_CLOSE: 'useCustomClose',
  };
  q('studio.sdk.MraidMethod', Ti, void 0);
  var Ui = function() {
  };
  q('studio.sdk.IEnabler', Ui, void 0);
  g = Ui.prototype;
  g.Sc = function() {
  };
  g.reportManualClose = function() {
  };
  g.Oc = function() {
  };
  g.Uc = function() {
  };
  g.Tc = function() {
  };
  g.isVisible = function() {
  };
  g.oa = function() {
  };
  g.isPageLoaded = function() {
  };
  g.isInitialized = function() {
  };
  g.Xb = function() {
  };
  g.getParameter = function() {
  };
  g.exit = function() {
  };
  g.xb = function() {
  };
  g.ic = function() {
  };
  g.counter = function() {
  };
  g.startTimer = function() {
  };
  g.stopTimer = function() {
  };
  g.kc = function() {
  };
  g.nc = function() {
  };
  g.kb = function() {
  };
  g.Bb = function() {
  };
  g.Ka = function() {
  };
  g.Ab = function() {
  };
  g.close = function() {
  };
  g.Oa = function() {
  };
  g.Ta = function() {
  };
  g.addEventListener = function() {
  };
  g.removeEventListener = function() {
  };
  g.Mc = function() {
  };
  g.Lc = function() {
  };
  g.Pc = function() {
  };
  g.hc = function() {
  };
  g.Gb = function() {
  };
  g.fc = function() {
  };
  g.pc = function() {
  };
  g.Bc = function() {
  };
  var Vi = function(a, b) {
    return 'The ' + (a + (' method has been deprecated. As an alternative please use: ' + (b + '.')));
  }, Wi = function(a, b) {
    return 'Video "' + (a + ('" dispatching "' + (b + '" event.')));
  }, Xi = function(a, b) {
    return 'Custom event "' + (a + ('" of type "' + (b + '" invoked.')));
  };
  var Yi = function(a) {
    this.a = a;
    this.b = '';
  }, aj = function(a, b, c) {
    for (var d = c.split('&'), e = 0; e < d.length; e++)
    {
      var f = d[e].split('=');
      if (1 < f.length && f[0].length && f[1].length)
      {
        var k = decodeURIComponent(f[0]);
        f = decodeURIComponent(f[1]);
        a.a.set(k, f);
      }
    }
    if (null != a.a && a.a.T('exitEvents'))
    {
      d = {};
      e = a.a.get('exitEvents').toString();
      k = e.split('{DELIM}');
      for (f = 0; f < k.length; f++)
      {
        var l = k[f];
        Kb(e, '%2C') && (l = unescape(l));
        var m = {};
        l = l.split(',');
        for (var p = 0; p < l.length; p++) if (Zi.test(l[p]))
        {
          l[p].replace($i, '%25$1!');
          var r = l[p].split(':'),
            G = r.shift();
          m[G] = unescape(r.join(':'));
        }
        d[m.name] = m;
      }
      b.exitEvents = d;
    }
    a.b = c;
  };
  Yi.prototype.get = function(a, b) {
    return this.a.get(a, b);
  };
  Yi.prototype.set = function(a, b) {
    return this.a.set(a, b);
  };
  Yi.prototype.T = function(a) {
    return this.a.T(a);
  };
  var Zi = /:/, $i = /%(.+)!/;
  var bj = function(a) {
    this.a = {};
    this.b = new Yi(a);
  }, cj = function(a, b, c, d) {
    var e = c;
    'Number' == d ? e = parseInt(c, 10) : 'Boolean' == d && (e = 'true' == c.toLowerCase() || '1' == c);
    a.a[b] = e;
  }, dj = function(a, b) {
    try
    {
      var c = JSON.parse(b);
      null != c && ac(a.a, c);
      var d = {};
      Qb(a.a, function(e, f) {
        e && !t(e) && (f = decodeURIComponent(f), e = decodeURIComponent(e));
        f && e && (d[f] = e);
      }, a);
      a.a = d;
    } catch (e)
    {
      aj(a.b, a.a, b);
    }
  };
  bj.prototype.getParameter = function(a, b) {
    return Vb(this.a, a) ? Xb(this.a, a) : this.b.get(a, b);
  };
  bj.prototype.S = function(a) {
    a = parseInt(this.getParameter(a), 10);
    return isNaN(a) ? null : a;
  };
  bj.prototype.ea = function(a) {
    a = this.getParameter(a);
    return Bb($c(a)) ? null : a.toString();
  };
  var ej = function() {
    this.b = !1;
    this.a = [];
  }, fj = function(a, b, c) {
    a.f ? Q(a.f, b, c) : a.a.push({ type: b, hd: c });
  }, gj = function(a, b, c, d, e, f) {
    fj(a, f ? 'logEventFlushCounters' : 'logEvent', [b, c, a.g, !!d, !!e]);
  }, ij = function(a) {
    a.b || (gj(a, 'Count', 'INTERACTIVE_IMPRESSION'), a.b = !0, hj(a));
  }, hj = function(a) {
    fj(a, 'flushCounters', [a.g]);
  }, jj = function(a, b, c, d) {
    fj(a, 'logVideoEvent', [b, escape(c), d]);
  };
  var kj = function(a) {
    L.call(this);
    this.v = a;
    this.a = this.g = null;
    this.C = !1;
    this.b = null;
    this.h = !1;
    this.j = -1;
    this.o = 0;
  };
  h(kj, L);
  kj.prototype.Cb = function() {
    return this.C;
  };
  kj.prototype.D = function() {
    this.o = 1;
    this.a && (this.a.stop(), this.a.start());
  };
  kj.prototype.G = function() {
    this.o = 0;
    this.a && this.a.stop();
  };
  kj.prototype.B = function() {
    '1' == this.v.getParameter('isMouseOver') || 1 == this.o ? this.h || (this.C = !0, 1 > this.j ? this.j = Qa() : 1E3 < Qa() - this.j && (this.h = !0, this.v.dispatchEvent(new P('interaction')), lj(this.v, 'setTimerAdjustment', ['INTERACTION_TIMER', -1E3, 0]), this.g && (gj(this.g, 'Start', 'INTERACTION_TIMER'), ij(this.g)))) : (this.h && mj(this), this.j = -1);
  };
  var mj = function(a) {
    a.h = !1;
    a.g && gj(a.g, 'Stop', 'INTERACTION_TIMER');
  };
  kj.prototype.A = function() {
    this.h && mj(this);
    Cf(this.b, this.a);
    L.prototype.A.call(this);
  };
  var nj = function() {
    return new bi((window.STUDIO_ORIGINAL_ASSET_URL ? window.STUDIO_ORIGINAL_ASSET_URL : window.location.href).replace(/%(?![A-Fa-f0-9][A-Fa-f0-9])/g, '%25'));
  }, oj = function(a) {
    a && Wa(parseInt(a, 10) || 0);
  };
  var pj = function(a) {
    this.a = a;
  };
  pj.prototype.f = function(a) {
    return (null === this.a || this.a.canPlayType) && Ab(a, 'video/');
  };
  pj.prototype.b = function(a) {
    return this.a ? 'probably' == this.a.canPlayType(a.toLowerCase()) : !1;
  };
  var qj = function(a) {
    this.a = a;
  };
  qj.prototype.f = function(a) {
    return 'image/webp' == a.toLowerCase();
  };
  qj.prototype.b = function(a) {
    if (!this.a)
    {
      return !1;
    }
    a = a.toLowerCase();
    return Ab(this.a.toDataURL(a), 'data:' + a);
  };
  var rj = function(a) {
    Yg(this, a);
  };
  v(rj, Wg);
  var sj = function() {
    this.a = Qa();
  }, tj = null;
  sj.prototype.set = function(a) {
    this.a = a;
  };
  sj.prototype.reset = function() {
    this.set(Qa());
  };
  sj.prototype.get = function() {
    return this.a;
  };
  var uj = function(a) {
    this.g = a || '';
    tj || (tj = new sj);
    this.s = tj;
  };
  uj.prototype.a = !0;
  uj.prototype.b = !0;
  uj.prototype.f = !1;
  var vj = function(a) {
    return 10 > a ? '0' + a : String(a);
  }, wj = function(a, b) {
    a = (a.f - b) / 1E3;
    b = a.toFixed(3);
    var c = 0;
    if (1 > a)
    {
      c = 2;
    }
    else
    {
      for (; 100 > a;) c++, a *= 10;
    }
    for (; 0 < c--;) b = ' ' + b;
    return b;
  }, xj = function(a) {
    uj.call(this, a);
  };
  v(xj, uj);
  var yj = function(a, b) {
    var c = [];
    c.push(a.g, ' ');
    if (a.b)
    {
      var d = new Date(b.f);
      c.push('[', vj(d.getFullYear() - 2E3) + vj(d.getMonth() + 1) + vj(d.getDate()) + ' ' + vj(d.getHours()) + ':' + vj(d.getMinutes()) + ':' + vj(d.getSeconds()) + '.' + vj(Math.floor(d.getMilliseconds() / 10)), '] ');
    }
    c.push('[', wj(b, a.s.get()), 's] ');
    c.push('[', b.b, '] ');
    c.push(b.s);
    a.f && (b = b.a) && c.push('\n', b instanceof Error ? b.message : b.toString());
    a.a && c.push('\n');
    return c.join('');
  };
  var zj = function() {
    this.s = u(this.f, this);
    this.a = new xj;
    this.a.b = !1;
    this.a.f = !1;
    this.b = this.a.a = !1;
    this.g = {};
  }, Bj = function() {
    var a = Aj;
    if (1 != a.b)
    {
      var b = ne(), c = a.s;
      b.a || (b.a = []);
      b.a.push(c);
      a.b = !0;
    }
  };
  zj.prototype.f = function(a) {
    function b (f)
    {
      if (f)
      {
        if (f.value >= $d.value)
        {
          return 'error';
        }
        if (f.value >= ae.value)
        {
          return 'warn';
        }
        if (f.value >= ce.value)
        {
          return 'log';
        }
      }
      return 'debug';
    }

    if (!this.g[a.b])
    {
      var c = yj(this.a, a), d = Cj;
      if (d)
      {
        var e = b(a.g);
        Dj(d, e, c, a.a);
      }
    }
  };
  var Aj = null, Cj = n.console, Ej = function() {
    Aj || (Aj = new zj);
    n.location && -1 != n.location.href.indexOf('Debug=true') && Bj();
  }, Dj = function(a, b, c, d) {
    if (a[b])
    {
      a[b](c, d || '');
    }
    else
    {
      a.log(c, d || '');
    }
  };
  var Gj = function(a, b, c) {
    if ('string' === typeof b)
    {
      (b = Fj(a, b)) && (a.style[b] = c);
    }
    else
    {
      for (var d in b)
      {
        c = a;
        var e = b[d], f = Fj(c, d);
        f && (c.style[f] = e);
      }
    }
  }, Hj = {}, Fj = function(a, b) {
    var c = Hj[b];
    if (!c)
    {
      var d = cd(b);
      c = d;
      void 0 === a.style[d] && (d = (od ? 'Webkit' : nd ? 'Moz' : kd ? 'ms' : jd ? 'O' : null) + dd(d), void 0 !== a.style[d] && (c = d));
      Hj[b] = c;
    }
    return c;
  }, Ij = function(a) {
    'number' == typeof a && (a = Math.round(a) + 'px');
    return a;
  }, Jj = function(a) {
    var b = a.offsetWidth, c = a.offsetHeight, d = od && !b && !c;
    if ((void 0 === b || d) && a.getBoundingClientRect)
    {
      try
      {
        var e =
          a.getBoundingClientRect();
      } catch (f)
      {
        e = { left: 0, top: 0, right: 0, bottom: 0 };
      }
      return new Ad(e.right - e.left, e.bottom - e.top);
    }
    return new Ad(b, c);
  }, Lj = function(a) {
    var b = Dd(void 0), c = b.a;
    if (kd && c.createStyleSheet)
    {
      return b = c.createStyleSheet(), Kj(b, a), b;
    }
    c = Qd(b, 'HEAD')[0];
    if (!c)
    {
      var d = Qd(b, 'BODY')[0];
      c = b.b('HEAD');
      d.parentNode.insertBefore(c, d);
    }
    d = b.b('STYLE');
    Kj(d, a);
    b.f(c, d);
    return d;
  }, Mj = function(a) {
    Od(a.ownerNode || a.owningElement || a);
  }, Kj = function(a, b) {
    b instanceof Pc && b.constructor === Pc && b.b === Oc ? b = b.a : (bb('expected object of type SafeStyleSheet, got \'' +
      b + '\' of type ' + Ga(b)), b = 'type_error:SafeStyleSheet');
    if (kd && void 0 !== a.cssText)
    {
      a.cssText = b;
    }
    else if (n.trustedTypes)
    {
      if (y(null != a, 'goog.dom.setTextContent expects a non-null value for node'), 'textContent' in a)
      {
        a.textContent = b;
      }
      else if (3 == a.nodeType)
      {
        a.data = String(b);
      }
      else if (a.firstChild && 3 == a.firstChild.nodeType)
      {
        for (; a.lastChild != a.firstChild;) a.removeChild(y(a.lastChild));
        a.firstChild.data = String(b);
      }
      else
      {
        Nd(a);
        var c = Cd(a);
        a.appendChild(c.createTextNode(String(b)));
      }
    }
    else
    {
      a.innerHTML = b;
    }
  }, Nj = function(a) {
    a =
      a.style;
    a.position = 'relative';
    kd && !vd('8') ? (a.zoom = '1', a.display = 'inline') : a.display = 'inline-block';
  };
  var R = function(a) {
    window.AdobeEdge = window.AdobeEdge || {};
    window.AdobeEdge.bootstrapLoading = !0;
    n.console && (Ej(), Bj());
    E(F, '');
    if (a != Oj)
    {
      return oe(F, 'You must access the enabler instance using studio.Enabler.getInstance(); or Enabler and not create a duplicate instance.'), !1;
    }
    K.call(this);
    this.v = {};
    this.j = {};
    this.G = new jh(kh(), lh() ? window.orientation : 0);
    this.V = new L(this);
    this.Za = !1;
    this.B = null;
    this.f = 'collapsed';
    this.qb = !1;
    this.sa = null;
    this.Fe = 0;
    this.Xa = {};
    this.W = null;
    this.pb = !1;
    this.D = new H;
    this.h = null;
    this.ob = [];
    this.Wa = {};
    this.sb = [];
    this.b = new ej;
    this.J = new kj(this);
    a = B('CANVAS');
    a.getContext && a.getContext('2d') || (a = null);
    this.sf = new qj(a);
    (a = B('VIDEO')) || (a = null);
    this.Cc = new pj(a);
    this.a = new bj(Pj(this));
    a = this.ka = new Ri;
    a.j = !0;
    M(a, document.body || window, 'mousedown', a.v, { capture: !0, passive: !0 });
    M(a, document.body || window, 'touchstart', a.v, { capture: !0, passive: !0 });
    this.Qb = {};
  };
  v(R, K);
  q('studio.Enabler', R, void 0);
  var Qj = ['c'], Oj = Math.random(), Rj = !1, Sj = null, S = function() {
    Sj || (Sj = new R(Oj));
    return Sj;
  };
  R.getInstance = S;
  g = R.prototype;
  g.Kc = -1;
  g.ub = null;
  g.Xc = null;
  g.Nb = null;
  g.Wc = !0;
  g.Jb = !1;
  g.Da = !1;
  g.Hc = !1;
  g.Yc = !1;
  g.wa = null;
  g.Kb = null;
  g.la = null;
  g.F = null;
  var Tj = function(a) {
    a.Nb || (a.Nb = nj());
    return a.Nb;
  }, Pj = function(a) {
    var b = Tj(a).f;
    (a = oh(Tj(a).toString())) && qh(a, function(c, d) {
      -1 < Qj.indexOf(c) && b.set(c, d);
    });
    return b;
  }, lj = function(a, b, c) {
    Q(a.F, b, c, void 0);
  }, Xj = function(a) {
    a.Jb = !0;
    a.Kb = a.mc();
    a.la = a.lc();
    if (a.F)
    {
      var b = a.b, c = a.Kb;
      b.f = a.F;
      b.g = c;
      for (c = tb(b.a); c.length;)
      {
        var d = c.shift();
        fj(b, d.type, d.hd);
      }
    }
    null == a.a.getParameter('clickN') && cj(a.a, 'clickN', 1);
    a.Wc = 'true' != a.a.getParameter('ise');
    b = a.a.getParameter('e', null);
    null != b && oj(b);
    b = a.S('leftOffset') ||
      0;
    c = a.S('topOffset') || 0;
    0 == b && 0 == c || Uj(a, b, c);
    a.j = a.a.getParameter('exitEvents', {});
    b = a.a;
    if (Vb(b.a, 'assets') || b.b.T('assets'))
    {
      b = a.a.getParameter('assets').toString(), Vj(a, b);
    }
    ih(a.a.getParameter('features', []));
    a.J.g = a.b;
    b = a.J;
    w(2) && (M(b, document.body || window, 'mouseover', b.D, void 0), M(b, document.body || window, 'mouseout', b.G, void 0));
    void 0 !== window.ontouchstart && (b.a = new og(1E3), M(b, b.a, 'tick', b.G, void 0), M(b, document, ['touchstart', 'touchmove'], b.D, void 0));
    b.b && (Fg(b, b.b, 'tick', b.B), b.b.dispose());
    b.b = new og(80);
    M(b, b.b, 'tick', b.B, void 0);
    b.b.start();
    Wj(a);
    if (b = a.getParameter('layoutsConfig'))
    {
      a.Xc = JSON.parse(String(b));
    }
    if (b = a.getParameter('experiments'))
    {
      a.Qb = JSON.parse(String(b));
    }
    if (b = a.getParameter('rum_config'))
    {
      try
      {
        var e = JSON.parse(String(b));
        b = window;
        if (!b.google_rum_config && e)
        {
          var f = new rj(e), k, l = $g(f, 2);
          if (k = null == l ? '' : l)
          {
            var m = ah(f, ch);
            if (m)
            {
              var p = ah(m, bh);
              if (p)
              {
                b.google_timing_url = k;
                ib(p, Wg);
                ib(p, Wg);
                if (2 < p.s)
                {
                  p.a[2 + p.g] = 3;
                }
                else
                {
                  var r = p.s + p.g;
                  p.a[r] || (p.b = p.a[r] = {});
                  p.b[2] = 3;
                }
                b.google_rum_config =
                  m.a;
                var G = $g(f, 3);
                var N = null == G ? G : !!G;
                b.google_measure_js_timing = null == N ? !1 : N;
                var Y = b.document, hb = Y.createElement('script');
                Vc(hb, se(k));
                var Ha = Y.getElementsByTagName('script')[0];
                if (Ha && Ha.parentNode)
                {
                  Ha.parentNode.insertBefore(hb, Ha);
                  var km = hb;
                }
                else
                {
                  km = null;
                }
                km || (b.google_timing_url = void 0, b.google_rum_config = void 0, b.google_measure_js_timing = void 0);
              }
            }
          }
        }
      } catch (Aq)
      {
      }
    }
    a.dispatchEvent(new P('init'));
    a.D.a || a.D.I();
    e = a.ka;
    e.g = !!a.Qb.add_sodar_interaction_signals;
    if (e.g)
    {
      try
      {
        Mg();
      } catch (Aq)
      {
      }
    }
  };
  R.prototype.Ve = function(a) {
    'number' === typeof a ? (this.Kc = a, E(F, 'enabler.setProfileId set to: ' + a)) : E(F, 'enabler.setProfileId invalid profile id value: ' + a);
  };
  R.prototype.setProfileId = R.prototype.Ve;
  R.prototype.Md = function() {
    return this.Kc;
  };
  R.prototype.getProfileId = R.prototype.Md;
  R.prototype.Se = function(a) {
    t(a) ? (this.ub = a, this.isInitialized() && Wj(this)) : E(F, 'enabler.setDevDynamicContent invalid dcData value: ' + a);
  };
  R.prototype.setDevDynamicContent = R.prototype.Se;
  var Wj = function(a) {
    if (null != a.ea('dcData') || a.ub)
    {
      window.dynamicContent = null != a.ea('dcData') ? a.eb() : a.ub;
    }
  };
  R.prototype.eb = function() {
    var a = this.getParameter('dcData');
    return a ? JSON.parse(String(a)) : null;
  };
  R.prototype.getDynamicDataPayload = R.prototype.eb;
  R.prototype.pa = function() {
    return this.Xc;
  };
  R.prototype.getLayoutsConfig = R.prototype.pa;
  R.prototype.Ie = function() {
    return this.a.b.b || Wh(this.a);
  };
  R.prototype.getAdParameters = R.prototype.Ie;
  R.prototype.nf = function(a) {
    dj(this.a, a);
    this.wa && gg(this.wa);
    Xj(this);
    E(F, 'Asset properties have been set by host.');
  };
  R.prototype.setAdParameters = R.prototype.nf;
  R.prototype.ze = function() {
    this.wa && gg(this.wa);
    E(F, 'Using default ad parameters in test environment. Simulating local events.');
    Xj(this);
  };
  R.setRushSimulatedLocalEvents = function(a) {
    Rj = !!a;
    if (a && Sj)
    {
      a = Sj;
      for (var b = 0; b < a.ob.length; ++b) a.dispatchEvent(a.ob[b]);
    }
  };
  var Yj = function(a, b, c) {
    var d = T;
    c = null != c ? c : 0;
    d.ob.push(b);
    pg(function() {
      this.dispatchEvent(b);
    }, c, d);
    return Yf(d, b, a, !1, d);
  };
  R.prototype.dc = function() {
    var a = kh(), b = this.G.a;
    if (this.G.b != a || lh() && this.G.a != window.orientation)
    {
      lh() && (b = window.orientation);
      var c = new P('orientation');
      c.da('mode', a);
      c.da('degrees', b);
      this.dispatchEvent(c);
    }
  };
  R.prototype.l = function(a, b, c) {
    if (!this.oa())
    {
      var d = u.apply(this, [a, this].concat(Array.prototype.slice.call(arguments, 2)));
      pg(d, b);
    }
  };
  var Vj = function(a, b) {
    0 < b.length && -1 == b.indexOf('=') && (b = decodeURIComponent(b));
    b = b.split('&');
    if (!(2 >= b.length && '' == b[0]))
    {
      for (var c = 0; c < b.length; c++)
      {
        var d = b[c].split('=');
        a.v[d[0].toLowerCase()] = unescape(d[1]);
      }
    }
  };
  R.prototype.o = function() {
    hj(this.b);
  };
  R.prototype.reportActivitiesImmediately = R.prototype.o;
  var Zj = function(a) {
    a.b && ij(a.b);
  }, ak = function(a, b) {
    var c = a.a.getParameter('click', ''), d = parseInt(a.a.getParameter('clickN'), 10);
    a = a.a.getParameter('thirdPartyClickRedirect', '');
    a:{
      var e = c;
      c = b;
      if (!Bb($c(e)))
      {
        e = vh(e, null);
        if (!Ab(b, e))
        {
          break a;
        }
        c = Zc(c, e.length);
      }
      a && (c = decodeURIComponent(c), Ab(c, a) && (c = Zc(c, a.length)));
      if (!Bb($c(e)) && -1 < e.indexOf('?'))
      {
        for (b = 'number' === typeof d ? d : 1, d = 0; d < b; d++) c = unescape(c);
      }
      b = c;
    }
    return b;
  }, bk = function(a, b, c, d) {
    var e = {};
    e.target = c;
    Tg && (e.fullscreen = !0);
    (c = e) || (c = {});
    e = window;
    var f = b instanceof wc ? b : zc('undefined' != typeof b.href ? b.href : String(b)) || Bc;
    b = c.target || b.target;
    var k = [];
    for (l in c) switch (l)
    {
      case 'width':
      case 'height':
      case 'top':
      case 'left':
        k.push(l + '=' + c[l]);
        break;
      case 'target':
      case 'noopener':
      case 'noreferrer':
        break;
      default:
        k.push(l + '=' + (c[l] ? 1 : 0));
    }
    var l = k.join(',');
    if (fd() && e.navigator && e.navigator.standalone && b && '_self' != b)
    {
      l = Jd(document, 'A'), dc(l, 'HTMLAnchorElement'), f = f instanceof wc ? f : Ac(f), l.href = xc(f), l.setAttribute('target', b), c.noreferrer && l.setAttribute('rel',
        'noreferrer'), c = document.createEvent('MouseEvent'), c.initMouseEvent('click', !0, !0, e, 1), l.dispatchEvent(c);
    }
    else if (c.noreferrer)
    {
      if (e = Wc('', e, b, l), c = xc(f), e && (md && Kb(c, ';') && (c = '\'' + c.replace(/'/g, '%27') + '\''), e.opener = null, f = new jc(hc, 'b/12014412, meta tag with sanitized URL'), c = '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + Yc(c) + '">', db(kc(f), 'must provide justification'), y(!Bb(kc(f)), 'must provide non-empty justification'), f = new Tc, b = gc(), f.a = b ? b.createHTML(c) :
        c, c = e.document))
      {
        c.write(Uc(f)), c.close();
      }
    }
    else
    {
      (e = Wc(f, e, b, l)) && c.noopener && (e.opener = null);
    }
    d && a.o();
  }, ck = function(a, b, c, d, e) {
    Q(a.F, e ? 'logExitFlushEventsOpenPopup' : 'launchExit', ['Count', b, a.Kb, !1, c, null, d]);
  }, ek = function(a, b, c, d, e) {
    if (Bb($c(b)))
    {
      E(F, 'There was a problem with the exit call.');
    }
    else if (a.isInitialized())
    {
      var f = void 0 !== d ? d : 0;
      d = a.j[b] && a.j[b].target || '_blank';
      var k;
      if (k = !w(8))
      {
        k = !(Kb(a.a.getParameter('click', ''), '[rm_exit_id]') && null != a.j[b] && null != a.j[b].reportingId && !Bb(a.j[b].reportingId));
      }
      f = !(f & 1);
      var l = a.a.getParameter('click', ''), m = a.ka;
      if (m.j)
      {
        var p = l;
        var r = Gd();
        m.a.set('dim', r.width + 'x' + r.height);
        r = '';
        for (var G = ha(m.a), N = G.next(); !N.done; N = G.next())
        {
          var Y = ha(N.value);
          N = Y.next().value;
          Y = Y.next().value;
          r = null == Y ? r + '&' + N + '=' : r + '&' + N + '=' + Y;
        }
        m.g && (G = 'bg=', 'string' === typeof m.h && m.o(p, r, G, m.h) && (G = '' + G + m.h), r = r + '&' + G);
        p = r;
        r = l.toLowerCase().indexOf('&adurl=');
        -1 < r && m.o(l, p) && (l = l.substr(0, r) + p + l.substr(r));
      }
      if (e && e.pIndex)
      {
        m = l;
        if (e = e.pIndex)
        {
          l = m.toLowerCase().indexOf('&adurl='), -1 < l && (m =
            m.substr(0, l) + '&gpa_pos=' + e + m.substr(l));
        }
        l = m;
      }
      f && (a.j[b] ? w(8) ? ck(a, b, c, l, !0) : (e = wh(c), e = dk(a, e, l, b), bk(a, e, d, !k)) : c && (a.oa() && w(8) ? ck(a, b, c, l, !1) : (e = wh(c), e = dk(a, e, l, null), bk(a, e, d, !0), k = !1)));
      k && gj(a.b, 'Count', b, !0, !0, !0);
      Q(a.F, 'AD_CLICKED');
      d = new P('exit');
      d.da('id', b);
      d.da('url', c);
      a.dispatchEvent(d);
      E(F, 'Exit "' + (b + '" invoked.'));
    }
  }, fk = function(a, b, c, d, e) {
    a = a.j[b];
    c = !d && a && a.url ? a.url : c;
    var f;
    null == e || Bb($c(e)) ? f = c : f = rh(c, e + '');
    return f;
  }, dk = function(a, b, c, d) {
    var e = null;
    d && (e = a.j[d], e = null != e.reportingId ?
      e.reportingId : null);
    b = b || '';
    d = a.a.getParameter('thirdPartyClickRedirect', '');
    a = parseInt(a.a.getParameter('clickN'), 10);
    if (!Bb($c(c)) && -1 < c.indexOf('?'))
    {
      a = 'number' === typeof a ? a : 1;
      for (var f = 0; f < a; f++) b = encodeURIComponent(b);
    }
    e && (c = vh(c, e), b = d ? encodeURIComponent(d + b) : b);
    return c + b;
  };
  R.prototype.reportManualClose = function() {
    E(F, 'Ad was closed by user action.');
    gj(this.b, 'Count', 'EVENT_MANUAL_CLOSE', void 0, void 0, void 0);
  };
  R.prototype.reportManualClose = R.prototype.reportManualClose;
  R.prototype.Oc = function() {
    gj(this.b, 'Count', 'ENGAGEMENT', !1, !1, !1);
    this.o();
  };
  R.prototype.reportEngagement = R.prototype.Oc;
  var gk = function(a, b, c) {
    var d = b;
    100 < d.length && (d = d.substr(0, 100));
    Q(a.F, 'reportCustomVariable', [escape(d), c]);
    E(F, 'Custom string "' + (b + '" recorded.'));
  }, Uj = function(a, b, c) {
    a.oa() && !w(8) && (a.W && Mj(a.W), a.W = Lj(Rc('body', {
      position: 'relative',
      'margin-left': -b + 'px !important',
      'margin-top': -c + 'px !important',
    })));
  };
  R.prototype.rf = function(a, b, c) {
    cj(this.a, a, b, c);
  };
  R.prototype.setParameter = R.prototype.rf;
  R.prototype.Pb = function() {
    this.dispatchEvent(new P('pageLoaded'));
  };
  R.prototype.dispatchPageLoaded = R.prototype.Pb;
  R.prototype.dispatchEvent = function(a) {
    this.Wa[a.type] = (this.Wa[a.type] || 0) + 1;
    switch (a.type)
    {
      case 'pageLoaded':
        null != window.AdobeEdge && 'function' === typeof window.AdobeEdge.loadResources && window.AdobeEdge.loadResources();
        this.Hc = !0;
        break;
      case 'orientation':
        this.G.b = a.mode, this.G.a = a.degrees;
    }
    return R.H.dispatchEvent.call(this, a);
  };
  R.prototype.dispatchEvent = R.prototype.dispatchEvent;
  R.prototype.rb = function(a) {
    (this.Yc = a) && !this.Wa.visible ? (null != window.AdobeEdge && 'function' === typeof window.AdobeEdge.playWhenReady && window.AdobeEdge.playWhenReady(), this.Wc && gj(this.b, 'Start', 'DISPLAY_TIMER', void 0, void 0, void 0), this.dispatchEvent(new P('visible'))) : this.Wa.hidden || this.dispatchEvent(new P('hidden'));
    this.dispatchEvent(new P('visibilityChange'));
  };
  R.prototype.setAdVisibleInternal = R.prototype.rb;
  R.prototype.He = function() {
    this.rb(!0);
  };
  R.prototype.dispatchAdVisible = R.prototype.He;
  R.prototype.Sc = function(a, b, c, d, e, f) {
    if (c || d)
    {
      this.B || (this.B = {}), this.B.width = c, this.B.height = d;
    }
    null != e && (this.Za = !!e);
    null != f && cj(this.a, 'isMultiDirectional', f ? 'true' : 'false');
  };
  R.prototype.setExpandingPixelOffsets = R.prototype.Sc;
  R.prototype.Uc = function(a) {
    this.Za = !!a;
  };
  R.prototype.setStartExpanded = R.prototype.Uc;
  R.prototype.Tc = function(a) {
    cj(this.a, 'isMultiDirectional', a ? 'true' : 'false');
  };
  R.prototype.setIsMultiDirectional = R.prototype.Tc;
  R.prototype.Ye = function(a) {
    Q(this.F, 'invokeMraidMethod', ['useCustomClose', [a]]);
    this.pb = 0 == a;
  };
  R.prototype.setUseCustomClose = R.prototype.Ye;
  R.prototype.Te = function() {
  };
  R.prototype.setFloatingPixelDimensions = R.prototype.Te;
  R.prototype.isVisible = function() {
    return this.Yc;
  };
  R.prototype.isVisible = R.prototype.isVisible;
  R.prototype.oa = function() {
    return w(1);
  };
  R.prototype.isServingInLiveEnvironment = R.prototype.oa;
  R.prototype.isPageLoaded = function() {
    return this.Hc;
  };
  R.prototype.isPageLoaded = R.prototype.isPageLoaded;
  R.prototype.isInitialized = function() {
    return this.Jb;
  };
  R.prototype.isInitialized = R.prototype.isInitialized;
  R.prototype.Xb = function(a) {
    'function' === typeof a && mf(this.D, a);
  };
  R.prototype.callAfterInitialized = R.prototype.Xb;
  R.prototype.getParameter = function(a) {
    return this.a.getParameter(a, null);
  };
  R.prototype.getParameter = R.prototype.getParameter;
  R.prototype.getParameter = R.prototype.getParameter;
  R.prototype.S = function(a) {
    return this.a.S(a);
  };
  R.prototype.getParameterAsInteger = R.prototype.S;
  R.prototype.oc = function(a) {
    a = this.a.ea(a);
    return void 0 != a && ('true' == a.toLowerCase() || '1' == a);
  };
  R.prototype.getParameterAsBoolean = R.prototype.oc;
  R.prototype.ea = function(a) {
    return this.a.ea(a);
  };
  R.prototype.getParameterAsNullableString = R.prototype.ea;
  R.prototype.exit = function(a, b, c) {
    void 0 !== b && (b = ak(this, b));
    Zj(this);
    ek(this, a, fk(this, a, b, !1), c);
  };
  R.prototype.exit = R.prototype.exit;
  R.prototype.xb = function(a, b, c) {
    b = ak(this, b);
    Zj(this);
    ek(this, a, fk(this, a, b, !0), c);
  };
  R.prototype.exitOverride = R.prototype.xb;
  R.prototype.vd = function(a, b, c, d, e) {
    e && !e.pIndex ? e.pIndex = c : e || (e = { pIndex: c });
    b = ak(this, b);
    Zj(this);
    ek(this, a, fk(this, a, b, !0), d, e);
  };
  R.prototype.dynamicExit = R.prototype.vd;
  R.prototype.yb = function(a, b) {
    ek(this, a, fk(this, a, void 0, void 0, b || ''));
  };
  R.prototype.exitQueryString = R.prototype.yb;
  R.prototype.ic = function(a) {
    return dk(this, a, this.a.getParameter('click', ''), null);
  };
  R.prototype.formExitUrlFromOverride = R.prototype.ic;
  R.prototype.counter = function(a, b) {
    E(F, 'Counter "' + (a + '" invoked.'));
    gj(this.b, 'Count', a, b, !0, void 0);
    pe(F, Xi(a, 'Count'));
  };
  R.prototype.counter = R.prototype.counter;
  R.prototype.startTimer = function(a) {
    E(F, 'Timer "' + (a + '" started.'));
    gj(this.b, 'Start', a, void 0, !0, void 0);
    pe(F, Xi(a, 'Start'));
  };
  R.prototype.startTimer = R.prototype.startTimer;
  R.prototype.stopTimer = function(a) {
    E(F, 'Timer "' + (a + '" stopped.'));
    gj(this.b, 'Stop', a, void 0, !0, void 0);
    pe(F, Xi(a, 'Stop'));
  };
  R.prototype.stopTimer = R.prototype.stopTimer;
  R.prototype.Ne = function(a) {
    D(F, Vi('Enabler.reportCustomImpressionVariable(postString)', 'Enabler.reportCustomVariableCount1(customString)'));
    gk(this, a, 1);
  };
  R.prototype.reportCustomImpressionVariable = R.prototype.Ne;
  R.prototype.Oe = function(a) {
    gk(this, a, 1);
  };
  R.prototype.reportCustomVariableCount1 = R.prototype.Oe;
  R.prototype.Me = function(a) {
    D(F, Vi('Enabler.reportCustomClickVariable(postString)', 'Enabler.reportCustomVariableCount1(customString)'));
    gk(this, a, 2);
  };
  R.prototype.reportCustomClickVariable = R.prototype.Me;
  R.prototype.Pe = function(a) {
    gk(this, a, 2);
  };
  R.prototype.reportCustomVariableCount2 = R.prototype.Pe;
  R.prototype.kc = function() {
    return this.f;
  };
  R.prototype.getContainerState = R.prototype.kc;
  R.prototype.nc = function() {
    return this.sa;
  };
  R.prototype.getExpandDirection = R.prototype.nc;
  R.prototype.We = function(a) {
    this.qb || lj(this, 'setResponsiveBehavior', [a ? 2 : 0, 2]);
  };
  R.prototype.setResponsiveExpanding = R.prototype.We;
  R.prototype.Xe = function(a, b) {
    lj(this, 'responsiveResize', [a, b]);
  };
  R.prototype.setResponsiveSize = R.prototype.Xe;
  R.prototype.kb = function() {
    if ('collapsed' != this.f)
    {
      D(F, 'Enabler.requestExpand() should not be invoked unless the creative is in the collapsed state.');
    }
    else
    {
      ig(this, 'expandStart') || D(F, 'Please implement the expansion via event handlers:\nEnabler.addEventListener(\n    studio.events.StudioEvent.EXPAND_START,\n    function() {/* expand action */});');
      this.qb = !0;
      var a = [this.la];
      this.B && a.push(this.B);
      Q(this.F, 'expandRequested', a);
      hk(this, this.Ka);
      this.l(this.vc, 0);
    }
  };
  R.prototype.requestExpand = R.prototype.kb;
  var hk = function(a, b) {
    if (!a.oa() && a.pb)
    {
      var c = document.getElementsByTagName('body')[0], d = B('IMG', {
        width: '15',
        height: '15',
        border: '0',
        src: 'http://s0.2mdn.net/ads/studio/close.png',
      });
      a.h = {
        I: b,
        element: B('DIV', { style: 'position: absolute;right: 5px;top: 5px;width: 15px;height: 15px;cursor: pointer;' }, d),
      };
      M(a.V, a.h.element, 'click', b, void 0);
      Md(c, a.h.element);
    }
  }, ik = function(a) {
    a.h && (Od(a.h.element), Fg(a.V, a.h.element, 'click', a.h.I), a.h.element = null, a.h.I = null, a.h = null);
  };
  R.prototype.qe = function() {
    this.dispatchEvent(new P('aboutToExpand'));
  };
  R.prototype.aboutToExpandInternal = R.prototype.qe;
  R.prototype.vc = function(a) {
    a && (a = Ei[a.toString().toUpperCase()]);
    var b = 0, c = 0;
    'true' == this.getParameter('isMultiDirectional') && a && (a.a & 2 && (c = this.S('topOffset')), a.a & 1 && (b = this.S('leftOffset')));
    Uj(this, null === b ? 0 : b, null === c ? 0 : c);
    a ? this.sa = a : this.sa = this.oa() || 'true' != this.getParameter('isMultiDirectional') ? null : Fi[this.Fe++ % Fi.length];
    this.Za || (gj(this.b, 'Start', 'EXPAND_TIMER', void 0, void 0, void 0), Zj(this), this.Da || (this.o(), this.Da = !0));
    this.Za = !1;
    this.f = 'expanding';
    a = new P('expandStart');
    a.da('direction',
      this.sa);
    this.dispatchEvent(a);
  };
  R.prototype.startExpandInternal = R.prototype.vc;
  R.prototype.Bb = function() {
    'expanding' != this.f ? D(F, 'You must first call Enabler.requestExpand() to initiate the expansion and then call Enabler.finishExpand() when the expand animation has  finished. Cancelling expansion...') : (Q(this.F, 'expandFinished', [this.la]), this.f = 'expanded', E(F, 'The creative has expanded.'), this.dispatchEvent(new P('expandFinish')));
  };
  R.prototype.finishExpand = R.prototype.Bb;
  R.prototype.expand = function(a, b) {
    D(F, 'The Enabler.expand() method has been deprecated. As an alternative please use: Enabler.requestExpand().');
    Uj(this, 0, 0);
    var c = [this.la];
    b && c.push(b);
    this.pb = !!b && 0 == b.useCustomClose;
    Q(this.F, 'expandAsset', c);
    a || (gj(this.b, 'Start', 'EXPAND_TIMER', void 0, void 0, void 0), Zj(this));
    this.Da || (this.o(), this.Da = !0);
    E(F, 'The creative has expanded.');
  };
  R.prototype.expand = R.prototype.expand;
  R.prototype.Ka = function() {
    'expanded' != this.f && D(F, 'Enabler.requestCollapse() should not be invoked unless the creative is in the expanded state.');
    ik(this);
    ig(this, 'collapseStart') || D(F, 'Please implement collapse via event handlers:\nEnabler.addEventListener(\n    studio.events.StudioEvent.COLLAPSE_START,\n    function() {/* Begin collapse animation */});');
    Q(this.F, 'collapseRequested', [this.la]);
    this.l(this.jc, 0);
  };
  R.prototype.requestCollapse = R.prototype.Ka;
  R.prototype.jc = function() {
    this.f = 'collapsing';
    this.dispatchEvent(new P('collapseStart'));
  };
  R.prototype.startCollapseInternal = R.prototype.jc;
  R.prototype.Ab = function() {
    'collapsing' != this.f ? D(F, 'You must first call Enabler.requestCollapse() to initiate the collapse and then call Enabler.finishCollapse() when the collapse animation has  finished. Cancelling collapse...') : (Q(this.F, 'collapseFinished', [this.la]), this.l(this.Rb, 0));
  };
  R.prototype.finishCollapse = R.prototype.Ab;
  R.prototype.Rb = function() {
    var a = this.S('leftOffset') || 0, b = this.S('topOffset') || 0;
    Uj(this, a, b);
    gj(this.b, 'Stop', 'EXPAND_TIMER', void 0, void 0, void 0);
    this.f = 'collapsed';
    E(F, 'The creative has collapsed.');
    this.dispatchEvent(new P('collapseFinish'));
  };
  R.prototype.finishCollapseInternal = R.prototype.Rb;
  R.prototype.collapse = function() {
    D(F, 'The Enabler.collapse() method has been deprecated. As an alternative please use: Enabler.requestCollapse().');
    ig(this, 'collapse') || D(F, 'Please implement collapse via event handlers:\nEnabler.addEventListener(\n    studio.events.StudioEvent.COLLAPSE_START,\n    function() {/* Begin collapse animation */});');
    var a = this.S('leftOffset') || 0, b = this.S('topOffset') || 0;
    Uj(this, a, b);
    Q(this.F, 'collapseAsset', [this.la]);
    this.dispatchEvent(new P('collapse'));
    gj(this.b, 'Stop',
      'EXPAND_TIMER', void 0, void 0, void 0);
  };
  R.prototype.collapse = R.prototype.collapse;
  R.prototype.close = function() {
    this.J.dispose();
    Q(this.F, 'tellAssetHide', [this.la]);
    E(F, 'Closing ad. If this was invoked by a user action, call Enabler.reportManualClose() as well.');
  };
  R.prototype.close = R.prototype.close;
  R.prototype.ld = function() {
    Q(this.F, 'tellCompanionAssetHide', [this.la]);
  };
  R.prototype.closeCompanion = R.prototype.ld;
  R.prototype.sd = function() {
    Q(this.F, 'tellCompanionAssetShow', [this.la]);
  };
  R.prototype.displayCompanion = R.prototype.sd;
  R.prototype.Id = function() {
    return this.ea('sn');
  };
  R.prototype.getDartSiteName = R.prototype.Id;
  R.prototype.Hd = function() {
    return this.S('sid');
  };
  R.prototype.getDartSiteId = R.prototype.Hd;
  R.prototype.Ed = function() {
    return this.S('aid');
  };
  R.prototype.getDartAdId = R.prototype.Ed;
  R.prototype.Gd = function() {
    return this.S('pid');
  };
  R.prototype.getDartPageId = R.prototype.Gd;
  R.prototype.mc = function() {
    return this.ea('rid');
  };
  R.prototype.getDartRenderingId = R.prototype.mc;
  R.prototype.Fd = function() {
    return this.S('cid');
  };
  R.prototype.getDartCreativeId = R.prototype.Fd;
  R.prototype.lc = function() {
    return this.ea('varName');
  };
  R.prototype.getDartAssetId = R.prototype.lc;
  R.prototype.Pd = function() {
    return this.ea('ct');
  };
  R.prototype.getUserCountry = R.prototype.Pd;
  R.prototype.Rd = function() {
    return this.ea('st');
  };
  R.prototype.getUserState = R.prototype.Rd;
  R.prototype.Sd = function() {
    return this.ea('zp');
  };
  R.prototype.getUserZipCode = R.prototype.Sd;
  R.prototype.Od = function() {
    var a = this.S('bw');
    return null != a ? a : 0;
  };
  R.prototype.getUserBandwidth = R.prototype.Od;
  R.prototype.Nd = function() {
    return this.ea('ac');
  };
  R.prototype.getUserAreaCode = R.prototype.Nd;
  R.prototype.Qd = function() {
    return this.S('dma');
  };
  R.prototype.getUserDMACode = R.prototype.Qd;
  R.prototype.getFilename = function(a) {
    D(F, 'The method: Enabler.getFilename(filename) has been deprecated. As an alternative please use: Enabler.getUrl(filename).');
    return this.Oa(a);
  };
  R.prototype.getFilename = R.prototype.getFilename;
  R.prototype.Oa = function(a) {
    var b = a.toLowerCase(), c = b.slice(b.lastIndexOf('/') + 1), d = encodeURIComponent(c),
      e = this.v[c];
    e = (e = (e = (e = (e = e || this.v['pro_' + c]) || this.v[b]) || this.v['pro_' + b]) || this.v[d]) || this.v['pro_' + d];
    return null != e ? e : a;
  };
  R.prototype.getUrl = R.prototype.Oa;
  R.prototype.Ld = function() {
    return this.G;
  };
  R.prototype.getOrientation = R.prototype.Ld;
  R.prototype.ff = function(a, b) {
    if (a)
    {
      for (var c = 0; c < this.sb.length; ++c)
      {
        var d = this.sb[c];
        if (null != d)
        {
          switch (a)
          {
            case 'changevolume':
              null != b && (0 < b && (d.muted = !1), d.volume = b);
              break;
            case 'pause':
              d.pause();
              break;
            case 'resume':
              d.play();
          }
        }
      }
    }
  };
  R.prototype.invokeOnAllVideos = R.prototype.ff;
  R.prototype.ec = function(a) {
    null != a && this.sb.push(a);
  };
  R.prototype.registerVideoElements = R.prototype.ec;
  R.prototype.te = function(a, b) {
    a = vf(se(a));
    null != b && mf(a, b);
  };
  R.prototype.loadScript = R.prototype.te;
  R.prototype.Ta = function(a, b) {
    eh(qe, a) ? mf(this.D, Pa(Cg, a, b)) : oe(F, 'There is no module called ' + (a + '.'));
  };
  R.prototype.loadModule = R.prototype.Ta;
  R.prototype.se = function(a, b) {
    for (var c = a.length, d = 0; d < a.length; ++d) this.Ta(a[d], function() {
      0 == --c && b();
    });
  };
  R.prototype.loadModules = R.prototype.se;
  R.prototype.Ac = function(a) {
    E(F, 'Dispatching function invocation "' + a + '" on parent.');
    Q(this.F, 'invokeExternalJSFunction', [escape(a)]);
  };
  R.prototype.invokeExternalJsFunction = R.prototype.Ac;
  R.prototype.Bc = function(a, b, c) {
    a in Ti || D(F, 'The mraid method "' + (a + '" isn\'t allowed to be invoked, please use one of the corresponding Enabler methods.'));
    var d = 'Method "' + (a + '" invoked');
    b && (d += 'with arguments "' + (b.join(',') + '"'));
    E(F, d + '.');
    Q(this.F, 'invokeMraidMethod', [a, b], c);
  };
  R.prototype.invokeMraidMethod = R.prototype.Bc;
  R.prototype.Re = function() {
    D(F, 'The method: Enabler.invokeAdMobMethod has been deprecated.');
  };
  R.prototype.invokeAdMobMethod = R.prototype.Re;
  R.prototype.C = function(a, b, c, d) {
    eh(xh, a) ? Q(this.F, 'invokeExternalJSFunctionWithReturn', [a, b, c], d) : oe(F, 'The whitelist global object "' + (a + '" isn\'t whitelisted, please only call methods on one of the existing whitelisted objects.'));
  };
  R.prototype.invokeExternalJsFunctionWithReturn = R.prototype.C;
  R.prototype.kf = function(a, b) {
    E(F, 'Dispatching function invocation openUrl on parent.');
    Q(this.F, 'invokeUrlOpen', [a], b);
  };
  R.prototype.invokeUrlOpen = R.prototype.kf;
  R.prototype.A = function() {
    this.W && Mj(this.W);
    this.wa && gg(this.wa);
    Cf(this.J, this.b, this.V, this.D, this.ka);
    delete this.Xa;
    R.H.A.call(this);
  };
  R.prototype.addEventListener = function(a, b, c, d, e) {
    a = Ci[a.toString()] || a;
    if (a.toString() in zi)
    {
      if (!this.oa())
      {
        e = b;
        'function' === typeof b && (e = function(f) {
          f.Cd ? b(f.$) : b(f);
        });
        M(this.V, window, a, e, c, d);
        return;
      }
      Q(this.F, 'registerEventTypeListenerForType', [a, e]);
    }
    'hostpageFeaturesLoaded' == a && Q(this.F, 'getHostpageFeatures', [a]);
    Zf(this, a, b, c, d);
  };
  R.prototype.addEventListener = R.prototype.addEventListener;
  R.prototype.removeEventListener = function(a, b, c, d) {
    fg(this, a, b, c, d);
  };
  R.prototype.removeEventListener = R.prototype.removeEventListener;
  R.prototype.tb = function(a, b) {
    this.Xa[a] = b;
  };
  R.prototype.addMessageHandler = R.prototype.tb;
  R.prototype.Ke = function(a) {
    delete this.Xa[a];
  };
  R.prototype.removeMessageHandler = R.prototype.Ke;
  R.prototype.Ae = function(a, b) {
    a = this.Xa[a];
    'function' === typeof a && a.apply(null, b);
  };
  R.prototype.defaultMessageHandler = R.prototype.Ae;
  R.prototype.Mc = function() {
    ig(this, 'fullscreenSupport') || D(F, 'Please implement an event handler in order to receive support status:\nEnabler.addEventListener(\n    studio.events.StudioEvent.FULLSCREEN_SUPPORT,\n    function() {/* query event for fullscreen status */});');
    Q(this.F, 'isFullscreenSupported');
    this.l(this.Zb, 0, !0);
  };
  R.prototype.queryFullscreenSupport = R.prototype.Mc;
  R.prototype.Lc = function() {
    ig(this, 'fullscreenDimensions') || D(F, 'Please implement an event handler in order to receive dimensions:\nEnabler.addEventListener(\n    studio.events.StudioEvent.FULLSCREEN_DIMENSIONS,\n    function() {/* query event for fullscreen dimensions */});');
    Q(this.F, 'queryFullscreenDimensions');
    if (!this.oa())
    {
      var a = Gd();
      this.l(this.Tb, 0, a.width, a.height);
    }
  };
  R.prototype.queryFullscreenDimensions = R.prototype.Lc;
  R.prototype.Pc = function(a, b) {
    if ('collapsed' != this.f)
    {
      D(F, 'Enabler.requestFullscreenExpand() should not be invoked unless the  creative is in the collapsed state.');
    }
    else
    {
      ig(this, 'fullscreenExpandStart') || D(F, 'Please implement the fullscreen expansion via event handlers:\nEnabler.addEventListener(\n    studio.events.StudioEvent.FULLSCREEN_EXPAND_START,\n    function() {/* expand action */});');
      this.qb = !0;
      var c = [];
      a && b && (c = [a, b]);
      Q(this.F, 'fullscreenExpandRequested', c);
      hk(this, this.Gb);
      this.l(this.Wb,
        0, a, b);
    }
  };
  R.prototype.requestFullscreenExpand = R.prototype.Pc;
  R.prototype.hc = function() {
    'fs_expanding' != this.f ? D(F, 'You must first call Enabler.requestFullscreenExpand() to initiate the expansion and then call Enabler.finishFullscreenExpand() when the expand animation has finished. Cancelling expansion...') : (Q(this.F, 'fullscreenExpandFinished'), E(F, 'The creative has expanded.'), this.l(this.Ub, 0));
  };
  R.prototype.finishFullscreenExpand = R.prototype.hc;
  R.prototype.Gb = function() {
    'fs_expanded' != this.f ? D(F, 'Enabler.requestFullscreenCollapse() should not be invoked unless the  creative is in the fullscreen state.') : (ig(this, 'fullscreenCollapseStart') || D(F, 'Please implement fullscreen collapse via event handlers:\nEnabler.addEventListener(\n    studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,\n    function() {/* Begin collapse animation */});'), ik(this), Q(this.F, 'fullscreenCollapseRequested'), this.l(this.Ob, 0));
  };
  R.prototype.requestFullscreenCollapse = R.prototype.Gb;
  R.prototype.fc = function() {
    'fs_collapsing' != this.f ? D(F, 'You must first call Enabler.requestFullscreenCollapse() to initiate the collapse and then call Enabler.finishFullscreenCollapse() when the collapse animation has finished. Cancelling collapse...') : (Q(this.F, 'fullscreenCollapseFinished'), this.l(this.Sb, 0));
  };
  R.prototype.finishFullscreenCollapse = R.prototype.fc;
  R.prototype.Je = function(a) {
    Q(this.F, 'registerChargeableEventName', [a]);
  };
  R.prototype.registerChargeableEventName = R.prototype.Je;
  R.prototype.Cb = function() {
    return this.J.Cb();
  };
  R.prototype.hasUserInteracted = R.prototype.Cb;
  R.prototype.Zb = function(a) {
    var b = new P('fullscreenSupport');
    b.da('supported', a);
    this.dispatchEvent(b);
  };
  R.prototype.fullscreenSupportInternal = R.prototype.Zb;
  R.prototype.Tb = function(a, b) {
    var c = new P('fullscreenDimensions');
    void 0 != a && void 0 != b && (c.da('width', a), c.da('height', b));
    this.dispatchEvent(c);
  };
  R.prototype.fullscreenDimensionsInternal = R.prototype.Tb;
  R.prototype.Wb = function(a, b, c, d) {
    gj(this.b, 'Start', 'EXPAND_TIMER', void 0, void 0, void 0);
    Zj(this);
    this.Da || (this.o(), this.Da = !0);
    this.f = 'fs_expanding';
    var e = new P('fullscreenExpandStart');
    e.da('width', a);
    e.da('height', b);
    e.da('left', c);
    e.da('top', d);
    this.dispatchEvent(e);
  };
  R.prototype.fullscreenExpandStartInternal = R.prototype.Wb;
  R.prototype.Ub = function() {
    this.f = 'fs_expanded';
    this.dispatchEvent(new P('fullscreenExpandFinish'));
  };
  R.prototype.fullscreenExpandFinishInternal = R.prototype.Ub;
  R.prototype.Ob = function() {
    this.f = 'fs_collapsing';
    this.dispatchEvent(new P('fullscreenCollapseStart'));
  };
  R.prototype.fullscreenCollapseStartInternal = R.prototype.Ob;
  R.prototype.Sb = function() {
    gj(this.b, 'Stop', 'EXPAND_TIMER', void 0, void 0, void 0);
    this.f = 'collapsed';
    this.dispatchEvent(new P('fullscreenCollapseFinish'));
  };
  R.prototype.fullscreenCollapseFinishInternal = R.prototype.Sb;
  R.prototype.we = function() {
    return this.sf.b('image/webp');
  };
  R.prototype.canRenderWebpImages = R.prototype.we;
  R.prototype.wc = function(a) {
    return this.Cc.f(a) ? this.Cc.b(a) : !1;
  };
  R.prototype.supportsVideoFormat = R.prototype.wc;
  R.prototype.Ue = function() {
    return this;
  };
  R.prototype.setHint = R.prototype.Ue;
  R.prototype.pc = function() {
    a:{
      for (a in Sd) if ('studio' == Sd[a])
      {
        var a = 'studio';
        break a;
      }
      a = null;
    }
    return a || 'studio';
  };
  R.prototype.getSdk = R.prototype.pc;
  var jk = S();
  q('Enabler', jk, void 0);
  var T = S();
  if (!T.Jb)
  {
    var kk = T.a.getParameter('e', null);
    oj(kk);
    var lk = T.S('leftOffset') || 0, mk = T.S('topOffset') || 0;
    0 == lk && 0 == mk || Uj(T, lk, mk);
    var nk = T.oc('ssr'), ok;
    ok = Tj(T).g;
    var pk;
    pk = Tj(T).b;
    var qk;
    qk = Tj(T).a;
    var rk = [ok, '://', pk, qk].join('');
    yf(hh.a);
    ih([1, 2]);
    var sk;
    sk = T.a.getParameter('c', void 0);
    var tk;
    tk = T.a.S('t');
    T.F = new Qi(sk, tk);
    Bf(T, T.F);
    T.F.a = T;
    T.F.j = rk.split('?')[0];
    T.F.B = nk;
    if (!T.oa())
    {
      var uk = 1E3;
      Rj && (uk = 0);
      T.wa = Yj(T.ze, 'a', uk);
      var vk = 2E3, wk = 2500;
      Rj && (wk = vk = 0);
      Yj(T.Pb, 'b', vk);
      Yj(Pa(T.rb, !0), 'c', wk);
      M(T.V, window, ['resize', 'orientationchange'], T.dc, void 0);
      T.dc();
    }
    T.F.connect();
  }
  qg.enabler = 3;
  var U = function() {
    K.call(this);
    this.a = 'loading';
    this.b = n.Enabler;
    this.b.isInitialized() ? this.f() : Zf(this.b, 'init', this.f, !1, this);
  };
  v(U, K);
  Fa(U);
  U.prototype.o = function() {
    return this.a;
  };
  U.prototype.getState = U.prototype.o;
  U.prototype.j = function() {
    return '1.0';
  };
  U.prototype.getVersion = U.prototype.j;
  U.prototype.open = function() {
    this.b.exit('MRAID default exit');
  };
  U.prototype.open = U.prototype.open;
  U.prototype.close = function() {
    'expanded' == this.a ? (this.b.Ka(), this.a = 'default', this.dispatchEvent('stateChange')) : 'default' == this.a && (this.a = 'hidden', this.b.close(), this.dispatchEvent('stateChange'));
  };
  U.prototype.close = U.prototype.close;
  U.prototype.l = function() {
    return this.b.isVisible();
  };
  U.prototype.isViewable = U.prototype.l;
  U.prototype.expand = function() {
    'default' == this.a && (this.b.kb(), this.a = 'expanded', this.dispatchEvent('stateChange'));
  };
  U.prototype.expand = U.prototype.expand;
  U.prototype.f = function() {
    this.a = 'default';
    Zf(this.b, 'collapseStart', this.h, !1, this);
    this.dispatchEvent('ready');
  };
  U.prototype.h = function() {
    'expanded' == this.a && (this.a = 'default', this.dispatchEvent('stateChange'));
  };
  if (!window.mraid)
  {
    var xk = U.Ea();
    q('mraid', xk, void 0);
  }
  ;q('studio.sdk.hint.ExpansionMode', { NORMAL: 'normal', LIGHTBOX: 'lightbox' }, void 0);
  q('studio.sdk.hint.ExpansionTrigger', { ON_CLICK: 'onClick', ON_HOVER: 'onHover' }, void 0);
  q('studio.sdk.hint.Hint', {
    EXPANSION_MODE: "expansionMode",
    EXPANSION_TRIGGER: "expansionTrigger"
  }, void 0);
  var yk, zk, Ak, Bk, Ck, Dk, Ek = function() {
      return n.navigator ? n.navigator.userAgent : ""
    }, Fk = function(a) {
      return Kb(Ek(), a)
    }, Gk = Fk("(iPad") || Fk("(Macintosh") || Fk("(iPod") || Fk("(iPhone"), Hk = Fk("Android"),
    Ik = Fk("MSIE") || Fk("IEMobile") || Fk("Windows Phone"), Jk = function() {
      void 0 === Bk && (Bk = Fk("afma-sdk-a") ? !0 : !1);
      return Bk
    }, Kk = function() {
      if (void 0 === Ck)
      {
        a:{
          if (void 0 === Ak)
          {
            if (Gk)
            {
              var a = Fk("Safari");
              var b = (new bi(window.location.href)).f.N("js");
              b:{
                if ((b = b.length ? b[0] : "") && Ab(b, "afma-"))
                {
                  var c = b.lastIndexOf("v");
                  if (-1 <
                    c && (b = b.substr(c + 1).match(/^(\d+\.\d+\.\d+|^\d+\.\d+|^\d+)(-.*)?$/)))
                  {
                    b = b[1];
                    break b
                  }
                }
                b = "0.0.0"
              }
              if (!a || "0.0.0" !== b)
              {
                a = Ak = !0;
                break a
              }
            }
            Ak = !1
          }
          a = Ak
        }
        Ck = a || Jk()
      }
      return Ck
    };
  var Lk = function(a) {
    return "Config type " + (a + " does not exist")
  }, Mk = function(a) {
    return "Unable to parse a type for value with JavaScript type " + (Ga(a) + (': "' + (a + '"')))
  }, Nk = function(a, b) {
    return "Cannot handle description for property " + (b + (" on type " + (a + ".")))
  }, Ok = function(a, b) {
    return "Array property " + (b + (" on type " + (a + " must have at least one element.")))
  }, Pk = function(a, b) {
    return "Invalid type for value of property " + (b + (" on type " + (a + ".")))
  }, Qk = function(a, b) {
    return "No value specified for non-optional property " +
      (b + (" on type " + (a + ".")))
  }, Rk = function(a, b) {
    return "Property " + (b + (" does not exist on type " + (a + ".")))
  }, Sk = function(a, b) {
    return "Property " + (b + (" is not an array on type " + (a + ".")))
  }, Tk = function(a, b, c, d) {
    return "Property " + (b + (" on type " + (a + (" has length " + (c + (", but invalid index " + (d + " was requested.")))))))
  }, Uk = function(a, b) {
    return "Unknown event with type " + (a + (" and name " + b))
  }, Vk = function(a) {
    return "The optional property " + (a + " must be a reference")
  };
  var Wk = function() {
  };
  q("studio.utils.EnablerAccessor", Wk, void 0);
  var Xk = function(a) {
    var b = S();
    b.isInitialized() ? a(b) : b.g.add("init", Pa(a, b), !0, void 0, void 0)
  };
  Wk.getInitializedEnablerByCallback = Xk;
  var Yk = function() {
    return new Le(function(a) {
      var b = S();
      b.isInitialized() ? a(b) : b.g.add("init", Pa(a, b), !0, void 0, void 0)
    })
  };
  Wk.getInitializedEnabler = Yk;
  Wk.loadModuleWhenReady = function(a, b) {
    Xk(function(c) {
      c.Ta(a, b)
    })
  };
  var Zk = function() {
  };
  Fa(Zk);
  Zk.prototype.a = 0;
  var $k = function(a) {
    K.call(this);
    this.V = a || Dd();
    this.C = null;
    this.na = !1;
    this.a = null;
    this.l = void 0;
    this.j = this.b = this.h = null
  };
  v($k, K);
  $k.prototype.sa = Zk.Ea();
  var al = function(a) {
    return a.C || (a.C = ":" + (a.sa.a++).toString(36))
  };
  $k.prototype.getElement = function() {
    return this.a
  };
  var bl = function(a) {
    a.l || (a.l = new L(a));
    return y(a.l)
  }, cl = function(a, b) {
    if (a == b)
    {
      throw Error("Unable to set parent component");
    }
    var c;
    if (c = b && a.h && a.C)
    {
      c = a.h;
      var d = a.C;
      c = c.j && d ? Xb(c.j, d) || null : null
    }
    if (c && a.h != b)
    {
      throw Error("Unable to set parent component");
    }
    a.h = b;
    $k.H.Ib.call(a, b)
  };
  $k.prototype.Ib = function(a) {
    if (this.h && this.h != a)
    {
      throw Error("Method not supported");
    }
    $k.H.Ib.call(this, a)
  };
  $k.prototype.ba = function() {
    this.a = Rd(this.V, "DIV")
  };
  var dl = function(a, b, c) {
    if (a.na)
    {
      throw Error("Component already rendered");
    }
    a.a || a.ba();
    b ? b.insertBefore(a.a, c || null) : a.V.a.body.appendChild(a.a);
    a.h && !a.h.na || a.Z()
  };
  $k.prototype.Z = function() {
    this.na = !0;
    el(this, function(a) {
      !a.na && a.getElement() && a.Z()
    })
  };
  var fl = function(a) {
    el(a, function(b) {
      b.na && fl(b)
    });
    a.l && Gg(a.l);
    a.na = !1
  };
  $k.prototype.A = function() {
    this.na && fl(this);
    this.l && (this.l.dispose(), delete this.l);
    el(this, function(a) {
      a.dispose()
    });
    this.a && Od(this.a);
    this.h = this.a = this.j = this.b = null;
    $k.H.A.call(this)
  };
  var gl = function(a, b) {
    var c = a.b ? a.b.length : 0;
    y(!!b, "Provided element must not be null.");
    if (b.na)
    {
      throw Error("Component already rendered");
    }
    if (0 > c || c > (a.b ? a.b.length : 0))
    {
      throw Error("Child component index out of bounds");
    }
    a.j && a.b || (a.j = {}, a.b = []);
    if (b.h == a)
    {
      var d = al(b);
      a.j[d] = b;
      rb(a.b, b)
    }
    else
    {
      d = a.j;
      var e = al(b);
      if (null !== d && e in d)
      {
        throw Error('The object already contains the key "' + e + '"');
      }
      d[e] = b
    }
    cl(b, a);
    wb(a.b, c, 0, b);
    b.na && a.na && b.h == a ? (a = a.ma(), c = a.childNodes[c] || null, c != b.getElement() && a.insertBefore(b.getElement(),
      c)) : (a.a || a.ba(), c = a.b ? a.b[c + 1] || null : null, dl(b, a.ma(), c ? c.a : null))
  };
  $k.prototype.ma = function() {
    return this.a
  };
  var el = function(a, b) {
    a.b && z(a.b, b, void 0)
  }, hl = function(a) {
    var b = a.b ? a.b[0] || null : null;
    if (b)
    {
      var c = "string" === typeof b ? b : al(b);
      b = a.j && c ? Xb(a.j, c) || null : null;
      if (c && b)
      {
        var d = a.j;
        c in d && delete d[c];
        rb(a.b, b);
        fl(b);
        b.a && Od(b.a);
        cl(b, null)
      }
    }
    if (!b)
    {
      throw Error("Child is not in parent component");
    }
    return b
  }, il = function(a) {
    for (var b = []; a.b && 0 != a.b.length;) b.push(hl(a))
  };
})();
