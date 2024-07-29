using Application.Dto.Loja;
using Domain.Entities;

namespace Application.Contracts;

public interface ILojaService : IBaseService<Domain.Entities.Loja>
{
    Task<bool> Create(CreateLojaDto dto);
    Task<bool> Update(UpdateLojaDto dto);
    Task<Produto?> DescontoEmProdutoParaUsuario(int lojaId, int produtoId, int usuarioId);
}