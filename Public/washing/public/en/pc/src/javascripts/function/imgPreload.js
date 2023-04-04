function imgPreload() {
   function preloading(imageArray) {
      let imgNum = imageArray.length;
      for (let i = 0; i < imgNum; i++) {
         let img = new Image();
         img.src = imageArray[i];
      }
   }
   preloading([
      // common
      // './images/pc/common/back_btn_icon.png',
      // './images/pc/common/bg_bottom_deco.png',
      // './images/pc/common/bg_top_deco.png',
      // './images/pc/common/interactive_popup_bg_bottom_deco.png', 
      // './images/pc/common/interactive_popup_bg_top_deco.png',
      // './images/pc/common/next_btn_icon.png',
      // './images/pc/common/next_btn_icon2.png',
      // './images/pc/common/shop_now_character.png',
      // './images/pc/common/try_again_icon.png',
      // './images/common/video01_poster_img.jpg',

      // result
      // './images/pc/result/bg_unit.jpg',
      // './images/pc/result/center_img01.png',
      // './images/pc/result/center_img02.png',
      // './images/pc/result/center_img03.png',
      // './images/pc/result/center_img04.png',
      // './images/pc/result/center_img05.png',

      // step01
      // './images/pc/step01/btn_icon01.png',
      // './images/pc/step01/btn_icon01_on.png',
      // './images/pc/step01/btn_icon02.png',
      // './images/pc/step01/btn_icon02_on.png',
      // './images/pc/step01/btn_icon03.png',
      // './images/pc/step01/btn_icon03_on.png',
      // './images/pc/step01/btn_icon04.png',
      // './images/pc/step01/btn_icon04_on.png',
      // './images/pc/step01/btn_icon05.png',
      // './images/pc/step01/btn_icon05_on.png',
      // './images/pc/step01/popup_contents_img01.png',
      // './images/pc/step01/popup_contents_img02.png',
      // './images/pc/step01/popup_contents_img03.png',
      // './images/pc/step01/popup_contents_img04.png',
      // './images/pc/step01/popup_contents_img05.png',
      // './images/pc/step01/popup_icon01.png',
      // './images/pc/step01/popup_icon02.png',
      // './images/pc/step01/popup_icon03.png',
      // './images/pc/step01/popup_icon04.png',
      // './images/pc/step01/popup_icon05.png',
      // './images/pc/step01/que_img00.png',
      // './images/pc/step01/que_img01.png',
      // './images/pc/step01/que_img01.png',
      // './images/pc/step01/que_img03.png',
      // './images/pc/step01/que_img04.png',
      // './images/pc/step01/que_img05.png',
      // './images/pc/step01/txt_bubble_icon.png',

      // step02
      // './images/pc/step02/btn_icon01.png',
      // './images/pc/step02/btn_icon01_on.png',
      // './images/pc/step02/btn_icon02.png',
      // './images/pc/step02/btn_icon02_on.png',
      // './images/pc/step02/btn_icon03.png',
      // './images/pc/step02/btn_icon03_on.png',
      // './images/pc/step02/btn_icon04.png',
      // './images/pc/step02/btn_icon04_on.png',
      // './images/pc/step02/disc_icon01.png',
      // './images/pc/step02/disc_icon02.png',
      // './images/pc/step02/disc_icon03.png',
      // './images/pc/step02/disc_icon04.png',
      // './images/pc/step02/people_icon.png',
      // './images/pc/step02/que_img01.png',
      // './images/pc/step02/que_img02.png',
      // './images/pc/step02/que_img03.png',
      // './images/pc/step02/que_img04.png',
      // './images/pc/step02/que_img05.png',
      // './images/pc/step02/txt_bubble_icon.png',

      // step03
      // './images/pc/step03/caution_icon.png',
      // './images/pc/step03/disc_icon01.png',
      // './images/pc/step03/popup_img01_1.jpg',
      // './images/pc/step03/popup_img01_2.jpg',
      // './images/pc/step03/popup_img02_1.jpg',
      // './images/pc/step03/popup_img02_2.jpg',
      // './images/pc/step03/popup_img03_1.jpg',
      // './images/pc/step03/popup_img04_1.jpg',
      // './images/pc/step03/popup_img05_1.jpg',
      // './images/pc/step03/popup_img05_2.jpg',

      // step04
      // './images/pc/step04/btn_icon01.png',
      // './images/pc/step04/btn_icon02.png',
      // './images/pc/step04/btn_icon03.png',
      // './images/pc/step04/que_img01.png',
      // './images/pc/step04/que_img02.png',
      // './images/pc/step04/que_img03.png',
      // './images/pc/step04/que_img04.png',

      // step05
      // './images/pc/step05/btn_icon01.png',
      // './images/pc/step05/btn_icon02.png',
      // './images/pc/step05/btn_icon03.png',
      // './images/pc/step05/btn_icon04.png',
      // './images/pc/step05/que_img01.png',
      // './images/pc/step05/que_img02.png',
      // './images/pc/step05/que_img03.png',
      // './images/pc/step05/que_img04.png',
      // './images/pc/step05/que_img05.png',

      // step06
      // './images/pc/step06/american_black_popup_img.png',
      // './images/pc/step06/american_que_img01.png',
      // './images/pc/step06/american_que_img02.png',
      // './images/pc/step06/american_que_img03.png',
      // './images/pc/step06/american_que_img04.png',
      // './images/pc/step06/american_silver_popup_img.png',
      // './images/pc/step06/american_steel_popup_img.png',
      // './images/pc/step06/american_white_popup_img.png',
      // './images/pc/step06/double_beige_popup_img.png',
      // './images/pc/step06/double_black_popup_img.png',
      // './images/pc/step06/double_que_img01.png',
      // './images/pc/step06/double_que_img02.png',
      // './images/pc/step06/double_que_img03.png',
      // './images/pc/step06/double_que_img04.png',
      // './images/pc/step06/double_que_img05.png',
      // './images/pc/step06/double_silver_popup_img.png',
      // './images/pc/step06/double_steel_popup_img.png',
      // './images/pc/step06/double_white_popup_img.png',
      // './images/pc/step06/lader_black_popup_img.png',
      // './images/pc/step06/lader_que_img01.png',
      // './images/pc/step06/lader_que_img02.png',
      // './images/pc/step06/lader_que_img03.png',
      // './images/pc/step06/lader_que_img04.png',
      // './images/pc/step06/lader_silver_popup_img.png',
      // './images/pc/step06/lader_steel_popup_img.png',
      // './images/pc/step06/lader_white_popup_img.png',
      // './images/pc/step06/multi_black_popup_img.png',
      // './images/pc/step06/multi_que_img01.png',
      // './images/pc/step06/multi_que_img02.png',
      // './images/pc/step06/multi_que_img03.png',
      // './images/pc/step06/multi_que_img04.png',
      // './images/pc/step06/multi_silver_popup_img.png',
      // './images/pc/step06/multi_steel_popup_img.png',
      // './images/pc/step06/multi_white_popup_img.png',
      // './images/pc/step06/tall_beige_popup_img.png',
      // './images/pc/step06/tall_black_popup_img.png',
      // './images/pc/step06/tall_que_img01.png',
      // './images/pc/step06/tall_que_img02.png',
      // './images/pc/step06/tall_que_img03.png',
      // './images/pc/step06/tall_que_img04.png',
      // './images/pc/step06/tall_que_img05.png',
      // './images/pc/step06/tall_silver_popup_img.png',
      // './images/pc/step06/tall_steel_popup_img.png',
      // './images/pc/step06/tall_white_popup_img.png',
   ]);
}