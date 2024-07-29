using Application.Dto.Estoque;
using Domain.Entities;

namespace Application.Contracts;

public interface IEstoqueService : IBaseService<Estoque>
{
    Task<bool> Create(CreateEstoqueDto dto);
    Task<bool> Update(UpdateEstoqueDto dto);
}