(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\caleb\OneDrive\Documents\MTEC\Projects\angular-golf-scorecard\src\main.ts */"zUnb");


/***/ }),

/***/ "0s2p":
/*!*************************************************************!*\
  !*** ./src/app/components/scorecard/scorecard.component.ts ***!
  \*************************************************************/
/*! exports provided: ScorecardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScorecardComponent", function() { return ScorecardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ScorecardComponent {
    constructor() { }
    ngOnInit() {
    }
}
ScorecardComponent.ɵfac = function ScorecardComponent_Factory(t) { return new (t || ScorecardComponent)(); };
ScorecardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ScorecardComponent, selectors: [["app-scorecard"]], decls: 2, vars: 0, template: function ScorecardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "scorecard works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzY29yZWNhcmQuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "2MiI":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class HeaderComponent {
    constructor() { }
    ngOnInit() {
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 5, vars: 0, consts: [[1, "title"], ["src", "assets/images/flag-outline-white.png", 1, "title-logo"], [1, "title-name"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Golferscore");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["header[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 60px;\n  background: #042463;\n  position: fixed;\n  z-index: 9999999999;\n  box-shadow: 0px 0px 0px #111;\n  padding-left: 10px;\n  padding-right: 10px;\n  box-sizing: border-box;\n  top: 0;\n  transition: 0.3s;\n  border-radius: 10px;\n  border-top-left-radius: 0px;\n  border-top-right-radius: 0px;\n  border-right: 5px solid #021330;\n  border-bottom: 5px solid #021330;\n}\nheader[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  height: inherit;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  padding-left: 10px;\n  padding-right: 10px;\n  box-sizing: border-box;\n}\nheader[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .title-logo[_ngcontent-%COMP%] {\n  height: 40px;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n}\nheader[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .title-name[_ngcontent-%COMP%] {\n  font-family: \"Ubuntu\", \"Raleway\", \"Days One\", serif;\n  color: white;\n  font-size: min(30px, 8vw);\n  margin: 0;\n  position: relative;\n  left: 60px;\n  line-height: 60px;\n}\nheader[_ngcontent-%COMP%]   .settings[_ngcontent-%COMP%] {\n  height: 55px;\n  width: 55px;\n  position: absolute;\n  right: 0;\n}\nheader[_ngcontent-%COMP%]   .settings[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: white;\n  height: 35px;\n  margin: auto;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  position: absolute;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxoZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDRSxNQUFBO0VBQ0YsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtFQUNBLGdDQUFBO0FBQ0Q7QUFBQztFQUNDLGVBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQUVGO0FBREU7RUFDQyxZQUFBO0VBQ0EsWUFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUFHSDtBQURFO0VBQ0MsbURBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7QUFHSDtBQUFDO0VBQ0MsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7QUFFRjtBQUFFO0VBQ0MsWUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ00sT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsTUFBQTtFQUNBLGtCQUFBO0FBRVQiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaGVhZGVyIHtcclxuXHR3aWR0aDogMTAwdnc7XHJcblx0aGVpZ2h0OiA2MHB4O1xyXG5cdGJhY2tncm91bmQ6ICMwNDI0NjM7XHJcblx0cG9zaXRpb246IGZpeGVkO1xyXG5cdHotaW5kZXg6IDk5OTk5OTk5OTk7XHJcblx0Ym94LXNoYWRvdzogMHB4IDBweCAwcHggIzExMTtcclxuXHRwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcblx0cGFkZGluZy1yaWdodDogMTBweDtcclxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICB0b3A6IDA7XHJcblx0dHJhbnNpdGlvbjogMC4zcztcclxuXHRib3JkZXItcmFkaXVzOiAxMHB4O1xyXG5cdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDBweDtcclxuXHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xyXG5cdGJvcmRlci1yaWdodDogNXB4IHNvbGlkICMwMjEzMzA7XHJcblx0Ym9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICMwMjEzMzA7XHJcblx0LnRpdGxlIHtcclxuXHRcdGhlaWdodDogaW5oZXJpdDtcclxuXHRcdG1hcmdpbjogYXV0bztcclxuXHRcdHRvcDogMDtcclxuXHRcdGJvdHRvbTogMDtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHBhZGRpbmctbGVmdDogMTBweDtcclxuXHRcdHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdFx0LnRpdGxlLWxvZ28ge1xyXG5cdFx0XHRoZWlnaHQ6IDQwcHg7XHJcblx0XHRcdG1hcmdpbjogYXV0bztcclxuXHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRib3R0b206IDA7XHJcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdH1cclxuXHRcdC50aXRsZS1uYW1lIHtcclxuXHRcdFx0Zm9udC1mYW1pbHk6IFwiVWJ1bnR1XCIsIFwiUmFsZXdheVwiLCBcIkRheXMgT25lXCIsIHNlcmlmO1xyXG5cdFx0XHRjb2xvcjogd2hpdGU7XHJcblx0XHRcdGZvbnQtc2l6ZTogbWluKDMwcHgsIDh2dyk7XHJcblx0XHRcdG1hcmdpbjogMDtcclxuXHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRsZWZ0OiA2MHB4O1xyXG5cdFx0XHRsaW5lLWhlaWdodDogNjBweDtcclxuXHRcdH1cclxuXHR9XHJcblx0LnNldHRpbmdzIHtcclxuXHRcdGhlaWdodDogNTVweDtcclxuXHRcdHdpZHRoOiA1NXB4O1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0cmlnaHQ6IDA7XHJcblx0XHQvLyBiYWNrZ3JvdW5kOiBvcmFuZ2U7XHJcblx0XHRzdmcge1xyXG5cdFx0XHRjb2xvcjogd2hpdGU7XHJcblx0XHRcdGhlaWdodDogMzVweDtcclxuXHRcdFx0bWFyZ2luOiBhdXRvO1xyXG4gICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Jdrb":
/*!*************************************************!*\
  !*** ./src/app/services/api-handler.service.ts ***!
  \*************************************************/
/*! exports provided: ApiHandlerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiHandlerService", function() { return ApiHandlerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.service */ "MtBC");



// import { LoadPageComponent } from "../components/load-page/load-page.component";
class ApiHandlerService {
    constructor(Store) {
        this.Store = Store;
        this.url = "https://golf-courses-api.herokuapp.com/courses";
        this.xhr = new XMLHttpRequest();
        this.cxhr = new XMLHttpRequest();
        this.retrievalAttempts = 3;
    }
    grabCourses(callback, isSavedData = false) {
        // If the user has enabled persistent cache, look for pre-loaded data from localStorage and place it in sessionStorage for use in this session
        if (isSavedData && localStorage.getItem("courses")) {
            sessionStorage.setItem("courses", localStorage.getItem("courses") || "");
            let setCourseData = JSON.parse(sessionStorage.getItem("courses") || "");
            for (let a = 0; a < setCourseData.courses.length; a++) {
                let lookup = JSON.parse(localStorage.getItem("course-" + setCourseData.courses[a].id) || "");
                if (lookup) {
                    sessionStorage.setItem("course-" + setCourseData.courses[a].id, localStorage.getItem("course-" + setCourseData.courses[a].id) || "");
                }
            }
        }
        // The user has not loaded this site in this session, so send a request for data
        if (!sessionStorage.getItem("courses")) {
            // console.log("No cache data");
            this.xhr.open("GET", this.url, true);
            this.xhr.responseType = "text";
            this.xhr.send();
            this.xhr.onload = () => {
                if (this.xhr.status == 200) {
                    this.Store.courseData = JSON.parse(this.xhr.responseText);
                    this.Store.cacheData("courses", this.Store.courseData);
                    // Cards.setCards();
                    callback();
                    // Add options to the select input for persistent course
                    for (let a = 0; a < this.Store.courseData.courses.length; a++) {
                        let newOption = document.createElement("OPTION");
                        //  document.querySelector(".persistentCourse").appendChild(newOption);
                        newOption.setAttribute("value", a);
                        newOption.innerText = this.Store.courseData.courses[a].name;
                    }
                }
            };
            // If there is data cached (user has not left the session), get that instead of sending another request. Reduces network usage
        }
        else {
            // console.log("Found cache data");
            this.Store.courseData = JSON.parse(sessionStorage.getItem("courses") || "");
            for (let a = 0; a < this.Store.courseData.courses.length; a++) {
                let toGet = "";
                if (this.Store.courseData.courses[a].id) {
                    toGet = "course-" + this.Store.courseData.courses[a].id;
                }
                if (sessionStorage.getItem(toGet) == undefined) {
                    sessionStorage.removeItem(toGet);
                }
                let lookup = JSON.parse(sessionStorage.getItem(toGet) || "null");
                if (lookup != null) {
                    this.Store.courses[this.Store.courseData.courses[a].id] = lookup;
                }
            }
            // Cards.setCards();
            callback();
            // Add options to the select input for persistent course
            for (let a = 0; a < this.Store.courseData.courses.length; a++) {
                let newOption = document.createElement("OPTION");
                //   document.querySelector(".persistentCourse").appendChild(newOption);
                newOption.setAttribute("value", a);
                newOption.innerText = this.Store.courseData.courses[a].name;
            }
        }
        // console.log(this.Store.courses);
        // console.log(this.Store.courseData);
    }
    loadBasicInfo(id, display = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // console.log("loadBasicInfo called");
            id = parseInt(id);
            let basic;
            if (sessionStorage.getItem(`course-${this.Store.courseData.courses[id].id}`)) {
                // console.log("Returning a cached dataset from id",id);
                return new Promise((resolve, reject) => {
                    // console.log(`Returning ${this.Store.courseData.courses[id].id} from cached data.`);
                    // console.log(JSON.parse(sessionStorage.getItem(`course-${this.Store.courseData.courses[id].id}`) || "null"));
                    let r = { data: JSON.parse(sessionStorage.getItem(`course-${this.Store.courseData.courses[id].id}`) || "null") };
                    resolve(r);
                });
            }
            // console.log("Fetching non-cached dataset");
            let apiurl = this.url + "/" + this.Store.courseData.courses[id].id;
            this.cxhr.open("GET", apiurl, true);
            this.cxhr.responseType = "text";
            this.cxhr.send();
            return new Promise((resolve, reject) => {
                this.cxhr.onload = () => {
                    if (this.cxhr.status == 200) {
                        basic = JSON.parse(this.cxhr.responseText);
                        // console.log("Recieved course data... ", basic);
                        // this.Store.cacheData("course-" + this.Store.courseData.courses[id].id, basic);
                        // this.Store.courses[this.Store.courseData.courses[id].id] = basic;
                        // will show info on the selection card. false when user selects a course without loading info first, reduces jank
                        if (display) {
                            // console.log("Returning", this.Store.courseData[id]);
                        }
                        else {
                            this.Store.activeCourse = this.Store.courseData.courses[id].id;
                            // console.log(`store activecourse is`, this.Store.activeCourse);
                            // this.Store.activeCourse = JSON.parse(sessionStorage.getItem("course-" + this.Store.courseData.courses[id].id) || "");
                        }
                        resolve(basic);
                        this.retrievalAttempts = 3;
                    }
                    else {
                        console.warn("Retrieval failed, retrying");
                        if (this.retrievalAttempts > 0) {
                            this.loadBasicInfo(id, display);
                            this.retrievalAttempts--;
                        }
                        else {
                            console.warn("Retried 3 times and failed. Try refreshing the page.");
                        }
                    }
                };
            });
        });
    }
    selectCourse(id) {
        id = parseInt(id);
        if (!sessionStorage.getItem("course-" + this.Store.courseData.courses[id].id)) {
            // console.log("Loading not from cache");
            let loader = this.loadBasicInfo(id, false);
            // loader.then()
        }
        else {
            // console.log("Retrieving from cache");
            this.Store.activeCourse = JSON.parse(sessionStorage.getItem("course-" + this.Store.courseData.courses[id].id) || "");
            // fillCard(id);
        }
    }
}
ApiHandlerService.ɵfac = function ApiHandlerService_Factory(t) { return new (t || ApiHandlerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_store_service__WEBPACK_IMPORTED_MODULE_2__["StoreService"])); };
ApiHandlerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ApiHandlerService, factory: ApiHandlerService.ɵfac, providedIn: "root" });


