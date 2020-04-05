# Log Analyzer API
API documentation is present on swagger.

### Installation
- Step 1) Check dotnet core
  First of all, we need to check the presence of .Net Core 3.0 in our Linux \ Windows PC opening a new linux console and using the following command.
    (If not present install [SDK](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.102-windows-x64-installer) and [Runtime](https://dotnet.microsoft.com/download/dotnet-core/current/runtime))
``` dotnet --version ```
- Step 2) Open the project in vscode and click on start to launch the api.
- Step 3) This will launch https://localhost:5001/swagger/index.html. Check if you can see the swagger page.

### Database Details
- Database is based on Mongo Db Atlas (on Cloud) and the url is mentioned inside the environment.txt

### Assumptions
- The freetext search only searches for exact strings.
