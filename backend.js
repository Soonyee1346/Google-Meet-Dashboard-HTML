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

function resolveLogSheet(room, index) {
  const logSheet = SpreadsheetApp.openById(LOGS_SPREADSHEET_ID).getSheetByName('CurrentOpenIssues');

  index = index + 2;

  logSheet.getRange(index, 8).setValue("Resolved");
  
}

function ignoreIssue(room, index) {
    const logSheet = SpreadsheetApp.openById(LOGS_SPREADSHEET_ID).getSheetByName('CurrentOpenIssues');

  index = index + 2;

  logSheet.getRange(index, 7).setValue("Ignored");
  
}