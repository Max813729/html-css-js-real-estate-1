/* =================================================================
 File name : function.js
 Style : function
================================================================= */
// a
// button
// box

$(function () {


  $("#contactButton input").wrap('<div />');
  $(".contact-mail .btn_01 input").wrap('<div />');
  $(".ul01 > li").wrapInner('<div />');
  $('.oc_content').hide();
  $('button.oc_button').on('click', function () {
    $('.oc_content').slideToggle(300);
    $(this).toggleClass('open');
  });


  /* pagetop ---------------------------------------------------------------- */
  $(function () {
    var showFlag = false;
    var topBtn = $('#page_top');
    topBtn.css('bottom', '-100px');
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        if (showFlag == false) {
          showFlag = true;
          topBtn.stop().animate({ 'bottom': '15px' }, 200);
        }
      } else {
        if (showFlag) {
          showFlag = false;
          topBtn.stop().animate({ 'bottom': '-130px' }, 200);
        }
      }
    });
    //スクロールしてトップ
    topBtn.click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });

  // TOPメインビジュアル
  $('.mv ul').slick({
    slidesToScroll: 1,
    speed: 1750,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: false,
    fade: true,
    responsive: [
      {
        breakpoint: 780, // 399px以下のサイズに適用
        settings: {
          slidesToShow: 1,
          centerMode: false
        },
      },
    ],
  });

});




/* スクロール表示 */
$(function () {
  // scroll-text をふわっと表示
  $('.scroll-text').css({ opacity: 0, transform: 'translateY(10px)' });

  $(window).on('load', function () {
    $('.scroll-text').css({
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'all 1s ease-out'
    });
  });

  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]').click(function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });

  // scrollボタンのクリック処理
  $('#scrollBtn').click(function () {
    var mvHeight = $('.mv').outerHeight();
    $('body,html').animate({ scrollTop: mvHeight }, 800, 'swing');
    return false;
  });
});


// 文字サイズ-----------------------------------------------------
var getFontSize = function () {
  var getSize = 0;
  var setId = 'get-font-size-area';
  var $tmpDiv = $('#' + setId);
  if ($tmpDiv.length === 0) {
    var setCss = {
      'margin': 0,
      'padding': 0,
      'border': 0,
      'height': 'auto',
      'display': 'none',
      'line-height': 1,
      'font-size': '1em'
    };

    $tmpDiv = $('<div>');
    $tmpDiv.attr('id', setId).css(setCss).text('&nbsp;');
    $('body').append($tmpDiv);
  }
  getSize = $tmpDiv.height();

  return getSize;
};

$(function () {
  $('#js-fs-normal').on('click', function (e) {
    var getSize = getFontSize();
    var fontsize = getSize * 0.75;
    $('html').css('font-size', fontsize);
  });
  $('#js-fs-large').on('click', function (e) {
    var getSize = getFontSize();
    var fontsize02 = getSize * 1.25;
    $('html').css('font-size', fontsize02);
  });
});

// ハンバーガーメニュー
$(function () {
  $('.menu-btn').click(function () {
    $(this).toggleClass('open');
    $('.gnavi').toggleClass('is-active');
    $('body').toggleClass('menu-open');
  });

  // メニュー内のリンクをクリックした時にメニューを閉じる
  $('.gnavi a').click(function () {
    $('.menu-btn').removeClass('open');
    $('.gnavi').removeClass('is-active');
    $('body').removeClass('menu-open');
  });

  $('.oc_content').hide();
  $(document).ready(function () {
    $('.ocbutton').click(function () {
      $(this).next().next('.oc_content').slideToggle();
      $(this).next().next('.oc_content').toggleClass('open');
    });
  });

});

$(function () {
  var state = false;
  var pos;
  $('.menu-btn').click(function () {
    if (state == false) {
      pos = $(window).scrollTop();
      $('body').addClass('no-touch').css({ 'top': -pos });
      state = true;
    } else {
      $('body').removeClass('no-touch').css({ 'top': 0 });
      window.scrollTo(0, pos);
      state = false;
    }
  });
});

// お問い合わせフォーム
// デフォルトで「確認画面へ」ボタンのみを非アクティブ化
$(document).ready(function () {
  // 「確認画面へ」ボタンのみを初期状態で非アクティブにする
  const confirmBtn = $('input[value="確認画面へ"]');
  confirmBtn.closest('.btn_01').addClass('disabled');
  confirmBtn.prop('disabled', true);

  // ページ読み込み時にチェック状態を復元
  restoreFormState();

  // プライバシーポリシーチェックボックスの状態をチェック
  checkPrivacyPolicy();
});

