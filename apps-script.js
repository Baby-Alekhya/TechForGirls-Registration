function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const timestamp = new Date();
  const name = e.parameter.Name;
  const phone = e.parameter.Phone;
  const email = e.parameter.Email;
  const college = e.parameter.College;

  sheet.appendRow([timestamp, name, phone, email, college]);
  return ContentService.createTextOutput("Success");
}
