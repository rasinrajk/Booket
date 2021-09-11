$(function () {
  'use strict'
  const psSidebarBody = new PerfectScrollbar('#dpSidebarBody', {
    suppressScrollX: true
  });
  $(".nav-sidebar .with-sub").on("click", function(e) {
    e.preventDefault();

    $(this)
      .parent()
      .toggleClass("show");
    $(this)
      .parent()
      .siblings()
      .removeClass("show");
  });

  $(".burger-menu:first-child").on("click", function(e) {
    e.preventDefault();
    $("body").toggleClass("toggle-sidebar");
  });
  $('.header-search .form-control').on('focusin', function (e) {
    $(this).parent().addClass('active');
  })

  $('.header-search .form-control').on('focusout', function (e) {
    $(this).parent().removeClass('active');
  })


})