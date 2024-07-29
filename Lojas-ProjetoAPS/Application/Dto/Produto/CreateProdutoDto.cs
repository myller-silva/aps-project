using Application.Dto.Abstractions;

namespace Application.Dto.Produto;

public class CreateProdutoDto: ICreateDto<Domain.Entities.Produto>
{
    public string Nome { get; set; } = null!;
    public double Preco { get; set; }
    public string? Descricao { get; set; }
}