using Application.Dto.Abstractions;

namespace Application.Dto.Estoque;

public class CreateEstoqueDto: ICreateDto<Domain.Entities.Estoque>
{
    
    public int Quantidade { get; set; }
    public int LojaId { get; set; }
    public int ProdutoId { get; set; }
}