/***/ }),

/***/ "MtBC":
/*!*******************************************!*\
  !*** ./src/app/services/store.service.ts ***!
  \*******************************************/
/*! exports provided: StoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return StoreService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class StoreService {
    constructor() {
        this.courses = [];
        this.teeCount = 0;
        this.players = {
            "0": {
                name: "",
                scores: [],
                inScore: 0,
                outScore: 0,
                totalScore: 0,
                hcp: null,
                net: 0,
            },
            "1": {
                name: "",
                scores: [],
                inScore: 0,
                outScore: 0,
                totalScore: 0,
                hcp: null,
                net: 0,
            },
            "2": {
                name: "",
                scores: [],
                inScore: 0,
                outScore: 0,
                totalScore: 0,
                hcp: null,
                net: 0,
            },
            "3": {
                name: "",
                scores: [],
                inScore: 0,
                outScore: 0,
                totalScore: 0,
                hcp: null,
                net: 0,
            },
        };
        this.cb = [];
    }
    cacheData(name, data) {
        data = JSON.stringify(data);
        sessionStorage.setItem(name, data);
        if (localStorage.getItem("golf-scorecard-settings")) {
            let settings = JSON.parse(localStorage.getItem("golf-scorecard-settings") || "");
            if (settings.tg_preserve) {
                localStorage.setItem(name, data);
            }
        }
    }
    setActive(id) {
        // console.log("setActive");
        this.cb.forEach(c => {
            c();
        });
    }
    subSelect(callback) {
        this.cb.push(callback);
    }
}
StoreService.ɵfac = function StoreService_Factory(t) { return new (t || StoreService)(); };
StoreService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: StoreService, factory: StoreService.ɵfac, providedIn: "root" });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header/header.component */ "2MiI");
/* harmony import */ var _components_load_page_load_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/load-page/load-page.component */ "pKuk");
/* harmony import */ var _components_scorecard_page_scorecard_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/scorecard-page/scorecard-page.component */ "gJQi");




class AppComponent {
    constructor() {
        this.title = 'angular-golf-scorecard';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "root-wrap"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-load-page");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-scorecard-page");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _components_load_page_load_page_component__WEBPACK_IMPORTED_MODULE_2__["LoadPageComponent"], _components_scorecard_page_scorecard_page_component__WEBPACK_IMPORTED_MODULE_3__["ScorecardPageComponent"]], styles: [".root-wrap[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  overflow-x: hidden;\n  position: absolute;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0csWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBQ0giLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJvb3Qtd3JhcCB7XHJcbiAgIGhlaWdodDogMTAwJTtcclxuICAgd2lkdGg6IDEwMCU7XHJcbiAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgcG9zaXRpb246IGFic29sdXRlO1xyXG59Il19 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_init_card_init_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/init-card/init-card.component */ "iiUU");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/header/header.component */ "2MiI");
/* harmony import */ var _components_load_page_load_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/load-page/load-page.component */ "pKuk");
/* harmony import */ var _components_scorecard_page_scorecard_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/scorecard-page/scorecard-page.component */ "gJQi");
/* harmony import */ var _components_scorecard_scorecard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/scorecard/scorecard.component */ "0s2p");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "zBoC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");











class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _components_init_card_init_card_component__WEBPACK_IMPORTED_MODULE_4__["InitCardComponent"], _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"], _components_load_page_load_page_component__WEBPACK_IMPORTED_MODULE_6__["LoadPageComponent"], _components_scorecard_page_scorecard_page_component__WEBPACK_IMPORTED_MODULE_7__["ScorecardPageComponent"], _components_scorecard_scorecard_component__WEBPACK_IMPORTED_MODULE_8__["ScorecardComponent"], _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_9__["SidebarComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]] }); })();


/***/ }),

/***/ "gJQi":
/*!***********************************************************************!*\
  !*** ./src/app/components/scorecard-page/scorecard-page.component.ts ***!
  \***********************************************************************/
