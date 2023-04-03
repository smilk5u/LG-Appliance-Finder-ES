function popupSlide() {
   /* Step 3 Size Slide */
   $('#popupSize').find('.popup_cont').each(function (i) {
      let sizePopupContent = `#popupSize .popup_cont:nth-of-type(${i + 1})`
      new Swiper(sizePopupContent, {
         pagination: {
            el: `#popupSize .popup_cont:nth-of-type(${i + 1}) .indicator`,
         },
         observe: true,
         effect: "fade" 
      });
   });
}

