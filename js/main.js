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

const mySwiper = new Swiper(".swiper", {
  slidesPerView: 1,
  effect: "fade",
  fadeEffect: { crossFade: true },
  speed: 300, // フェードの速さ
  loop: true, // ループさせたいなら true
  autoplay: false, // ← 自動再生を無効化
  pagination: {
    el: ".thumblist",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      const slides = swiper.slides;
      let html = "";
      for (let i = 0; i < total; i++) {
        const isCurrent = current === i + 1;
        html += `
            <div class="thumblist-item${
              isCurrent ? " current" : ""
            }" data-slideto="${i}">
              ${slides[i].innerHTML}
            </div>`;
      }
      return html;
    },
  },
  observer: true,
  observeParents: true,
});

function bindThumbEvents() {
  const thumbs = document.getElementsByClassName("thumblist-item");
  for (let i = 0; i < thumbs.length; i++) {
    const el = thumbs[i].cloneNode(true); // 二重登録防止
    thumbs[i].parentNode.replaceChild(el, thumbs[i]);
    el.addEventListener("click", (e) => {
      const index = Number(e.currentTarget.dataset.slideto) || 0;
      // フェードで切り替え（第2引数：アニメ時間）
      mySwiper.slideToLoop(index, 300, true);
    });
  }
}

bindThumbEvents();
mySwiper.on("slideChange", bindThumbEvents);
