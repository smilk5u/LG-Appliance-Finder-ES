function popupSlide() {
   /* Step 3 Size Slide */
   $('#popup_size').find('.popup_cont').each(function (i) {
      let sizePopupContent = `#popup_size .popup_cont:nth-of-type(${i + 1})`
      new Swiper(sizePopupContent, {
         pagination: {
            el: `#popup_size .popup_cont:nth-of-type(${i + 1}) .indicator`,
         },
         observe: true,
         effect: "fade"
      });
   });
}

