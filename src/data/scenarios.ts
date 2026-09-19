export const SCEN: [string, string][] = [
 ["Upgrade Only","The customer is only eligible for a standard upgrade and not for add line. Reasons include an account under 3 months old, a low credit class, or being in collections."],
 ["Add Line Only","The customer is only eligible for add line, because they have already upgraded the CTN and must wait at least 6 months for an early upgrade, or until 45 days before contract end for a standard upgrade. (Same window as \"Standard Upgrade in the future and Add Line\".)"],
 ["Upgrade and Add Line","The customer is within 45 days of the CTN's contract end date, and the credit class is high enough for an additional line."],
 ["Early Upgrade only","The CTN is past 6 months of contract start, but the customer is not eligible for add line, for example because the credit class is low."],
 ["Early Upgrade and Add Line","The CTN is past 6 months of contract start and the credit class is high enough for an additional line."],
 ["Not Eligible","Credit class could be low, the account could be in collections, or the account type is not a consumer account type."],
 ["Annual Upgrade Only","The contract device or plan can be traded in for an upgrade after 12 months. Not eligible for add line, for example because the credit class is low."],
 ["Early Upgrade and Annual Upgrade","Eligible for early upgrade (past 6 months) and for annual upgrade (12 months, trading in the current device). Not eligible for add line."],
 ["Early Upgrade and Annual Upgrade and Add Line","Eligible for early upgrade, annual upgrade and add line, because the credit class is high enough."],
 ["Annual Upgrade and Add Line","Eligible for annual upgrade after 12 months, and for add line because the credit class is high enough."],
 ["Standard Upgrade in the future","The CTN is within 6 months of contract start, so no upgrade yet, and not eligible for add line (for example a low credit class)."],
 ["Standard Upgrade in the future and Add Line","The CTN is within 6 months of contract start, so no upgrade yet, but the credit class is high enough for add line."]
];
