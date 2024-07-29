using Application.Dto.Desconto;
using Domain.Entities;

namespace Application.Contracts;

public interface IDescontoService : IBaseService<Desconto>
{
    Task<bool> Create(CreateDescontoDto dto);
    Task<bool> Update(UpdateDescontoDto dto);
    Task<List<Desconto>> ObterDescontosCliente(int lojaId, int usuarioId);
}