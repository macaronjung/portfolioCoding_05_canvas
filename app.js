
/* canvas는 많은 능력(특히 픽셀을 다루는)을 가지고 있는 HTML5의 요소 */
/* 1. 캔버스 가지고 오기 */
const canvas = document.getElementById("jsCanvas");
/* 13. pixel manipulation size -> pixel을 다룰 수 있는 element로서 만드는 것 (실제 픽셀사이즈 부여) 
pixel modifier에 사이즈를 부여하여야만 펜이 그려짐 */
/* css로 캔버스 자체의 크기 부여 + 픽셀을 다루는 윈도우의 크기 설정(=canvas에게 알려주기) */
canvas.width = 800;
canvas.height = 400;

/* 8. 캔버스 API 활용하기 -> 
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D 
context -> canvas안에서 픽셀을 다루는 것 */
const ctx = canvas.getContext('2d');
/* 9. context default 설정 -> 색상 */
ctx.strokeStyle = "#2c2c2c";
/* 10. context 굵기 설정 */
ctx.lineWidth = 2.5;

/* 14. 색상 패널 가지고 오기 */
const colors = document.getElementsByClassName("jsColor")

/* 17. 선 굵기 값 가지고 오기 */
const range = document.getElementById("jsRange")

/* 20. 채우기 버튼(fill) 가지고 오기 */
const mode = document.getElementById("jsMode");

/* ------------------------------------------- */

/* 5. 페인팅 변수 설정 */
let painting = false;

/* 23. 채우기 내부 필요 변수 추가 -> 채워졌는지 아닌지 확인위해 필요 */
let filling = false;

/* 7. 클릭해제 함수 설정 */
function stopPainting() {
  painting = false;
}

/* 11. 그림그리기 시작 함수 설정 */
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

  /* 12. 선 그리기 함수 -> 마우스를 움직이는 내내 실행됨! */
  if(!painting) {
    /* 선 그리기 시작 -> 단 보이지는 않음 (클릭하지 않았기에) */
    /* 그냥 path만 움직일 뿐 */
    console.log(`creating path in ${x}, ${y}`)
    ctx.beginPath();
    /* 선 x, y 값 받아오기 */
    ctx.moveTo(x, y);
  } else {
    /* 선 그리기 종료(선끼리 이어주기) */
    console.log(`creating line in ${x}, ${y}`)
    ctx.lineTo(x, y);
    /* 선을 현재의 fill style로 채워주기 */
    ctx.stroke();
  }
}

/* 4. 마우스 클릭 함수 */
// function onMouseDown(event) {
//   /* console.log(event); */
//   painting = true;
// }

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

/* 2. 마우스 감지 */if(canvas) {
  /* mousemove -> 마우스 움직임 */
  canvas.addEventListener("mousemove", onMouseMove);
  /* mousedown -> 마우스 클릭 */
  canvas.addEventListener("mousedown", startPainting);
  /* mouseup -> 마우스 클릭 해제 */
  canvas.addEventListener("mouseup", stopPainting);
  /* mouseleave -> 마우스 캔버스 외부로 이탈 */
  canvas.addEventListener("mouseleave", stopPainting);
}

/* 15. Array 이용 colors를 돌려서 값 추출하기 */
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

/* 16. 색상 변경 함수 */
function handleColorClick(event) {
  //console.log(event.target.style);
  /* color 배열에서 rgba 값만 가지고 옴 */
  const color = event.target.style.backgroundColor;
  console.log(color);
  /* 기존의 strokeStyle을 override 시킴 */
  ctx.strokeStyle = color;
}

/* 18. 선 굵기(range)값 가지고 왔는지 확인 */
if(range) {
  range.addEventListener("input", handleRangeChange);
}

/* 19. 선 굵기 변경 함수 */
function handleRangeChange(event) {
  /* 어떤 값이 필요한지 콘솔창에서 알아보기 */
  //console.log(event);
  //console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

/* 21. 채우기 버튼 가지고 왔는지 확인 */
if(mode) {
  mode.addEventListener("click", handleModeClick)
}

/* 22. 채우기 버튼 실행 함수 */
function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}