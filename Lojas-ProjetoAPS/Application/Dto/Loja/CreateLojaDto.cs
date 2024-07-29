using Application.Dto.Abstractions;

namespace Application.Dto.Loja;

public class CreateLojaDto: ICreateDto<Domain.Entities.Loja>
{
    public string Nome { get; set; } = null!;
    public string Endereco { get; set; } = null!;
}