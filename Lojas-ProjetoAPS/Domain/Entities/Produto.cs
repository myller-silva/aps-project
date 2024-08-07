namespace Domain.Entities;

public class Produto : BaseEntity
{
    public string Nome { get; set; } = null!;
    public double Preco { get; set; }
    public string? Descricao { get; set; }
    
    public virtual ICollection<Estoque> Estoques { get; set; } = new List<Estoque>();
    public virtual ICollection<Desconto> Descontos { get; set; } = new List<Desconto>();
    
}