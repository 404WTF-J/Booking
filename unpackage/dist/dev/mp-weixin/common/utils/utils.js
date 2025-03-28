"use strict";
const common_vendor = require("../vendor.js");
class utils {
  constructor() {
    this.baseUrl = "http://192.168.31.73:9988/";
  }
  /**
  	封装请求option 参数是一个对象，默认值为 { showLoading: false }。这意味着如果调用 request 方法时没有提供 option 参数，
  	那么 showLoading 的值将默认为 false。
  	option.url：请求的 URL。如果 option.url 不存在，request 方法将返回 false 并不执行请求。
  
  	option.data：请求的数据。如果提供了 option.data，它将作为请求的数据发送；如果没有提供，将发送一个空对象 {}。
  
  	option.header：请求的头部信息。如果提供了 option.header，它将作为请求的头部发送；如果没有提供，将发送一个空对象 {}。
  
  	option.method：请求的方法。如果提供了 option.method，它将作为请求的方法发送；如果没有提供，默认为 "GET"。
  
  	option.success：请求成功时的回调函数。如果提供了 option.success 并且它是一个函数，当请求成功时，将调用这个函数并传递响应数据作为参数。
  
  	option.fail：请求失败时的回调函数。如果提供了 option.fail 并且它是一个函数，当请求失败时，将调用这个函数并传递错误信息作为参数。
  
  	通过使用 option 对象，request 方法可以灵活地处理各种请求场景，同时为调用者提供了简洁的接口。
  	*/
  request(option = {
    showLoading: false
  }) {
    if (!option.url) {
      return false;
    }
    this.showLoading();
    common_vendor.index.request({
      url: this.baseUrl + option.url,
      data: option.data ? option.data : {},
      header: option.header ? option.header : {},
      method: option.method ? option.method : "GET",
      success: (response) => {
        common_vendor.index.hideLoading();
        if (response.statusCode === 200) {
          if (option.success && typeof option.success === "function") {
            option.success(response.data);
          }
        } else {
          if (option.fail && typeof option.fail === "function") {
            option.fail(response);
          }
        }
      },
      fail: (response) => {
        common_vendor.index.hideLoading();
        console.log(response);
      }
    });
  }
  // 创建加载的loading
  showLoading() {
    const isShowLoading = common_vendor.index.getStorageSync("isShowLoading");
    if (isShowLoading) {
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("isShowLoading", false);
    }
    common_vendor.index.showLoading({
      title: "加载中...",
      complete: () => {
        common_vendor.index.setStorageSync("isShowLoading", true);
      },
      fail: () => {
        common_vendor.index.setStorageSync("isShowLoading", false);
      }
    });
  }
}
const utils$1 = new utils();
exports.utils = utils$1;
