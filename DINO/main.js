// 캔버스에 도형 그리기
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// 공룡 캐릭터 속성 미리 저장
var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  },
};

var img1 = new Image();
img1.src = "cactus.png";
var img2 = new Image();
img2.src = "dino.png";

// 장애물
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height); //히트박스
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}
// 코드 1초
var timer = 0;
var cactuses = [];
var jumpTimer = 0;
var animation;
var jump = false;

function 프레임마다실행() {
  animation = requestAnimationFrame(프레임마다실행);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 지우기
  // dino.x++;
  // 해상도에 맞추어 200 프레임마다 {장애물} 생성 -> array에 넣음
  if (timer % 200 === 0) {
    var cactus = new Cactus();
    cactuses.push(cactus);
  }
  // 장애물 반복
  cactuses.forEach((a, i, o) => {
    // x좌표가 0미만이면 제거
    if (a.x < 0) {
      // 제거
      o.splice(i, 1);
    }
    a.x--;
    // 여기에서 충돌체크 해야 모든 장애물에 대해 체크가능
    충돌여부(dino, a);

    a.draw();
  });
  // 점프중이면
  if (jump) {
    //점프 중이면
    dino.y--;
    jumpTimer++; // 점프시 프레임마다 +1 됨
  } else {
    if (dino.y < 200) {
      dino.y++;
    }
  }

  //   100프레임 지나면 점프 중단
  if (jumpTimer > 100) {
    jump = false;
    jumpTimer = 0;
  }
  dino.draw();
}

프레임마다실행();

//충돌 확인
function 충돌여부(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 지우기
    cancelAnimationFrame(animation); // 애니메이션 중단
  }
}

// 공룡 점프
// 스페이스바 누르면 if문 안의 코드 실행
var jump = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && dino.y === 200) {
    // 공룡이 지면에 있을 때만 점프
    jump = true;
  }
});
