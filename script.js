(function() {

  var raf = function(f) {
    var ff = function(time) {
      f(time);
      requestAnimationFrame(ff);
    };
    requestAnimationFrame(ff);
  };

  var canvasWidth = 500;
  var canvasHeight = 300;
  var canvasCanvas = document.querySelector('#canvasCanvas');
  var canvasCanvasCtx = canvasCanvas.getContext('2d');
  var webglCanvas = document.querySelector('#webglCanvas');

  var d = {
    rectangles: [
      { x: 200, y: 100, width: 50, height: 50, color: '#aa22ff', color2: 0xAA22FF }
    ]
  };

  raf(function(t) {
    renderCanvas(t);
    renderWebgl(t);
  });

  function renderCanvas(t) {
    var ctx = canvasCanvasCtx;
    ctx.beginPath();
    var r = d.rectangles[0];
    ctx.fillStyle = r.color;
    ctx.fillRect(r.x, r.y, r.width, r.height);
  }

  var renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, { view: webglCanvas, antialias: true });
  renderer.backgroundColor = 0xFFFFFF;
  function renderWebgl(t) {
    var stage = new PIXI.Container();
    stage.interactive = true;

    var graphics = new PIXI.Graphics();

    var r = d.rectangles[0];

    graphics.beginFill(r.color2, 1);
    graphics.drawRect(r.x, r.y, r.width, r.height);

    stage.addChild(graphics);

    renderer.render(stage);
  }

})();