/*! exports provided: ScorecardPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScorecardPageComponent", function() { return ScorecardPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function ScorecardPageComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.activeCourseData.name);
} }
function ScorecardPageComponent_div_24_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r19 = ctx.index;
    const num_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate2"]("color: ", ctx_r14.colors[i_r19], "; background: ", ctx_r14.activeCourseData.holes[0].teeBoxes[i_r19].teeHexColor, ";");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", num_r13 + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r14.activeCourseData.holes[num_r13].teeBoxes[i_r19].yards, " ");
} }
function ScorecardPageComponent_div_24_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_div_24_div_4_Template_input_input_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.handleInput($event); })("blur", function ScorecardPageComponent_div_24_div_4_Template_input_blur_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r24.handleBlur($event); })("keydown", function ScorecardPageComponent_div_24_div_4_Template_input_keydown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r25.handleKeyDown($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pl_r21 = ctx.$implicit;
    const num_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", pl_r21 + 5, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate2"]("input-", pl_r21, "-c-", num_r13, "");
} }
function ScorecardPageComponent_div_24_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r16.activeCourseData.holes[num_r13].teeBoxes[0].par);
} }
function ScorecardPageComponent_div_24_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r17.activeCourseData.holes[num_r13].teeBoxes[0].hcp);
} }
const _c0 = function () { return []; };
const _c1 = function () { return [0, 1, 2, 3]; };
function ScorecardPageComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ScorecardPageComponent_div_24_div_3_Template, 2, 8, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ScorecardPageComponent_div_24_div_4_Template, 2, 7, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ScorecardPageComponent_div_24_div_5_Template, 2, 1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ScorecardPageComponent_div_24_div_6_Template, 2, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r13 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("left: ", num_r13 * 25, "vw");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("data-col data-col-", num_r13, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](num_r13 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c0).constructor(ctx_r1.teeCount));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.activeCourseData);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.activeCourseData);
} }
function ScorecardPageComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r30 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate2"]("color: ", ctx_r2.colors[i_r30], "; background: ", ctx_r2.muted[i_r30], "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.totals.tees.out[i_r30]);
} }
function ScorecardPageComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r31 = ctx.$implicit;
    const i_r32 = ctx.index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", item_r31 + ctx_r3.teeCount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.Store.players[i_r32].outScore);
} }
function ScorecardPageComponent_div_33_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r39 = ctx.index;
    const num_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate2"]("color: ", ctx_r34.colors[i_r39], "; background: ", ctx_r34.activeCourseData.holes[0].teeBoxes[i_r39].teeHexColor, ";");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", num_r33 + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r34.activeCourseData.holes[num_r33 - 1].teeBoxes[i_r39].yards, " ");
} }
function ScorecardPageComponent_div_33_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_div_33_div_4_Template_input_input_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r43); const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r42.handleInput($event); })("blur", function ScorecardPageComponent_div_33_div_4_Template_input_blur_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r43); const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r44.handleBlur($event); })("keydown", function ScorecardPageComponent_div_33_div_4_Template_input_keydown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r43); const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r45.handleKeyDown($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pl_r41 = ctx.$implicit;
    const num_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", pl_r41 + 5, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate2"]("input-", pl_r41, "-c-", num_r33, "");
} }
function ScorecardPageComponent_div_33_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r36.activeCourseData.holes[num_r33 - 1].teeBoxes[0].par);
} }
function ScorecardPageComponent_div_33_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r37.activeCourseData.holes[num_r33 - 1].teeBoxes[0].hcp);
} }
function ScorecardPageComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ScorecardPageComponent_div_33_div_3_Template, 2, 8, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ScorecardPageComponent_div_33_div_4_Template, 2, 7, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ScorecardPageComponent_div_33_div_5_Template, 2, 1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ScorecardPageComponent_div_33_div_6_Template, 2, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r33 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("left: ", num_r33 * 25, "vw");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("data-col data-col-", num_r33, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](num_r33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c0).constructor(ctx_r4.teeCount));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.activeCourseData);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.activeCourseData);
} }
function ScorecardPageComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r50 = ctx.index;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate2"]("color: ", ctx_r5.colors[i_r50], "; background: ", ctx_r5.muted[i_r50], "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.totals.tees.in[i_r50]);
} }
function ScorecardPageComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r51 = ctx.$implicit;
    const i_r52 = ctx.index;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", item_r51 + ctx_r6.teeCount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6.Store.players[i_r52].inScore);
} }
function ScorecardPageComponent_div_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r54 = ctx.index;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate2"]("color: ", ctx_r7.colors[i_r54], "; background: ", ctx_r7.activeCourseData.holes[0].teeBoxes[i_r54].teeHexColor, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r7.totals.tees.total[i_r54], " ");
} }
function ScorecardPageComponent_div_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r55 = ctx.$implicit;
    const i_r56 = ctx.index;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", item_r55 + ctx_r8.teeCount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8.Store.players[i_r56].totalScore);
} }
function ScorecardPageComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div");
} if (rf & 2) {
    const i_r58 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", i_r58, " disabled");
} }
function ScorecardPageComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_div_54_Template_input_input_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61); const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r60.handleInput($event); })("blur", function ScorecardPageComponent_div_54_Template_input_blur_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61); const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r62.handleBlur($event); })("keydown", function ScorecardPageComponent_div_54_Template_input_keydown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61); const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r63.handleKeyDown($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pl_r59 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", pl_r59 + 5, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("input-", pl_r59, "-c-HCP");
} }
function ScorecardPageComponent_div_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div");
} if (rf & 2) {
    const i_r65 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", i_r65, " disabled");
} }
function ScorecardPageComponent_div_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pl_r66 = ctx.$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("r", pl_r66 + 5, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r12.Store.players[pl_r66].net);
} }
const _c2 = function () { return [0, 1, 2, 3, 4, 5, 6, 7, 8]; };
const _c3 = function () { return [10, 11, 12, 13, 14, 15, 16, 17, 18]; };
class ScorecardPageComponent {
    constructor(Store) {
        this.Store = Store;
        this.activeCourseData = null;
        this.teeCount = 0;
        this.colors = [];
        this.muted = [];
        this.validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        this.activeInput = "";
        this.totals = {
            par: {
                in: 0,
                out: 0,
                total: 0,
            },
            tees: {
                in: [],
                out: [],
                total: [],
            },
        };
        this.colpos = 0;
    }
    ngOnInit() {
        this.Store.subSelect(() => {
            this.initialize();
        });
    }
    initialize() {
        var _a, _b, _c;
        this.Store.activeCourse = this.Store.courses[this.Store.activeCourse];
        this.activeCourseData = this.Store.activeCourse;
        // console.log(this.activeCourseData);
        this.colors = [];
        if (this.activeCourseData.holes[0].teeBoxes[this.activeCourseData.holes[1].teeBoxes.length - 1].teeType === "auto change location") {
            this.teeCount = this.activeCourseData.holes[0].teeBoxes.length - 1;
        }
        else {
            this.teeCount = this.activeCourseData.holes[0].teeBoxes.length;
        }
        // document.querySelector(".tee-head")?.style.height = ((cellHeight * teeCount) + cellHeightUnits);
        (_a = document.querySelector(".tee-head")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", `height: ${5 * this.teeCount}vh`);
        (_b = document.querySelector(".databody")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", `height: calc(5vh * ${this.teeCount + 7})`);
        (_c = document.querySelector(".scorecard-nav")) === null || _c === void 0 ? void 0 : _c.setAttribute("style", `top: calc(5vh * ${this.teeCount + 7} + 10px)`);
        for (let a = 0; a < this.teeCount; a++) {
            this.colors.push(this.getDynamicColor(this.activeCourseData.holes[0].teeBoxes[a].teeHexColor) || "#ffffff");
        }
        for (let a = 0; a < this.teeCount; a++) {
            this.muted.push(this.getMutedColor(this.activeCourseData.holes[0].teeBoxes[a].teeHexColor) || "#ffffff");
        }
        for (let a = 0; a < 9; a++) {
            this.totals.par.out += this.activeCourseData.holes[a].teeBoxes[0].par;
            for (let b = 0; b < this.teeCount; b++) {
                if (!this.totals.tees.out[b]) {
                    this.totals.tees.out[b] = 0;
                }
                this.totals.tees.out[b] += this.activeCourseData.holes[a].teeBoxes[b].yards;
            }
        }
        for (let a = 9; a < 18; a++) {
            this.totals.par.in += this.activeCourseData.holes[a].teeBoxes[0].par;
            for (let b = 0; b < this.teeCount; b++) {
                if (!this.totals.tees.in[b]) {
                    this.totals.tees.in[b] = 0;
                }
                this.totals.tees.in[b] += this.activeCourseData.holes[a].teeBoxes[b].yards;
            }
        }
        for (let a = 0; a < this.teeCount; a++) {
            this.totals.tees.total[a] = this.totals.tees.in[a] + this.totals.tees.out[a];
        }
        this.totals.par.total = this.totals.par.in + this.totals.par.out;
        // console.log(this.colors);
    }
    getDynamicColor(hexcolor) {
        if (hexcolor.substr(0, 1) == "#") {
            hexcolor = hexcolor.substr(1);
        }
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? "black" : "white";
    }
    getMutedColor(hexcolor, muteAmount = 3) {
        if (hexcolor.substr(0, 1) == "#") {
            hexcolor = hexcolor.substr(1);
        }
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        // let lowR = (r-muteAmount > 0) ? r-muteAmount : 0;
        // let lowG = (g-muteAmount > 0) ? g-muteAmount : 0;
        // let lowB = (b-muteAmount > 0) ? b-muteAmount : 0;
        let lowR = r - r / muteAmount;
        let lowG = g - g / muteAmount;
        let lowB = b - b / muteAmount;
        var darkrgb = `rgb(${lowR},${lowG},${lowB})`;
        return darkrgb;
    }
    handleInput(event) {
        if (event.target.value.length > 2 && !event.target.classList.contains("name-input")) {
            event.target.value = event.target.value.slice(0, 2);
        }
        else {
            this.activeInput = event.target.value;
        }
        if (event.target.value < 0) {
            event.target.value = null;
        }
    }
    handleBlur(event) {
        // console.log(this.activeInput);
        let inputId = event.target.classList[0].split("-");
        if (this.activeInput != "") {
            // console.log(inputId);
            if (event.target.classList.contains("name-input")) {
                this.updateScores(inputId[2], inputId[4]);
            }
            else {
                this.updateScores(inputId[1], inputId[3], event.target);
            }
            this.activeInput = "";
        }
    }
    handleKeyDown(event) {
        // console.log(this.activeInput);
        if (!this.validKeys.includes(event.key) && !event.target.classList.contains("name-input")) {
            // console.log("Preventing key", event.key);
            event.preventDefault();
        }
    }
    updateScores(pId, col, element) {
        var _a, _b, _c;
        // pId = parseInt(pId);
        // let newScore = parseInt(this.activeInput);
        let newScore = this.activeInput;
        // console.log(`Value is`, newScore);
        // sets name, returns before setting other things
        if (col == "NAME") {
            // console.log("Column is name");
            for (let key in this.Store.players) {
                if (this.Store.players[key].name == newScore && key != pId && newScore != "") {
                    // document.querySelector(".input-p-" + pId + "-c-" + col).value = null;
                    // document.querySelector(".player" + pId)?.children[0]?.style.animation = "0.5s invalid";
                    (_b = (_a = document.querySelector(".player" + pId)) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "animation: 0.5s invalid");
                    setTimeout(() => {
                        var _a, _b;
                        // document.querySelector(".player" + pId).children[0].style.animation = "";
                        (_b = (_a = document.querySelector(".player" + pId)) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "animation: none");
                    }, 300);
                    return;
                }
            }
            this.Store.players[pId].name = newScore;
            // console.log("set name to: ", this.Store.players[pId].name);
            return;
        }
        // sets handicap
        if (col == "HCP") {
            //  newScore = parseInt(newScore);
            this.Store.players[pId].hcp = parseInt(newScore);
        }
        // console.log(`pid is`, pId);
        // sets scores
        if (newScore == null || newScore == "-" || newScore == "") {
            return;
        }
        else if (this.Store.players[pId].name == "") {
            // console.warn("Need a name");
            element.value = "";
            (_c = document.querySelector(".player" + pId)) === null || _c === void 0 ? void 0 : _c.children[0].setAttribute("style", "animation: 0.5s invalid");
            setTimeout(() => {
                var _a;
                //  document.querySelector(".player" + pId).children[0].style.animation = "";
                (_a = document.querySelector(".player" + pId)) === null || _a === void 0 ? void 0 : _a.children[0].setAttribute("style", "animation: none");
            }, 300);
            //  document.querySelector(".input-p-"+pId+"-c-"+col).value = null;
            return;
        }
        else if (col != "HCP") {
            //  newScore = parseInt(newScore);
            this.Store.players[pId].scores[col] = parseInt(newScore);
        }
        // updates all totals except net. fTotal = first 9 holes, sTotal = second 9, gTotal = grand total aka. all 18
        let fTotal = 0, sTotal = 0, gTotal = 0;
        for (let a = 0; a < this.Store.players[pId].scores.length; a++) {
            if (this.Store.players[pId].scores[a] && a < 9) {
                fTotal += this.Store.players[pId].scores[a];
                gTotal += this.Store.players[pId].scores[a];
            }
            if (this.Store.players[pId].scores[a] && a >= 9) {
                sTotal += this.Store.players[pId].scores[a];
                gTotal += this.Store.players[pId].scores[a];
            }
        }
        // update scorecard
        this.Store.players[pId].outScore = fTotal;
        this.Store.players[pId].inScore = sTotal;
        this.Store.players[pId].totalScore = fTotal + sTotal;
        this.Store.players[pId].net = gTotal - this.Store.players[pId].hcp;
        // document.querySelector(".data-col-OUT").children[teeCount+1+pId].innerText = fTotal;
        // document.querySelector(".data-col-IN").children[teeCount+1+pId].innerText = sTotal;
        // document.querySelector(".data-col-TOT").children[teeCount+1+pId].innerText = gTotal;
        // document.querySelector(".data-col-NET").children[teeCount+1+pId].innerText = players[pId].net;
        // if (players[pId].scores.length == 18 && players[pId].hcp) {
        //     let diff = parGTotal - players[pId].net;
        //     if (diff > 5) {
        //         message(`Congrats ${players[pId].name}!`, messageGood[Math.floor(Math.random()*messageGood.length)]);
        //     } else if (diff < -5) {
        //         message(`Good work, ${players[pId].name}.`,messageBad[Math.floor(Math.random()*messageBad.length)]);
        //     } else {
        //         message(`Good game, ${players[pId].name}`,messageNormal[Math.floor(Math.random()*messageNormal.length)]);
        //     }
        // }
    }
    navL() {
        if (this.colpos > 0) {
            this.colpos--;
            this.alignCols();
        }
    }
    navR() {
        if (this.colpos < 20) {
            this.colpos++;
            this.alignCols();
        }
    }
    // leverages scroll position to align columns to show 3 perfectly
    alignCols() {
        var _a;
        (_a = document.querySelector(".databody")) === null || _a === void 0 ? void 0 : _a.scrollTo({
            top: 0,
            left: (this.colpos * window.innerWidth) / 4,
            behavior: "smooth",
        });
    }
    handleScroll(event) {
        this.colpos = Math.floor(event.target.scrollLeft / (window.innerWidth / (100 / 25)));
    }
}
ScorecardPageComponent.ɵfac = function ScorecardPageComponent_Factory(t) { return new (t || ScorecardPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"])); };
ScorecardPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ScorecardPageComponent, selectors: [["app-scorecard-page"]], decls: 74, vars: 25, consts: [[1, "scorecard"], ["class", "name", 4, "ngIf"], [1, "scorecard-wrap"], [1, "headers"], [1, "cell-empty"], [1, "tee-head"], [1, "player", "player0"], ["type", "text", "placeholder", "P1 INT", "maxlength", "3", 1, "input-p-0-c-NAME", "name-input", 3, "input", "blur", "keydown"], [1, "player", "player1"], ["type", "text", "placeholder", "P2 INT", "maxlength", "3", 1, "input-p-1-c-NAME", "name-input", 3, "input", "blur", "keydown"], [1, "player", "player2"], ["type", "text", "placeholder", "P3 INT", "maxlength", "3", 1, "input-p-2-c-NAME", "name-input", 3, "input", "blur", "keydown"], [1, "player", "player3"], ["type", "text", "placeholder", "P4 INT", "maxlength", "3", 1, "input-p-3-c-NAME", "name-input", 3, "input", "blur", "keydown"], [1, "par"], [1, "hcp"], [1, "databody", 3, "scroll"], [3, "class", "style", 4, "ngFor", "ngForOf"], [1, "data-col", "special-col", "no-seperator-col", "data-col-OUT", 2, "left", "225vw"], [1, "r0"], [3, "style", 4, "ngFor", "ngForOf"], [3, "class", 4, "ngFor", "ngForOf"], [1, "r9"], [1, "r10", "disabled"], [1, "data-col", "special-col", "data-col-IN", 2, "left", "475vw"], [1, "data-col", "data-col-TOTAL", 2, "left", "500vw"], [1, "data-col", "data-col-HCP", 2, "left", "525vw"], [1, "r9", "disabled"], [1, "data-col", "data-col-NET", 2, "left", "550vw"], [1, "scorecard-nav"], [1, "nav-btn", "btn-l", 3, "click"], ["viewBox", "0 0 24 24"], ["fill", "currentColor", "d", "M21.33,0H2.67A2.66,2.66,0,0,0,0,2.67V21.33A2.67,2.67,0,0,0,2.67,24H21.33A2.66,2.66,0,0,0,24,21.33V2.67A2.66,2.66,0,0,0,21.33,0M17,18.12,15.05,20l-8-8,8-8L17,5.88,10.83,12Z"], [1, "align", 3, "click"], ["fill", "currentColor", "d", "M21.47,0H2.53A2.53,2.53,0,0,0,0,2.53V21.47A2.53,2.53,0,0,0,2.53,24H21.47A2.53,2.53,0,0,0,24,21.47V2.53A2.53,2.53,0,0,0,21.47,0ZM5.57,15.68V12.92H1.89V11.08H5.57V8.32L9.24,12Zm7.35,3.67H11.08V4.65h1.84Zm9.19-6.43H18.43v2.76L14.76,12l3.67-3.68v2.76h3.68Z", 1, "cls-1"], [1, "nav-btn", "btn-r", 3, "click"], ["fill", "currentColor", "d", "M21.33,0H2.67A2.66,2.66,0,0,0,0,2.67V21.33A2.67,2.67,0,0,0,2.67,24H21.33A2.66,2.66,0,0,0,24,21.33V2.67A2.66,2.66,0,0,0,21.33,0M9,20l-1.9-1.88L13.17,12,7.05,5.88,9,4l8,8Z"], [1, "name"], [3, "style", "class", 4, "ngFor", "ngForOf"], ["class", "r9", 4, "ngIf"], ["class", "r10", 4, "ngIf"], ["type", "number", "maxlength", "2", 3, "input", "blur", "keydown"], [1, "r10"]], template: function ScorecardPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ScorecardPageComponent_div_1_Template, 2, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "HOLE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "TEES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_Template_input_input_10_listener($event) { return ctx.handleInput($event); })("blur", function ScorecardPageComponent_Template_input_blur_10_listener($event) { return ctx.handleBlur($event); })("keydown", function ScorecardPageComponent_Template_input_keydown_10_listener($event) { return ctx.handleKeyDown($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_Template_input_input_12_listener($event) { return ctx.handleInput($event); })("blur", function ScorecardPageComponent_Template_input_blur_12_listener($event) { return ctx.handleBlur($event); })("keydown", function ScorecardPageComponent_Template_input_keydown_12_listener($event) { return ctx.handleKeyDown($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_Template_input_input_14_listener($event) { return ctx.handleInput($event); })("blur", function ScorecardPageComponent_Template_input_blur_14_listener($event) { return ctx.handleBlur($event); })("keydown", function ScorecardPageComponent_Template_input_keydown_14_listener($event) { return ctx.handleKeyDown($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ScorecardPageComponent_Template_input_input_16_listener($event) { return ctx.handleInput($event); })("blur", function ScorecardPageComponent_Template_input_blur_16_listener($event) { return ctx.handleBlur($event); })("keydown", function ScorecardPageComponent_Template_input_keydown_16_listener($event) { return ctx.handleKeyDown($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "PAR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "HCP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("scroll", function ScorecardPageComponent_Template_div_scroll_23_listener($event) { return ctx.handleScroll($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, ScorecardPageComponent_div_24_Template, 7, 13, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "OUT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, ScorecardPageComponent_div_28_Template, 2, 5, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, ScorecardPageComponent_div_29_Template, 2, 4, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, ScorecardPageComponent_div_33_Template, 7, 13, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "IN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, ScorecardPageComponent_div_37_Template, 2, 5, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, ScorecardPageComponent_div_38_Template, 2, 4, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "TOTAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, ScorecardPageComponent_div_45_Template, 2, 5, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, ScorecardPageComponent_div_46_Template, 2, 4, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "HCP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](53, ScorecardPageComponent_div_53_Template, 1, 3, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](54, ScorecardPageComponent_div_54_Template, 2, 6, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "NET");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, ScorecardPageComponent_div_60_Template, 1, 3, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](61, ScorecardPageComponent_div_61_Template, 2, 4, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "button", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScorecardPageComponent_Template_button_click_65_listener() { return ctx.navL(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "svg", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "path", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScorecardPageComponent_Template_button_click_68_listener() { return ctx.alignCols(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "svg", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "path", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "button", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScorecardPageComponent_Template_button_click_71_listener() { return ctx.navR(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "svg", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "path", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.activeCourseData);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.muted);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](17, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.totals.par.out);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.muted);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.totals.par.in);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.muted);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](20, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.totals.par.total);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](21, _c0).constructor(ctx.teeCount));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](22, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](23, _c0).constructor(ctx.teeCount));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](24, _c1));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: [".scorecard[_ngcontent-%COMP%] {\n  height: calc(100% - 100px);\n  position: absolute;\n  display: flex;\n  z-index: 10;\n  top: 100px;\n  left: 200vw;\n  width: 100vw;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-nav[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  display: flex;\n  justify-content: space-evenly;\n  background: #292929;\n  border-right: 5px solid #191919;\n  border-bottom: 5px solid #191919;\n  box-sizing: border-box;\n  border-radius: 10px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 5px;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 40px;\n  position: relative;\n  background: none;\n  border: none;\n  outline: none;\n  font-family: \"Raleway\";\n  height: 40px;\n  transition: 0.05s;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:active   svg[_ngcontent-%COMP%] {\n  border-right: 1px solid #074765;\n  border-bottom: 1px solid #074765;\n  left: 3px;\n  top: 3px;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 30px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  color: #007e9a;\n  border-right: 3px solid #074765;\n  border-bottom: 3px solid #074765;\n  border-radius: 5px;\n  padding: 0;\n  transition: 0.05s;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  display: flex;\n  justify-content: space-evenly;\n  background: #292929;\n  border-right: 5px solid #191919;\n  border-bottom: 5px solid #191919;\n  box-sizing: border-box;\n  border-radius: 10px;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 5px;\n  flex-direction: column;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%]   .easy-nav[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%]   .easy-btn-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-evenly;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%]   .easy-btn-wrap[_ngcontent-%COMP%]   .easy-empty[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%]   .easy-btn-wrap[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 40px;\n  position: relative;\n  background: none;\n  border: none;\n  outline: none;\n  font-family: \"Raleway\";\n  height: 40px;\n  transition: 0.05s;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%]   .easy-btn-wrap[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:active   svg[_ngcontent-%COMP%] {\n  border-right: 1px solid #074765;\n  border-bottom: 1px solid #074765;\n  left: 3px;\n  top: 3px;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-buttons[_ngcontent-%COMP%]   .easy-btn-wrap[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 30px;\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  color: #077500;\n  border-right: 3px solid #155600;\n  border-bottom: 3px solid #155600;\n  border-radius: 5px;\n  padding: 0;\n  transition: 0.05s;\n}\n.scorecard[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  width: 100%;\n  position: absolute;\n  top: -30px;\n  text-align: center;\n  color: white;\n  font-family: \"Raleway\", \"Noto Sans\";\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%] {\n  width: 75vw;\n  background: #313131;\n  color: white;\n  position: absolute;\n  right: 0;\n  top: 0;\n  overflow-x: scroll;\n  border-radius: 10px;\n  border-right: 5px solid #191919;\n  border-bottom: 5px solid #191919;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%]   .data-col[_ngcontent-%COMP%] {\n  position: absolute;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%]   .data-col[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  height: 5vh;\n  box-sizing: border-box;\n  width: 25vw;\n  position: relative;\n  text-align: center;\n  line-height: 5vh;\n  font-family: \"Noto Sans\";\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%]   .data-col[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  box-sizing: border-box;\n  outline: none;\n  padding: none;\n  border: none;\n  background: transparent;\n  color: #00ffdc;\n  text-align: center;\n  font-family: \"Noto Sans\";\n  font-size: 20px;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:not(.no-seperator-col)   div[_ngcontent-%COMP%] {\n  border-right: 2px solid #272727;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%]   .special-col[_ngcontent-%COMP%] {\n  background: #242424;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .databody[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%] {\n  background: #282828;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .headers[_ngcontent-%COMP%] {\n  width: 20vw;\n  background: #292929;\n  position: absolute;\n  top: 0;\n  color: #cfcfcf;\n  border-radius: 10px;\n  border-top-left-radius: 0px;\n  border-right: 5px solid #191919;\n  border-bottom: 5px solid #191919;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .headers[_ngcontent-%COMP%]   .tee-head[_ngcontent-%COMP%] {\n  position: relative;\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .headers[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  height: 5vh;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  font-family: \"Ubuntu\";\n}\n.scorecard[_ngcontent-%COMP%]   .scorecard-wrap[_ngcontent-%COMP%]   .headers[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border: none;\n  box-sizing: border-box;\n  outline: none;\n  text-align: center;\n  font-size: 15px;\n  font-family: \"Ubuntu\";\n  background: #313131;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzY29yZWNhcmQtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNDLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFFQSxXQUFBO0VBRUEsWUFBQTtBQUpEO0FBTUM7RUFDQyxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFFQSxZQUFBO0FBTEY7QUFNRTtFQUNDLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUpIO0FBS0c7RUFHQywrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7QUFMSjtBQU9HO0VBQ0MsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtBQUxKO0FBV0M7RUFDQyxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFFQSxZQUFBO0VBQ0Esc0JBQUE7QUFWRjtBQVlFO0VBQ0MsbUJBQUE7QUFWSDtBQVlFO0VBQ0MsYUFBQTtFQUNBLDZCQUFBO0FBVkg7QUFXRztFQUNDLFVBQUE7QUFUSjtBQVdHO0VBQ0MsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBVEo7QUFVSTtFQUdDLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQVZMO0FBWUk7RUFDQyxZQUFBO0VBQ0EsV0FBQTtFQUNVLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDVixjQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0FBVkw7QUFnQkM7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUNBQUE7QUFkRjtBQWdCQztFQUVDLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBZkY7QUFnQkU7RUFDQyxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsTUFBQTtFQUNBLGtCQUFBO0VBRUEsbUJBQUE7RUFDQSwrQkFBQTtFQUNBLGdDQUFBO0FBZkg7QUFnQkc7RUFDQyxrQkFBQTtBQWRKO0FBZUk7RUFDQyxXQS9KUztFQWdLVCxzQkFBQTtFQUNBLFdBaEtRO0VBaUtSLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFwS1M7RUFxS1Qsd0JBQUE7QUFiTDtBQWNLO0VBQ0MsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFHQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtFQUNBLGVBQUE7QUFkTjtBQWtCRztFQUNDLCtCQUFBO0FBaEJKO0FBa0JHO0VBQ0MsbUJBQUE7QUFoQko7QUFrQkc7RUFDQyxtQkFBQTtBQWhCSjtBQW1CRTtFQUNDLFdBQUE7RUFFQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQ0FBQTtBQWxCSDtBQW1CRztFQUNDLGtCQUFBO0FBakJKO0FBbUJHO0VBQ0Msc0JBQUE7RUFFQSxXQW5OVTtFQW9OVixrQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7QUFsQko7QUFtQkk7RUFDQyxXQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQWpCTCIsImZpbGUiOiJzY29yZWNhcmQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRjZWxsLWhlaWdodDogNXZoO1xyXG4kY2VsbC13aWR0aDogMjV2dztcclxuXHJcbi5zY29yZWNhcmQge1xyXG5cdGhlaWdodDogY2FsYygxMDAlIC0gMTAwcHgpO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRkaXNwbGF5OiBmbGV4O1xyXG5cdHotaW5kZXg6IDEwO1xyXG5cdHRvcDogMTAwcHg7XHJcblx0Ly8gYmFja2dyb3VuZDogb3JhbmdlO1xyXG5cdGxlZnQ6IDIwMHZ3O1xyXG5cdC8vIGxlZnQ6IDA7XHJcblx0d2lkdGg6IDEwMHZ3O1xyXG5cdC8vIG92ZXJmbG93OiBoaWRkZW47XHJcblx0LnNjb3JlY2FyZC1uYXYge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcblx0XHRiYWNrZ3JvdW5kOiAjMjkyOTI5O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiA1cHggc29saWQgIzE5MTkxOTtcclxuXHRcdGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRsZWZ0OiAwO1xyXG5cdFx0cmlnaHQ6IDA7XHJcblx0XHRtYXJnaW46IGF1dG87XHJcblx0XHQvLyBib3gtc2hhZG93OiAzcHggM3B4IDVweCBibGFjaztcclxuXHRcdHBhZGRpbmc6IDVweDtcclxuXHRcdGJ1dHRvbiB7XHJcblx0XHRcdHdpZHRoOiA0MHB4O1xyXG5cdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdGJhY2tncm91bmQ6IG5vbmU7XHJcblx0XHRcdGJvcmRlcjogbm9uZTtcclxuXHRcdFx0b3V0bGluZTogbm9uZTtcclxuXHRcdFx0Zm9udC1mYW1pbHk6IFwiUmFsZXdheVwiO1xyXG5cdFx0XHRoZWlnaHQ6IDQwcHg7XHJcblx0XHRcdHRyYW5zaXRpb246IDAuMDVzO1xyXG5cdFx0XHQmOmFjdGl2ZSBzdmcge1xyXG5cdFx0XHRcdC8vIG1hcmdpbi10b3A6IDNweDtcclxuXHRcdFx0XHQvLyBtYXJnaW4tbGVmdDogM3B4O1xyXG5cdFx0XHRcdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMwNzQ3NjU7XHJcblx0XHRcdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwNzQ3NjU7XHJcblx0XHRcdFx0bGVmdDogM3B4O1xyXG5cdFx0XHRcdHRvcDogM3B4O1xyXG5cdFx0XHR9XHJcblx0XHRcdHN2ZyB7XHJcblx0XHRcdFx0aGVpZ2h0OiAzMHB4O1xyXG5cdFx0XHRcdHdpZHRoOiAzMHB4O1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdHJpZ2h0OiAwO1xyXG5cdFx0XHRcdHRvcDogMDtcclxuXHRcdFx0XHRib3R0b206IDA7XHJcblx0XHRcdFx0bWFyZ2luOiBhdXRvO1xyXG5cdFx0XHRcdGNvbG9yOiAjMDA3ZTlhO1xyXG5cdFx0XHRcdGJvcmRlci1yaWdodDogM3B4IHNvbGlkICMwNzQ3NjU7XHJcblx0XHRcdFx0Ym9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMwNzQ3NjU7XHJcblx0XHRcdFx0Ym9yZGVyLXJhZGl1czogNXB4O1xyXG5cdFx0XHRcdHBhZGRpbmc6IDA7XHJcblx0XHRcdFx0dHJhbnNpdGlvbjogMC4wNXM7XHJcblx0XHRcdFx0Ly8gYmFja2dyb3VuZDogd2hpdGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5zY29yZWNhcmQtYnV0dG9ucyB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR3aWR0aDogMTAwJTtcclxuXHRcdGRpc3BsYXk6IGZsZXg7XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuXHRcdGJhY2tncm91bmQ6ICMyOTI5Mjk7XHJcblx0XHRib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdFx0Ym9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICMxOTE5MTk7XHJcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMTBweDtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdGxlZnQ6IDA7XHJcblx0XHRyaWdodDogMDtcclxuXHRcdG1hcmdpbjogYXV0bztcclxuXHRcdC8vIGJveC1zaGFkb3c6IDNweCAzcHggNXB4IGJsYWNrO1xyXG5cdFx0cGFkZGluZzogNXB4O1xyXG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRcdC8vIHRvcDogNDgwcHg7XHJcblx0XHQuZWFzeS1uYXYge1xyXG5cdFx0XHRtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG5cdFx0fVxyXG5cdFx0LmVhc3ktYnRuLXdyYXAge1xyXG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuXHRcdFx0LmVhc3ktZW1wdHkge1xyXG5cdFx0XHRcdG9wYWNpdHk6IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0YnV0dG9uIHtcclxuXHRcdFx0XHR3aWR0aDogNDBweDtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogbm9uZTtcclxuXHRcdFx0XHRib3JkZXI6IG5vbmU7XHJcblx0XHRcdFx0b3V0bGluZTogbm9uZTtcclxuXHRcdFx0XHRmb250LWZhbWlseTogXCJSYWxld2F5XCI7XHJcblx0XHRcdFx0aGVpZ2h0OiA0MHB4O1xyXG5cdFx0XHRcdHRyYW5zaXRpb246IDAuMDVzO1xyXG5cdFx0XHRcdCY6YWN0aXZlIHN2ZyB7XHJcblx0XHRcdFx0XHQvLyBtYXJnaW4tdG9wOiAzcHg7XHJcblx0XHRcdFx0XHQvLyBtYXJnaW4tbGVmdDogM3B4O1xyXG5cdFx0XHRcdFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzA3NDc2NTtcclxuXHRcdFx0XHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDc0NzY1O1xyXG5cdFx0XHRcdFx0bGVmdDogM3B4O1xyXG5cdFx0XHRcdFx0dG9wOiAzcHg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHN2ZyB7XHJcblx0XHRcdFx0XHRoZWlnaHQ6IDMwcHg7XHJcblx0XHRcdFx0XHR3aWR0aDogMzBweDtcclxuICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICAgICAgIGJvdHRvbTogMDtcclxuXHRcdFx0XHRcdGNvbG9yOiAjMDc3NTAwO1xyXG5cdFx0XHRcdFx0Ym9yZGVyLXJpZ2h0OiAzcHggc29saWQgIzE1NTYwMDtcclxuXHRcdFx0XHRcdGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjMTU1NjAwO1xyXG5cdFx0XHRcdFx0Ym9yZGVyLXJhZGl1czogNXB4O1xyXG5cdFx0XHRcdFx0cGFkZGluZzogMDtcclxuXHRcdFx0XHRcdHRyYW5zaXRpb246IDAuMDVzO1xyXG5cdFx0XHRcdFx0Ly8gYmFja2dyb3VuZDogd2hpdGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdC5uYW1lIHtcclxuXHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAtMzBweDtcclxuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdGNvbG9yOiB3aGl0ZTtcclxuXHRcdGZvbnQtZmFtaWx5OiBcIlJhbGV3YXlcIiwgXCJOb3RvIFNhbnNcIjtcclxuXHR9XHJcblx0LnNjb3JlY2FyZC13cmFwIHtcclxuXHRcdC8vIGJhY2tncm91bmQ6IHB1cnBsZTtcclxuXHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdC5kYXRhYm9keSB7XHJcblx0XHRcdHdpZHRoOiA3NXZ3O1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiAjMzEzMTMxO1xyXG5cdFx0XHRjb2xvcjogd2hpdGU7XHJcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0cmlnaHQ6IDA7XHJcblx0XHRcdHRvcDogMDtcclxuXHRcdFx0b3ZlcmZsb3cteDogc2Nyb2xsO1xyXG5cdFx0XHQvLyBoZWlnaHQ6IGNhbGMoNXZoICogMTEpO1xyXG5cdFx0XHRib3JkZXItcmFkaXVzOiAxMHB4O1xyXG5cdFx0XHRib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdFx0XHRib3JkZXItYm90dG9tOiA1cHggc29saWQgIzE5MTkxOTtcclxuXHRcdFx0LmRhdGEtY29sIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0ZGl2IHtcclxuXHRcdFx0XHRcdGhlaWdodDogJGNlbGwtaGVpZ2h0O1xyXG5cdFx0XHRcdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHRcdFx0XHRcdHdpZHRoOiAkY2VsbC13aWR0aDtcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRcdGxpbmUtaGVpZ2h0OiAkY2VsbC1oZWlnaHQ7XHJcblx0XHRcdFx0XHRmb250LWZhbWlseTogXCJOb3RvIFNhbnNcIjtcclxuXHRcdFx0XHRcdGlucHV0IHtcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdFx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdFx0XHRcdFx0XHRvdXRsaW5lOiBub25lO1xyXG5cdFx0XHRcdFx0XHRwYWRkaW5nOiBub25lO1xyXG5cdFx0XHRcdFx0XHQvLyBiYWNrZ3JvdW5kOiBvcmFuZ2U7XHJcblx0XHRcdFx0XHRcdC8vIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG5cdFx0XHRcdFx0XHRib3JkZXI6IG5vbmU7XHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG5cdFx0XHRcdFx0XHRjb2xvcjogIzAwZmZkYztcclxuXHRcdFx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdFx0XHRmb250LWZhbWlseTogXCJOb3RvIFNhbnNcIjtcclxuXHRcdFx0XHRcdFx0Zm9udC1zaXplOiAyMHB4O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHQ6bm90KC5uby1zZXBlcmF0b3ItY29sKSBkaXYge1xyXG5cdFx0XHRcdGJvcmRlci1yaWdodDogMnB4IHNvbGlkICMyNzI3Mjc7XHJcblx0XHRcdH1cclxuXHRcdFx0LnNwZWNpYWwtY29sIHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjMjQyNDI0O1xyXG5cdFx0XHR9XHJcblx0XHRcdC5kaXNhYmxlZCB7XHJcblx0XHRcdFx0YmFja2dyb3VuZDogIzI4MjgyODtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0LmhlYWRlcnMge1xyXG5cdFx0XHR3aWR0aDogMjB2dztcclxuXHRcdFx0Ly8gYmFja2dyb3VuZDogcHVycGxlO1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiAjMjkyOTI5O1xyXG5cdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdHRvcDogMDtcclxuXHRcdFx0Y29sb3I6IHJnYigyMDcsIDIwNywgMjA3KTtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czogMTBweDtcclxuXHRcdFx0Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xyXG5cdFx0XHRib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdFx0XHRib3JkZXItYm90dG9tOiA1cHggc29saWQgIzE5MTkxOTtcclxuXHRcdFx0LnRlZS1oZWFkIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGl2IHtcclxuXHRcdFx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdFx0XHRcdC8vIGJhY2tncm91bmQ6IGdyZWVuO1xyXG5cdFx0XHRcdGhlaWdodDogJGNlbGwtaGVpZ2h0O1xyXG5cdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdFx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0XHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblx0XHRcdFx0Zm9udC1mYW1pbHk6IFwiVWJ1bnR1XCI7XHJcblx0XHRcdFx0aW5wdXQge1xyXG5cdFx0XHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdFx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRcdFx0XHRib3JkZXI6IG5vbmU7XHJcblx0XHRcdFx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdFx0XHRcdFx0b3V0bGluZTogbm9uZTtcclxuXHRcdFx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0XHRcdGZvbnQtc2l6ZTogMTVweDtcclxuXHRcdFx0XHRcdGZvbnQtZmFtaWx5OiBcIlVidW50dVwiO1xyXG5cdFx0XHRcdFx0YmFja2dyb3VuZDogIzMxMzEzMTtcclxuXHRcdFx0XHRcdGNvbG9yOiB3aGl0ZTtcclxuXHRcdFx0XHRcdC8vIGFuaW1hdGlvbjogMC41cyBpbnZhbGlkIGluZmluaXRlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "iiUU":
/*!*************************************************************!*\
  !*** ./src/app/components/init-card/init-card.component.ts ***!
  \*************************************************************/
