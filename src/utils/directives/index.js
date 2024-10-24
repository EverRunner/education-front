import Vue from "vue";

Vue.directive("watermark", (el, binding) => {
  function addWaterMarker(str, parentNode) {
    // 水印文字，父元素，字体，文字颜色
    var children_span = document.getElementsByClassName("watermark");
    if (children_span.length > 0) {
      // children_span.remove();
      // var DataConent=document.getElementById("DataConent");
      // for(var i=0;i<children_span.length;i++){
      //   DataConent.removeChild('watermark');
      // }
    } else {
      var w_g = 20; // 宽度间隔
      var h_g = 20; // 长度间隔
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          var span_html = document.createElement("span");
          span_html.innerText = str;
          span_html.className = "watermark";
          span_html.style.cssText =
            "position:absolute;color:rgb(0, 0, 0);top:" +
            i * h_g +
            "vh;left:" +
            j * w_g +
            "vw;transform: rotate(-20deg);pointer-events: none;opacity: 0.09;font-size:18px;";
          parentNode.append(span_html);
        }
      }
    }
  }
  addWaterMarker(binding.value.text, el);
});
