using Application.Dto.Abstractions;

namespace Application.Dto.Desconto;

public class CreateDescontoDto: ICreateDto<Domain.Entities.Desconto>
{
    public double ValorDesconto { get; set; }
    public int ProdutoId { get; set; }
    public int UsuarioId { get; set; }
}