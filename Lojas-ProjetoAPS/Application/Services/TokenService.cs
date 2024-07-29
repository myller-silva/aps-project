using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Contracts;
using Application.Dto.Token;
using Application.Dto.Usuario;
using Core.Settings;
using Domain.Contracts;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services;

public class UsuarioAuthService : IUsuarioAuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly JwtSettings _jwtSettings;
    private readonly IUsuarioService _usuarioService;

    public UsuarioAuthService(IOptions<JwtSettings> jwtSettings, IUsuarioRepository usuarioRepository, IUsuarioService usuarioService)
    {
        _jwtSettings = jwtSettings.Value;
        _usuarioRepository = usuarioRepository;
        _usuarioService = usuarioService;
    }

    public async Task<TokenDto?> Login(LoginUsuarioDto loginDto)
    {
        var usuario = await _usuarioRepository.ObterPorEmail(loginDto.Email);
        if (usuario == null)
            return null;

        if (!usuario.Senha.Equals(loginDto.Senha))
        {
            return null;
        }

        return new TokenDto
        {
            Token = CreateToken(usuario, loginDto.Email)
        };
    }


    public string CreateToken(Usuario usuario, string email)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

        var claimsIdentity = new ClaimsIdentity();
        claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()));
        claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, usuario.Nome));
        claimsIdentity.AddClaim(new Claim(ClaimTypes.Email, usuario.Email));
        claimsIdentity.AddClaim(new Claim("TipoUsuario", usuario.UsuarioTipo ?? string.Empty));


        var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
        {
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience,
            Subject = claimsIdentity,
            Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpiracaoHoras)
        });

        return tokenHandler.WriteToken(token);
    }

    
    
    public async Task<TokenDto?> SignupAsync(SignupDto dto)
    {
        if (dto.Senha != dto.ConfirmarSenha)
        {
            throw new Exception("Passwords do not match");
        }

        var user = new CreateUsuarioDto()
        {
            Nome = dto.Nome,
            Cpf = dto.Cpf,
            Email = dto.Email,
            Senha = dto.Senha,
        };

        var result = await _usuarioService.Create(user);

        if (!result)
        {
            throw new Exception("User creation failed");
        }

        // Efetuar login
        return await Login(new LoginUsuarioDto()
        {
            Email = user.Email,
            Senha = user.Senha
        });

    }

}