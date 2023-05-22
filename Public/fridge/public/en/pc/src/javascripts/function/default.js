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
   'product1_1': ['MULTI', 'CAPACITY_UNDER_400L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_810MM_900MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'PLUMBED', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'BLACK'],
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
      questionText: '¿Qué tipo de Frigorífico está buscando?',
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
      questionText: '¿Qué capacidad necesitas?',
      allSelectOption: true,
      option: [
         {
            value: 'CAPACITY_UNDER_400L',
            content: 'Por debajo de 400L',
            relevantData: {
               description: 'Una opción práctica para el uso poco frecuente del frigorífico o para las personas que compran pequeñas cantidades de alimentos cada vez.',
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
      questionText: '¿Qué tamaño se adapta mejor a tu espacio?',
      relevantData: {
         description: {
            head: 'Guía para medir el hueco necesario para tu frigorífico.',
            detail: 'Calcula que hueco necesitas para tu frigorífico. Las puertas necesitan qué (25-50mm) de espacio para abrirse y ventilarse. Todos los frigoríficos LG se adaptan al fondo de la encimera. Se desaconseja instalar cerca de zonas frías o calientes.'
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
            value: 'Plumbed',
            content: 'Dispensador de hielo y agua <br> (con toma de agua)',
            relevantData: {
               description: 'Dispensa agua y hielo sin necesidad de rellenar el depósito de agua.',
               qnaScreenImg: 'step04/que_img02.png',
            },            
         },
         /* Ice & Water Dispenser (Non-Plumbed) */
         {
            value: 'Non_Plumbed',
            content: 'Dispensador de hielo y agua <br> (sin toma de agua)',
            relevantData: {
               description: {
                  head: 'Con depósito de agua rellenable conectado al dispensador.',
                  detail: 'Si no puede conectarse a una toma de agua, los frigoríficos sin toma  tienen un depóstito de agua rellenable conectado al dispensador de agua de la puerta.'
               },
               // additionalDesc: true,
               qnaScreenImg: 'step04/que_img03.png',
            },
         },
         /* Water Only Dispenser (Non-Plumbed) */
         {
            value: 'Water_Only_Dispenser',
            content: 'Dispensador de agua <br> (sin toma de agua)',
            relevantData: {
               description: {
                  head: 'Disfrute de agua fría directamente de su frigorífico.',
                  detail: 'Una forma práctica de disfrutar de agua fría del frigorífico  a través del depósito de agua rellenable incorporado.'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
         /* No Ice & Water Dispenser */
         {
            value: 'NoIce_Water_Dispenser',
            content: 'Sin dispensador de hielo y agua',
            relevantData: {
               description: 'No hay dispensador de hielo y agua, diseño minimalista',
               qnaScreenImg: 'step04/que_img01.png',
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
         // {
         //    value: 'eficiencia',
         //    content: 'Más de un 10% de eficiencia energética',
         //    relevantData: {
         //       description: 'Al menos un 10% más eficiente que los modelos A',
         //       qnaScreenImg: 'step05/que_img02.png',
         //    },
         // },
         /* Energy Grade A */
         {
            value: 'Effizienzklasse',
            content: 'Energía Grado A o superior',
            relevantData: {
               description: 'Encima de la categoría A: la clase más eficiente de energía proporcionada por la tecnología LG Inverter Linear Compressor™.',
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
      questionText: '¿Qué otros detalles del frigorífico son importantes para ti?',
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
               description: 'Haz toc toc para ver el interior mientras mantienes la frescura y ahorras energía.',
               qnaScreenImg: 'step06/que_img04.png',
               videoPopup: 'instaview',
            }
         },
         /* Craft Ice */
         {
            value: 'Craft_Ice',
            content: 'Craft Ice',
            relevantData: {
               description: 'LG Craft Ice fabrica entre 3 a 6 bolas de hielo de disolución  lenta al día. Olvídate de las moldes de hielo caros y lentos.',
               qnaScreenImg: 'step06/que_img05.png',   
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