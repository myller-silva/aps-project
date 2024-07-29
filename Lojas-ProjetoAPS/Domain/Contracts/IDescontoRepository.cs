using Domain.Entities;

namespace Domain.Contracts;

public interface IDescontoRepository: IBaseRepository<Desconto>
{
    Task<List<Desconto>> ObterDescontosCliente(int lojaId, int usuarioId);
}