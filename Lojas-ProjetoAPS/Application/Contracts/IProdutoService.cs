using Application.Dto.Produto;
using Domain.Entities;

namespace Application.Contracts;

public interface IProdutoService : IBaseService<Produto>
{
    Task<bool> Create(CreateProdutoDto dto);
    Task<bool> Update(UpdateProdutoDto dto);
}