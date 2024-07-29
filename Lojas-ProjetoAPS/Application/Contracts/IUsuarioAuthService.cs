using Application.Dto.Token;
using Domain.Entities;

namespace Application.Contracts;

public interface IUsuarioAuthService
{
    Task<TokenDto?> Login(LoginUsuarioDto loginDto); 
    string CreateToken(Usuario usuario, string email);
    Task<TokenDto?> SignupAsync(SignupDto dto);
}