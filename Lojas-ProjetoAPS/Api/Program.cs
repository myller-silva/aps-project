using System.Text;
using System.Text.Json.Serialization;
using Application.Contracts;
using Application.Services;
using Core.Settings;
using Data.Context;
using Data.Repositories;
using Domain.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Lojas", Version = "v1" });
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = "Bearer",
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition("Bearer", securityScheme);

    var securityRequirement = new OpenApiSecurityRequirement
    {
        { securityScheme, new[] { "Bearer" } }
    };

    c.AddSecurityRequirement(securityRequirement);
});


// DbContext
builder.Services.AddDbContext<LojaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection2")));

// Settings
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));


// JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
var key = Encoding.ASCII.GetBytes(jwtSettings.SecretKey);
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        c =>
        {
            c.WithOrigins("http://localhost:3000") // Domínio frontend
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); 
        });
});


// Repositories
builder
    .Services
    .AddScoped<IUsuarioAuthService, UsuarioAuthService>()
    .AddScoped<IUsuarioRepository, UsuarioRepository>()
    .AddScoped<IDescontoRepository, DescontoRepository>()
    .AddScoped<ILojaRepository, LojaRepository>()
    .AddScoped<IProdutoRepository, ProdutoRepository>()
    .AddScoped<IEstoqueRepository, EstoqueRepository>();

// Services
builder
    .Services
    .AddScoped<IUsuarioService, UsuarioService>()
    .AddScoped<IDescontoService, DescontoService>()
    .AddScoped<ILojaService, LojaService>()
    .AddScoped<IProdutoService, ProdutoService>()
    .AddScoped<IEstoqueService, EstoqueService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Lojas v1");
        // outras configurações...
    });
    app.UseCors("AllowLocalhost");
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();