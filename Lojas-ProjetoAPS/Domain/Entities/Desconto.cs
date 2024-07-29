namespace Domain.Entities;
public class Desconto : BaseEntity
{
    public double ValorDesconto { get; set; }
    
    public int? ProdutoId { get; set; }
    public int? UsuarioId { get; set; }

    public virtual Usuario? Usuario { get; set; }
    public virtual Produto? Produto { get; set; }
}