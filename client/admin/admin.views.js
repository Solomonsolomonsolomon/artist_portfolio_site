let img = document.getElementById("img");

let add = document.getElementById("addImgForm");
add.addEventListener("submit", async (e) => {
  e.preventDefault();
  let reader = new FileReader();
  console.log(await displayImg());
  //displayImg();

  async function displayImg() {
    reader.readAsDataURL(img.files[0]);
    reader.onloadend = async () => {
      let img = document.createElement("img");
      img.src = reader.result;

      // document.body.append(img);
      //resize document
      base64 = reader.result;
      return base64;
      await resizeImg(reader.result, 480, 360).then((e) => {
        return e;
      });
    };
  }

  let imgBlob = img.files[0];
  returnBase64(imgBlob).then((base64) => {
    resizeImgFromReturnedBase64(base64, 100, 100).then((newBase64) => {
      let img = document.createElement("img");
      img.src = newBase64;

      console.log("new image");
      document.body.append(img);
    });
  });
});

async function returnBase64(blob) {
  let base64reader = new FileReader();
  return new Promise((resolve) => {
    base64reader.readAsDataURL(blob);
    base64reader.onloadend = function () {
      resolve(base64reader.result);
    };
  });
}
async function resizeImgFromReturnedBase64(base64, width, height) {
  return new Promise((resolve) => {
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");
    let imgModel = document.createElement("img");
    imgModel.src = base64;
    imgModel.onload = function () {
      let scale = Math.min(width / imgModel.width, height / imgModel.height);
      c.width = imgModel.width * scale;
      c.height = imgModel.height * scale;
      ctx.drawImage(
        imgModel,
        0,
        0,
        imgModel.width * scale,
        imgModel.height * scale
      );
      resolve(c.toDataURL());
    };
  });
}
function imageResizeBasedOnScreenType(base64, width, height) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = document.createElement("img");
    img.src = base64;
    img.onload = function () {
      let iw = img.width;
      let ih = img.height;
      let scale = Math.min(width / iw, height / ih);
      canvas.width = iw * scale;
      canvas.height = ih * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  });
}
function resizeImg(base64, newWidth, newHeight) {
  return new Promise((resolve) => {
    let canvas = document.createElement("canvas");

    let context = canvas.getContext("2d");
    let resizeImg = document.createElement("img");
    resizeImg.src = base64;
    resizeImg.onload = function () {
      let iw = resizeImg.width;
      let ih = resizeImg.height;
      let scale = Math.min(newWidth / iw, newHeight / ih);
      let iwScaled = iw * scale;
      let ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      context.drawImage(resizeImg, 0, 0, iwScaled, ihScaled);
      resolve(canvas.toDataURL());
    };
  });
}
