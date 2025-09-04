import {
  o as aa,
  b as T,
  i as Q,
  a as B,
  r as ea,
  d as ta,
  s as sa,
  c as J,
  w as K,
  e as ia,
} from "./favourite.D8urFDSY.js";
import {
  c as U,
  s as d,
  m as N,
  l as oa,
  X as x,
  a as ra,
  f as v,
  d as t,
  e as i,
  r as s,
  g as M,
  t as na,
  u as q,
  h as G,
  i as h,
  b as c,
  p as W,
  Y as O,
  Z as la,
} from "./render.BE2Fuemi.js";
import { g as da } from "./exerciseService.hgv8slgW.js";
import { p as ca, s as va, a as ma } from "./store.BkX6ANw_.js";
var ua = v(
    '<img src="/images/favouritedButton.png" alt="favourited" class="detail-icon"/>'
  ),
  pa = v(
    '<img src="/images/favouriteButton.png" alt="favourite" class="detail-icon"/>'
  ),
  fa = v(
    '<div class="popup popup-modal">Added to favourites <img src="/images/happyIcon.png" alt="smiley face" class="detail-icon"/></div>'
  ),
  ga = v(
    '<div class="popup popup-modal">Removed from favourites <img src="/images/sadIcon.png" alt="sad face" class="detail-icon"/></div>'
  ),
  _a = v(
    '<div class="container"><img src="/images/exerciseImage.png" class="img-fluid rounded-corners img-top"/> <h5 class="modal-header"> </h5> <div class="exercise-details"><div class="detail-item"><img src="/images/time-icon.png" alt="Difficulty" class="detail-icon"/> <span class="detail-name">Difficulty:</span> <span class="detail-info"> </span></div> <div class="detail-item"><img src="/images/servings-icon.png" alt="Equipment" class="detail-icon"/> <span class="detail-name">Equipment:</span> <span class="detail-info"> </span></div> <br/> <div class="center-content modal-button-container"><button class="btn primary-button">View Full Exercise</button> <button class="image-button"><!></button> <!> <!></div> <div class="sr-detail-item modal-badge-container"><span class="badge rounded-pill text-bg-secondary"> </span></div></div></div>'
  );
function ba(L, C) {
  U(C, !1);
  let e = ca(C, "exercise", 8),
    n = N(!1),
    y = N(!1),
    p = N(!1);
  const S = (a) => {
      ma(a), (window.location.href = "/displayExercise");
    },
    w = (a) => {
      d(n, T(a.name)),
        M(n)
          ? (ea(a.name), d(p, !0), setTimeout(() => d(p, !1), 2e3))
          : (ta(a), d(y, !0), setTimeout(() => d(y, !1), 2e3)),
        d(n, !M(n));
    };
  aa(() => {
    typeof window < "u" && typeof localStorage < "u" && d(n, T(e().name));
  }),
    oa(
      () => (x(e()), T),
      () => {
        e() && d(n, T(e().name));
      }
    ),
    ra(),
    Q();
  var m = _a(),
    f = t(m),
    E = i(f, 2),
    V = t(E, !0);
  s(E);
  var k = i(E, 2),
    g = t(k),
    _ = i(t(g), 4),
    X = t(_, !0);
  s(_), s(g);
  var $ = i(g, 2),
    D = i(t($), 4),
    r = t(D, !0);
  s(D), s($);
  var o = i($, 4),
    I = t(o),
    u = i(I, 2),
    P = t(u);
  {
    var R = (a) => {
        var l = ua();
        c(a, l);
      },
      Y = (a) => {
        var l = pa();
        c(a, l);
      };
    B(P, (a) => {
      M(n) ? a(R) : a(Y, !1);
    });
  }
  s(u);
  var b = i(u, 2);
  {
    var Z = (a) => {
      var l = fa();
      c(a, l);
    };
    B(b, (a) => {
      M(y) && a(Z);
    });
  }
  var j = i(b, 2);
  {
    var z = (a) => {
      var l = ga();
      c(a, l);
    };
    B(j, (a) => {
      M(p) && a(z);
    });
  }
  s(o);
  var A = i(o, 2),
    F = t(A),
    H = t(F, !0);
  s(F),
    s(A),
    s(k),
    s(m),
    na(() => {
      va(f, "alt", (x(e()), q(() => e().name))),
        G(V, (x(e()), q(() => e().name))),
        G(X, (x(e()), q(() => e().difficulty))),
        G(r, (x(e()), q(() => e().equipment))),
        G(H, (x(e()), q(() => e().type)));
    }),
    h("click", I, () => S(e())),
    h("click", u, () => w(e())),
    c(L, m),
    W();
}
var xa = v("<p>Loading...</p>"),
  ha = v(
    '<div class="modal fade show" tabindex="-1" style="display: block;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header modal-background"><button type="button" class="btn-close"></button></div> <div class="modal-body modal-body"><!></div> <div class="modal-footer modal-background"><button class="btn primary-button">Close</button> <button class="btn primary-button">Roll Again <img src="/images/dice.png" alt="dice" class="detail-icon"/></button></div></div></div></div> <div class="modal-backdrop fade show"></div>',
    1
  ),
  ya = v(
    '<div class="center-content"><button class="btn primary-button btn-lg">Get Random Exercise</button></div> <!>',
    1
  );
function Ia(L, C) {
  U(C, !1);
  const [e, n] = sa(),
    y = () => J(f, "$showModal", e),
    p = () => J(w, "$exercises", e),
    S = () => J(m, "$currentExerciseIndex", e);
  let w = K([]),
    m = K(0),
    f = K(!1);
  async function E() {
    const o = await da({ type: ["strength", "cardio"], limit: 50 });
    w.set(Array.isArray(o) ? o : []), m.set(0), f.set(!0);
  }
  function V() {
    const r = ia(w);
    m.update(
      (o) => (
        console.log("Roll Again clicked", o, r.length),
        r.length > 0 ? (o + 1) % r.length : 0
      )
    );
  }
  function k() {
    f.set(!1);
  }
  Q();
  var g = ya(),
    _ = O(g),
    X = t(_);
  s(_);
  var $ = i(_, 2);
  {
    var D = (r) => {
      var o = ha(),
        I = O(o),
        u = t(I),
        P = t(u),
        R = t(P),
        Y = t(R);
      s(R);
      var b = i(R, 2),
        Z = t(b);
      {
        var j = (a) => {
            ba(a, {
              get exercise() {
                return p()[S()];
              },
            });
          },
          z = (a) => {
            var l = xa();
            c(a, l);
          };
        B(Z, (a) => {
          p().length > 0 ? a(j) : a(z, !1);
        });
      }
      s(b);
      var A = i(b, 2),
        F = t(A),
        H = i(F, 2);
      s(A),
        s(P),
        s(u),
        s(I),
        la(2),
        h("click", Y, k),
        h("click", F, k),
        h("click", H, V),
        c(r, o);
    };
    B($, (r) => {
      y() && r(D);
    });
  }
  h("click", X, E), c(L, g), W(), n();
}
export { Ia as default };
