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
const multipleSelectionContent = 'Sie können mehrere Optionen auswählen.';
const selectAllContent = 'Alles auswählen';
const anythingContent = 'Ich bin unsicher. </br>Alle Ausführungen anzeigen.';
const nextContent = 'WEITER';
const nextLastContent = 'Fast geschafft!';

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
      questionText: 'Welche Art von Kühl- und Gefriergerät suchen Sie?',
      defaultScreenImg: 'step01/que_img00.png',
      singleOption: true, // 단일 옵션
      resultContent: true,
      option: [
         {
            value: 'MULTI',
            content: 'Multi-Door',
            relevantData: {
               description: 'Mehrere Türen ermöglichen den gezielten Zugriff auf den Kühlbereich in der oberen und den Gefrierbereich in der unteren Hälfte.',
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
            content: 'Side-by-Side',
            relevantData: {
               description: 'Modelle mit zwei Türen, bei denen Kühl- und Gefrierbereich nebeneinander angeordnet sind.',
               qnaScreenImg: 'step01/que_img02.png',
               interactionPage: 'american',

            },
            saveImg: {
               class: 'american',
               changeScreenImg: 'step02/que_img02.png',
               lastScreenImg: 'step07/american_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
         {
            value: 'TALL',
            content: 'Kühl-/Gefrierkombination',
            relevantData: {
               description: 'Ein kompaktes Gerät mit Kühlbereich oben und Gefrierbereich unten.',
               qnaScreenImg: 'step01/que_img03.png',
               interactionPage: 'tall',
            },
            saveImg: {
               class: 'tall',
               changeScreenImg: 'step02/que_img03.png',
               lastScreenImg: 'step07/tall_que_img04.png',
               resultImg: 'result/center_img01.png',
            }
         },
      ]
   },
   step02: {
      questionText: 'Wieviel Fassungsvermögen </br>soll das Kühl- und Gefriergerät bieten?',
      allSelectOption: true,
      option: [
         {
            value: 'CAPACITY_UNDER_400L',
            content: 'Weniger als 400 Liter',
            relevantData: {
               description: 'Perfekt, wenn Sie den Kühlschrank nicht dauerhaft nutzen oder Lebensmittel in geringen Mengen kaufen.',
               icon: 'step02/disc_icon01.png',
            }
         },
         {
            value: 'NOTDATA',
            content: '400 bis 500 Liter',
            relevantData: {
               description: 'Perfekt für kleine Familien, die Lebensmittel schnell aufbrauchen.',
               icon: 'step02/disc_icon02.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_400L_500L',
            content: '500 bis 600 Liter',
            relevantData: {
               description: 'Die für viele Haushalte bevorzugte Größe.',
               icon: 'step02/disc_icon03.png',
            }
         },
         {
            value: 'CAPACITY_SPACE_500L_600L',
            content: 'Über 600 Liter',
            relevantData: {
               description: 'Ideal für Personen, die Lebensmittel in großen Mengen kaufen oder den Kühlschrank mit anderen teilen.',
               icon: 'step02/disc_icon04.png',
            }
         },
      ]
   },
   step03: {
      questionText: 'Welche Größe passt am besten in Ihre Küche?',
      relevantData: {
         description: {
            head: 'Tipp: So ermitteln Sie den verfügbaren Platz für Kühl- und Gefriergeräte.',
            detail: 'Was Sie beachten sollten: Die Türen des Geräts benötigen zum Öffnen und Belüften 25 bis 50 Millimeter Raum. Alle LG Kühl- und Gefriergeräte passen durch ihre Tiefe zu Standard-Küchenmaßen und fügen sich mit einer schlanker Form flexibel ein. Die Installation an besonders kalten oder heißen Stellen ist nicht zu empfehlen.'
         },
         additionalDesc: true,
         icon: 'step03/disc_icon01.png',
      },
      subStep: {
         'Tiefe': {
            option: [
               {
                  value: 'DEPTH_UNDER_760MM',
                  content: 'Unter 76 cm',
               },
               {
                  value: 'NOTDATA',
                  content: '76 cm oder mehr',
               },
            ],
         },
         'Breite': {
            allSelectOption: true,
            option: [
               {
                  value: 'WIDTH_SPANCE_610MM_800MM',
                  content: 'Unter 60 cm',
               },
               {
                  value: 'WIDTH_SPANCE_810MM_900MM',
                  content: '61 bis 90 cm',
               },
               {
                  value: 'WIDTH_SPANCE_910MM_OR_MORE',
                  content: 'Mehr als 91 cm',
               },
            ],
         },
         'Höhe': {
            allSelectOption: true,
            option: [
               {
                  value: 'HEIGHT_UNDER_1800MM',
                  content: 'Unter 180 cm',
               },
               {
                  value: 'HEIGHT_SPANCE_1800MM_2000MM',
                  content: '180 bis 200 cm',
               },
               {
                  value: 'HEIGHT_2000L_OR_MORE',
                  content: 'Mehr als 200 cm',
               },
            ],
         },

      }
   },
   step04: {
      questionText: 'Suchen Sie ein Kühl- und </br>Gefriergerät mit Eis- oder Wasserspender?',
      defaultScreenImg: 'step04/que_img01.png',
      allSelectOption: true,
      anythingOption: true,
      option: [
         {
            value: 'Wasserspender',
            content: 'Eis- und Wasserspender </br>(mit Festwasseranschluss)',
            relevantData: {
               description: 'Jederzeit Wasser und Eis - ohne einen Tank nachfüllen zu müssen.',
               qnaScreenImg: 'step04/que_img02.png',
               // videoPopup: 'video1',
            },
         },
         {
            value: 'Festwasseranschluss',
            content: 'Eis- und Wasserspender </br>(ohne Festwasseranschluss)',
            relevantData: {
               description: {
                  head: 'Wasser und Eis in jeder Küche - dank integriertem Wassertank.',
                  detail: 'Auch wenn Sie keinen verfügbaren Wasseranschluss haben, müssen Sie durch LG Kühl- und Gefriergeräte mit integrierten Wassertanks nicht auf Eis- und Wasserspender verzichten.'
               },
               // videoPopup: 'video2',
               qnaScreenImg: 'step04/que_img03.png',
            },
         },
         {
            value: 'ohne',
            content: 'Wasserspender </br>(ohne Festwasseranschluss)',
            relevantData: {
               description: {
                  head: 'Genießen Sie gekühltes Wasser direkt aus dem Kühlschrank.',
                  detail: 'Durch den integrierten Wassertank genießen Sie auch ohne Festwasseranschluss jederzeit eine kühle Erfrischung.'
               },
               qnaScreenImg: 'step04/que_img04.png',
            }
         },
      ]
   },
   step05: {
      questionText: 'Welche Energieeffizienzklasse </br>soll Ihr Kühl- und Gefriergerät haben?',
      defaultScreenImg: 'step05/que_img01.png',
      allSelectOption: true,
      resultContent: true,
      anythingOption: true,
      option: [
         {
            value: 'Mehr',
            content: 'Mehr als A-10% Energieeffizienz',
            relevantData: {
               description: 'Mindestens 10% effizienter als Effizienzklasse A',
               qnaScreenImg: 'step05/que_img02.png',
            },
         },
         {
            value: 'Effizienzklasse',
            content: 'Effizienzklasse A',
            relevantData: {
               description: 'Effizienzklasse A ist die höchste Bewertung auf der EU-Skala (A bis G) - ermöglicht durch den LG Inverter Linear Compressor®.',
               qnaScreenImg: 'step05/que_img03.png',
            }
         },
         {
            value: 'Effizienz',
            content: 'Eine starke Effizienz </br>- auch ohne Klasse A.',
            relevantData: {
               description: 'Weniger effizient als Klasse A, aber dennoch energiesparend.',  
               qnaScreenImg: 'step05/que_img04.png',
            }
         },
      ]
   },
   step06: {
      questionText: 'Was ist Ihnen besonders wichtig?',
      defaultScreenImg: 'step06/que_img01.png',
      allSelectOption: true,
      resultContent: true,
      anythingOption: true,
      option: [
         {
            value: 'Smart',
            content: 'Smart-Features',
            relevantData: {
               description: 'Ein intelligenter Assistent erleichtert Ihnen verschiedene Aufgaben im Haushalt.',
               qnaScreenImg: 'step06/que_img02.png',
               videoPopup: 'smart_ai_thinkQ',
            }
         },
         {
            value: 'Belüftung',
            content: 'Belüftung',
            relevantData: {
               description: 'Der Pure N Fresh Luftfilter minimiert Geruchsentwicklung und hält die Luft frisch.',
               qnaScreenImg: 'step06/que_img03.png',               
               videoPopup: 'ventilation_pure_N_fresh',
            }
         },
         {
            value: 'InstaView',
            content: 'InstaView Door-in-Door®',
            relevantData: {
               description: 'Klopfen Sie zweimal und sehen Sie ins Innere des Kühlschranks, ohne Kälte zu verlieren oder Energie zu verschwenden.',
               qnaScreenImg: 'step06/que_img04.png',
               videoPopup: 'instaview',
            }
         },
      ]
   },
   step07: {
      questionText: 'Welche Farbe suchen Sie für Ihre Küche?',
      allSelectOption: true,
      resultContent: true,
      productColorImg: ['_black_popup_img', '_white_popup_img', '_steel_popup_img', '_silver_popup_img'], // step06 인터렉션 페이지 컬러매칭 이미지 뿌리기
      option: [
         {
            value: 'BLACK',
            content: 'Schwarz',
            relevantData: {
               description: 'Eine stilvolle Farbe, die ins Auge fällt und zeitlos-edel ist.',
               qnaScreenImg: 'que_img01.png',
               interactionPage: 'black',
            }
         },
         {
            value: 'WHITE',
            content: 'Weiß',
            relevantData: {
               description: 'Passt perfekt in nahezu jedes Umfeld.',
               interactionPage: 'white',
               qnaScreenImg: 'que_img04.png',

            }
         },
         {
            value: 'STAINLESS',
            content: 'Edelstahl',
            relevantData: {
               description: 'Edles Aussehen und pflegeleicht.',
               interactionPage: 'stainless',
               qnaScreenImg: 'que_img02.png',
            }
         },
         {
            value: 'SILVER',
            content: 'Silber',
            relevantData: {
               description: 'Harmoniert mit einer Vielzahl anderer Möbel und bringt zeitlose Eleganz in die Küche.',
               interactionPage: 'silver',
               qnaScreenImg: 'que_img03.png',
            }
         },
      ]
   },
}

popupSlide();
main();