import {
  as as j,
  at as h,
  au as B,
  al as J,
  av as N,
  u as k,
  k as L,
  o as I,
  v as M,
  aw as H,
  x as P,
  H as V,
  y as Y,
  n as $,
  z as U,
  j as K,
  D as q,
  F as X,
  ax as Z,
  E as G,
  M as Q,
  N as W,
  A as ee,
  ay as se,
  az as w,
  aA as te,
  g as F,
  X as ne,
  aj as re,
  aB as _,
  aC as ae,
  m as ue,
  a1 as oe,
  s as ie,
  aD as fe,
} from "./render.BE2Fuemi.js";
const ce = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= new Set()).add(ce);
j();
function ve(e) {
  h === null && B(),
    J && h.l !== null
      ? le(h).m.push(e)
      : N(() => {
          const s = k(e);
          if (typeof s == "function") return s;
        });
}
function le(e) {
  var s = e.l;
  return (s.u ??= { a: [], b: [], m: [] });
}
function ge(e, s, t = !1) {
  I && M();
  var n = e,
    r = null,
    u = null,
    o = Z,
    c = t ? H : 0,
    f = !1;
  const a = (d, i = !0) => {
    (f = !0), g(i, d);
  };
  var l = null;
  function b() {
    l !== null && (l.lastChild.remove(), n.before(l), (l = null));
    var d = o ? r : u,
      i = o ? u : r;
    d && Q(d),
      i &&
        W(i, () => {
          o ? (u = null) : (r = null);
        });
  }
  const g = (d, i) => {
    if (o === (o = d)) return;
    let p = !1;
    if (I) {
      const C = P(n) === V;
      !!o === C && ((n = Y()), $(n), U(!1), (p = !0));
    }
    var m = G(),
      S = n;
    if (
      (m && ((l = document.createDocumentFragment()), l.append((S = K()))),
      o ? (r ??= i && q(() => i(S))) : (u ??= i && q(() => i(S))),
      m)
    ) {
      var E = X,
        D = o ? r : u,
        R = o ? u : r;
      D && E.skipped_effects.delete(D),
        R && E.skipped_effects.add(R),
        E.add_callback(b);
    } else b();
    p && U(!0);
  };
  L(() => {
    (f = !1), s(a), f || g(null, null);
  }, c),
    I && (n = ee);
}
function me(e = !1) {
  const s = h,
    t = s.l.u;
  if (!t) return;
  let n = () => ne(s.s);
  if (e) {
    let r = 0,
      u = {};
    const o = re(() => {
      let c = !1;
      const f = s.s;
      for (const a in f) f[a] !== u[a] && ((u[a] = f[a]), (c = !0));
      return c && r++, r;
    });
    n = () => F(o);
  }
  t.b.length &&
    se(() => {
      z(s, n), w(t.b);
    }),
    N(() => {
      const r = k(() => t.m.map(te));
      return () => {
        for (const u of r) typeof u == "function" && u();
      };
    }),
    t.a.length &&
      N(() => {
        z(s, n), w(t.a);
      });
}
function z(e, s) {
  if (e.l.s) for (const t of e.l.s) F(t);
  s();
}
function T(e, s, t) {
  if (e == null) return s(void 0), t && t(void 0), _;
  const n = k(() => e.subscribe(s, t));
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const v = [];
function de(e, s) {
  return { subscribe: _e(e, s).subscribe };
}
function _e(e, s = _) {
  let t = null;
  const n = new Set();
  function r(c) {
    if (ae(e, c) && ((e = c), t)) {
      const f = !v.length;
      for (const a of n) a[1](), v.push(a, e);
      if (f) {
        for (let a = 0; a < v.length; a += 2) v[a][0](v[a + 1]);
        v.length = 0;
      }
    }
  }
  function u(c) {
    r(c(e));
  }
  function o(c, f = _) {
    const a = [c, f];
    return (
      n.add(a),
      n.size === 1 && (t = s(r, u) || _),
      c(e),
      () => {
        n.delete(a), n.size === 0 && t && (t(), (t = null));
      }
    );
  }
  return { set: r, update: u, subscribe: o };
}
function ye(e, s, t) {
  const n = !Array.isArray(e),
    r = n ? [e] : e;
  if (!r.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const u = s.length < 2;
  return de(t, (o, c) => {
    let f = !1;
    const a = [];
    let l = 0,
      b = _;
    const g = () => {
        if (l) return;
        b();
        const i = s(n ? a[0] : a, o, c);
        u ? o(i) : (b = typeof i == "function" ? i : _);
      },
      d = r.map((i, p) =>
        T(
          i,
          (m) => {
            (a[p] = m), (l &= ~(1 << p)), f && g();
          },
          () => {
            l |= 1 << p;
          }
        )
      );
    return (
      (f = !0),
      g(),
      function () {
        w(d), b(), (f = !1);
      }
    );
  });
}
function be(e) {
  let s;
  return T(e, (t) => (s = t))(), s;
}
let y = !1,
  A = Symbol();
function he(e, s, t) {
  const n = (t[s] ??= { store: null, source: ue(void 0), unsubscribe: _ });
  if (n.store !== e && !(A in t))
    if ((n.unsubscribe(), (n.store = e ?? null), e == null))
      (n.source.v = void 0), (n.unsubscribe = _);
    else {
      var r = !0;
      (n.unsubscribe = T(e, (u) => {
        r ? (n.source.v = u) : ie(n.source, u);
      })),
        (r = !1);
    }
  return e && A in t ? be(e) : F(n.source);
}
function Se(e, s) {
  return e.set(s), s;
}
function Ee() {
  const e = {};
  function s() {
    oe(() => {
      for (var t in e) e[t].unsubscribe();
      fe(e, A, { enumerable: !1, value: !0 });
    });
  }
  return [e, s];
}
function Ie(e) {
  var s = y;
  try {
    return (y = !1), [e(), y];
  } finally {
    y = s;
  }
}
const O = "favourites",
  x = () => {
    const e = localStorage.getItem(O);
    return e ? JSON.parse(e) : [];
  },
  Ne = (e) => {
    const s = x();
    s.find((t) => t.name === e.name) ||
      (s.push(e), localStorage.setItem(O, JSON.stringify(s)));
  },
  we = (e) => {
    let s = x();
    (s = s.filter((t) => t.name !== e)),
      localStorage.setItem(O, JSON.stringify(s));
  },
  Ae = (e) => x().some((t) => t.name === e);
export {
  ge as a,
  Ae as b,
  he as c,
  Ne as d,
  be as e,
  ye as f,
  x as g,
  Se as h,
  me as i,
  Ie as j,
  ve as o,
  we as r,
  Ee as s,
  _e as w,
};
