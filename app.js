
/* 1. 캔버스 가지고오기 */
const canvas = document.getElementById("jsCanvas");

/* 8. 캔버스 API 활용하기 -> 
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D 
context -> canvas안에서 픽셀을 다루는 것 */
const ctx = canvas.getContext('2d');
/* 9. context default 설정 -> 색상 */
ctx.strokeStyle = "#2c2c2c";
/* 10. context 굵기 설정 */
ctx.lineWidth = 2.5;

/* 5. 페인팅 변수 설정 */
let painting = false;

/* 7. 클릭해제 함수 설정 */
function stopPainting() {
  painting = false;
}

/* 10. 그림그리기 시작 함수 설정 */
function startPainting() {
  painting = true;
}

/* 3. 마우스 움직임 함수 */
function onMouseMove(event) {
  /* console.log(event); */
  /* offset -> 캔버스 부분과 관련있는 값 */
  /* client -> 윈도우 전체의 범위 내에서 마우스 위치값 표시 */
  /* 4. 캔버스내 x,y 좌표 얻기 */
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x,y);

  /* 11. 선 그리기 함수 */
  if(!painting) {
    /* 선 그리기 시작 */
    ctx.beginPath();
    /* 선 x, y 값 받아오기 */
    ctx.moveTo(x, y);
  } else {
    /* 선 그리기 종료(선끼리 이어주기) */
    ctx.lineTo(x, y);
    /* 선을 현재의 fill style로 채워주기 */
    ctx.stroke();
  }
}

/* 4. 마우스 클릭 함수 */
function onMouseDown(event) {
  /* console.log(event); */
  painting = true;
}

/* 5. 마우스 클릭 해제 함수 */
// function onMouseUp(event) {
//   /* console.log(event); */
//   // painting = false;
//   stopPainting();
// }

/* 6. 마우스 캔버스 외부 이탈 함수 */
// function onMouseLeave(event) {
//   /* console.log(event); */
//   painting = false;
// }

/* 2. 마우스 감지 */
if(canvas) {
  /* mousemove -> 마우스 움직임 */
  canvas.addEventListener("mousemove", onMouseMove);
  /* mousedown -> 마우스 클릭 */
  canvas.addEventListener("mousedown", startPainting);
  /* mouseup -> 마우스 클릭 해제 */
  canvas.addEventListener("mouseup", stopPainting);
  /* mouseleave -> 마우스 캔버스 외부로 이탈 */
  canvas.addEventListener("mouseleave", stopPainting);
}