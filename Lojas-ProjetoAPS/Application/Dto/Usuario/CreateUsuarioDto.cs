using Application.Dto.Abstractions;

namespace Application.Dto.Usuario;

public class CreateUsuarioDto: ICreateDto<Domain.Entities.Usuario>
{
    public string Nome { get; set; } = null!;
    public string Cpf { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Senha { get; set; } = null!;
}