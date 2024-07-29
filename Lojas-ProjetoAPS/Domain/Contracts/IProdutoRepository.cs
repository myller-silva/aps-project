using Domain.Entities;


namespace Domain.Contracts;

public interface IProdutoRepository : IBaseRepository<Produto>
{
    Task<Produto?> DescontoEmProdutoParaUsuario(int lojaId, int produtoId, int usuarioId);
}