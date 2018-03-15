function showPage(index) {
  console.log('show page no.' + index);
  $('.main').toggleClass('main--compressed');
  $('.main__container').toggleClass('main__container--compressed');
  $('.nav__list').toggleClass('nav__list--compressed');
  $('.main__input').toggleClass('main__input--compressed');
  $('.main__subtitle').toggleClass('main__input--compressed');
  let pageid = '#page-'+ index;
  $('.page').hide();
  $(pageid).show();

  if(index==0) {
    $('#page-0').append($('#mappa'));
  }
}

$( document ).ready(function() {
  $('.page').hide();
});

window.onload = function() {

}
