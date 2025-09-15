# How to Import Data from the Microsoft Ads Source

To begin importing data from Microsoft Ads, start by making a copy of one of the following templates:

- [**Microsoft Ads → Google Sheets. Template**](https://docs.google.com/spreadsheets/d/1OTLrSl1bMDC6IS8eKDYPEOx_LBZZI7kPePh2eTEeiEc/copy)
- [**Microsoft Ads → Google BigQuery. Template**](https://docs.google.com/spreadsheets/d/1uETkcB5Pq8oN3fed9eNxxdyaycLYJ7ZxRibU1CzuCdA/copy)

Fill in the required information:

- **Account ID**
- **Customer ID**
- **Fields**
- **Aggregation**
- **Report Timezone**
- **Destination Dataset ID** (for **Google BigQuery** template)
- **Destination Location** (for **Google BigQuery** template)

Log in to your Microsoft Ads account at [https://ads.microsoft.com/](https://ads.microsoft.com/).  
Your **Account ID** and **Customer ID** can be found in the account URL.

![Microsoft Add Account](res/microsoft_addaccount.png)

Copy and paste both values into the template.

![Account ID](res/microsoft_pasteid.png)

Go to the **Fields** tab and check the boxes next to the fields you want to include.  

![Microsoft Fields](res/microsoft_fields.png)

Select the **Report Aggregation** value.  
Refer to the [Microsoft Ads documentation](https://learn.microsoft.com/en-us/advertising/reporting-service/reportaggregation?view=bingads-13) to learn more.  

![Microsoft Aggregation](res/microsoft_aggregation.png)

Choose the **Report Time Zone** to define the timezone for the reporting date range.

![Microsoft Time Zone](res/microsoft_timezone.png)

If you're using the **Google BigQuery** template, also provide:

- **Destination Dataset ID** in the format: `projectid.datasetid`
- **Destination Location**

> ℹ️ If the specified dataset doesn't exist, it will be created automatically.

![Microsoft Dataset](res/microsoft_dataset.png)

Open the menu: **OWOX → Manage Credentials**

![Microsoft Credentials](res/microsoft_credentials.png)

Enter your credentials obtained by following this guide: [**How to obtain the credentials for the Microsoft Ads source**](CREDENTIALS.md)

![Microsoft Token](res/microsoft_creds.png)

Now you have **two options** for importing data from Microsoft Ads:

Option 1: Import Current Day's Data

Choose **OWOX → Import New Data** to load data for the **current day**.

![Microsoft Import Data](res/microsoft_import.png)

The import process is complete when the **Log** sheet displays:  
**"Import is finished"**  

![Microsoft Finished](res/microsoft_finished.png)

Access Your Data:

- In the **Google Sheets** template, the data will appear in new tabs labeled with the corresponding data types.  

![Microsoft Result](res/microsoft_success_sheets.png)

- In the **Google BigQuery** template, the data will be written to the dataset specified earlier.

![Microsoft Result](res/microsoft_success.png)

To import more data:

1. Select the additional fields you need in the **Fields** tab.
2. Go to **OWOX → Import New Data** again.

If you encounter any issues:

1. Check the "Logs" sheet for specific error messages
2. Please [visit Q&A](https://github.com/OWOX/owox-data-marts/discussions/categories/q-a) first
3. If you want to report a bug, please [open an issue](https://github.com/OWOX/owox-data-marts/issues)
4. Join the [discussion forum](https://github.com/OWOX/owox-data-marts/discussions) to ask questions or propose improvements
