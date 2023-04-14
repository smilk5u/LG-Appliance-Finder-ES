"use strict";
/* Element */
const $applianceFinder = $('#applianceFinder'),
   $finderMain = $applianceFinder.find('#finderMain'),
   $selectWrap = $applianceFinder.find('#selectWrap'),
   $selectContainer = $applianceFinder.find('#selectWrap ol'),
   $selectButton = $applianceFinder.find('#selectWrap ol li'),
   $qnaImgWrap = $applianceFinder.find('#qnaImgWrap'),
   $qnaWrap = $applianceFinder.find('.qna_wrap'),
   $description = $applianceFinder.find('.qna_description'),
   $descHeadWrap = $applianceFinder.find('.qna_description01'),
   $descDetailWrap = $applianceFinder.find('.qna_description02'),
   $descIcon = $applianceFinder.find('.qna_description01 .txt_box i'),
   $descHead = $applianceFinder.find('.qna_description01 .txt_box p'),
   $descDetail = $applianceFinder.find('.qna_description02 .txt_box p'),
   $centerImgWrap = $applianceFinder.find('.center_img_wrap'),
   $introAnimation = $applianceFinder.find("#introAnimation"),
   $subContain = $applianceFinder.find('.sub_contain'),
   $queTitle = $applianceFinder.find('.que_title'),
   $finderResult = $applianceFinder.find('#finderResult');

/* Popup */
const $popupSize = $applianceFinder.find('#popupSize'),
   $popupMovie = $applianceFinder.find('#popupMovie');

/* Button */
const $nextBtn = $applianceFinder.find('#nextStepBtn'),
   $backBtn = $applianceFinder.find('#backStepBtn'),
   $showNow = $applianceFinder.find('#shopNowBtn'),
   $finalShowNow = $applianceFinder.find('#finalShowNow'),
   $tryAgain = $applianceFinder.find('#tryAgain'),
   $detailCloseBtn = $applianceFinder.find('#detailCloseBtn'),
   $popupClose = $applianceFinder.find('.popup_close_btn'),
   $interactionClose = $applianceFinder.find('.close_btn'),
   $loadMoreBtn = $applianceFinder.find('.load_more_btn'),
   $learnMoreBtn = $applianceFinder.find('.learn_more_btn');

/* Select All */
const SELECTALL = 'SELECTALL';

/* AnyThing */
const ANYTHING = 'ANYTHING';

/* Text */
const multipleSelectionContent = 'Puedes seleccionar multiples opciones.'; 
const selectAllContent = 'Todas las opciones';
const anythingContent = 'No estoy seguro.<br> Muéstrame todos los modelos.';
const nextContent = 'SIGUIENTE';
const nextLastContent = 'Casi hemos acabado'; 

let imgPath; // Images Path

/* Current */
let idx = 0;  // Index
let currentStructural; // Mark Up
let currentStep; // Number
let questionText; // Question
let defaultScreenImg; // Default Screen Image

let resultPageUrl; // Result Page Url
let stageLiveDecide; // Live & Staging Boolean
let currentUrl = document.location.href;  // Current Url

let crrSelOption = [];
let enabledOptions = 0; // Button All Count
let activeOption = 0; // Active Count

/* Tagging */
let stageIdx; // Index
let modelDescription; // Model Description
let stageLinkName; // Link Name


