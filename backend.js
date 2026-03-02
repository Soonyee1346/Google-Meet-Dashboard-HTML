// Serve data to the Frontend

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Meet Device Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {
  const logSheet = SpreadsheetApp.openById(LOGS_SPREADSHEET_ID).getSheetByName('CurrentOpenIssues');
  const data = logSheet.getDataRange().getValues();

  if (data.length <= 1) return [];
  const rows = data.slice(1);

  return rows.map(row => {
    if (row[0] instanceof Date) {
      row[0] = Utilities.formatDate(row[0], Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    }
    return row;
  });
}

function processRoomAction(actionType, indicesArray) {
  const logSheet = SpreadsheetApp.openById(LOGS_SPREADSHEET_ID).getSheetByName('CurrentOpenIssues');
  
  indicesArray.forEach(index => {
    const sheetRow = index + 2; 

    if (actionType === "Resolve") {
      logSheet.getRange(sheetRow, 8).setValue("Resolved");
    } else if (actionType === "Ignore") {
      logSheet.getRange(sheetRow, 7).setValue("Ignored");
    } else if (actionType === "Unignore") {
      logSheet.getRange(sheetRow, 7).clearContent();
    }
  });

  SpreadsheetApp.flush();
}