const db = require("../../models");
const orderModel = db.order;
const puppeteer = require("puppeteer");
//const domToImage = require('dom-to-image');
const cheerio = require("cheerio");
const { jsPDF } = require("jspdf");
//const html2canvas = require('html2canvas');

// async function convertPageToImage(contentPage) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Set the viewport size to match the dimensions of the content
//  // const width = parseInt(contentPage.css('width'), 10);
//   const height = 500
//   const width =  1000;
//   console.log('width:', width);
//   await page.setViewport({
//     width: width,
//     height: height,
//   });

//   await page.setContent(contentPage.html());

//   const screenshot = await page.screenshot({ type: 'png' });
//   await browser.close();

//   return screenshot;
// }
// async function convertPageToImage($page) {
//   // Get the HTML content of the page
//   const html = $page.html();

//   // Render the HTML to an image using html2canvas
//   const canvas = await html2canvas($page.get(0));

//   // Get the data URL of the image
//   const dataUrl = canvas.toDataURL();

//   return dataUrl;
// }

// const convertPageToImage = async (page) => {
//   try {
//     const dataUrl = await domToImage.toPng(page);
//     return dataUrl;
//   } catch (error) {
//     console.error(`Failed to convert ${page.id} to image:`, error);
//     return null;
//   }
// };
// const convertPageToImage = async (page) => {
//   try {
//     const canvas = document.createElement('canvas');
//     canvas.width = page.clientWidth;
//     canvas.height = page.clientHeight;
//     const context = canvas.getContext('2d');
//     await new Promise(resolve => {
//       const image = new Image();
//       image.src = 'data:image/svg+xml,' + encodeURIComponent(page.outerHTML);
//       image.onload = () => {
//         context.drawImage(image, 0, 0);
//         resolve();
//       };
//     });
//     return canvas.toDataURL('image/png');
//   } catch (error) {
//     console.error(`Failed to convert ${page.id} to image:`, error);
//     return null;
//   }
// };
const generatePdf = async (req, res) => {
  let token = req.headers["x-access-token"];

  const orderId = Number(req.params.id);
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 2560,
      height: 1440,
    },
  });
  const page = await browser.newPage();
  const headers = {
    "x-access-token": token,
  };

  await page.setExtraHTTPHeaders(headers);

  const website_url = process.env.Frontend_URL + "/orders/" + orderId;
  await page.goto(website_url, { waitUntil: "networkidle2" });

  const htmlContent = await page.content();

  const $ = cheerio.load(htmlContent);

  const doc = new jsPDF("p", "mm", "a4");
  const margins = { top: 10, bottom: 10, left: 10, right: 10 };

  const footer = await page.$("#footer");
  const footerDataUrl = await convertPageToImage(footer);

  const firstPage = await page.$("#firstPage");
  const firstPageDataUrl = await convertPageToImage(firstPage);
  addPdfPage(doc, firstPageDataUrl, footerDataUrl, margins);

  const secondPage = await page.$("#secondPage");
  const secondPageDataUrl = await convertPageToImage(secondPage);
  addPdfPage(doc, secondPageDataUrl, footerDataUrl, margins);

  const thirdPage = await page.$("#thirdPage");
  const ThirdPageDataUrl = await convertPageToImage(thirdPage);
  addPdfPage(doc, ThirdPageDataUrl, footerDataUrl, margins);

  const lastPage = await page.$("#lastPage");
  const lastPageDataUrl = await convertPageToImage(lastPage);
  addPdfPage(doc, lastPageDataUrl, footerDataUrl, margins);

  const pdfBuffer = await doc.output("arraybuffer");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=phonetech.techs_#" + orderId + ".pdf"
  );
  res.send(Buffer.from(pdfBuffer));

  await browser.close();
};

const convertPageToImage = async (page) => {
  const element = await page.$("#my-div-id");

  await page.evaluate((el) => {
    el.classList.remove("praised");
  }, element);

  return await page.screenshot({ encoding: "base64" });
};

const addPdfPage = (doc, pageDataUrl, footerDataUrl, margins) => {
  const pageWidth = doc.internal.pageSize.width - margins.left - margins.right;
  const pageHeight =
    doc.internal.pageSize.height - margins.top - margins.bottom - 10;
  if (pageDataUrl) {
    const imgWidth = pageWidth;
    //const imgHeight = imgWidth / (page.offsetWidth / page.offsetHeight);
    doc.addImage(
      pageDataUrl,
      "PNG",
      margins.left,
      margins.top,
      pageWidth,
      pageHeight
    );

    if (footerDataUrl) {
      doc.addImage(footerDataUrl, "PNG", margins.left, 277, pageWidth, 10);
    }

    doc.addPage();
  }
};

module.exports = generatePdf;
