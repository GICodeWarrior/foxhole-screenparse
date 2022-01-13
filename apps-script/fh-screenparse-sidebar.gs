//@OnlyCurrentDoc

function onOpen() {
 SpreadsheetApp
   .getUi()
   .createMenu("foxhole-screenparse")
   .addItem("Screenshot Analyzer", "showSidebar")
   .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('packed.html')
      .setTitle('foxhole-screenparse');
  SpreadsheetApp.getUi().showSidebar(html);
}

function fhInsert(s) {
  var sheet = SpreadsheetApp.getActiveSheet();
  let column = sheet.getCurrentCell().getColumn();
  var data = sheet.getDataRange().getValues();

  // update item counts
  for (let item of s.items) {
    var row = data.findIndex((a) => {
      return a.indexOf(item.name) !== -1;
    });
    if (row === -1) {
      continue;
    }
    row += 1; // fix start counting at 1
    sheet.getRange(row, column).setValue(item.count);
  }

  // update timedate
  row = data.findIndex((a) => {
    return a.indexOf("Last updated with foxhole-screenparse") !== -1;
  });
  if (row !== -1) {
    row += 1; // fix start counting at 1
    sheet.getRange(row, column).setValue(new Date()).setNumberFormat("hh:mm");
  }
}