// プライバシーポリシーのチェック状態に応じて「確認画面へ」ボタンのみを制御
function checkPrivacyPolicy() {
  const checkbox = $('#agree-1');
  const confirmBtn = $('input[value="確認画面へ"]');
  const btnContainer = confirmBtn.closest('.btn_01');

  if (checkbox.is(':checked')) {
    btnContainer.removeClass('disabled');
    confirmBtn.prop('disabled', false);
  } else {
    btnContainer.addClass('disabled');
    confirmBtn.prop('disabled', true);
  }
}

// プライバシーポリシーチェックボックスのイベントリスナー
$(document).on('change', '#agree-1', function () {
  checkPrivacyPolicy();
  // チェック状態をローカルストレージに保存
  saveFormState();
});

// フォームの状態をローカルストレージに保存
function saveFormState() {
  const formData = {};

  // チェックボックスの状態を保存
  formData.privacyPolicy = $('#agree-1').is(':checked');

  // ラジオボタンの状態を保存
  formData.contactMethod = $('input[name="howto"]:checked').val();
  formData.inquiryType = $('input[name="detail"]:checked').val();

  // テキストフィールドの値を保存
  formData.company = $('#company').val();
  formData.section = $('#section').val();
  formData.shimei = $('#shimei').val();
  formData.mailAddress = $('#mail_address').val();
  formData.phoneNumber = $('#phone_number').val();
  formData.message = $('#message').val();

  localStorage.setItem('contactFormData', JSON.stringify(formData));
}

// フォームの状態をローカルストレージから復元
function restoreFormState() {
  const savedData = localStorage.getItem('contactFormData');
  if (savedData) {
    try {
      const formData = JSON.parse(savedData);

      // チェックボックスの状態を復元
      if (formData.privacyPolicy) {
        $('#agree-1').prop('checked', true);
      }

      // ラジオボタンの状態を復元
      if (formData.contactMethod) {
        $('input[name="howto"][value="' + formData.contactMethod + '"]').prop('checked', true);
      }
      if (formData.inquiryType) {
        $('input[name="detail"][value="' + formData.inquiryType + '"]').prop('checked', true);
      }

      // テキストフィールドの値を復元
      if (formData.company) $('#company').val(formData.company);
      if (formData.section) $('#section').val(formData.section);
      if (formData.shimei) $('#shimei').val(formData.shimei);
      if (formData.mailAddress) $('#mail_address').val(formData.mailAddress);
      if (formData.phoneNumber) $('#phone_number').val(formData.phoneNumber);
      if (formData.message) $('#message').val(formData.message);

    } catch (e) {
      console.log('Failed to restore form data:', e);
    }
  }
}

// フォーム送信時にデータを保存
$(document).on('submit', 'form', function () {
  saveFormState();
});

// 全てのフォーム要素の変更を監視して状態を保存
$(document).on('change input', 'input, textarea, select', function () {
  saveFormState();
});

$("#agreeCheck-1").on('click', function () {
  $("#inputContactForm").toggleClass("unlocked")
  $("#contactButton").toggleClass("unlocked")
});



$(function () {
  $('.B2-gallery ul, .about-gallery ul,.T1-gallery ul').slick({
    autoplay: true, // 自動でスクロール
    autoplaySpeed: 0, // 自動再生のスライド切り替えまでの時間を設定
    speed: 5000, // スライドが流れる速度を設定
    cssEase: "linear", // スライドの流れ方を等速に設定
    slidesToShow: 4, // 表示するスライドの数
    swipe: false, // 操作による切り替えはさせない
    arrows: false, // 矢印非表示
    infinite: true,
    pauseOnFocus: false, // スライダーをフォーカスした時にスライドを停止させるか
    pauseOnHover: false, // スライダーにマウスホバーした時にスライドを停止させるか
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2, // 画面幅750px以下でスライド2枚表示
        }
      }
    ]
  });
});


// スライダーの中のimg、クリックするとモーダル表示
const modal = $('#modal-container');
const img = modal.find('img');

// D3用モーダルの初期設定（背景が一瞬表示されるのを防ぐ）
modal.css({
  'opacity': '0',
  'visibility': 'hidden'
}).show();



$('img.popup').each(function () {
  $(this).click(function () {
    img.attr('src', $(this).attr('src'));
    modal.css('visibility', 'visible').animate({ opacity: 1 }, 300);
  });
});

