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
const multipleSelectionContent = 'Puedes seleccionar multiples opciones';
const selectAllContent = 'Todas las opciones';
const anythingContent = 'No estoy seguro. <br> Muéstrame todos los modelos.';
const nextContent = 'SIGUIENTE';
const nextLastContent = 'SIGUIENTE';

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

/* Tgging */
let stageIdx; // Index
let stageDesc; // Description
let stageCont; // Content

/* Spec Sit Product Value */
const WMProductSpec = {
   'product1': ['MULTI', 'CAPACITY_UNDER_400L', 'DEPTH_UNDER_760MM', 'WIDTH_UNDER_600MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'PLUMBED', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'BLACK'],
   'product2': ['MULTI', 'CAPACITY_SPACE_500L_600L', 'DEPTH_UNDER_760MM', 'WIDTH_SPANCE_610MM_800MM', 'HEIGHT_UNDER_1800MM', 'WATER_ONLY', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_D', 'BLACK'],
}
const WDProductSpec = {
   'product1': ['MULTI', 'CAPACITY_UNDER_400L', 'DEPTH_UNDER_760MM', 'WIDTH_UNDER_600MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'PLUMBED', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'BLACK'],
   'product2': ['MULTI', 'CAPACITY_UNDER_400L', 'DEPTH_UNDER_760MM', 'WIDTH_UNDER_600MM', 'HEIGHT_SPANCE_1800MM_2000MM', 'PLUMBED', 'PURE_N_FRESH', 'THINKQ', 'DOOR_COOLING', 'FOLDING_SHELF', 'REVERSIBLE_DOOR', 'ENERGY_GRADE_A', 'BLACK'],
}

/* Parameters Key Value */
const WMResultParamSet = {
   /* Type */
   Type: {
      MULTI: 'MULTI_P',
      AMERICAN: 'AMERICAN_PARMITER_P',
      TALL: 'TALL_PARMITER_P',
      DOUBLE: 'DOUBLE_PARMITER_P',
      LADER: 'LADER_PARMITER_P',
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
const WDResultParamSet = {
   /* Type */
   Type: {
      MULTI: 'MULTI_P',
      AMERICAN: 'AMERICAN_PARMITER_P',
      TALL: 'TALL_PARMITER_P',
      DOUBLE: 'DOUBLE_PARMITER_P',
      LADER: 'LADER_PARMITER_P',
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
      questionText: '¿Qué tipo de lavadora estás buscando?',
      defaultScreenImg: 'step01/que_img00.png',
      singleOption: true, // 단일 옵션
      resultContent: true,
      option: [
         {
            value: 'WM_Type',
            content: 'Lavadora estándar',
            relevantData: {
               description: 'Destaca en lo básico, proporcionando un lavado en profundidad y eficiente',
               qnaScreenImg: 'step01/que_img01.png',
               interactionPage: 'washer',
            },
            saveImg: {
               class: 'washer',
               changeScreenImg: 'step02/que_img01.png',
               lastScreenImg: 'step07/washer_que_img01.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: 'WD_Type',
            content: 'Lavadora secadora',
            relevantData: {
               description: 'Más que una simple lavadora, ofrece una combinación impecable de funciones de lavado y secado.',
               qnaScreenImg: 'step01/que_img02.png',
               interactionPage: 'dryer',
            },
            saveImg: {
               class: 'dryer',
               changeScreenImg: 'step02/que_img02.png',
               lastScreenImg: 'step07/dryer_que_img01.png',
               resultImg: 'result/center_img02.png',
            }
         },
      ]
   },
}
const WMConfigData = {
   step02: {
      questionText: '¿Qué capacidad necesita?',
      descriptionOrder: '* La capacidad de la ropa puede variar según el uso',
      allSelectOption: true,
      option: [
         {
            value: 'CAPACITY_UNDER_400L',
            content: '7 kg ',
            relevantData: {
               description: 'Para más de 30 camisas, o un edredón de tamaño normal, en un solo lavado.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: 'NOTDATA',
            content: '8-9 kg',
            relevantData: {
               description: 'Para más de 45 camisas o un edredón de tamaño mediano en un solo lavado.',
               icon: 'step02/disc_icon02.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_400L_500L',
            content: '10-13 kg',
            relevantData: {
               description: 'Para 50-55 camisas o un edredón de tamaño grande en un solo lavado.',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_500L_600',
            content: '15 kg o más',
            relevantData: {
               description: 'Puede lavar más de 60 camisas o un edredón extragrande en un solo lavado.',
               icon: 'step02/disc_icon04.png',
            }
         },
      ]
   },
   step03: {
      questionText: '¿Qué tamaño se adapta mejor a tu espacio?',
      relevantData: {
         description: {
            head: 'Guía para medir el hueco de tu lavadora.',
            detail: 'Deje al menos 5-10 cm entre su lavadora y las superficies circundantes. Las lavadoras LG tienen la misma anchura y altura, (60 x 85 cm) variando sólo en profundidad.'
         },
         additionalDesc: true,
         icon: 'step03/disc_icon01.png',
      },
      subStep: {
         'Fondo': {
            option: [
               {
                  value: 'DEPTH_UNDER_760MM',
                  content: 'Menos de 49,5 cm',
               },
               {
                  value: 'NOTDATA',
                  content: '55-56,5 cm',
               },
               {
                  value: 'NOTDATA',
                  content: '60 cm o más',
               },
            ],
         },
         'Ancho': {
            allSelectOption: true,
            option: [
               {
                  value: 'WIDTH_SPANCE_610MM_800MM',
                  content: '60 cm',
               },
               {
                  value: 'WIDTH_SPANCE_810MM_900MM',
                  content: '70 cm',
               },
            ],
         },
         'Alto': {
            allSelectOption: true,
            option: [
               {
                  value: 'HEIGHT_UNDER_1800MM',
                  content: '85 cm',
               },
               {
                  value: 'HEIGHT_SPANCE_1800MM_2000MM',
                  content: '99 cm',
               },
            ],
         },
      }
   },
   step04: {
      questionText: '¿Qué tipo de eficiencia buscas en tu lavadora?',
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      anythingOption: true,
      option: [ 
         {
            value: 'PLUMBED',
            content: 'Eficiencia energética </br>superior al A-10',
            optionIcon: 'step04/btn_icon01.png',
            relevantData: {
               description: '10% más eficiente que el grado A ',
               qnaScreenImg: 'step04/que_img02.png',
            },
         },
         {
            value: 'WATER_ONLY',
            content: 'Clasificiación energética A',
            optionIcon: 'step04/btn_icon02.png',
            relevantData: {
               description: 'Grado A, la clase de mayor eficiencia energética de la escala de clasificación energética de la UE (de la A a la G) que ofrece la tecnología TurboWash™.',
               qnaScreenImg: 'step04/que_img03.png',
            },
         },
         {
            value: 'NON_PLUMBED',
            content: 'Clasificación energética B',
            optionIcon: 'step04/btn_icon03.png',
            relevantData: {
               description: 'Clasificación enerngética B, medido de A a G en la escala de clasificación energética de la UE.',
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
   step05: {
      questionText: '¿Qué aspecto del rendimiento de </br>la lavadora es más importante para usted?',
      defaultScreenImg: 'step05/que_img01.png',
      // allSelectOption: true,
      resultContent: true,
      singleOption: true, // 단일 옵션
      option: [
         {
            value: 'Textilschutz',
            content: 'Cuidado suave de los </br>tejidos para dañarlos lo menos posible',
            relevantData: {
               description: 'Inteligencia artificial AIDD™ que detecta el peso y las carcaterísticas de los tejidos para optimizar el lavado.',
               qnaScreenImg: 'step05/que_img02.png',
               videoPopup: 'gentle_fabric_ai_DD',
            }
         },
         {
            value: 'Hygiene',
            content: 'Higiene',
            relevantData: {
               description: 'No te preocupes por los alérgenos. La tecnología Steam™ elimina los dañinos ácaros del polvo.',
               qnaScreenImg: 'step05/que_img03.png',
               videoPopup: 'hygiene_steam',
            }
         },
         {
            value: 'Zeitersparnis',
            content: 'Ahorro de tiempo',
            relevantData: {
               description: 'Te ahorra tiempo a la vez que proporciona un lavado a fondo',
               qnaScreenImg: 'step05/que_img04.png',
               videoPopup: 'time_efficient_turbo_wash',
            }
         },
      ]
   },
   step06: {
      questionText: '¿Qué características quieres de tu lavadora?',
      defaultScreenImg: 'step06/que_img01.png',
      allSelectOption: true,
      resultContent: true,
      anythingOption: true,
      option: [
         {
            value: 'Smart',
            content: 'Funciones inteligentes/AI',
            relevantData: {
               description: 'Controla tu lavadora inteligente LG con wi-fi de forma remota a través de tu smartphone mediante la app LG ThinQ™. ',
               qnaScreenImg: 'step06/que_img02.png',
               videoPopup: 'smart_ai_thinkQ',
            }
         },
         {
            value: 'Automatische',
            content: 'Dosificación automática de detergente',
            relevantData: {
               description: 'ezDispense™ dosifica con precisión las cantidades de detergente adecuadas para cada ciclo de lavado.',
               qnaScreenImg: 'step06/que_img03.png',
               videoPopup: 'ezDispense',
            }
         },
      ]
   },
   step07: {
      questionText: '¿Qué color se adapta mejor a su interior? ',
      allSelectOption: true,
      resultContent: true,
      productColorImg: ['_white_popup_img', '_steel_popup_img', '_black_popup_img'],
      option: [
         {
            value: 'white',
            content: 'Blanco',
            relevantData: { 
               description: 'Un elegante electrodoméstico blanco para cualquier estilo de interior y estado de ánimo.',
               qnaScreenImg: 'que_img01.png',
               interactionPage: 'white',
            }
         },
         {
            value: 'stainless', 
            content: 'Plateado', 
            relevantData: {
               description: 'El plateado complementa diversos estilos y es una forma sencilla de añadir estilo a su cocina.',
               qnaScreenImg: 'que_img02.png',
               interactionPage: 'stainless', 
            }
         },
         {
            value: 'black',
            content: 'Negro',
            relevantData: {
               description: 'Un color elegante y con estilo que es a la vez llamativo y lujoso.',
               interactionPage: 'black',
               qnaScreenImg: 'que_img03.png',
            }
         },
      ]
   },
}
const WDConfigData = {
   step02: {
      questionText: '¿Qué capacidad necesitas? (Lavado + Secado)',
      descriptionOrder: '* La capacidad de la ropa puede variar según el uso',
      allSelectOption: true,
      option: [
         {
            value: 'CAPACITY_UNDER_400L',
            content: '8-8,5 kg + 5 kg',
            relevantData: {
               description: 'Para más de 30 camisas, o un edredón de tamaño queen, en un solo lavado.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: 'NOTDATA',
            content: '8-9 kg + 6 kg',
            relevantData: {
               description: 'Para más de 45 camisas o un edredón de tamaño mediano en un solo lavado.',
               icon: 'step02/disc_icon02.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_400L_500L',
            content: '10-11 kg + 7 kg',
            relevantData: {
               description: 'Para 50-55 camisas, o un edredón de tamaño grande, en un solo lavado.',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_500L_600',
            content: '12 kg + 8 kg',
            relevantData: {
               description: 'Para más de 60 camisas o un edredón extragrande en un solo lavado.',
               icon: 'step02/disc_icon04.png',
            }
         },
      ]
   },
   step03: {
      questionText: '¿Qué tamaño se adapta mejor a tu espacio?',
      relevantData: {
         description: {
            head: 'Guía para medir el hueco de tu lavadora.',
            detail: 'Deje al menos 5-10 cm entre su lavadora y las superficies circundantes. Las lavadoras LG tienen la misma anchura y altura, (60 x 85 cm) variando sólo en profundidad.'
         },
         additionalDesc: true,
         icon: 'step03/disc_icon01.png',
      },
      subStep: {
         'Fondo': {
            option: [
               {
                  value: 'DEPTH_UNDER_760MM',
                  content: 'Menos de 49,5 cm',
               },
               {
                  value: 'NOTDATA',
                  content: '55-56,5 cm',
               },
               {
                  value: 'NOTDATA',
                  content: '60 cm o más',
               },
            ],
         },
         'Ancho': {
            allSelectOption: true,
            option: [
               {
                  value: 'WIDTH_SPANCE_610MM_800MM',
                  content: '60 cm',
               },
               {
                  value: 'WIDTH_SPANCE_810MM_900MM',
                  content: '70 cm',
               },
            ],
         },
         'Alto': {
            allSelectOption: true,
            option: [
               {
                  value: 'HEIGHT_UNDER_1800MM',
                  content: '85 cm',
               },
               {
                  value: 'HEIGHT_SPANCE_1800MM_2000MM',
                  content: '99 cm',
               },
            ],
         },
      }
   },
   step04: {
      questionText: '¿Qué eficiencia buscas en tu lavadora y secadora?',
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      anythingOption: true,
      option: [
         {
            value: 'PLUMBED',
            content: 'Clasificación energética A',
            optionIcon: 'step04/btn_icon02.png',
            relevantData: {
               description: 'Clasificación energética A, la clase de mayor eficiencia energética de la escala de clasificación energética de la UE (de la A a la G) que ofrece la tecnología TurboWash™.',
               qnaScreenImg: 'step04/que_img03.png',
            },
         },
         {
            value: 'WATER_ONLY',
            content: 'Clasificación energética B-C',
            optionIcon: 'step04/btn_icon04.png',
            relevantData: {
               description: 'No tiene clasificación energética A pero aún con buena eficiencia',
               qnaScreenImg: 'step04/que_img05.png',
            },
         }
      ]
   },
   step05: {
      questionText: '¿Qué aspecto del rendimiento de </br>la lavadora es más importante para usted?',
      defaultScreenImg: 'step05/que_img01.png',
      // allSelectOption: true,
      resultContent: true,
      singleOption: true, // 단일 옵션
      option: [
         {
            value: 'Textilschutz',
            content: 'Cuidado suave de los </br>tejidos para dañarlos lo menos posible',
            relevantData: {
               description: 'Inteligencia artificial AIDD™ que detecta el peso y las carcaterísticas de los tejidos para optimizar el lavado.',
               qnaScreenImg: 'step05/que_img02.png',
               videoPopup: 'gentle_fabric_ai_DD',
            }
         },
         {
            value: 'Hygiene',
            content: 'Higiene',
            relevantData: {
               description: 'No te preocupes por los alérgenos. La tecnología Steam™ elimina los dañinos ácaros del polvo.',
               qnaScreenImg: 'step05/que_img03.png',
               videoPopup: 'hygiene_steam',
            }
         },
         {
            value: 'Zeitersparnis',
            content: 'Ahorro de tiempo',
            relevantData: {
               description: 'Te ahorra tiempo a la vez que proporciona un lavado a fondo',
               qnaScreenImg: 'step05/que_img04.png',
               videoPopup: 'time_efficient_turbo_wash',
            }
         },
      ]
   },
   step06: {
      questionText: '¿Qué características quieres de tu lavadora?',
      defaultScreenImg: 'step06/que_img01.png',
      allSelectOption: true,
      resultContent: true,
      anythingOption: true,
      option: [
         {
            value: 'Smart',
            content: 'Funciones inteligentes/AI',
            relevantData: {
               description: 'Controla tu lavadora inteligente LG con wi-fi de forma remota a través de tu smartphone mediante la app LG ThinQ™. ',
               qnaScreenImg: 'step06/que_img02.png',
               videoPopup: 'smart_ai_thinkQ',
            }
         },
         {
            value: 'Automatische',
            content: 'Dosificación automática de detergente',
            relevantData: {
               description: 'ezDispense™ dosifica con precisión las cantidades de detergente adecuadas para cada ciclo de lavado.',
               qnaScreenImg: 'step06/que_img03.png',
               videoPopup: 'ezDispense',
            }
         },
      ]
   },
   step07: {
      questionText: '¿Qué color se adapta mejor a su interior? ',
      allSelectOption: true,
      resultContent: true,
      productColorImg: ['_white_popup_img', '_steel_popup_img', '_black_popup_img'],
      option: [
         {
            value: 'white',
            content: 'Blanco',
            relevantData: { 
               description: 'Un elegante electrodoméstico blanco para cualquier estilo de interior y estado de ánimo.',
               qnaScreenImg: 'que_img01.png',
               interactionPage: 'white',
            }
         },
         {
            value: 'stainless', 
            content: 'Plateado', 
            relevantData: {
               description: 'El plateado complementa diversos estilos y es una forma sencilla de añadir estilo a su cocina.',
               qnaScreenImg: 'que_img02.png',
               interactionPage: 'stainless', 
            }
         },
         {
            value: 'black',
            content: 'Negro',
            relevantData: {
               description: 'Un color elegante y con estilo que es a la vez llamativo y lujoso.',
               interactionPage: 'black',
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
function main() {
   let lastFinderIndex = 6;
   let headerHeight = $('header').outerHeight();
   let currentConfig;
   // let lastFinderIndex = Object.values(currentConfig).length - 1;
   let singleBoolean = true;
   class Subject {
      constructor() {
         this.selectedParameters = []; // Filter Push 
         this.stepCount = []; // Acitve Count
         this.selectedProduct; // 셀렉된 제품 데이터 
         this.duplicationDel = [];
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
         singleBoolean = true;
         console.log('index : ', idx, '--------------------------------------------------------------------');
         if (idx !== 0) {
            if (this.selectedProduct.class === 'washer') {
               currentStructural = Object.values(WMConfigData)[idx - 1];
               currentStep = Object.keys(WMConfigData)[idx - 1];
               currentConfig = WMConfigData;
            } else {
               currentStructural = Object.values(WDConfigData)[idx - 1];
               currentStep = Object.keys(WDConfigData)[idx - 1];
               currentConfig = WDConfigData;
            }
         } else {
            currentStructural = Object.values(configData)[idx];
            currentStep = Object.keys(configData)[idx];
         }
         questionText = currentStructural.questionText;
         defaultScreenImg = currentStructural.defaultScreenImg;


         $queTitle.css('display', 'block').empty().append(questionText);
         $finderMain.removeClass().addClass(currentStep);
         $(window).scrollTop(headerHeight);
         $descHeadWrap.find('strong').empty().append(questionText);
         $selectContainer.empty();
         $nextBtn.attr('data-link-name', nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
         $description.css('display', 'none');
         $popupMovie.removeClass();
         $selectWrap.removeClass('all');

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


         /* 230405 start */
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
         /* 230405 end */

         /* Mark Up */
         let _currentOption = currentStructural.option;
         if (currentStructural.subStep === undefined) {
            _currentOption.forEach(function (option) {
               if (option.value === 'NOTDATA') {
                  // $selectContainer.find('li').last().find('button').prop('disabled', true);
               }
               if (option.optionIcon) {
                  $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${option.value}"><i style="background-image:url(${imgPath + option.optionIcon})"></i><p>${option.content}</p></button></li>`);
               } else {
                  $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${option.value}"><i></i><p>${option.content}</p></button></li>`);
               }
            });
         } else {
            let _subStep = Object.values(currentStructural.subStep);
            let _subKey = Object.keys(currentStructural.subStep);
            _subStep.forEach(function (subStepItem, subStepIndex) {
               let optionHtml = '';
               if (subStepItem.allSelectOption) {
                  $selectWrap.addClass('all');
                  optionHtml += `<button class="all_select" type="button" data-value="${_subKey[subStepIndex]}_${SELECTALL}"><span></span><p>${selectAllContent}</p></button>`;
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
            $selectContainer.append(`<li><button class="option_btn anything_btn" type="button" data-value="${ANYTHING}"><p>${anythingContent}</p></button></li>`)
         }
         if (currentStructural.allSelectOption) {
            $selectWrap.addClass('all');
            $selectContainer.prepend(`<li><button class="all_select" type="button" data-value="${idx + 1}_${SELECTALL}"><span></span><p>${selectAllContent}</p></button></li>`)
         }
         idx === lastFinderIndex ? $nextBtn.text(nextLastContent) : $nextBtn.text(nextContent);
      }

      /* 옵션 active & 해제 */
      optionActivation(element) {
         let _value = element.data('value');
         
         /* 230405 start */
         if (currentStructural.singleOption) {
            // button active 
            $('.option_btn').removeClass('active');
            element.addClass('active');
            applianceFinder.filterUpdate(_value, true);
         } else {
            /* 230405 end */ 
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
         $('.option_wrap').each(function () {
            let optionButtonNumber = $(this).find('.option_btn').index();
            let activeNumber = 0;
            $(this).find('.option_btn').each(function () {
               if ($(this).hasClass('active')) {
                  activeNumber++;
               }
               if (optionButtonNumber === activeNumber) {
                  $(this).siblings('.all_select').addClass('active');
               }
            })
         });
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
            } else if (idx === 4) {               
               if (singleBoolean) {
                  singleBoolean = false;
               } else {
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

         /* Option Active */
         for (let i = 0; i < this.stepCount.slice(-1)[0]; i++) {
            let value = this.selectedParameters[this.selectedParameters.length - (1 + i)];
            $('.option_btn').each(function () {
               let _this = $(this);
               let _value = _this.data('value');
               if (value === _value) {
                  _this.addClass('active');
               }
            });
         }
         this.stateOptions();
         // this.taggingEvent(); // 태깅 함수
         this.sprayData(true);
      }

      /* 현재 스탭 선택한 필터 제품 매칭 저장 */
      matchingProductsSave() {
         applianceFinder.optionDisabled(crrSelOption);
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
         let _moreCont;
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


         console.log(exposureData)

         /* 상관없음 옵션 & 데이터 없음 */
         if (!exposureData || exposureData && exposureData.DataNon) {
            $queTitle.css('display', 'block');
            $description.css('display', 'none');
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + currentStructural.defaultScreenImg + ')');
         }

         /* 해당 옵션 데이터 노출 */
         if (boolean && exposureData && exposureData.relevantData) {
            if (exposureData.relevantData.icon) {
               $descIcon.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.icon + ')');
            }
            if (exposureData.relevantData.qnaScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.qnaScreenImg + ')');
            }
            if (exposureData.relevantData.description.head) {
               $descHead.text(exposureData.relevantData.description.head);
               $descDetail.text(exposureData.relevantData.description.detail);
               $loadMoreBtn.addClass('active');
               $loadMoreBtn.attr('id', 'descMoreBtn');
            } else if (exposureData.relevantData.description) {
               $descHead.text(exposureData.relevantData.description);
            }
            if (currentStructural.descriptionOrder) {
               $descHead.append('<span>' + currentStructural.descriptionOrder + '</span>');
            }
            $loadMoreBtn.removeClass('active');
            $loadMoreBtn.removeAttr('id');

            /* 디크스립션 & 팝업 */
            if (exposureData.relevantData.additionalDesc) {
               $learnMoreBtn.attr('id', 'descMoreBtn');
               $learnMoreBtn.addClass('active');
            }
            if (exposureData.relevantData.interactionPage) {
               $learnMoreBtn.attr('id', 'interactionBtn');
               $learnMoreBtn.addClass('active');
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
      taggingEvent() {
         console.log('태깅함수');
      }

      /* 결과 페이지 */
      showLastPage() {
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

         Object.values(currentConfig).some((element) => {
            if (element.resultContent) {
               resultOptionArray.push(element.option);
               element.option.filter(function (item) {
                  resultOption.push(item.value);
               });
            }
         });

         /* 선택한 필터값과 옵션값 중복되는 값 추출 */
         let intersection = resultOption.filter((it) => applianceFinder.selectedParameters.includes(it))

         console.log('resultOptionArray : ', resultOptionArray)
         console.log('finalResultContent : ', finalResultContent)
         console.log('intersection : ', intersection)

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
               console.log('stepElement : ', stepElement, 'arrayIndex : ', arrayIndex)
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
         // taggingEvent(_last); // 태깅 함수

         $finderResult.find('dl').each(function () {
            if ($(this).find('dd').text() === '') {
               $(this).remove();
            }
         })
      }

      /* 결과 URL 추출 */
      getUrlExtraction() {
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

         console.debug(finalRrl)

         // if (stageLiveDecide) {
         //    location.href = openLink; // 현재 탭에서 이동
         // } else {
         //    window.open(openLink, '_blank'); // 새탭에서 이동
         //    console.log('finalRrl : ', finalRrl);
         // }
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
      idx === lastFinderIndex + 1 ? applianceFinder.showLastPage() : applianceFinder.setMarkupDate()
   });

   /* Back Button */
   $backBtn.on('click', function () {
      if (idx > 0) {
         idx--;
      }
      applianceFinder.setMarkupDate();
      applianceFinder.matchingProductsDelete();
   });

   /* Option Button */
   $(document).on('click', '.option_btn', function () {
      let element = $(this);
      applianceFinder.optionActivation(element);
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

   // $('#selectAgainCloseBtn').on('click', function () {
   //    $quickFinder.removeClass('not_matched');
   // })

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
      // $finderMain.hasClass('ready') && applianceFinder.getUrlExtraction()
   });

   /* final Show Now Button */
   $finalShowNow.on('click', function () {
      // applianceFinder.getUrlExtraction();
   });

   /* try Again Button */
   $tryAgain.on('click', function () {
      location.href = currentUrl.split('?')[0] + '?intro=no';
   });

   $(window).on('unload', function () {
      $(window).scrollTop(headerH);
   });

   $(window).on('resize', function () {
      if (window.innerWidth >= 1024) {
         imgPath = './images/pc/';
         if (!$qnaImgWrap.css('background-image').includes('pc')) {
            $qnaImgWrap.css('background-image', $qnaImgWrap.css('background-image').split('images')[0] + 'images/pc' + $qnaImgWrap.css('background-image').split('images')[1]);
            $centerImgWrap.css('background-image', $centerImgWrap.css('background-image').split('images')[0] + 'images/pc' + $centerImgWrap.css('background-image').split('images')[1])
            $descIcon.css('background-image', $descIcon.css('background-image').split('images')[0] + 'images/pc' + $descIcon.css('background-image').split('images')[1])
            console.log($('#finderMain.step04 #selectWrap li i'))
            // $('#finderMain.step04 #selectWrap li i').css('background-image', $('#finderMain.step04 #selectWrap li i').css('background-image').split('images')[0] + 'images/pc' + $('#finderMain.step04 #selectWrap li i').css('background-image').split('images')[1])
         }
      } else {
         imgPath = './images/';
         if ($qnaImgWrap.css('background-image').includes('pc')) {
            $qnaImgWrap.css('background-image', $qnaImgWrap.css('background-image').split('/pc/')[0] + '/' + $qnaImgWrap.css('background-image').split('/pc/')[1]);
            $centerImgWrap.css('background-image', $centerImgWrap.css('background-image').split('/pc/')[0] + '/' + $centerImgWrap.css('background-image').split('/pc/')[1]);
            $descIcon.css('background-image', $descIcon.css('background-image').split('/pc/')[0] + '/' + $descIcon.css('background-image').split('/pc/')[1]);
            // $('#finderMain.step04 #selectWrap li i').css('background-image', $('#finderMain.step04 #selectWrap li i').css('background-image').split('/pc/')[0] + '/' + $('#finderMain.step04 #selectWrap li i').css('background-image').split('/pc/')[1]);
         }
      }
   });
}
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