/* Spec Sit Product Value */
const productSpec = {
   'product1': ['MULTI', 'CAPACITY_UNDER_400L', 'DEPTH_UNDER_760MM', 'WIDTH_UNDER_600MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'PLUMBED', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'BLACK'],
   'product2': ['MULTI', 'CAPACITY_SPACE_500L_600L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_610MM_800MM', 'HEIGHT_UNDER_1800MM', 'WATER_ONLY', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_D', 'BLACK'],
   'product3': ['AMERICAN', 'CAPACITY_SPACE_400L_500L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_810MM_900MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'PLUMBED', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'STAINLESS'],
   'product4': ['AMERICAN', 'CAPACITY_SPACE_400L_500L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_610MM_800MM', 'HEIGHT_2000L_OR_MORE', 'NON_PLUMBED', 'INSTAVIEW', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'SILVER'],
   'product5': ['TALL', 'CAPACITY_SPACE_500L_600L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_610MM_800MM', 'HEIGHT_UNDER_1800MM', 'NON_PLUMBED', 'INSTAVIEW', 'THINKQ', 'DOOR_COOLING', 'WINE_RACK', 'ENERGY_GRADE_A', 'SILVER'],
   'product6': ['TALL', 'CAPACITY_SPACE_500L_600L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_910MM_OR_MORE', 'HEIGHT_SPANCE_1800MM_2000MM', 'NON_PLUMBED', 'INSTAVIEW', 'DOOR_COOLING', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_B', 'WHITE'],
   'product7': ['DOUBLE', 'CAPACITY_SPACE_500L_600L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_910MM_OR_MORE', 'HEIGHT_2000L_OR_MORE', 'NON_PLUMBED', 'INSTAVIEW', 'WINE_RACK', 'FOLDING_SHELF', 'ENERGY_GRADE_A', 'WHITE'],
   'product8': ['LADER', 'CAPACITY_600L_OR_MORE', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_810MM_900MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'WATER_ONLY', 'DOOR_COOLING', 'WINE_RACK', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_B', 'SILVER'],
   'product9': ['LADER', 'CAPACITY_600L_OR_MORE', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_810MM_900MM', 'HEIGHT_2000L_OR_MORE', 'WATER_ONLY', 'INSTAVIEW', 'THINKQ', 'WINE_RACK', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_C', 'SILVER'],
}

/* Parameters Key Value */
const resultParamSet = {
   /* Type */
   Type: {
      MULTI: 'MULTI_P',
      AMERICAN: 'AMERICAN_P',
      TALL: 'TALL_P',
      DOUBLE: 'DOUBLE_P',
      LADER: 'LADER_P',
   },
   /* Capacity */
   Capacity: {
      CAPACITY_UNDER_400L: 'CAPACITY_UNDER_400L_P',
      CAPACITY_SPACE_400L_500L: 'CAPACITY_SPACE_400L_500L_P',
      CAPACITY_SPACE_500L_600L: 'CAPACITY_SPACE_500L_600L_P',
      CAPACITY_600L_OR_MORE: 'CAPACITY_600L_OR_MORE_P',
   },
   /* Depth */
   Depth: {
      DEPTH_UNDER_760MM: 'DEPTH_UNDER_760MM_P',
   },
   /* Width */
   Width: {
      WIDTH_UNDER_600MM: 'WIDTH_UNDER_600MM_P',
      WIDTH_SPANCE_610MM_800MM: 'WIDTH_SPANCE_610MM_800MM_P',
      WIDTH_SPANCE_810MM_900MM: 'WIDTH_SPANCE_810MM_900MM_P',
      WIDTH_SPANCE_910MM_OR_MORE: 'WIDTH_SPANCE_910MM_OR_MORE_P',
   },
   /* Height */
   Height: {
      HEIGHT_UNDER_1800MM: 'HEIGHT_UNDER_1800MM_P',
      HEIGHT_SPANCE_1800MM_2000MM: 'HEIGHT_SPANCE_1800MM_2000MM_P',
      HEIGHT_2000L_OR_MORE: 'HEIGHT_2000L_OR_MORE_P',
   },
   /* Feature */
   Feature: {
      PLUMBED: 'PLUMBED_P',
      NON_PLUMBED: 'NON_PLUMBED_P',
      WATER_ONLY: 'WATER_ONLY_P',
      PURE_N_FRESH: 'PURE_N_FRESH_P',
      INSTAVIEW: 'INSTAVIEW_P',
      DOOR_COOLING: 'DOOR_COOLING_P',
      WINE_RACK: 'WINE_RACK_P',
      FOLDING_SHELF: 'FOLDING_SHELF_P',
      REVERSIBLE_DOOR: 'REVERSIBLE_DOOR_P',
   },
   /* THINKQ */
   THINKQ: {
      THINKQ: 'THINKQ_P',
   },
   /* Energy Grade */
   Energy: {
      ENERGY_GRADE_A: 'ENERGY_GRADE_A_P',
      ENERGY_GRADE_B: 'ENERGY_GRADE_B_P',
      ENERGY_GRADE_C: 'ENERGY_GRADE_C_P',
      ENERGY_GRADE_D: 'ENERGY_GRADE_D_P',
      ENERGY_GRADE_E: 'ENERGY_GRADE_E_P',
      ENERGY_GRADE_F: 'ENERGY_GRADE_F_P',
   },
   /* Color */
   Color: {
      BLACK: 'BLACK_P',
      STAINLESS: 'STAINLESS_P',
      SILVER: 'SILVER_P',
      WHITE: 'WHITE_P',
      BEIGE: 'BEIGE_P',
   },
}

/* Config Data */
const configData = {
   step01: {
      questionText: '¿Qué tipo de Frigorífico Congelador está buscando?',
      defaultScreenImg: 'step01/que_img00.png',
      singleOption: true, // 단일 옵션
      resultContent: true,
      option: [
         {
            value: 'MULTI',
            content: 'American Combi',
            relevantData: {
               description: 'Varias puertas con un frigorífico muy amplio en la parte superior y congelador en la parte de abajo.',
               qnaScreenImg: 'step01/que_img01.png',
               interactionPage: 'multi',
            },
            saveImg: {
               class: 'multi',
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step07/multi_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: 'AMERICAN',
            content: 'Side By Side',
            relevantData: {
               description: 'Frigorífico con dos puertas, con frigorífico y congelador uno al lado del otro.',
               qnaScreenImg: 'step01/que_img02.png',
               interactionPage: 'american',

            },
            saveImg: {
               class: 'american',
               changeScreenImg: 'step02/que_img02.png',
               lastScreenImg: 'step07/american_que_img04.png',
               resultImg: 'result/center_img02.png',
            }
         },
         {
            value: 'TALL',
            content: 'Combi',
            relevantData: {
               description: 'Un modelo estilizado con frigorífico arriba y congelador abajo.',
               qnaScreenImg: 'step01/que_img03.png',
               interactionPage: 'tall',
            },
            saveImg: {
               class: 'tall',
               changeScreenImg: 'step02/que_img03.png',
               lastScreenImg: 'step07/tall_que_img04.png',
               resultImg: 'result/center_img03.png',
            }
         },
         {
            value: 'DOUBLE',
            content: 'Dos puertas',
            relevantData: {
               description: 'Un modelo de dos puertas con un congelador en la parte superior y un frigorífico en la inferior',
               qnaScreenImg: 'step01/que_img04.png',
               interactionPage: 'double',
            },
            saveImg: {
               class: 'double',
               changeScreenImg: 'step02/que_img04.png',
               lastScreenImg: 'step07/double_que_img04.png',
               resultImg: 'result/center_img04.png',
            }
         },
         {
            value: 'LADER',
            content: 'Frigorífico y Congelador (1 puerta)',
            relevantData: {
               description: 'Una solución inteligente para quienes necesitan un congelador independiente por motivos de espacio o comodidad. ',
               qnaScreenImg: 'step01/que_img05.png',
               interactionPage: 'lader',
            },
            saveImg: {
               class: 'lader',
               changeScreenImg: 'step02/que_img05.png', 
               lastScreenImg: 'step07/lader_que_img04.png',
               resultImg: 'result/center_img05.png',
            }
         },
      ]
   },
   step02: {
      questionText: '¿Qué capacidad necesita?',
      allSelectOption: true,
      option: [
         {
            value: 'CAPACITY_UNDER_400L',
            content: 'Por debajo de 400L',
            relevantData: {
               description: 'Una opción práctica para el uso poco frecuente del frigoríficor o para las personas que compran pequeñas cantidades de alimentos cada vez.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: 'NOTaDATA',
            content: '400–500 L',
            relevantData: {
               description: 'Capacidad indicada para familias pequeñas que consumen alimentos con rapidez',
               icon: 'step02/disc_icon02.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_400L_500L',
            content: '500–600 L',
            relevantData: {
               description: 'Una opción muy elegida por muchos hogares',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_500L_600L',
            content: '600–700 L',
            relevantData: {
               description: 'Una buena elección para hogares grandes o con grandes necesidades de espacio de almacenamiento',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_500L_6a00L',
            content: '700 L o más',
            relevantData: {
               description: 'Para quienes hacen muchas compras o comparten el frigorífico con otras personas.',
               icon: 'step02/disc_icon04.png',
            }
         },
      ]
   },
   step03: {
      questionText: '¿Qué tamaño se adapta mejor a su espacio?',
      relevantData: {
         description: {
            head: 'Guía para medir el hueco necesario para tu frigorífico.',
            detail: 'Calcula que hueco necesitas para tu frigorífico. Las puertas necesitan (25-50mm) de espacio para abrirse y ventilarse. Todos los frigoríficos LG se adaptan al fondo de la encimera. Se desaconseja instalar cerca de zonas frías o calientes.'
         },
         additionalDesc: true,
         icon: 'step03/disc_icon01.png',
      },
      subStep: {
         'Fondo': {
            option: [
               {
                  value: 'DEPTH_UNDER_760MM',
                  content: 'Menos de 76 cm',
               },
               {
                  value: 'NOTDATA',
                  content: '76 cm o más',
               },
            ],
         },
         'Ancho': {
            allSelectOption: true,
            option: [
               {
                  value: 'WIDTH_SPANCE_610MM_800MM',
                  content: 'Menos de 60 cm',
               },
               {
                  value: 'WIDTH_SPANCE_810MM_900MM',
                  content: '61-90 cm',
               },
               {
                  value: 'WIDTH_SPANCE_910MM_OR_MORE',
                  content: 'Más de 91 cm',
               },
            ],
         },
         'Alto': {
            allSelectOption: true,
            option: [
               {
                  value: 'HEIGHT_UNDER_1800MM',
                  content: 'Menos de 180 cm',
               },
               {
                  value: 'HEIGHT_SPANCE_1800MM_2000MM',
                  content: '180-195 cm',
               },
               {
                  value: 'HEIGHT_2000L_OR_MORE',
                  content: 'Más de 195 cm',
               },
            ],
         },
      }
   },
   step04: {
      questionText: '¿Necesitas un frigorífico <br> con dispensador de hielo y agua?',
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      anythingOption: true,
      option: [
         /* Ice & Water Dispenser (Plumbed) */
         {
            value: 'Wasserspender',
            content: 'Dispensador de hielo y agua <br> (con toma de agua)',
            relevantData: {
               description: 'Dispensa agua y hielo sin necesidad de rellenar el depósito de agua.',
               qnaScreenImg: 'step04/que_img02.png',
            },            
         },
         /* Ice & Water Dispenser (Non-Plumbed) */
         {
            value: 'Festwasseranschluss',
            content: 'Dispensador de hielo y agua <br> (sin toma de agua)',
            relevantData: {
               description: {
                  head: 'Con Depósito de agua rellenable conectado al dispensador.',
                  detail: 'Si no puede conectarse a una toma de agua, los frigoríficos sin toma  tienen un depóstito de agua rellenable conectado al dispensador de agua de la puerta.'
               },
               // additionalDesc: true,
               qnaScreenImg: 'step04/que_img03.png',
            },
         },
         /* Water Only Dispenser (Non-Plumbed) */
         {
            value: 'ohne',
            content: 'Dispensador de agua <br> (sin toma de agua)',
            relevantData: {
               description: {
                  head: 'Disfrute de agua fría directamente de su frigorífico.',
                  detail: 'Una forma práctica de disfrutar de agua fría del frigorífico  a través del depósito de agua rellenable incorporado.'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
   step05: {
      questionText: '¿Qué eficiencia quieres que tenga  tu frigorífico?',
      defaultScreenImg: 'step05/que_img01.png',
      allSelectOption: true,
      resultContent: true,
      anythingOption: true,
      option: [
         /* Over A-10% Energy Efficiency */
         {
            value: 'eficiencia',
            content: 'Más de un 10% de eficiencia energética',
            relevantData: {
               description: 'Al menos un 10% más eficiente que los modelos A',
               qnaScreenImg: 'step05/que_img02.png',
            },
         },
         /* Energy Grade A */
         {
            value: 'Effizienzklasse',
            content: 'Eficiencia energética A',
            relevantData: {
               description: 'Clasificiación A, la más eficiente en la escala de clasificación energética de la UE (de la A a la G) que ofrece LG Inverter Linear Compressor™.',
               qnaScreenImg: 'step05/que_img03.png',
            }
         },
         /* Not grade A but with good efficiency */
         {
            value: 'siendo',
            content: 'Otra eficiencia que no sea A, </br>pero eficiente',
            relevantData: {
               description: 'Menos eficiente que la clase A pero que siga siendo una buena eficiencia',
               qnaScreenImg: 'step05/que_img04.png',
            }
         },
      ]
   },
   step06: {
      questionText: '¿Qué otros detallaes del frigorífico son importantes para ti?',
      defaultScreenImg: 'step06/que_img01.png',
      allSelectOption: true,
      resultContent: true,
      anythingOption: true,
      option: [
         /* Smart/AI features */
         {
            value: 'Smart',
            content: 'Funciones inteligentes/AI',
            relevantData: {
               description: "Un asistente inteligente para diversas tareas domésticas.",
               qnaScreenImg: 'step06/que_img02.png',
               videoPopup: 'smart_ai_thinkQ',
            }
         },
         /* Ventilation */
         {
            value: 'Belüftung',
            content: 'Ventilación',
            relevantData: {
               description: 'Pure N Fresh minimiza los olores de los alimentos y mantiene el aire fresco dentro de tu frigorífico.',
               qnaScreenImg: 'step06/que_img03.png',
               videoPopup: 'ventilation_pure_N_fresh',
            }
         },
         /* InstaView™ Door-in-Door® */
         {
            value: 'InstaView',
            content: 'InstaView™ Door-in-Door®',
            relevantData: {
               description: 'Haz toc toc para ver el interior mientras mantienes la freescura y ahorras energía.',
               qnaScreenImg: 'step06/que_img04.png',
               videoPopup: 'instaview',
            }
         },
      ]
   },
   step07: {
      questionText: '¿Qué color prefieres?',
      allSelectOption: true,
      resultContent: true,
      productColorImg: ['_black_popup_img', '_white_popup_img', '_steel_popup_img', '_silver_popup_img'], // step06 인터렉션 페이지 컬러매칭 이미지 뿌리기
      option: [
         /* Black  */
         {
            value: 'BLACK',
            content: 'Negro',
            relevantData: {
               description: 'Un color elegante y con estilo, llamativo y lujoso.',
               qnaScreenImg: 'que_img01.png',
               interactionPage: 'black',
            }
         },
         /* White  */
         {
            value: 'WHITE',
            content: 'Blanco',
            relevantData: {
               description: 'Un color agradable que se adapte a cualquier ambiente',
               interactionPage: 'white',
               qnaScreenImg: 'que_img04.png',
            }
         },
         /* Stainless steel */
         {
            value: 'STAINLESS',
            content: 'Acero inoxidable',
            relevantData: {
               description: 'Un color elegante pero que sea fácil de mantener',
               interactionPage: 'stainless',
               qnaScreenImg: 'que_img02.png',
            }
         },
         /* Silver */
         {
            value: 'SILVER',
            content: 'Plateado',
            relevantData: {
               description: 'Complemento de diversos estilos, los plateados añaden estilo a tu cocina.',
               interactionPage: 'silver',
               qnaScreenImg: 'que_img03.png',
            }
         },
      ]
   },
}

popupSlide();
main();
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
      './images/pc/common/back_btn_icon.png',
      './images/pc/common/bg_bottom_deco.png',
      './images/pc/common/bg_top_deco.png',
      './images/pc/common/interactive_popup_bg_bottom_deco.png', 
      './images/pc/common/interactive_popup_bg_top_deco.png',
      './images/pc/common/next_btn_icon.png',
      './images/pc/common/next_btn_icon2.png',
      './images/pc/common/shop_now_character.png',
      './images/pc/common/try_again_icon.png',
      './images/common/video01_poster_img.jpg',

      // result
      './images/pc/result/bg_unit.jpg',
      './images/pc/result/center_img01.png',
      './images/pc/result/center_img02.png',
      './images/pc/result/center_img03.png',
      './images/pc/result/center_img04.png',
      './images/pc/result/center_img05.png',

      // step01
      './images/pc/step01/btn_icon01.png',
      './images/pc/step01/btn_icon01_on.png',
      './images/pc/step01/btn_icon02.png',
      './images/pc/step01/btn_icon02_on.png',
      './images/pc/step01/btn_icon03.png',
      './images/pc/step01/btn_icon03_on.png',
      './images/pc/step01/btn_icon04.png',
      './images/pc/step01/btn_icon04_on.png',
      './images/pc/step01/btn_icon05.png',
      './images/pc/step01/btn_icon05_on.png',
      './images/pc/step01/popup_contents_img01.png',
      './images/pc/step01/popup_contents_img02.png',
      './images/pc/step01/popup_contents_img03.png',
      './images/pc/step01/popup_contents_img04.png',
      './images/pc/step01/popup_contents_img05.png',
      './images/pc/step01/popup_icon01.png',
      './images/pc/step01/popup_icon02.png',
      './images/pc/step01/popup_icon03.png',
      './images/pc/step01/popup_icon04.png',
      './images/pc/step01/popup_icon05.png',
      './images/pc/step01/que_img00.png',
      './images/pc/step01/que_img01.png',
      './images/pc/step01/que_img01.png',
      './images/pc/step01/que_img03.png',
      './images/pc/step01/que_img04.png',
      './images/pc/step01/que_img05.png',
      './images/pc/step01/txt_bubble_icon.png',

      // step02
      './images/pc/step02/btn_icon01.png',
      './images/pc/step02/btn_icon01_on.png',
      './images/pc/step02/btn_icon02.png',
      './images/pc/step02/btn_icon02_on.png',
      './images/pc/step02/btn_icon03.png',
      './images/pc/step02/btn_icon03_on.png',
      './images/pc/step02/btn_icon04.png',
      './images/pc/step02/btn_icon04_on.png',
      './images/pc/step02/disc_icon01.png',
      './images/pc/step02/disc_icon02.png',
      './images/pc/step02/disc_icon03.png',
      './images/pc/step02/disc_icon04.png',
      './images/pc/step02/people_icon.png',
      './images/pc/step02/que_img01.png',
      './images/pc/step02/que_img02.png',
      './images/pc/step02/que_img03.png',
      './images/pc/step02/que_img04.png',
      './images/pc/step02/que_img05.png',
      './images/pc/step02/txt_bubble_icon.png',

      // step03
      './images/pc/step03/caution_icon.png',
      './images/pc/step03/disc_icon01.png',
      './images/pc/step03/popup_img01_1.jpg',
      './images/pc/step03/popup_img01_2.jpg',
      './images/pc/step03/popup_img02_1.jpg',
      './images/pc/step03/popup_img02_2.jpg',
      './images/pc/step03/popup_img03_1.jpg',
      './images/pc/step03/popup_img04_1.jpg',
      './images/pc/step03/popup_img05_1.jpg',
      './images/pc/step03/popup_img05_2.jpg',

      // step04
      './images/pc/step04/btn_icon01.png',
      './images/pc/step04/btn_icon02.png',
      './images/pc/step04/btn_icon03.png',
      './images/pc/step04/que_img01.png',
      './images/pc/step04/que_img02.png',
      './images/pc/step04/que_img03.png',
      './images/pc/step04/que_img04.png',

      // step05
      './images/pc/step05/btn_icon01.png',
      './images/pc/step05/btn_icon02.png',
      './images/pc/step05/btn_icon03.png',
      './images/pc/step05/btn_icon04.png',
      './images/pc/step05/que_img01.png',
      './images/pc/step05/que_img02.png',
      './images/pc/step05/que_img03.png',
      './images/pc/step05/que_img04.png',
      './images/pc/step05/que_img05.png',

      // step06
      './images/pc/step06/american_black_popup_img.png',
      './images/pc/step06/american_que_img01.png',
      './images/pc/step06/american_que_img02.png',
      './images/pc/step06/american_que_img03.png',
      './images/pc/step06/american_que_img04.png',
      './images/pc/step06/american_silver_popup_img.png',
      './images/pc/step06/american_steel_popup_img.png',
      './images/pc/step06/american_white_popup_img.png',
      './images/pc/step06/double_beige_popup_img.png',
      './images/pc/step06/double_black_popup_img.png',
      './images/pc/step06/double_que_img01.png',
      './images/pc/step06/double_que_img02.png',
      './images/pc/step06/double_que_img03.png',
      './images/pc/step06/double_que_img04.png',
      './images/pc/step06/double_que_img05.png',
      './images/pc/step06/double_silver_popup_img.png',
      './images/pc/step06/double_steel_popup_img.png',
      './images/pc/step06/double_white_popup_img.png',
      './images/pc/step06/lader_black_popup_img.png',
      './images/pc/step06/lader_que_img01.png',
      './images/pc/step06/lader_que_img02.png',
      './images/pc/step06/lader_que_img03.png',
      './images/pc/step06/lader_que_img04.png',
      './images/pc/step06/lader_silver_popup_img.png',
      './images/pc/step06/lader_steel_popup_img.png',
      './images/pc/step06/lader_white_popup_img.png',
      './images/pc/step06/multi_black_popup_img.png',
      './images/pc/step06/multi_que_img01.png',
      './images/pc/step06/multi_que_img02.png',
      './images/pc/step06/multi_que_img03.png',
      './images/pc/step06/multi_que_img04.png',
      './images/pc/step06/multi_silver_popup_img.png',
      './images/pc/step06/multi_steel_popup_img.png',
      './images/pc/step06/multi_white_popup_img.png',
      './images/pc/step06/tall_beige_popup_img.png',
      './images/pc/step06/tall_black_popup_img.png',
      './images/pc/step06/tall_que_img01.png',
      './images/pc/step06/tall_que_img02.png',
      './images/pc/step06/tall_que_img03.png',
      './images/pc/step06/tall_que_img04.png',
      './images/pc/step06/tall_que_img05.png',
      './images/pc/step06/tall_silver_popup_img.png',
      './images/pc/step06/tall_steel_popup_img.png',
      './images/pc/step06/tall_white_popup_img.png',
   ]);
}
function main() {
   let lastFinderIndex = Object.values(configData).length - 1;
   let headerHeight = $('header').outerHeight();
   class Subject {
      constructor() {
         this.selectedParameters = []; // Filter Push 
         this.stepCount = []; // Acitve Count
         this.selectedProduct; // 셀렉된 제품 데이터 
         this.concatArrDuplicationDel = [];

         /*2303027 start*/
         this.selectProduct = [];
         this.stepParSave = [];
         this.stepProduct = [];
         /*2303027 end*/
      }

      /* 초기 세팅 */
      defaultSeting() {
         currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;
         if (stageLiveDecide) {
            resultPageUrl = './risultati-della-ricerca';
         } else {
            resultPageUrl = 'https://wwwstg.lg.com/it/frigoriferi/risultati-della-ricerca';
         }
         let desktopWidthOrHigher = window.innerWidth >= 1024;
         let introJsonPath;
         if (desktopWidthOrHigher) {
            introJsonPath = './images/pc/intro/intro_animation.json';
            imgPath = './images/pc/';
            // imgPreload();
         } else {
            introJsonPath = './images/intro/intro_animation.json';
            imgPath = './images/';
         }
         const introLottie = lottie.loadAnimation({
            container: document.getElementById('animationPlayer'),
            path: introJsonPath,
            renderer: 'svg',
            loop: false
         });
         let introDeleteAndRefresh = currentUrl.includes('intro=no');
         if (introDeleteAndRefresh) {
            $introAnimation.css('display', 'none');
            $finderMain.css('display', 'block');
         } else {
            introLottie.addEventListener('complete', function () {
               TweenMax.to($introAnimation, .3, { opacity: 0, display: "none" });
               // $(window).scrollTop(headerHeight);
            });
         }
      }

      /* 마크업 초기화 & 생성 */
      setMarkupDate() {
         console.log('index : ', idx, '--------------------------------------------------------------------');
         stageIdx = 'stage' + (idx + 1);
         stageLinkName = 'r_Btn_' + stageIdx;

         currentStructural = Object.values(configData)[idx];
         currentStep = Object.keys(configData)[idx];
         questionText = currentStructural.questionText;
         defaultScreenImg = currentStructural.defaultScreenImg;

         $queTitle.css('display', 'block').empty().append(questionText);
         $finderMain.removeClass().addClass(currentStep);
         $descHeadWrap.find('strong').empty().append(questionText);
         $selectContainer.empty();
         $nextBtn.attr('data-link-name', nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
         $showNow.attr('data-link-name', stageLinkName);
         $description.css('display', 'none');
         $popupMovie.removeClass();
         $selectWrap.removeClass('all');
         $(window).scrollTop(headerHeight);

         idx === 0 ? $backBtn.css('display', 'none') : $backBtn.css('display', 'block') // step 1에서 back 버튼 삭제

         /* Main Images Open */
         if (defaultScreenImg) {
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + defaultScreenImg + ')');
         } else {
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + this.selectedProduct.changeScreenImg + ')');
            if (idx === lastFinderIndex) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + this.selectedProduct.lastScreenImg + ')');
            }
         }

         /* 단일 옵션 */
         if (currentStructural.singleOption) {
            $('.select_tit').css('display', 'none');
         } else {
            if (idx === 2) {
               $('.select_tit').css('display', 'none');
            } else {
               $('.select_tit').css('display', 'block');
            }
         }

         /* Mark Up */
         let _currentOption = currentStructural.option;
         if (currentStructural.subStep === undefined) {
            _currentOption.forEach(function (option) {
               $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${option.value}"><i></i><p>${option.content}</p></button></li>`);
               if (option.value === 'NOTDATA') { 
                  $selectContainer.find('li').last().find('button').prop('disabled', true);
               }
            });
         } else {
            let _subStep = Object.values(currentStructural.subStep);
            _subStep.forEach(function (subStepItem, subStepIndex) {
               let optionHtml = '';
               if (subStepItem.allSelectOption) {
                  $selectWrap.addClass('all');
                  optionHtml += `<button class="all_select" type="button"><span></span><p>${selectAllContent}</p></button>`;
               }
               subStepItem.option.forEach(function (subOption) {
                  if (subOption.value === 'NOTDATA') {
                     optionHtml += `<button class="option_btn" type="button" data-value="${subOption.value}" disabled><p>${subOption.content}</p></button>`;
                  } else {
                     optionHtml += `<button class="option_btn" type="button" data-value="${subOption.value}"><p>${subOption.content}</p></button>`;
                  }
               });
               $selectContainer.append(`<li><span>${Object.keys(currentStructural.subStep)[subStepIndex]}<div><em>${multipleSelectionContent}</em></div> </span><div class="option_wrap">${optionHtml}</div></li>`);
            });
         }
         if (currentStructural.anythingOption) {
            $selectContainer.append(`<li><button class="option_btn anything_btn" type="button" data-value="${ANYTHING}" data-none="${ANYTHING + (idx + 1)}"><p>${anythingContent}</p></button></li>`)
         }
         if (currentStructural.allSelectOption) {
            $selectWrap.addClass('all');
            $selectContainer.prepend(`<li><button class="all_select" type="button"><span></span><p>${selectAllContent}</p></button></li>`)
         }
         if (idx === lastFinderIndex) {
            $nextBtn.text(nextLastContent);
         } else {
            $nextBtn.text(nextContent);
         }
      }

      /* 옵션 active & 해제 */
      optionActivation(element) {
         let _value = element.data('value');

         if (currentStructural.singleOption) {
            // button active 
            $('.option_btn').removeClass('active');
            element.addClass('active');
            applianceFinder.filterUpdate(_value, true);
         } else {
            if (!element.hasClass('active')) {
               element.addClass('active');

               if (_value === ANYTHING) {
                  // 모두 해제
                  $('.option_btn').each(function () {
                     let _value = $(this).data('value');
                     if ($(this).attr('disabled') === undefined && !$(this).hasClass('anything_btn')) {
                        $(this).hasClass('anything_btn');
                        $(this).removeClass('active');
                        applianceFinder.filterUpdate(_value, false);
                     }
                  });
                  $('.all_select').removeClass('active');
               } else {
                  $('.anything_btn').removeClass('active');
                  applianceFinder.filterUpdate($('.anything_btn').data('value'), false);
               }
               applianceFinder.filterUpdate(_value, true);
            } else {
               element.removeClass('active');

               if (idx !== 2) {
                  applianceFinder.filterUpdate(_value, false);
                  $('.all_select').removeClass('active');
               } else {
                  element.siblings('.all_select').removeClass('active');
                  applianceFinder.filterUpdate(_value, false);
               }
            }
            if (idx !== 2) {
               $('.option_btn').each(function () {
                  if ($(this).attr('disabled') === undefined) {
                     if ($(this).hasClass('active') && !$(this).hasClass('anything_btn')) {
                        activeOption++;
                     }
                  }
               });
            }
         }
         this.stateOptions();
         this.optionDataStructure(); // 옵션 구조 초기화 & 해당 옵션 내용 노출
         this.countingUpdate();
      }

      /* 전체선택 옵션 active & 해제 */
      allSelectOptionActivation(element) {
         let activeOptionStep2 = 1;
         let activeOption = 1;

         if (idx !== 2) { // step03 제외 
            $('.option_btn').each(function () {
               // active 전체 갯수 카운팅 ++
               if ($(this).attr('disabled') === undefined) {
                  activeOption++
               }
            });

            // 상관없음 옵션이 존재 할 때 active 되는 갯수 -1
            if ($('.anything_btn').length > 0) {
               activeOption--;
            }

            // All Select 선택시 모든 옵션이 선택됨
            if (!element.hasClass('active')) {
               $('.option_btn').each(function () {
                  if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined) {
                     if (!$(this).hasClass('anything_btn')) {
                        applianceFinder.filterUpdate($(this).data('value'), true);
                     }
                  }
                  if ($(this).attr('disabled') === undefined && !$(this).hasClass('anything_btn')) {
                     $(this).addClass('active');
                     $('.all_select').addClass('active');
                  }
               });
               $('.anything_btn').removeClass('active');
               applianceFinder.filterUpdate($('.anything_btn').data('value'), false); /* 수정요망!!!! <----- */
            } else {
               // All Select 해제 시 전체 데이터 값 삭제 & 선택 해제
               $('.option_btn').removeClass('active');
               $('.all_select').removeClass('active');
               for (let i = 0; i < activeOption; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                  this.selectedParameters.splice(-1, 1);
               }
            }
         } else {
            let _notAllSelectOption = element.siblings(); // AllSelectOption 가 아닌 기존버튼

            _notAllSelectOption.each(function () {
               if ($(this).attr('disabled') === undefined) {
                  activeOptionStep2++;
               }
            });

            if (!element.hasClass('active')) {
               element.addClass('active');
               _notAllSelectOption.each(function () {
                  // All Select 선택시 나머지 active 버튼의 key / value 값 배열 삽입
                  if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined) {
                     applianceFinder.filterUpdate($(this).data('value'), true);
                  }
                  if ($(this).attr('disabled') === undefined) {
                     $(this).addClass('active');
                  }
               });
            } else {
               // All Select 해제 시 전체 데이터 값 삭제 & 선택 해제
               element.removeClass('active');
               element.siblings().removeClass('active');
               for (let i = 0; i < activeOptionStep2; i++) {
                  this.selectedParameters.splice(-1, 1);
               }
            }
         }
         if ($('.option_btn').hasClass('active')) {
            $finderMain.addClass('ready');
         } else {
            $finderMain.removeClass('ready');
         }
         this.countingUpdate();
      }

      /* 옵션의 상태 판단 & All Select */
      stateOptions() {
         enabledOptions = 0; // 옵션 토탈 갯수 (비활성화 제외)
         activeOption = 0; // Active 옵션 갯수

         if (idx !== 2) {
            $('.option_btn').each(function () {
               if ($(this).attr('disabled') === undefined) {
                  enabledOptions++;
                  if ($(this).hasClass('active') && !$(this).hasClass('anything_btn')) {
                     activeOption++;
                  }
               }
            });
            if ($('.anything_btn').length > 0) {
               enabledOptions--;
            }
            if (activeOption === enabledOptions) {
               $('.all_select').addClass('active');
            }
            // console.log('enabledOptions(옵션토탈갯수) : ', enabledOptions, 'activeOption(acitve갯수) : ', activeOption)
         }

         this.taggingEvent(); // 태깅 함수
      }

      /* 필터 업데이트 추가 & 삭제 */
      filterUpdate(_value, _state) {
         if (_state === true) { // Add
            if (idx === 0) {
               this.selectedParameters = [];
               this.selectedParameters.push(_value);
               currentStructural.option.filter((element) => {
                  if (element.value === applianceFinder.selectedParameters[0]) {
                     applianceFinder.selectedProduct = element.saveImg
                  }
               });
            } else if (currentStructural.singleOption) {
               let singleBoolean = false;
               $('.option_btn').each(function () {
                  if ($(this).data('value') === applianceFinder.selectedParameters.slice(-1)[0]) {
                     singleBoolean = true;
                  } 
               });
               if (singleBoolean) {
                  this.selectedParameters.pop();
               } 
               this.selectedParameters.push(_value); // Select Value Push
            } else {
               this.selectedParameters.push(_value); // Select Value Push
            }
         }
         if (_state === false) { // Delete
            this.selectedParameters = this.selectedParameters.filter(value => {
               return value !== _value;
            });
         }
         console.log('selectedParameters : ', this.selectedParameters);
      }

      /* counting */
      countingUpdate() {
         if (this.stepCount[idx] !== undefined) {
            this.stepCount[idx] = $('.option_btn.active').length;
         } else {
            this.stepCount.push($('.option_btn.active').length);
         }
         // console.log(this.stepCount);
      }

      /* 선택한 value & 카운트 삭제 */
      matchingProductsDelete() {
         $finderMain.addClass('ready');
         $queTitle.css('display', 'none');
         $descHeadWrap.css('display', 'block');

         if (this.stepCount[idx + 1] !== undefined || this.stepCount[idx + 1] === 0) {
            for (let i = 0; i < this.stepCount[this.stepCount.length - 1]; i++) {
               this.selectedParameters.pop();
            }
            this.stepCount.pop();
         }
         this.stateOptions();
         this.sprayData(true);
      }

      /* 옵션 구조 초기화 */
      optionDataStructure() {
         $loadMoreBtn.removeClass('active');
         $learnMoreBtn.removeClass('active');
         $learnMoreBtn.removeAttr('data-popup');
         $learnMoreBtn.removeAttr('id');
         $loadMoreBtn.removeAttr('data-link-name');
         $learnMoreBtn.removeAttr('data-link-name');
         $popupMovie.removeClass();

         // 질문 텍스트 / 디스크립션 생성, 삭제
         if (idx === 2) {
            if ($descDetailWrap.hasClass('open')) {
               $descHeadWrap.css('display', 'none');
            } else {
               $descHeadWrap.css('display', 'block');
            }
         } else {
            $description.css('display', 'none');
            $descHeadWrap.css('display', 'block');
         }

         // 선택 이미지 매칭, 선택 항목 디스크립션 매칭 / load more 버튼 생성
         let optionIsActive = $('.option_btn.active').length > 0;
         if (optionIsActive) {
            $finderMain.addClass('ready');
            $queTitle.css('display', 'none');
            applianceFinder.sprayData(true);
         } else {
            $finderMain.removeClass('ready');
            $description.css('display', 'none');
            $queTitle.css('display', 'block');
            applianceFinder.sprayData(false);
         }
      }

      /* 해당 옵션 내용 노출 */
      sprayData(boolean) {
         let lastValue = this.selectedParameters[this.selectedParameters.length - 1]; // 마지막 value 값
         let exposureData;
         if (idx !== 2) {
            let data = currentStructural.option.filter(item => {
               return item.value === lastValue
            });
            exposureData = data[0];
         } else {
            exposureData = currentStructural;
         }

         /* 상관없음 옵션 & 데이터 없음 */
         if (!exposureData || exposureData && exposureData.DataNon) { 
            $queTitle.css('display', 'block');
            $description.css('display', 'none');
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + currentStructural.defaultScreenImg + ')');
         }

         /* 해당 옵션 데이터 노출 */
         if (boolean && exposureData && exposureData.relevantData) { /* Icon */
            if (exposureData.relevantData.icon) {
               $descIcon.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.icon + ')');
            }
            if (exposureData.relevantData.qnaScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.qnaScreenImg + ')');
            }
            $loadMoreBtn.removeClass('active');
            $loadMoreBtn.removeAttr('id');
            $popupMovie.removeClass();
            $learnMoreBtn.removeClass('active');

            if (exposureData.relevantData.description.head) { /* Head And Detail Description */
               $descHead.text(exposureData.relevantData.description.head);
               $descDetail.text(exposureData.relevantData.description.detail);
               if (exposureData.relevantData.additionalDesc) { /* Lean More */
                  $learnMoreBtn.attr('id', 'descMoreBtn');
                  $learnMoreBtn.addClass('active');
                  if (exposureData.content) {
                     $learnMoreBtn.attr('data-link-name', 'Learn More : ' + exposureData.content.replace(/(<([^>]+)>)/ig, ''));
                  } else {
                     $learnMoreBtn.attr('data-link-name', 'Learn More : ' + exposureData.relevantData.description.head.replace(/(<([^>]+)>)/ig, ''));
                  }
               } else {
                  $loadMoreBtn.addClass('active');
                  $loadMoreBtn.attr('id', 'descMoreBtn');
                  $loadMoreBtn.attr('data-link-name', 'Load More : ' + exposureData.content.replace(/(<([^>]+)>)/ig, ''));
               }
            } else if (exposureData.relevantData.description) { /* Description */
               $descHead.text(exposureData.relevantData.description);
            }

            if (exposureData.relevantData.interactionPage) {
               $learnMoreBtn.attr('id', 'interactionBtn');
               $learnMoreBtn.addClass('active');
               $learnMoreBtn.attr('data-link-name', 'Interaction Page : ' + exposureData.content.replace(/(<([^>]+)>)/ig, ''));
               $('#popup_' + currentStep).removeClass().addClass(exposureData.relevantData.interactionPage);
               if (idx === lastFinderIndex) {
                  $('#popup_' + currentStep).find('.txt_wrap img').each(function (index) {
                     $(this).attr('src', imgPath + 'step07/' + applianceFinder.selectedProduct.class + currentStructural.productColorImg[index] + '.png');
                  });
               }
            }
            if (exposureData.relevantData.videoPopup) {
               $learnMoreBtn.attr('id', 'videoMoreBtn');
               $learnMoreBtn.addClass('active');
               $popupMovie.removeClass().addClass(exposureData.relevantData.videoPopup);
               $learnMoreBtn.attr('data-link-name', 'Learn More : ' + exposureData.content.replace(/(<([^>]+)>)/ig, ''));
            }
            if (idx === lastFinderIndex) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + 'step07/' + this.selectedProduct.class + '_' + exposureData.relevantData.qnaScreenImg + ')');
            }
         }
         if (!boolean) {
            if (currentStructural.defaultScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + currentStructural.defaultScreenImg + ')');
            } else {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + this.selectedProduct.changeScreenImg + ')');
            }
            if (idx === lastFinderIndex) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + applianceFinder.selectedProduct.lastScreenImg + ')');
            }
         }
      }

      /* 태깅 텍스트 */
      taggingEvent(stepScreen) {
         modelDescription = []; // 누적 선택한 항목 컨텐츠
         let array = [];

         /* array save */
         Object.values(configData).some((stepElement) => {
            if (stepElement.option) {
               array.push(stepElement.option);
            } else {
               Object.values(stepElement.subStep).some((step3Element) => {
                  array.push(step3Element.option);
               })
            }
         })

         /* value / content save */
         let configDataArray = [];
         array.some((arrayElement) => {
            arrayElement.some((element) => {
               configDataArray.push(element);
            })
         })

         /* 분류 */
         configDataArray.filter((element) => {
            this.selectedParameters.some((item) => {
               if (element.value === item) {
                  modelDescription.push(element.content.replace(/(<([^>]+)>)/ig, ''));
               }
            });
         })

         // console.log('modelDescription : ', modelDescription, 'stageLinkName : ', stageLinkName);
         if (stepScreen) {
            $finalShowNow.attr('data-link-name', 'Get result');
            $finalShowNow.attr('data-model-description', modelDescription);
         } else {
            $showNow.attr('data-model-description', modelDescription);
         }
      }

      /* 결과 페이지 */
      showLastPage() {
         let stepScreen = 'last';
         $finderMain.css('display', 'none');
         $finderResult.css('display', 'block');
         $centerImgWrap.attr('style', 'background-image: url(' + imgPath + this.selectedProduct.resultImg + ')') // 배경 이미지 변경
         $(window).scrollTop(headerHeight);

         let resultOptionArray = [];
         let resultOption = [];
         let finalResultContent = []; // 최종 선택 컨텐츠 Array
         Object.values(configData).some((element) => {
            if (element.resultContent) {
               resultOptionArray.push(element.option);
               element.option.filter(function (item) {
                  resultOption.push(item.value);
               });
            }
         });

         /* 선택한 필터값과 옵션값 중복되는 값 추출 */
         let intersection = resultOption.filter((it) => applianceFinder.selectedParameters.includes(it))

         /* 선택한 컨텐츠 추출 */
         resultOptionArray.some((element, index) => {
            let subArray = [];
            element.some((item) => {
               intersection.some((i) => {
                  if (i === item.value) {
                     subArray.push(item.content);
                  }
               })
            })
            // 컬러 색상 3번째 순서로
            if (index === 3) {
               finalResultContent.splice(finalResultContent.length - 1, 0, subArray);
            } else {
               finalResultContent.push(subArray);
            }
         });

         /* 데이터 뿌리기 */
         finalResultContent.forEach((stepElement, arrayIndex) => {
            let resultText = '';
            stepElement.some((element, index) => {
               if (index !== stepElement.length - 1) {
                  if (arrayIndex === 1) {
                     resultText += element + '<span> & </span>';
                  } else {
                     resultText += element + '<span>, </span>';
                  }
               } else {
                  if (arrayIndex === 2) {
                     resultText += element;
                  } else {
                     resultText += element + '<span>.</span>';
                  }
               }
            });
            $finderResult.find('dl').eq(arrayIndex).find('dd').append(resultText);
         });

         $finderResult.find('dl').each(function () {
            if ($(this).find('dd').text() === '') {
               $(this).remove();
            }
         });
         this.taggingEvent(stepScreen) // 태깅 함수
      }

      /* 결과 URL 추출 */
      getUrlExtraction() {
         /*2303027 start*/
         let parSave = "";
         for (let [key, value] of Object.entries(resultParamSet)) {
            for (let [mk, par] of Object.entries(value)) {
               if (applianceFinder.selectedParameters.includes(mk)) {
                  parSave += "&" + key + "=" + par;
               }
            }
         }
         let finalRrl = '?' + parSave.substring(1);
         let openLink = resultPageUrl + finalRrl;

         console.log(finalRrl)
         /*2303027 end*/
      }
   }

   const applianceFinder = new Subject();

   /* Start */
   applianceFinder.defaultSeting();
   applianceFinder.setMarkupDate();

   /* Next Button */
   $nextBtn.on('click', function () {
      if (idx < lastFinderIndex + 1) {
         idx++;
      }
      /*2303027 start*/
      let concatArr = [];
      let selProduct = applianceFinder.selectProduct;
      let newProduct = [];
      crrSelOption = [];

      let isSubset = (array1, array2) => array2.some((element) => array1.includes(element));
      //선택된 버튼의 value값 추출
      $(".option_btn.active").each(function () {
         if ($(this).attr("data-value") !== "ANYTHING") {
            crrSelOption.push($(this).attr("data-value"));
         }
      });

      $(".option_btn").each(function () {
         if ($(this).attr("data-value") !== "ANYTHING") {
            if ($(this).prop("disabled") === false) {
               applianceFinder.stepParSave.push($(this).attr("data-value"));
            }
         }
         if ($(this).attr("data-none")) {
            if ($(this).hasClass("active")) {
               applianceFinder.stepParSave.push($(this).attr("data-none"));
            }
         }
      });

      if (idx !== 0) {
         if (idx === 1) {
            for (let [key, value] of Object.entries(productSpec)) {
               if (isSubset(value, crrSelOption)) {
                  newProduct.push(key);
               }
            }
         } else {
            selProduct[idx - 2].forEach(function (key, index) {
               for (let [key, value] of Object.entries(productSpec)) {
                  if (selProduct[idx - 2][index] === key) {
                     if (isSubset(value, crrSelOption)) {
                        newProduct.push(key);
                     }
                  }
               }
            });
         }
         if (newProduct.length !== 0) {
            applianceFinder.selectProduct.push([...new Set(newProduct)]);
         } else {
            applianceFinder.selectProduct.push(applianceFinder.selectProduct[applianceFinder.selectProduct.length - 1]);
         }
      }

      idx === lastFinderIndex + 1 ? applianceFinder.showLastPage() : applianceFinder.setMarkupDate();

      /*** */
      if (idx === 0) {
         // $(".option_btn").prop("disabled", false);
      } else {
         concatArr = "";
         for (let [key, value] of Object.entries(applianceFinder.selectProduct[idx - 1])) {
            concatArr += Object.values(productSpec[value]) + ",";
         }
         applianceFinder.concatArrDuplicationDel = [...new Set(concatArr.split(","))];
         // console.log(applianceFinder.concatArrDuplicationDel);
         // console.log(concatArrDuplicationDel);
         // console.log("선택한 옵션과 제품에 따라 활성화 되어야 하는 옵션 " + concatArrDuplicationDel);
         // $(".option_btn").prop("disabled", true);
         for (let i = 0; i < applianceFinder.concatArrDuplicationDel.length - 1; i++) {
            // console.log(concatArrDuplicationDel[i]);
            $('.option_btn[data-value=' + applianceFinder.concatArrDuplicationDel[i] + ']').prop("disabled", false);
         }
         $('.option_btn[data-value="ANYTHING"]').prop("disabled", false);
         if (applianceFinder.selectProduct[idx - 1].length > 0) {
            // console.log("선택 후 남은 제품 " + applianceFinder.selectProduct[idx - 1]);
         } else {
            $finderMain.addClass('not_matched');
         }
      }
      /*2303027 end*/
   });

   /* Back Button */
   $backBtn.on('click', function () {
      if (idx > 0) {
         idx--;
      }

      applianceFinder.setMarkupDate();
      /*2303027 start*/
      if (idx === 0) {
         $(".option_btn").prop("disabled", false);
         for (let i = 0; i < applianceFinder.selectedParameters.length; i++) {
            // console.log(applianceFinder.selectedParameters[i]);
            $('.option_btn[data-value=' + applianceFinder.selectedParameters[i] + ']').addClass("active");
         }
      } else {
         //테스트용 230328
         // $(".option_btn").prop("disabled", true);
         for (let i = 0; i < applianceFinder.stepParSave.length; i++) {
            // console.log(applianceFinder.concatArrDuplicationDel[i]);
            $('.option_btn[data-value=' + applianceFinder.stepParSave[i] + ']').prop("disabled", false);
         }
         $('.option_btn[data-value="ANYTHING"]').prop("disabled", false);
         for (let i = 0; i < applianceFinder.selectedParameters.length; i++) {
            // console.log(applianceFinder.selectedParameters[i]);
            if (applianceFinder.selectedParameters[i] !== "ANYTHING") {
               $('.option_btn[data-value=' + applianceFinder.selectedParameters[i] + ']').addClass("active");
            }
         }
         for (let i = 0; i < applianceFinder.stepParSave.length; i++) {
            if (applianceFinder.stepParSave[i] === "ANYTHING4") {
               $('.option_btn[data-none=' + applianceFinder.stepParSave[i] + ']').addClass("active");
            }
            if (applianceFinder.stepParSave[i] === "ANYTHING5") {
               $('.option_btn[data-none=' + applianceFinder.stepParSave[i] + ']').addClass("active");
            }
            if (applianceFinder.stepParSave[i] === "ANYTHING6") {
               $('.option_btn[data-none=' + applianceFinder.stepParSave[i] + ']').addClass("active");
            }
         }
      }
      $(".option_btn").each(function () {
         if ($(this).attr("data-value") !== "ANYTHING") {
            applianceFinder.stepParSave = applianceFinder.stepParSave.filter((element) => element !== $(this).attr("data-value"))
         } else {
            applianceFinder.stepParSave = applianceFinder.stepParSave.filter((element) => element !== $(this).attr("data-none"))
         }
      });
      applianceFinder.selectProduct.pop();
      applianceFinder.matchingProductsDelete();

      if ($(".option_wrap")) {
         $(".option_wrap").each(function () {
            var _this = $(this);
            if (_this.find(".option_btn").length - _this.find(".option_btn:disabled").length === _this.find(".option_btn.active").length) {
               //올셀렉트 실행
               _this.find(".all_select").addClass('active');
            }
         });
      }
      /*2303027 end*/
   });
   /* Back Button */
   $('#selectAgainBtn').on('click', function () {
      if (idx > 0) {
         idx--;
      }

      applianceFinder.setMarkupDate();
      /*2303027 start*/
      if (idx === 0) {
         $(".option_btn").prop("disabled", false);
         for (let i = 0; i < applianceFinder.selectedParameters.length; i++) {
            // console.log(applianceFinder.selectedParameters[i]);
            $('.option_btn[data-value=' + applianceFinder.selectedParameters[i] + ']').addClass("active");
         }
      } else {
         // $(".option_btn").prop("disabled", true);
         for (let i = 0; i < applianceFinder.stepParSave.length; i++) {
            // console.log(applianceFinder.concatArrDuplicationDel[i]);
            $('.option_btn[data-value=' + applianceFinder.stepParSave[i] + ']').prop("disabled", false);
         }
         $('.option_btn[data-value="ANYTHING"]').prop("disabled", false);
         for (let i = 0; i < applianceFinder.selectedParameters.length; i++) {
            // console.log(applianceFinder.selectedParameters[i]);
            if (applianceFinder.selectedParameters[i] !== "ANYTHING") {
               $('.option_btn[data-value=' + applianceFinder.selectedParameters[i] + ']').addClass("active");
            }
         }
         for (let i = 0; i < applianceFinder.stepParSave.length; i++) {
            if (applianceFinder.stepParSave[i] === "ANYTHING4") {
               $('.option_btn[data-none=' + applianceFinder.stepParSave[i] + ']').addClass("active");
            }
            if (applianceFinder.stepParSave[i] === "ANYTHING5") {
               $('.option_btn[data-none=' + applianceFinder.stepParSave[i] + ']').addClass("active");
            }
            if (applianceFinder.stepParSave[i] === "ANYTHING6") {
               $('.option_btn[data-none=' + applianceFinder.stepParSave[i] + ']').addClass("active");
            }
         }
      }
      $(".option_btn").each(function () {
         if ($(this).attr("data-value") !== "ANYTHING") {
            applianceFinder.stepParSave = applianceFinder.stepParSave.filter((element) => element !== $(this).attr("data-value"))
         } else {
            applianceFinder.stepParSave = applianceFinder.stepParSave.filter((element) => element !== $(this).attr("data-none"))
         }
      });
      applianceFinder.selectProduct.pop();
      applianceFinder.matchingProductsDelete();

      if ($(".option_wrap")) {
         $(".option_wrap").each(function () {
            var _this = $(this);
            if (_this.find(".option_btn").length - _this.find(".option_btn:disabled").length === _this.find(".option_btn.active").length) {
               //올셀렉트 실행
               _this.find(".all_select").addClass('active');
            }
         });
      }
      /*2303027 end*/
   });

   $('#selectAgainCloseBtn').on('click', function () {
      $finderMain.removeClass('not_matched');
   })

   /* Option Button */
   $(document).on('click', '.option_btn', function () {
      /*2303027 start*/
      let element = $(this);
      applianceFinder.optionActivation(element);
      if (element.parent().find(".option_btn").length - element.parent().find(".option_btn:disabled").length === element.parent().find(".option_btn.active").length) {
         //올셀렉트 실행
         element.siblings('.all_select').addClass('active');
      }
      /*2303027 end*/
   });

   /* All Select Button */
   $(document).on('click', '.all_select', function () {
      let element = $(this);
      applianceFinder.allSelectOptionActivation(element);
   });

   /* Description Button */
   $(document).on('click', '#descMoreBtn', function () {
      $descDetailWrap.css('display', 'block');
      $descHeadWrap.css('display', 'none');
      $descDetailWrap.addClass('open');
   });

   /* Interactive Popup Button */
   $(document).on('click', '#interactionBtn', function () {
      $finderMain.css('display', 'none');
      $('#popup_' + currentStep).addClass('open');
      $(window).scrollTop(headerHeight);
   });

   /* Size Popup Button */
   $(document).on('click', '.caution_open_btn', function () {
      $popupSize.addClass('open').addClass(applianceFinder.selectedProduct.class);
   });

   /* Video Popup Button */
   $(document).on('click', '#videoMoreBtn', function () {
      $popupMovie.addClass('open');
   });

   /* Detail Description Button */
   $detailCloseBtn.on('click', function () {
      $descDetailWrap.css('display', 'none');
      $descHeadWrap.css('display', 'block');
      $descDetailWrap.removeClass('open');
   });

   /* Video Close Button */
   $popupClose.on('click', function () {
      $popupSize.removeClass('open').removeClass(applianceFinder.selectedProduct.class);
      $(this).parents('#popupMovie').removeClass('open');
      $('.video_wrap').removeClass('play_video');
      $('#popupMovie .popup_wrap > div').find('video').each(function (i) {
         $('#popupMovie .popup_wrap > div').find('video')[i].currentTime = 0;
         $('#popupMovie .popup_wrap > div').find('video')[i].pause();
      });
   });

   /* Interactive Close Button */
   $interactionClose.on('click', function () {
      $finderMain.css('display', 'block');
      $('#popup_' + currentStep).removeClass('open');
   });

   $('#selectAgainCloseBtn').on('click', function () {
      $finderMain.removeClass('not_matched');
   })

   // 인트로 애니메이션 없이 처음으로 돌아가기
   $tryAgain.on('click', function () {
      location.href = currentUrl.split('?')[0] + '?intro=no';
   });

   /* Video Play Button */
   $('.video_btn').on('click', function () {
      let _this = $(this);
      if (!_this.parents('.video_wrap').hasClass('play_video')) {
         _this.parents('.video_wrap').addClass('play_video');
         _this.parents('.video_wrap').find('video').get(0).play();
      }
   });

   /* Video Pause Button */
   $('.video_wrap i').on('click', function () {
      let _this = $(this);
      if (_this.parents('.video_wrap').hasClass('play_video')) {
         _this.parents('.video_wrap').removeClass('play_video');
         _this.parents('.video_wrap').find('video').get(0).pause();
      }
   });

   /* Show Now Button */
   $showNow.on('click', function () {
      if ($finderMain.hasClass('ready')) {
         /*2303027 start*/
         let isSubset = (array1, array2) => array2.some((element) => array1.includes(element));
         let concatArr = [];
         let selProduct = applianceFinder.selectProduct;
         let newProduct = [];

         crrSelOption = [];
         //선택된 버튼의 value값 추출
         $(".option_btn.active").each(function () {
            if ($(this).attr("data-value") !== "ANYTHING") {
               crrSelOption.push($(this).attr("data-value"));
            }
         });
         if (idx === 0) {
            for (let [key, value] of Object.entries(productSpec)) {
               if (isSubset(value, crrSelOption)) {
                  newProduct.push(key);
               }
            }
         } else {
            selProduct[idx - 1].forEach(function (key, index) {
               for (let [key, value] of Object.entries(productSpec)) {
                  if (selProduct[idx - 1][index] === key) {
                     if (isSubset(value, crrSelOption)) {
                        newProduct.push(key);
                     }
                  }
               }
            });
         }
         if (newProduct.length !== 0) {
            for (let [key, value] of Object.entries(newProduct)) {
               concatArr += Object.values(productSpec[value]) + ",";
            }
            if (newProduct.length > 0) {
               console.log("선택 후 남은 제품 " + newProduct);
            } else {
               $finderMain.addClass('not_matched');
            }
         } else {
            for (let [key, value] of Object.entries(selProduct[idx - 1])) {
               concatArr += Object.values(productSpec[value]) + ",";
            }
            if (selProduct.length > 0) {
               console.log("선택 후 남은 제품 " + selProduct[idx - 1]);
            } else {
               $finderMain.addClass('not_matched');
            }
         }

         // /* 230316 연구과장님 end ******* */
         let parSave = "";
         for (let [key, value] of Object.entries(resultParamSet)) {
            for (let [mk, par] of Object.entries(value)) {
               if (applianceFinder.selectedParameters.includes(mk)) {
                  parSave += "&" + key + "=" + par;
               }
            }
         }
         let finalRrl = '?' + parSave.substring(1);
         let openLink = resultPageUrl + finalRrl;

         console.log(finalRrl);
         /*2303027 end*/
      }
   });
   /* final Show Now Button */
   $finalShowNow.on('click', function () {
      applianceFinder.getUrlExtraction();
   });

   /* try Again Button */
   $tryAgain.on('click', function () {
      location.href = currentUrl.split('?')[0] + '?intro=no';
   });

   $(window).on('unload', function () {
      // $(window).scrollTop(headerH);
   });

   $(window).on('resize', function () {
      if (window.innerWidth >= 1024) {
         imgPath = './images/pc/';
         if (!$qnaImgWrap.css('background-image').includes('pc')) {
            $qnaImgWrap.css('background-image', $qnaImgWrap.css('background-image').split('images')[0] + 'images/pc' + $qnaImgWrap.css('background-image').split('images')[1]);
            $centerImgWrap.css('background-image', $centerImgWrap.css('background-image').split('images')[0] + 'images/pc' + $centerImgWrap.css('background-image').split('images')[1])
            $descIcon.css('background-image', $descIcon.css('background-image').split('images')[0] + 'images/pc' + $descIcon.css('background-image').split('images')[1])
         }
      } else {
         imgPath = './images/';
         if ($qnaImgWrap.css('background-image').includes('pc')) {
            $qnaImgWrap.css('background-image', $qnaImgWrap.css('background-image').split('/pc/')[0] + '/' + $qnaImgWrap.css('background-image').split('/pc/')[1]);
            $centerImgWrap.css('background-image', $centerImgWrap.css('background-image').split('/pc/')[0] + '/' + $centerImgWrap.css('background-image').split('/pc/')[1]);
            $descIcon.css('background-image', $descIcon.css('background-image').split('/pc/')[0] + '/' + $descIcon.css('background-image').split('/pc/')[1]);
         }
      }
   });
}
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