/*! exports provided: InitCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitCardComponent", function() { return InitCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var src_app_services_api_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/api-handler.service */ "Jdrb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




function InitCardComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InitCardComponent_div_4_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.requestLoad(ctx_r3.idx); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Load Course Data");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("load-desc load-", ctx_r0.idx, "");
} }
function InitCardComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Holes:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Status:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.courseData.data.holes.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.courseData.data.status, " ");
} }
function InitCardComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Address:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Website:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" ", ctx_r2.courseData.data.addr1, ", ", ctx_r2.courseData.data.city, ", ", ctx_r2.courseData.data.stateOrProvince, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.courseData.data.website, " ");
} }
class InitCardComponent {
    constructor(Store, apiHandler) {
        this.Store = Store;
        this.apiHandler = apiHandler;
        // @Input() courseData:CourseData = { name: "NULL", hasData: false, };
        this.courseData = { name: "NULL", hasData: false }; // basic data for a singular course
        this.idx = -1;
        this.fetched = false;
        this.displayInfo = false;
    }
    ngOnInit() {
        // console.log(this.Store.courseData);
        this.courseData = this.Store.courseData.courses[this.idx];
    }
    requestLoad(id, from, callback) {
        var _a;
        id = parseInt(id);
        if (from != "select") {
            (_a = document.querySelector(`.load-${this.idx}`)) === null || _a === void 0 ? void 0 : _a.classList.add("clocking");
        }
        else {
        }
        this.courseData.data = this.apiHandler.loadBasicInfo(id, from == "select" ? false : true).then((data) => {
            var _a, _b, _c;
            // console.log(`Will cache data:`);
            // console.log(data.data);
            (_a = document.querySelector(`.load-${this.idx}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("clocking");
            this.Store.cacheData("course-" + this.Store.courseData.courses[id].id, data.data);
            this.Store.courses[this.Store.courseData.courses[id].id] = data.data;
            this.courseData.data = data.data;
            this.fetched = true;
            if (from == "select") {
                this.Store.setActive(id);
                callback();
            }
            else {
                this.displayInfo = true;
                (_b = document.querySelector(`.card-${this.idx}`)) === null || _b === void 0 ? void 0 : _b.classList.remove("no-info");
                (_c = document.querySelector(`.card-${this.idx}`)) === null || _c === void 0 ? void 0 : _c.classList.add("has-info");
            }
        }, () => {
            console.error("Promise rejected");
        });
    }
    select(id) {
        var _a;
        // console.log(`initcard select`, id);
        (_a = document.querySelector(`.select-${this.idx}`)) === null || _a === void 0 ? void 0 : _a.classList.add("clocking");
        id = parseInt(id);
        this.Store.activeCourse = this.Store.courseData.courses[id].id;
        this.requestLoad(id, "select", () => {
            var _a, _b, _c, _d;
            // console.log(`select callback triggered`);
            (_a = document.querySelector(`.select-${this.idx}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("clocking");
            (_b = document.querySelector(".root-wrap")) === null || _b === void 0 ? void 0 : _b.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            // document.querySelector(".scorecard").style.animation = "0.6s slidein ease-out forwards";
            // document.querySelector(".scorecard").style.animationDelay = "0.5s";
            (_c = document.querySelector(".scorecard")) === null || _c === void 0 ? void 0 : _c.setAttribute("style", "animation: 0.6s slidein ease-out forwards; animation-delay: 0.5s");
            (_d = document.querySelector(`.select-${this.idx}`)) === null || _d === void 0 ? void 0 : _d.classList.remove("clocking");
            for (let a = 0; a < document.querySelectorAll(".card").length; a++) {
                // document.querySelectorAll(".card")[a].style.animation = "0.6s slideout cubic-bezier(.54,-0.06,.6,-0.34) forwards";
                // document.querySelectorAll(".card")[a].style.animationDelay = 0.083 + 0.08 * a + "s";
                document.querySelectorAll(".card")[a].setAttribute("style", `animation: 0.6s slideout cubic-bezier(0.54, -0.06, 0.6, -0.34) forwards; animation-delay: ${(0.083 + (0.08 * a))}s`);
            }
        });
        // console.log("Active course is");
        // console.log(this.Store.activeCourse);
        // console.log("All course data is");
        // console.log(this.Store.courses);
    }
}
InitCardComponent.ɵfac = function InitCardComponent_Factory(t) { return new (t || InitCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_api_handler_service__WEBPACK_IMPORTED_MODULE_2__["ApiHandlerService"])); };
InitCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InitCardComponent, selectors: [["app-init-card"]], inputs: { idx: "idx" }, decls: 9, vars: 16, consts: [[1, "card-title"], [3, "class", "click", 4, "ngIf"], [3, "click"], ["class", "card-info", 4, "ngIf"], ["class", "card-desc", 4, "ngIf"], [1, "card-info"], [1, "emp"], [1, "card-desc"]], template: function InitCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, InitCardComponent_div_4_Template, 2, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InitCardComponent_Template_div_click_5_listener() { return ctx.select(ctx.idx); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Select Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, InitCardComponent_div_7_Template, 9, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, InitCardComponent_div_8_Template, 10, 4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("card no-info card-", ctx.idx, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("background-image: url(", ctx.courseData.image, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("card-img card-img-", ctx.idx, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.courseData.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.fetched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("select-course select-", ctx.idx, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.displayInfo);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.displayInfo);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["p[_ngcontent-%COMP%] {\n  background: purple;\n}\n\n.no-info[_ngcontent-%COMP%]   .card-img[_ngcontent-%COMP%] {\n  height: 20vh;\n  width: 100%;\n  background-position: center center;\n  background-size: cover;\n  border-radius: 5px;\n  border-right: 0px solid #ef0000;\n  border-bottom: 0px solid #ef0000;\n  box-sizing: border-box;\n  transition: 0.3s;\n}\n\n.no-info[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  width: 100%;\n  font-family: \"Raleway\";\n  font-weight: 700;\n  transition: 0.3s;\n  left: 0;\n  font-size: 30px;\n  margin-top: 10px;\n}\n\n.no-info[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%], .no-info[_ngcontent-%COMP%]   .card-desc[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: 0.2s;\n  transition-delay: 0.3s;\n}\n\n.has-info[_ngcontent-%COMP%]   .card-img[_ngcontent-%COMP%] {\n  height: 15vh;\n  border-radius: 10px;\n  background-position: center center;\n  background-size: cover;\n  transition: 0.3s;\n}\n\n.has-info[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  width: 100%;\n  font-family: \"Raleway\";\n  font-weight: 700;\n  transition: 0.3s;\n  left: 0;\n  font-size: 30px;\n  margin-top: 10px;\n}\n\n.has-info[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%], .has-info[_ngcontent-%COMP%]   .card-desc[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n.card[_ngcontent-%COMP%] {\n  width: 80vw;\n  max-width: 50vh;\n  background: #272828;\n  border-right: 5px solid #191919;\n  border-bottom: 5px solid #191919;\n  box-sizing: border-box;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  border-radius: 10px;\n  color: #cfcfcf;\n  left: 0;\n  right: 0;\n  padding-bottom: 5px;\n  transition: 0.2s;\n}\n\n.card[_ngcontent-%COMP%]   .emp[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 14px;\n}\n\n.card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%] {\n  position: relative;\n  left: 10px;\n  margin-top: 10px;\n  font-family: \"Noto Sans\";\n  font-size: 12px;\n}\n\n.card[_ngcontent-%COMP%]   .card-desc[_ngcontent-%COMP%] {\n  position: relative;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  left: 10px;\n  width: calc(100% - 20px);\n  font-family: \"Noto Sans\";\n  font-size: 12px;\n  overflow-wrap: break-word;\n}\n\n.card[_ngcontent-%COMP%]   .load-desc[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  border-right: 3px solid #074765;\n  border-bottom: 3px solid #074765;\n  background: #007e9a;\n  width: calc(100% - 30px);\n  margin: auto;\n  margin-top: 15px;\n  margin-bottom: 5px;\n  text-align: center;\n  padding: 5px;\n  font-family: \"Ubuntu\";\n  transition: 0.05s;\n  position: relative;\n}\n\n.card[_ngcontent-%COMP%]   .load-desc[_ngcontent-%COMP%]:active {\n  border-right: 0px solid #074765;\n  border-bottom: 0px solid #074765;\n  margin-top: 18px;\n  margin-left: calc(auto+3px);\n}\n\n.card[_ngcontent-%COMP%]   .select-course[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  border-right: 3px solid #155600;\n  border-bottom: 3px solid #155600;\n  background: #077500;\n  width: calc(100% - 30px);\n  margin: auto;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  text-align: center;\n  padding: 5px;\n  font-family: \"Ubuntu\";\n  transition: 0.05s;\n  position: relative;\n}\n\n.card[_ngcontent-%COMP%]   .select-course[_ngcontent-%COMP%]:active {\n  border-right: 0px solid #155600;\n  border-bottom: 0px solid #155600;\n  margin-top: 13px;\n  margin-left: calc(auto+3px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxpbml0LWNhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFQyxrQkFBQTtBQUFEOztBQUlDO0VBQ0MsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQ0FBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLGdDQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQURGOztBQUdDO0VBQ0Msa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxPQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBREY7O0FBR0M7O0VBRUMsVUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFLQztFQUNDLFlBQUE7RUFDQSxtQkFBQTtFQUNJLGtDQUFBO0VBQ0osc0JBQUE7RUFDSSxnQkFBQTtBQUZOOztBQUlHO0VBQ0csa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFHQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxPQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBSk47O0FBT0M7O0VBRUMsVUFBQTtBQUxGOztBQVNBO0VBQ0MsV0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBTkQ7O0FBUUM7RUFDQyxZQUFBO0VBQ0EsZUFBQTtBQU5GOztBQVFDO0VBQ0Msa0JBQUE7RUFDQSxVQUFBO0VBRUEsZ0JBQUE7RUFDQSx3QkFBQTtFQUNBLGVBQUE7QUFQRjs7QUFTQztFQUNDLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx3QkFBQTtFQUNBLHdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBUEY7O0FBU0M7RUFDQyxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFQRjs7QUFTRTtFQUNDLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLDJCQUFBO0FBUEg7O0FBVUM7RUFDQyxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFSRjs7QUFVRTtFQUNDLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLDJCQUFBO0FBUkgiLCJmaWxlIjoiaW5pdC1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsicCB7XHJcblx0Ly8gaGVpZ2h0OiA0MDBweDtcclxuXHRiYWNrZ3JvdW5kOiBwdXJwbGU7XHJcbn1cclxuXHJcbi5uby1pbmZvIHtcclxuXHQuY2FyZC1pbWcge1xyXG5cdFx0aGVpZ2h0OiAyMHZoO1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG5cdFx0YmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDVweDtcclxuXHRcdGJvcmRlci1yaWdodDogMHB4IHNvbGlkICNlZjAwMDA7XHJcblx0XHRib3JkZXItYm90dG9tOiAwcHggc29saWQgI2VmMDAwMDtcclxuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0XHR0cmFuc2l0aW9uOiAwLjNzO1xyXG5cdH1cclxuXHQuY2FyZC10aXRsZSB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHR3aWR0aDogMTAwJTtcclxuXHRcdGZvbnQtZmFtaWx5OiBcIlJhbGV3YXlcIjtcclxuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XHJcblx0XHR0cmFuc2l0aW9uOiAwLjNzO1xyXG5cdFx0bGVmdDogMDtcclxuXHRcdGZvbnQtc2l6ZTogMzBweDtcclxuXHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0fVxyXG5cdC5jYXJkLWluZm8sXHJcblx0LmNhcmQtZGVzYyB7XHJcblx0XHRvcGFjaXR5OiAwO1xyXG5cdFx0dHJhbnNpdGlvbjogMC4ycztcclxuXHRcdHRyYW5zaXRpb24tZGVsYXk6IDAuM3M7XHJcblx0fVxyXG59XHJcbi5oYXMtaW5mbyB7XHJcblx0LmNhcmQtaW1nIHtcclxuXHRcdGhlaWdodDogMTV2aDtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICB0cmFuc2l0aW9uOiAwLjNzO1xyXG5cdH1cclxuICAgLmNhcmQtdGl0bGUge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIC8vIHRvcDogNnZoO1xyXG4gICAgICAvLyB0b3A6IDE1MHB4O1xyXG4gICAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCI7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgICAgLy8gYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjMpO1xyXG4gIH1cclxuXHQuY2FyZC1pbmZvLFxyXG5cdC5jYXJkLWRlc2Mge1xyXG5cdFx0b3BhY2l0eTogMTtcclxuXHR9XHJcbn1cclxuXHJcbi5jYXJkIHtcclxuXHR3aWR0aDogODB2dztcclxuXHRtYXgtd2lkdGg6IDUwdmg7XHJcblx0YmFja2dyb3VuZDogIzI3MjgyODtcclxuXHRib3JkZXItcmlnaHQ6IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0bWFyZ2luLXRvcDogNXB4O1xyXG5cdG1hcmdpbi1ib3R0b206IDVweDtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0Ym9yZGVyLXJhZGl1czogMTBweDtcclxuXHRjb2xvcjogcmdiKDIwNywgMjA3LCAyMDcpO1xyXG5cdGxlZnQ6IDA7XHJcblx0cmlnaHQ6IDA7XHJcblx0cGFkZGluZy1ib3R0b206IDVweDtcclxuXHR0cmFuc2l0aW9uOiAwLjJzO1xyXG5cdC8vIGJveC1zaGFkb3c6IDNweCAzcHggNXB4IGJsYWNrO1xyXG5cdC5lbXAge1xyXG5cdFx0Y29sb3I6IHdoaXRlO1xyXG5cdFx0Zm9udC1zaXplOiAxNHB4O1xyXG5cdH1cclxuXHQuY2FyZC1pbmZvIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdGxlZnQ6IDEwcHg7XHJcblx0XHQvLyB0b3A6IDUwcHg7XHJcblx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0Zm9udC1mYW1pbHk6IFwiTm90byBTYW5zXCI7XHJcblx0XHRmb250LXNpemU6IDEycHg7XHJcblx0fVxyXG5cdC5jYXJkLWRlc2Mge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0bWFyZ2luLXRvcDogMTBweDtcclxuXHRcdG1hcmdpbi1ib3R0b206IDVweDtcclxuXHRcdGxlZnQ6IDEwcHg7XHJcblx0XHR3aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XHJcblx0XHRmb250LWZhbWlseTogXCJOb3RvIFNhbnNcIjtcclxuXHRcdGZvbnQtc2l6ZTogMTJweDtcclxuXHRcdG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XHJcblx0fVxyXG5cdC5sb2FkLWRlc2Mge1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogNXB4O1xyXG5cdFx0Ym9yZGVyLXJpZ2h0OiAzcHggc29saWQgIzA3NDc2NTtcclxuXHRcdGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjMDc0NzY1O1xyXG5cdFx0YmFja2dyb3VuZDogIzAwN2U5YTtcclxuXHRcdHdpZHRoOiBjYWxjKDEwMCUgLSAzMHB4KTtcclxuXHRcdG1hcmdpbjogYXV0bztcclxuXHRcdG1hcmdpbi10b3A6IDE1cHg7XHJcblx0XHRtYXJnaW4tYm90dG9tOiA1cHg7XHJcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRwYWRkaW5nOiA1cHg7XHJcblx0XHRmb250LWZhbWlseTogXCJVYnVudHVcIjtcclxuXHRcdHRyYW5zaXRpb246IDAuMDVzO1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0Ly8gY29sb3I6ICNmZmZmZmY7XHJcblx0XHQmOmFjdGl2ZSB7XHJcblx0XHRcdGJvcmRlci1yaWdodDogMHB4IHNvbGlkICMwNzQ3NjU7XHJcblx0XHRcdGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjMDc0NzY1O1xyXG5cdFx0XHRtYXJnaW4tdG9wOiAxOHB4O1xyXG5cdFx0XHRtYXJnaW4tbGVmdDogY2FsYyhhdXRvKzNweCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC5zZWxlY3QtY291cnNlIHtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDVweDtcclxuXHRcdGJvcmRlci1yaWdodDogM3B4IHNvbGlkICMxNTU2MDA7XHJcblx0XHRib3JkZXItYm90dG9tOiAzcHggc29saWQgIzE1NTYwMDtcclxuXHRcdGJhY2tncm91bmQ6ICMwNzc1MDA7XHJcblx0XHR3aWR0aDogY2FsYygxMDAlIC0gMzBweCk7XHJcblx0XHRtYXJnaW46IGF1dG87XHJcblx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0bWFyZ2luLWJvdHRvbTogNXB4O1xyXG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0cGFkZGluZzogNXB4O1xyXG5cdFx0Zm9udC1mYW1pbHk6IFwiVWJ1bnR1XCI7XHJcblx0XHR0cmFuc2l0aW9uOiAwLjA1cztcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdC8vIGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0JjphY3RpdmUge1xyXG5cdFx0XHRib3JkZXItcmlnaHQ6IDBweCBzb2xpZCAjMTU1NjAwO1xyXG5cdFx0XHRib3JkZXItYm90dG9tOiAwcHggc29saWQgIzE1NTYwMDtcclxuXHRcdFx0bWFyZ2luLXRvcDogMTNweDtcclxuXHRcdFx0bWFyZ2luLWxlZnQ6IGNhbGMoYXV0byszcHgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "pKuk":
/*!*************************************************************!*\
  !*** ./src/app/components/load-page/load-page.component.ts ***!
  \*************************************************************/
/*! exports provided: LoadPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadPageComponent", function() { return LoadPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_api_handler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/api-handler.service */ "Jdrb");
/* harmony import */ var src_app_services_store_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/store.service */ "MtBC");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _init_card_init_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../init-card/init-card.component */ "iiUU");





function LoadPageComponent_div_2_app_init_card_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-init-card", 4);
} if (rf & 2) {
    const i_r3 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("idx", i_r3);
} }
function LoadPageComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, LoadPageComponent_div_2_app_init_card_1_Template, 1, 1, "app-init-card", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.initCards);
} }
class LoadPageComponent {
    constructor(apiHandler, Store) {
        this.apiHandler = apiHandler;
        this.Store = Store;
        this.fetchedData = false;
        this.initCards = [];
    }
    ngOnInit() {
        this.apiHandler.grabCourses(() => {
            this.initCards = this.Store.courseData.courses;
            this.fetchedData = true;
        });
    }
}
LoadPageComponent.ɵfac = function LoadPageComponent_Factory(t) { return new (t || LoadPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_api_handler_service__WEBPACK_IMPORTED_MODULE_1__["ApiHandlerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_store_service__WEBPACK_IMPORTED_MODULE_2__["StoreService"])); };
LoadPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoadPageComponent, selectors: [["app-load-page"]], decls: 3, vars: 1, consts: [[1, "course-select"], [1, "card-wrap"], [4, "ngIf"], [3, "idx", 4, "ngFor", "ngForOf"], [3, "idx"]], template: function LoadPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, LoadPageComponent_div_2_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.fetchedData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _init_card_init_card_component__WEBPACK_IMPORTED_MODULE_4__["InitCardComponent"]], styles: [".course-select[_ngcontent-%COMP%] {\n  width: 100%;\n  position: relative;\n  z-index: 10;\n  margin-top: 85px;\n  padding-bottom: 30px;\n  transition: 0.2s;\n  left: 0;\n}\n.course-select[_ngcontent-%COMP%]   .card-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  width: 100%;\n  bottom: 0;\n  overflow: hidden;\n  flex-direction: column;\n  align-items: center;\n}\n.course-select[_ngcontent-%COMP%]   .card-wrap[_ngcontent-%COMP%]   .card-wrap-title[_ngcontent-%COMP%] {\n  color: white;\n  font-family: \"Ubuntu\";\n  margin-top: 0;\n  margin-bottom: 30px;\n  background: #1b1b1b;\n  border-radius: 5px;\n  height: 50px;\n  line-height: 50px;\n  width: 40vh;\n  text-align: center;\n  border-right: 3px solid #ef0000;\n  border-bottom: 3px solid #ef0000;\n  box-sizing: border-box;\n  box-shadow: 3px 3px 5px black;\n  position: relative;\n  left: 0;\n  right: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxsb2FkLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsT0FBQTtBQUNEO0FBQUM7RUFDQyxhQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0ksbUJBQUE7QUFFTjtBQURFO0VBQ0MsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtBQUdIIiwiZmlsZSI6ImxvYWQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb3Vyc2Utc2VsZWN0IHtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0ei1pbmRleDogMTA7XHJcblx0bWFyZ2luLXRvcDogODVweDtcclxuXHRwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuXHR0cmFuc2l0aW9uOiAwLjJzO1xyXG5cdGxlZnQ6IDA7XHJcblx0LmNhcmQtd3JhcCB7XHJcblx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdFx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcblx0XHR3aWR0aDogMTAwJTtcclxuXHRcdGJvdHRvbTogMDtcclxuXHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0LmNhcmQtd3JhcC10aXRsZSB7XHJcblx0XHRcdGNvbG9yOiB3aGl0ZTtcclxuXHRcdFx0Zm9udC1mYW1pbHk6IFwiVWJ1bnR1XCI7XHJcblx0XHRcdG1hcmdpbi10b3A6IDA7XHJcblx0XHRcdG1hcmdpbi1ib3R0b206IDMwcHg7XHJcblx0XHRcdGJhY2tncm91bmQ6IHJnYigyNywgMjcsIDI3KTtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czogNXB4O1xyXG5cdFx0XHRoZWlnaHQ6IDUwcHg7XHJcblx0XHRcdGxpbmUtaGVpZ2h0OiA1MHB4O1xyXG5cdFx0XHR3aWR0aDogNDB2aDtcclxuXHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRib3JkZXItcmlnaHQ6IDNweCBzb2xpZCAjZWYwMDAwO1xyXG5cdFx0XHRib3JkZXItYm90dG9tOiAzcHggc29saWQgI2VmMDAwMDtcclxuXHRcdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHRcdFx0Ym94LXNoYWRvdzogM3B4IDNweCA1cHggYmxhY2s7XHJcblx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdFx0bGVmdDogMDtcclxuXHRcdFx0cmlnaHQ6IDA7XHJcblx0XHR9XHJcblx0XHQvLyAuY2FyZCB7XHJcblx0XHQvLyBcdHdpZHRoOiA4MHZ3O1xyXG5cdFx0Ly8gXHRtYXgtd2lkdGg6IDUwdmg7XHJcblx0XHQvLyBcdGJhY2tncm91bmQ6ICMyNzI4Mjg7XHJcblx0XHQvLyBcdGJvcmRlci1yaWdodDogNXB4IHNvbGlkICMxOTE5MTk7XHJcblx0XHQvLyBcdGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjMTkxOTE5O1xyXG5cdFx0Ly8gXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdFx0Ly8gXHRtYXJnaW4tdG9wOiA1cHg7XHJcblx0XHQvLyBcdG1hcmdpbi1ib3R0b206IDVweDtcclxuXHRcdC8vIFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0Ly8gXHRib3JkZXItcmFkaXVzOiAxMHB4O1xyXG5cdFx0Ly8gXHRjb2xvcjogcmdiKDIwNywgMjA3LCAyMDcpO1xyXG5cdFx0Ly8gXHRsZWZ0OiAwO1xyXG5cdFx0Ly8gXHRyaWdodDogMDtcclxuXHRcdC8vIFx0cGFkZGluZy1ib3R0b206IDVweDtcclxuXHRcdC8vIFx0dHJhbnNpdGlvbjogMC4ycztcclxuXHRcdC8vIFx0Ly8gYm94LXNoYWRvdzogM3B4IDNweCA1cHggYmxhY2s7XHJcblx0XHQvLyBcdC5lbXAge1xyXG5cdFx0Ly8gXHRcdGNvbG9yOiB3aGl0ZTtcclxuXHRcdC8vIFx0XHRmb250LXNpemU6IDE0cHg7XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIFx0LmNhcmQtaW5mbyB7XHJcblx0XHQvLyBcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0Ly8gXHRcdGxlZnQ6IDEwcHg7XHJcblx0XHQvLyBcdFx0Ly8gdG9wOiA1MHB4O1xyXG5cdFx0Ly8gXHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHQvLyBcdFx0Zm9udC1mYW1pbHk6IFwiTm90byBTYW5zXCI7XHJcblx0XHQvLyBcdFx0Zm9udC1zaXplOiAxMnB4O1xyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyBcdC5jYXJkLWRlc2Mge1xyXG5cdFx0Ly8gXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdC8vIFx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0Ly8gXHRcdG1hcmdpbi1ib3R0b206IDVweDtcclxuXHRcdC8vIFx0XHRsZWZ0OiAxMHB4O1xyXG5cdFx0Ly8gXHRcdHdpZHRoOiBjYWxjKDEwMCUgLSAyMHB4KTtcclxuXHRcdC8vIFx0XHRmb250LWZhbWlseTogXCJOb3RvIFNhbnNcIjtcclxuXHRcdC8vIFx0XHRmb250LXNpemU6IDEycHg7XHJcblx0XHQvLyBcdFx0b3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcclxuXHRcdC8vIFx0fVxyXG5cdFx0Ly8gXHQubG9hZC1kZXNjIHtcclxuXHRcdC8vIFx0XHRib3JkZXItcmFkaXVzOiA1cHg7XHJcblx0XHQvLyBcdFx0Ym9yZGVyLXJpZ2h0OiAzcHggc29saWQgIzA3NDc2NTtcclxuXHRcdC8vIFx0XHRib3JkZXItYm90dG9tOiAzcHggc29saWQgIzA3NDc2NTtcclxuXHRcdC8vIFx0XHRiYWNrZ3JvdW5kOiAjMDA3ZTlhO1xyXG5cdFx0Ly8gXHRcdHdpZHRoOiBjYWxjKDEwMCUgLSAzMHB4KTtcclxuXHRcdC8vIFx0XHRtYXJnaW46IGF1dG87XHJcblx0XHQvLyBcdFx0bWFyZ2luLXRvcDogMTVweDtcclxuXHRcdC8vIFx0XHRtYXJnaW4tYm90dG9tOiA1cHg7XHJcblx0XHQvLyBcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0Ly8gXHRcdHBhZGRpbmc6IDVweDtcclxuXHRcdC8vIFx0XHRmb250LWZhbWlseTogXCJVYnVudHVcIjtcclxuXHRcdC8vIFx0XHR0cmFuc2l0aW9uOiAwLjNzO1xyXG5cdFx0Ly8gXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdC8vIFx0XHQvLyBjb2xvcjogI2ZmZmZmZjtcclxuXHRcdC8vIFx0XHQmOmFjdGl2ZSB7XHJcblx0XHQvLyBcdFx0XHRib3JkZXItcmlnaHQ6IDBweCBzb2xpZCAjMDc0NzY1O1xyXG5cdFx0Ly8gXHRcdFx0Ym9yZGVyLWJvdHRvbTogMHB4IHNvbGlkICMwNzQ3NjU7XHJcblx0XHQvLyBcdFx0XHRtYXJnaW4tdG9wOiAxOHB4O1xyXG5cdFx0Ly8gXHRcdFx0bWFyZ2luLWxlZnQ6IGNhbGMoYXV0byszcHgpO1xyXG5cdFx0Ly8gXHRcdH1cclxuXHRcdC8vIFx0fVxyXG5cdFx0Ly8gXHQuc2VsZWN0LWNvdXJzZSB7XHJcblx0XHQvLyBcdFx0Ym9yZGVyLXJhZGl1czogNXB4O1xyXG5cdFx0Ly8gXHRcdGJvcmRlci1yaWdodDogM3B4IHNvbGlkICMxNTU2MDA7XHJcblx0XHQvLyBcdFx0Ym9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMxNTU2MDA7XHJcblx0XHQvLyBcdFx0YmFja2dyb3VuZDogIzA3NzUwMDtcclxuXHRcdC8vIFx0XHR3aWR0aDogY2FsYygxMDAlIC0gMzBweCk7XHJcblx0XHQvLyBcdFx0bWFyZ2luOiBhdXRvO1xyXG5cdFx0Ly8gXHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHQvLyBcdFx0bWFyZ2luLWJvdHRvbTogNXB4O1xyXG5cdFx0Ly8gXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdC8vIFx0XHRwYWRkaW5nOiA1cHg7XHJcblx0XHQvLyBcdFx0Zm9udC1mYW1pbHk6IFwiVWJ1bnR1XCI7XHJcblx0XHQvLyBcdFx0dHJhbnNpdGlvbjogMC4wNXM7XHJcblx0XHQvLyBcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0Ly8gXHRcdC8vIGNvbG9yOiAjZmZmZmZmO1xyXG5cdFx0Ly8gXHRcdCY6YWN0aXZlIHtcclxuXHRcdC8vIFx0XHRcdGJvcmRlci1yaWdodDogMHB4IHNvbGlkICMxNTU2MDA7XHJcblx0XHQvLyBcdFx0XHRib3JkZXItYm90dG9tOiAwcHggc29saWQgIzE1NTYwMDtcclxuXHRcdC8vIFx0XHRcdG1hcmdpbi10b3A6IDEzcHg7XHJcblx0XHQvLyBcdFx0XHRtYXJnaW4tbGVmdDogY2FsYyhhdXRvKzNweCk7XHJcblx0XHQvLyBcdFx0fVxyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyB9XHJcblx0fVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zBoC":
/*!*********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.ts ***!
  \*********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class SidebarComponent {
    constructor() { }
    ngOnInit() {
    }
}
SidebarComponent.ɵfac = function SidebarComponent_Factory(t) { return new (t || SidebarComponent)(); };
SidebarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SidebarComponent, selectors: [["app-sidebar"]], decls: 2, vars: 0, template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "sidebar works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWRlYmFyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map