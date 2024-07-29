namespace Domain.Entities;

public class Usuario: BaseEntity
{
    public string Nome { get; set; } = null!;
    public string Cpf { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Senha { get; set; } = null!;

    public string? UsuarioTipo { get; set; }

    public virtual List<Desconto> Descontos { get; set; } = new();
}