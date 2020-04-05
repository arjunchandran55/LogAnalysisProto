using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Hangfire;
using Hangfire.Mongo;
using System;
using log_analyzer_api.Services;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;

namespace log_analyzer_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        private const string AllowAllOrigins = "_allowAllOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AllowAllOrigins, builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Version = "v1",
                    Title = "Log Analyzer Api",
                    Description = "Api for supporting log analysis",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact()
                    {
                        Name = "Log analyzer api",
                        Email = "arjun.chandran55@gmail.com",
                    },
                });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                // pick comments from classes
                c.IncludeXmlComments(xmlPath);
                // enable the annotations on Controller classes [SwaggerTag]
                c.EnableAnnotations();
            });
            var mongoConnection = $"{Environment.GetEnvironmentVariable("MONGO_DB_SERVER")}{Environment.GetEnvironmentVariable("MONGO_DB_NAME")}";
            var migrationOptions = new MongoMigrationOptions
            {
                Strategy = MongoMigrationStrategy.Drop,
                BackupStrategy = MongoBackupStrategy.None,
            };
            var storageOptions = new MongoStorageOptions
            {
                MigrationOptions = migrationOptions
            };
            services.AddHangfire(config =>
            {
                config.UseMongoStorage(mongoConnection, storageOptions);
            });
            services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            InitializeDependencies(services);
        }

        public void InitializeDependencies(IServiceCollection services) {
            services.AddSingleton<ILogFileUploadService, LogFileUploadService>();
            services.AddSingleton<ILogInfoService, LogInfoService>();
            services.AddSingleton<ILogProcessingService, LogProcessingService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(AllowAllOrigins);

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Log Analyzer API V1");
                c.RoutePrefix = string.Empty;  // Set Swagger UI at apps root
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            var options = new BackgroundJobServerOptions { WorkerCount =1 };
            app.UseHangfireServer(options);
            app.UseHangfireDashboard("/hangfire", new DashboardOptions()
            {
                Authorization = new List<NoAuthFilter>() { new NoAuthFilter() },
                StatsPollingInterval = 60000
            }
            );

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            app.UseMvc();
            
        }
    }
}
