const mongoose = require('mongoose');
const Company = mongoose.model('Company');
//const puppeteer = require('puppeteer');

exports.pdfGenerationPost = (req, res) => {

    // async function printPDF() {
    //     const browser = await puppeteer.launch({ headless: true });
    //     const page = await browser.newPage();
    //     await page.goto('http://localhost:3000/dashboard/subscribed-policies', {waitUntil: 'networkidle2'});
    //     const pdf = await page.pdf({ 
    //         format: 'A4',
    //        printBackground: true
    //     });
    //     await browser.close();
    //     return pdf
    //   }
    //   printPDF.then(pdf => {
    //     res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    //     res.send(pdf)
    //   })  
  };