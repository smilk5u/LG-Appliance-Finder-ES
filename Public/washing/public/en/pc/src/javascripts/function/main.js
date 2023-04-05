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