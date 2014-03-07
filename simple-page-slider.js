/**
* simple-page-slider.js
* https://github.com/adnantopal/simple-page-slider
* Author: @adnantopal
* Copyright 2014, Adnan Topal (atopal.com)
* Licensed under the MIT license.
*/
var simplePageSlider = (function(){
    var hashHistory = [$('.page').first().attr('id')];

    return {
        changePage: function(to) {
            var animationEndEvents = "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
                currentPage = $('.page.page-active'),
                currentPageID = currentPage.attr('id'),
                nextPage = to === '' ? $('.page').first() : $(window.location.hash),
                nextPageID = nextPage.attr('id'),
                curSlide, nextSlide;

            if (nextPageID === hashHistory[hashHistory.length-2]) {
                hashHistory.pop();
                curSlide = 'slideOutRight';
                nextSlide = 'slideInRight';
            } else {
                hashHistory.push(nextPageID);
                curSlide = 'slideOutLeft';
                nextSlide = 'slideInLeft';
            }

            if (currentPage.length > 0 && currentPageID !== nextPageID) {
                currentPage.attr('class', 'page page-active ' + curSlide);
                nextPage.attr('class', 'page page-active ' + nextSlide);

                currentPage.one(animationEndEvents, function(e) {
                    $(e.target).removeClass('page-active slideInLeft slideInRight slideOutLeft slideOutRight');
                });
                nextPage.one(animationEndEvents, function(e) {
                    $(e.target).removeClass('slideInLeft slideInRight slideOutLeft slideOutRight');
                });
            } else {
                nextPage.attr('class', 'page page-active');
            }
        }
    }
}());