/** @format */

import EventEmitter from "@services/AppEventEmitter";

const closeModalLayout = () => EventEmitter.emit("modal.layout.close");

const openModalLayout = () => EventEmitter.emit("modal.layout.open");
const onOpenModalLayout = (func) =>
  EventEmitter.addListener("modal.layout.open", func);

// revemo
const openModalReview = (product) =>
  EventEmitter.emit("modal.review.open", product);
const closeModalReview = () => EventEmitter.emit("modal.review.close");
const onOpenModalReview = (func) =>
  EventEmitter.addListener("modal.review.open", func);
const onCloseModalReview = (func) =>
  EventEmitter.addListener("modal.review.close", func);

/**
 * @api  {公用} ./src/common/Events.js 事件监听器
 * @apiName Events
 * @apiGroup 公用
 * @apiDescription 监听器：模态窗
 */
export default {
  openModalLayout,
  closeModalLayout,
  onOpenModalLayout,
  // review
  openModalReview,
  closeModalReview,
  onOpenModalReview,
  onCloseModalReview,
};
