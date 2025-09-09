$(function () {
  $(".js-btn").on("click", function () {
    // js-btnクラスをクリックすると、
    $(".l-header__nav, .c-hamburger__line").toggleClass("open"); // メニューとバーガーの線にopenクラスをつけ外しする
  });

  $(".l-header__nav a").on("click", function () {
    $(".l-header__nav, .c-hamburger__line").removeClass("open");
  });
});

// toggle
$(function () {
  $(".c-toggle__header").click(function () {
    $(this).toggleClass("selected");
    $(this).next().slideToggle();
  });
});

// タッチ判定の安定化
const thumbClass = "thumblist-item";
const mytap = "ontouchstart" in window ? "touchstart" : "click";

const mySwiper = new Swiper(".swiper", {
  speed: 1500,
  autoplay: false,
  // ページネーションの代わりに、カスタムHTML（thumblist）へ自前描画
  pagination: {
    el: ".thumblist",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      const slides = swiper.slides; // スライドDOM
      let html = "";
      for (let i = 0; i < total; i++) {
        const isCurrent = current === i + 1;
        html += `
            <div class="${thumbClass}${
          isCurrent ? " current" : ""
        }" data-slideto="${i}">
              ${slides[i].innerHTML}
            </div>`;
      }
      return html;
    },
  },
  // レイアウト変化や非表示→表示でも追従
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
});

// サムネにイベントを付与
function bindThumbEvents() {
  const thumbItems = document.getElementsByClassName(thumbClass);
  for (let i = 0; i < thumbItems.length; i++) {
    // 同じイベントの二重付与を避けるため、一旦cloneで置換（簡易デバウンス）
    const oldEl = thumbItems[i];
    const newEl = oldEl.cloneNode(true);
    oldEl.parentNode.replaceChild(newEl, oldEl);

    newEl.addEventListener(
      mytap,
      (e) => {
        const index = Number(e.currentTarget.dataset.slideto) || 0;
        // slideToは0始まり
        mySwiper.slideTo(index, 300, true);
        // 自動再生を継続
        setTimeout(() => {
          mySwiper.autoplay.start();
        }, 3000);
      },
      false
    );
  }
}

// 初回描画後にイベント付与
bindThumbEvents();

// スライド切替のたびにサムネHTMLが描き直される → 再バインド
mySwiper.on("slideChange", bindThumbEvents);

// 念のため初期化後にも
mySwiper.on("afterInit", bindThumbEvents);
