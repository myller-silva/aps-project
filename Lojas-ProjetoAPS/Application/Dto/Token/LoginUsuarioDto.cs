namespace Application.Dto.Token;

public class LoginUsuarioDto
{
    public string Email { get; set; }
    public string Senha { get; set; } = null!;
}