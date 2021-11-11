# CG Bot
CG Bot is a Node-based Discord bot featuring Google Sheets-backed key-value querying, PubMed embeds, PubMed to Sci-Hub conversion, and persistent user tracking.

* **Querying:** CG Bot can be pointed to a Google Sheet. When users send "!cg {key}" the first column (keys column) of the Sheet will be searched for the key and the value of the cell to the right (in the values column) will be returned in the Discord server. By default CG Bot has two commands, which can each be pointed to different Sheets: !cg and !d.

* **PubMed embeds and Sci-Hub conversion:** CG Bot can take a PubMed URL and return an embed with the aritcle's abstract, authors and other information. The embed links directly to the article's Sci-Hub page. Usage: "!s {PubMed URL} {Sci-Hub top-level domain}" Second argument is optional and defaults to "se", meaning the default URL is sci-hub.se

* **User tracking:** CG Bot tracks all username changes. CG Bot can be pointed to a channel, where messages will be sent anytime a username changes or a new username is detected.

### Setup
For assistance setting up your own instance of CG Bot, please contact me at BenjaminLevyDev@gmail.com