modal.click(function () {
  $(this).animate({ opacity: 0 }, 300, function () {
    $(this).css('visibility', 'hidden');
  });
});

// サムネイルをクリックしたら左側の大きな画像を差し替え
$(document).on('click', '.B6-pin-img ul li img', function () {
  const newSrc = $(this).attr('src');
  $(this).closest('.B6-pin-img').find('.imgs img').attr('src', newSrc);
});

// ロゴの表示非表示制御
$(function () {
  const $logo = $('.header-logo');
  const $menu = $('.menu-btn');
  let lastScroll = 0;

  $(window).on('scroll', function () {
    if ($('body').hasClass('menu-open')) return;

    const currentScroll = $(this).scrollTop();

    if (currentScroll > lastScroll && currentScroll > 50) {
      // 下へスクロール → 非表示
      $logo.addClass('hide').removeClass('show');
      $menu.addClass('hide').removeClass('show');
    } else if (currentScroll < lastScroll) {
      // 上へスクロール → 表示（ふわっと）
      $logo.removeClass('hide').addClass('show');
      $menu.removeClass('hide').addClass('show');
    }

    lastScroll = currentScroll;
  });
});

// お問い合わせタブ切替
$(function () {
  $('.visit-menu__btn').on('click', function () {
    const index = $(this).parent().index(); // 0 = メールフォーム, 1 = お電話

    // タブの見た目切替
    $('.visit-menu ul li').removeClass('active');
    $(this).parent().addClass('active');

    // 表示切替
    if (index === 0) {
      $('.contact-mail').show();
      $('.contact-info').hide();
    } else {
      $('.contact-mail').hide();
      $('.contact-info').show();
    }
  });

  // 初期表示設定（初回読み込み時）
  $('.contact-mail').show();
  $('.contact-info').hide();
});

