namespace Domain.Entities;
public class Estoque : BaseEntity
{
    public int Quantidade { get; set; }
    
    public int? LojaId { get; set; }
    public int? ProdutoId { get; set; }

    public virtual Loja Loja { get; set; } = null!;
    public virtual Produto Produto { get; set; } = null!;
}