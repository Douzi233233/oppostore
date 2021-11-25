importClass(java.io.FileOutputStream);
importClass(java.io.File);
importClass(android.graphics.PaintFlagsDrawFilter);
importClass(android.graphics.Color);
importClass(android.animation.ObjectAnimator);
importClass(android.animation.AnimatorListenerAdapter);
importClass(android.util.TypedValue);
importClass(android.graphics.PorterDuffXfermode);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Region);
importClass(android.graphics.PorterDuff);
importClass(android.graphics.Xfermode);
importClass(android.graphics.Rect);
importClass(android.graphics.Path);
importClass(android.graphics.drawable.ColorDrawable);
/* -------------------------------------------------------------------------- */
(function () {
  util.extend(CustomView, ui.Widget);
  function CustomView() {
    ui.Widget.call(this);
    let scope = this;
    let paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    let rect = new android.graphics.RectF();
    paint.setAntiAlias(true);
    paint.setAlpha(255); //透明度0-255  0完全透明 255完全不透明
    paint.setStyle(android.graphics.Paint.Style.FILL);
    let deviation = 12;
    let checkedColor = "#27ae60";
    let unCheckedColor = "#bdc3c7";
    this.checked = false;
    this.defineAttr("checked", (view, attr, value, defineSetter) => {
      if (value === "false") {
        this.checked = false;
      } else if (value === "true") {
        this.checked = true;
      }
      this.updateColor();
    });
    this.defineAttr("checkedColor", (view, attr, value, defineSetter) => {
      checkedColor = value;
    });
    this.defineAttr("unCheckedColor", (view, attr, value, defineSetter) => {
      unCheckedColor = value;
    });
    this.setChecked = function (value) {
      this.checked = value;
      this.updateColor();
    };
    this.getChecked = function () {
      return this.checked;
    };
    this.updateColor = function () {
      if (this.checked) {
        setBackground(scope.view, checkedColor);
      } else {
        setBackground(scope.view, unCheckedColor);
      }
    };

    this.onFinishInflation = function (view) {
      view.post(function () {
        scope.updateColor();
      });
    };

    function setBackground(view, color) {
      let viewWidth = view.getMeasuredWidth();
      let viewHeight = view.getMeasuredHeight();
      let centerX = viewWidth / 2;
      let centerY = viewHeight / 2;
      let radius = viewWidth / 2;
      var drawable = new android.graphics.drawable.Drawable({
        draw: function (canvas) {
          let 圆形内部正方形 = {
            cx: viewWidth / 2,
            cy: viewHeight / 2,
            sideLength: (viewWidth / 5) * 3,
          };
          let 对勾的起点 = {
            x: 圆形内部正方形.cx - 圆形内部正方形.sideLength / 2,
            y: 圆形内部正方形.cy,
          };
          let 对勾的中点 = {
            x: 圆形内部正方形.cx,
            y: 圆形内部正方形.cy + 圆形内部正方形.sideLength / 2,
          };
          let 对勾的尾点 = {
            x: 圆形内部正方形.cx + 圆形内部正方形.sideLength / 2,
            y: 圆形内部正方形.cy - 圆形内部正方形.sideLength / 2,
          };

          let circle = new Path();
          circle.reset();
          let k = deviation;
          circle.moveTo(对勾的起点.x, 对勾的起点.y);
          circle.lineTo(对勾的中点.x, 对勾的中点.y);
          circle.lineTo(对勾的尾点.x, 对勾的尾点.y);
          circle.lineTo(对勾的尾点.x - k / 2, 对勾的尾点.y);
          circle.lineTo(对勾的中点.x - k / 4, 对勾的中点.y - k * 1.5);
          circle.lineTo(对勾的起点.x + k, 对勾的起点.y);
          circle.close();
          canvas.clipPath(circle, Region.Op.DIFFERENCE);
          let backgroundColor = colors.parseColor(color);
          paint.setColor(backgroundColor);
          canvas.drawCircle(centerX, centerY, radius, paint);
        },
      });
      view.setBackgroundDrawable(drawable);
    }
  }
  CustomView.prototype.render = function () {
    return <View w="30dp" h="30dp" margin="6 6 6 6"></View>;
  };
  ui.registerWidget("custom-checkbox", CustomView);
  return CustomView;
})();