// スクロール時のふわっとアニメーションテキスト
(() => {
  function initFadeUp() {

    if (!document.body.classList.contains('home') && !document.body.classList.contains('frontpage')) {
      return; // ← トップページでなければ終了
    }
    const selectors = [
      '.wraps h3',
      '.T1-about-txt .wraps p',
      '.T1-message p',
      '.T1-pro h2',
      '.T1-pro p',
      '.btn_02',
      '.btn_01C a',
      '.T1-company-txt .txt',
      '.T1-company-txt h2',
      '.T1-work-txt h2',
      '.T1-work-txt .txt',
      '.T1-shop h2',
      '.T1-shop p',
      '.T1-info-wrap-search img',
      '.T1-info-wrap-txt',
      '.T1-info-wrap-omofan img',
      '.T1-info-wrap-txt p',
      '.btn_02 a',
      '.mv-catch', // MVタイトルも対象
    ];

    const targets = [];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('fade-up');
        targets.push(el);
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(el => {
      if (el.matches('.mv-catch h2')) {
        el.classList.add('active'); // ← MVだけ即時
      } else {
        observer.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFadeUp);
  } else {
    initFadeUp();
  }
})();

// プライバシーポリシーページのh2.low-mvのスマホフォントサイズ制御
$(function () {
  function adjustPrivacyPolicyFontSize() {
    // プライバシーポリシーという文字列が含まれるh2.low-mvを検索
    const $h2Elements = $('.low-mv h2');

    $h2Elements.each(function () {
      if ($(this).text().includes('プライバシーポリシー')) {
        // スマホサイズ（780px以下）かどうかをチェック
        if ($(window).width() <= 780) {
          $(this).css('font-size', '30px');
        } else {
          // スマホサイズでない場合は元のスタイルに戻す
          $(this).css('font-size', '');
        }
      }
    });
  }

  // 初期実行
  adjustPrivacyPolicyFontSize();

  // ウィンドウリサイズ時も実行
  $(window).resize(function () {
    adjustPrivacyPolicyFontSize();
  });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

//=====================================================================================================================================================================

$(window).on('scroll', function () {
  //================================================
  function isInViewport(element) {
    const elTop = $(element).offset().top;
    const elBottom = elTop + $(element).outerHeight();

    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elBottom > viewportTop && elTop < viewportBottom;
  }

  if (isInViewport('#scroll_meta')) {
    $('.mv-catch').addClass('position_fixed');
  }

  //===============================================

  var scrollTrigger_size = 10;
  var windowScroll = $(window).scrollTop();
  if (windowScroll > scrollTrigger_size) {
    $('.mv-catch-txt').addClass('mv-move-size');
  } else {
    $('.mv-catch-txt').removeClass('mv-move-size');
  }




  //=========================================

  function onScrollDirection(callback) {
    let lastScrollTop = 0;

    $(window).on("scroll", function () {
      let currentScroll = $(this).scrollTop();
      let direction = currentScroll > lastScrollTop ? "down" : "up";

      if (currentScroll !== lastScrollTop) {
        callback(direction, currentScroll);
      }

      lastScrollTop = currentScroll;
    });
  }

  //======================================

  const mv_catch = $('#mv-catch').offset().top;
  const mv_catch_height = $('#mv-catch').outerHeight();
  const wrpas_1 = $('#wraps-1').offset().top;

  const mv_catch_wrpas_1 = parseInt(wrpas_1 - (mv_catch + mv_catch_height));

  if (mv_catch_wrpas_1 < 82 && mv_catch_wrpas_1 > 0) {
    if (mv_catch_height > 95) {
      $('.mv-catch').css('position', 'absolute');
      $('.mv-catch').css('top', mv_catch);
    }
    $('.mv-catch').css('position', 'absolute');
    $('.mv-catch').css('top', mv_catch);
    if (mv_catch_wrpas_1 < 0) $('.mv-catch').css('top', mv_catch + mv_catch_wrpas_1);
  }

  let rect = $('#mv-catch')[0].getBoundingClientRect();

  if (rect.top > $(window).height() * 0.5) {
    $('.mv-catch').css('position', 'fixed');
    $('.mv-catch').css('top', 0.5 * $(window).height());
  }

  if (isInViewport("#cool")) {
    $('.fade-up-1').addClass('active');
  } else {
    console.log("Element is not visible");
    $('.fade-up-1').removeClass('active');
  }
  const T1_about_bottom = $('.T1-about').outerHeight() * 0.15;
  const cool_top = $('#cool').offset().top;
  const T1_about_top = $('.T1-about').offset().top + $('.T1-about').outerHeight();
  console.log(cool_top);
  console.log(T1_about_top);

  let rect_cool = $('#cool')[0].getBoundingClientRect();

  if (!isInViewport('#hidden') && isInViewport('#T1-jigyo') || isInViewport('#T1-company-hidden')) {
    $('#cool').css('color', '#fff');
  } else {
    $('#cool').css('color', '#71afaf');
  }

  const T1_pro_top = $('.T1-pro').offset().top;
  const T1_company_top = $('.T1-company').offset().top;
  if (windowScroll > T1_pro_top) {
    $('#card_1').addClass('card_1-fixed');
    $('#card_2').css('margin-top', $('#card_1').outerHeight());
    $('.T1-jigyo').css('background-color', 'transparent');
  } else if (windowScroll < T1_about_top) {
    $('#card_1').removeClass('card_1-fixed');
    $('#card_2').css('margin-top', '0');
    $('.T1-jigyo').css('background-color', '#fff');
  }

  //========== カードごとの流れ =====================
  if (isInViewport('#T1-company')) {
    $('.hidden_card').css('display', 'block');
    $('#T1-company').css('margin-top', '0px');
    $('.T1-about-img').css('display', 'none');
  } else {
    if ($(window).width() > 768) {
      $('.hidden_card').css('display', 'none');
      $('#T1-company').css('margin-top', '100vh');
      $('.T1-about-img').css('display', 'block');
    }
  }
  console.log(isInViewport('#T1-pro'));

  const margin_left = $(window).width() - $('.T1-company-img').outerWidth();
  if ($(window).width() > 768) {

    if (isInViewport('#T1-company')) {
      if (!isInViewport('#T1-company-hidden')) {
        $("#T1-company-txt-1").css('position', 'fixed');
        $("#T1-company-txt-1").css('top', '120px');
        $("#T1-company-txt-1").css('left', '50px');
        $("#T1-company-txt").css('display', 'block');
        $("#T1-company-txt").css('visibility', 'hidden');
      } else {
        $("#T1-company-txt-1").css('position', 'absolute');
        $("#T1-company-txt-1").css('top', '120px');
        $("#T1-company-txt-1").css('left', '50px');
        $("#T1-company-txt").css('display', 'block');
        $("#T1-company-txt").css('visibility', 'hidden');
      }
      if (isInViewport('#T1-gallery')) {
        $("#T1-company-txt-1").css('position', 'absolute');
        $("#T1-company-txt-1").css('top', 'auto');
        $("#T1-company-txt-1").css('bottom', '250px');
        $("#T1-company-txt-1").css('left', '50px');
      }
    }
  }
});