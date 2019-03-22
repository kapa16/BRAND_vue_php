"use strict";var _this5=void 0;function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,a){return e&&_defineProperties(t.prototype,e),a&&_defineProperties(t,a),t}$(document).ready(function(){var t=$(".main-logo-menu");t.fadeOut().mouseleave(function(){return t.fadeOut()}),$(".header").mousemove(function(){return t.fadeIn()});var e=$(".logo-menu-list .dropdown-box");e.fadeOut().mouseleave(function(){return e.fadeOut()}),$(".logo-menu-list").mouseenter(function(t){$(t.target).siblings(".dropdown-box").fadeIn().mouseleave(function(){return e.fadeOut()})}).mouseleave(function(){return e.fadeOut()});var a=$(".browse .dropdown-box");a.fadeOut().mouseleave(function(){a.fadeOut()}),$(".browse").mousemove(function(){return a.fadeIn()}).mouseleave(function(){return a.fadeOut()})});var Cart=function(){function t(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".cart__container";_classCallCheck(this,t),this.source=e,this.container=a,this.countGoods=0,this.amount=0,this.cartItems=[],this._init()}return _createClass(t,[{key:"_init",value:function(){var t=this;this._render(),this._addEventHandlers(),fetch(this.source).then(function(t){return t.json()}).then(function(e){var a=!0,n=!1,r=void 0;try{for(var i,c=e.contents[Symbol.iterator]();!(a=(i=c.next()).done);a=!0){var o=i.value;t.cartItems.push(o),t._renderItem(o)}}catch(t){n=!0,r=t}finally{try{a||null==c.return||c.return()}finally{if(n)throw r}}t.countGoods=e.countGoods,t.amount=e.amount,t._renderSum()})}},{key:"_render",value:function(){var t=$("<div/>",{class:"cart__menu hidden"}),e=$("<div/>",{class:"cart-total"});e.append("<p>TOTAL</p>"),e.append('<p class="cart-total-sum">$0.00</p>');var a=$("<div/>",{class:"cart__menu-buttons"}),n=$("<a/>",{href:"checkout.html",class:"cart__menu-button",text:"Checkout"}),r=$("<a/>",{href:"shopping-cart.html",class:"cart__menu-button",text:"Go to cart"});a.append(n).append(r),t.append('<div class="cart-items-wrap"></div>').append(e).append(a).appendTo($(this.container))}},{key:"_addEventHandlers",value:function(){var t=$(".cart__menu");$(this.container).mousemove(function(){return t.fadeIn()}).mouseleave(function(){return t.delay(500).fadeOut()}),t.mousemove(function(){return t.stop()}).mouseleave(function(){t.fadeOut()})}},{key:"_getMainItemContainer",value:function(t,e){return $("<div/>",{class:t,"data-product":e})}},{key:"_getImageElement",value:function(t){return $("<img/>",{src:t.img_src,alt:t.img_alt})}},{key:"_getProductRatingElement",value:function(){for(var t=$('<div class="product-rating"></div>'),e=0;e<5;e++)t.append('<i class="fas fa-star rating-star"></i>');return t}},{key:"_getDivElement",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return $('<div class="'.concat(t,'">').concat(e,"</div>"))}},{key:"_getParagraphElement",value:function(t,e){return $('<p class="'.concat(t,'">').concat(e,"</p>"))}},{key:"_getSpanElement",value:function(t,e){return $('<span class="'.concat(t,'">').concat(e,"</span>"))}},{key:"_renderItem",value:function(t){this._renderItemMenuCart(t),this._renderItemPageCart(t)}},{key:"_renderItemMenuCart",value:function(t){var e=this,a=this._getMainItemContainer("cart__card cart-item-wrapper",t.id_product),n=this._getImageElement(t);n.addClass("photo-product");var r=this._getDivElement("product-info");r.append(this._getParagraphElement("product-name for-cart-menu",t.product_name)).append(this._getProductRatingElement().addClass("for-cart-menu")).append(this._getDivElement("cart__product-total").append(this._getSpanElement("product-quantity",t.quantity)).append("<span> x </span>").append(this._getSpanElement("product-price","&#36;".concat(t.price)))),a.append(n).append(r).append(this._getDivElement("fas fa-times-circle delete-product").click(function(t){return e._onChangeQuantity(t.target,!0)})).appendTo($(".cart-items-wrap"))}},{key:"_renderItemPageCart",value:function(t){var e=this,a=this._getMainItemContainer("cart-table-row cart-item-wrapper",t.id_product),n=this._getDivElement("product-details cart-table-cell"),r=this._getImageElement(t),i=this._getDivElement("product-details-description");i.append(this._getParagraphElement("product-name",t.product_name)).append(this._getProductRatingElement()).append(this._getParagraphElement("product-details-properties","Color: ").append(this._getSpanElement("product-details-value",t.color))).append(this._getParagraphElement("product-details-properties","Size: ").append(this._getSpanElement("product-details-value",t.size))),n.append(r).append(i),a.append(n).append(this._getDivElement("cart-table-cell","&#36;".concat(t.price))).append(this._getDivElement("cart-table-cell").append($('<input class="cart-table-quantity" value="2" type="number" name="quantity">').val(t.quantity).change(function(t){return e._onChangeQuantity(t.target)}))).append(this._getDivElement("cart-table-cell",t.shipping)).append(this._getDivElement("cart-table-cell  product-price","&#36;".concat(t.quantity*t.price))).append(this._getDivElement("cart-table-cell").append(this._getDivElement("fas fa-times-circle cart-table-close-icon delete-product")).click(function(t){return e._onChangeQuantity(t.target,!0)})).appendTo($(".cart-table"))}},{key:"_renderSum",value:function(){$(".cart__quantity").text(this.countGoods),$(".cart-total-sum").text("$".concat(this.amount))}},{key:"_updateCart",value:function(t){var e=$('div[data-product="'.concat(t.id_product,'"]'));e.find(".product-quantity").text(t.quantity),e.find(".product-price").text("$".concat(t.quantity*t.price))}},{key:"_getCartItem",value:function(t){return this.cartItems.find(function(e){return e.id_product===t})}},{key:"addProduct",value:function(t){t.preventDefault();var e=$(t.target).closest("[data-id]"),a=e.find("img")[0],n=e.find("#quantity")[0],r=1;n&&(r=+n.value,n.value=1);var i=+e.data("id"),c=this._getCartItem(i);if(c)this._changeQuantity(c,c.quantity+r),this._showMessage("Количество товара ".concat(c.product_name," увеличено"));else{var o={id_product:i,product_name:e.data("name"),price:e.data("price"),quantity:r,img_src:a.src,img_alt:a.alt,color:e.data("color"),size:e.data("size")};this.cartItems.push(o),this._renderItem(o),this.amount+=o.price,this.countGoods+=o.quantity,this._showMessage("Товар ".concat(o.product_name," успешно добавлен в корзину"))}this._renderSum()}},{key:"_showMessage",value:function(t){$(".cart__add-message").text(t).fadeIn("slow").delay(3e3).fadeOut("slow")}},{key:"_getItemWrapper",value:function(t){return $(t).closest(".cart-item-wrapper")}},{key:"_getEventProductId",value:function(t){return this._getItemWrapper(t).data("product")}},{key:"_onChangeQuantity",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=this._getCartItem(this._getEventProductId(t)),n=0,r=this._getItemWrapper(t).find(".cart-table-quantity");r.length&&(n=+r[0].value),this._changeQuantity(a,e?0:n)}},{key:"_changeQuantity",value:function(t,e){this.countGoods-=t.quantity,this.amount-=t.price*t.quantity,0===e?this._remove(t.id_product):(t.quantity=e,this.countGoods+=e,this.amount+=t.price*e,this._updateCart(t)),this._renderSum()}},{key:"_remove",value:function(t){var e=this._getCartItem(t);this.cartItems.splice(this.cartItems.indexOf(e),1),$('div[data-product="'.concat(t,'"]')).remove()}},{key:"clearCart",value:function(t){for(t.preventDefault();this.cartItems.length;)this._changeQuantity(this.cartItems[this.cartItems.length-1],0)}}]),t}(),Accordion=function(){function t(e){_classCallCheck(this,t),this.containerClass=e,this._init()}return _createClass(t,[{key:"_init",value:function(){var t=this;$(this.containerClass).find(".sidebar-title").click(function(e){return t._toggleMenu(e)})}},{key:"_toggleMenu",value:function(t){$(".menu-open").removeClass("menu-open");var e=$(t.target).closest(".sidebar-title"),a=e.next();$(this.containerClass).find(".sidebar-submenu").not(a[0]).slideUp(),a.slideToggle("fast",function(){a.is(":visible")&&e.closest("li").addClass("menu-open")})}}]),t}();$(document).ready(function(){$(window).scroll(function(){$(_this5).scrollTop()>40?$(".header").height(60):0===$(_this5).scrollTop()?$(".header").height(100):$(".header").height(100-$(_this5).scrollTop())});var t=new Cart("json/getCart.json");$(".add-cart-wrap").click(function(e){t.addProduct(e)}),$(".clear-cart-btn").click(function(e){t.clearCart(e)});new Accordion(".sidebar");$(".slider-control-wrap").on("click",function(t){$(".slider-control-wrap .slider-control").removeClass("active"),$(t.target).addClass("active")})});
//# sourceMappingURL=main.es5.js.map
