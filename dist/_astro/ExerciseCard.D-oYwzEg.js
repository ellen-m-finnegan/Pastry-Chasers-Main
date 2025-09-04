import {
  o as ia,
  i as ta,
  a as k,
  b as S,
  r as ra,
  d as oa,
} from "./favourite.D8urFDSY.js";
import {
  f as p,
  t as V,
  i as X,
  b as l,
  p as na,
  c as da,
  s as o,
  u as c,
  X as v,
  h as m,
  m as q,
  d as i,
  e as t,
  r as e,
  g as n,
  aE as la,
} from "./render.BE2Fuemi.js";
import { e as ca, i as va } from "./each.CqI28z09.js";
import { p as pa, s as ua, a as ma } from "./store.BkX6ANw_.js";
var fa = p(
    '<img src="/images/favouritedButton.png" alt="favourited" class="detail-icon"/>'
  ),
  ga = p(
    '<img src="/images/favouriteButton.png" alt="favourite" class="detail-icon"/>'
  ),
  _a = p(
    '<div class="popup popup-card">Added to favourites <img src="/images/happyIcon.png" alt="smiley face" class="detail-icon"/></div>'
  ),
  ba = p(
    '<div class="popup popup-card">Removed from favourites <img src="/images/sadIcon.png" alt="sad face" class="detail-icon"/></div>'
  ),
  xa = p('<span class="badge rounded-pill text-bg-secondary"> </span>'),
  ha = p(
    '<div class="col"><div class="card"><img src="/images/exerciseImage.png" class="card-img-top sr-rounded-corners"/> <div class="card-body"><h5 class="card-title"> </h5> <div class="sr-exercise-details"><div class="sr-detail-item"><img src="/images/difficulty-icon.png" alt="Difficulty" class="sr-detail-icon"/> <span class="sr-detail-name">Difficulty:</span> <span class="sr-detail-info"> </span></div> <div class="sr-detail-item"><img src="/images/equipment-icon.png" alt="Equipment" class="sr-detail-icon"/> <span class="sr-detail-name">Equipment:</span> <span class="sr-detail-info"> </span></div> <div class="sr-detail-item"><img src="/images/muscle-icon.png" alt="Muscle" class="sr-detail-icon"/> <span class="sr-detail-name">Muscle:</span> <span class="sr-detail-info"> </span></div> <div class="button-container"><button class="btn primary-button">View Full Exercise</button> <button class="image-button"><!></button> <!> <!></div> <div class="sr-detail-item badge-container"></div></div></div></div></div>'
  );
function ka(j, A) {
  da(A, !1);
  let s = pa(A, "exercise", 8);
  const G = (a) => {
    ma(a), (window.location.href = "/displayExercise");
  };
  let d = q(!1),
    g = q(!1),
    _ = q(!1);
  const H = (a) => {
    o(d, S(a.name)),
      n(d)
        ? (ra(a.name), o(_, !0), setTimeout(() => o(_, !1), 2e3))
        : (oa(a), o(g, !0), setTimeout(() => o(g, !1), 2e3)),
      o(d, !n(d));
  };
  ia(() => {
    typeof window < "u" && typeof localStorage < "u" && o(d, S(s().name));
  });
  function C(a) {
    return a ? a.replace(/_/g, " ") : "";
  }
  const b = (a) => a.charAt(0).toUpperCase() + a.slice(1);
  ta();
  var x = ha(),
    I = i(x),
    M = i(I),
    B = t(M, 2),
    h = i(B),
    J = i(h, !0);
  e(h);
  var D = t(h, 2),
    y = i(D),
    P = t(i(y), 4),
    K = i(P, !0);
  e(P), e(y);
  var E = t(y, 2),
    R = t(i(E), 4),
    N = i(R, !0);
  e(R), e(E);
  var w = t(E, 2),
    T = t(i(w), 4),
    O = i(T, !0);
  e(T), e(w);
  var F = t(w, 2),
    U = i(F),
    f = t(U, 2),
    Q = la(() => H(s())),
    W = i(f);
  {
    var Y = (a) => {
        var r = fa();
        l(a, r);
      },
      Z = (a) => {
        var r = ga();
        l(a, r);
      };
    k(W, (a) => {
      n(d) ? a(Y) : a(Z, !1);
    });
  }
  e(f);
  var z = t(f, 2);
  {
    var $ = (a) => {
      var r = _a();
      l(a, r);
    };
    k(z, (a) => {
      n(g) && a($);
    });
  }
  var aa = t(z, 2);
  {
    var sa = (a) => {
      var r = ba();
      l(a, r);
    };
    k(aa, (a) => {
      n(_) && a(sa);
    });
  }
  e(F);
  var L = t(F, 2);
  ca(
    L,
    5,
    () => (v(s()), c(() => s().type)),
    va,
    (a, r) => {
      var u = xa(),
        ea = i(u, !0);
      e(u), V(() => m(ea, n(r))), l(a, u);
    }
  ),
    e(L),
    e(D),
    e(B),
    e(I),
    e(x),
    V(
      (a, r, u) => {
        ua(M, "alt", (v(s()), c(() => s().name))),
          m(J, (v(s()), c(() => s().name))),
          m(K, a),
          m(N, r),
          m(O, u);
      },
      [
        () => (v(s()), c(() => b(s().difficulty))),
        () => (v(s()), c(() => b(C(s().equipment)))),
        () => (v(s()), c(() => b(C(s().muscle)))),
      ]
    ),
    X("click", U, () => G(s())),
    X("click", f, function (...a) {
      n(Q)?.apply(this, a);
    }),
    l(j, x),
    na();
}
export { ka as default };
