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

/* Tagging */
let stageIdx; // Index
let modelDescription; // Model Description
let stageLinkName; // Link Name

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
      questionText: '¿Qué capacidad necesitas? </br><span>(Lavado + Secado)</span>',
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
            value: 'NOTDATAa',
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