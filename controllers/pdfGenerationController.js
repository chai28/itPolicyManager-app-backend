const mongoose = require('mongoose');
const Company = mongoose.model('Company');
// const puppeteer = require('puppeteer');

exports.pdfGenerationGet = (req, res) => {

  // async function printPDF() {
  //   const browser = await puppeteer.launch({ 
  //     headless: true,
  //     args: ['--disable-dev-shm-usage']
  //    });
  //   const page = await browser.newPage();
  //   await page.goto('http://localhost:3000/dashboard/DisplayPolicyTest', {waitUntil: 'networkidle0'});
  //   await page.addStyleTag({ content: '.nav { display: none} .navbar { border: 0px} #print-button {display: none}' });
  //   const pdf = await page.pdf({ 
  //       format: 'A4',
  //      printBackground: true
  //   });
  //   await browser.close();
  //   return pdf
  // }
  //   printPDF().then(pdf => {
  //     res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
  //     res.send(pdf)
  //   })  
};
